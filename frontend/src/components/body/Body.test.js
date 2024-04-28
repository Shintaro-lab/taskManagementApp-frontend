import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Body from "./Body";

describe('Body', () => {

    const user = userEvent.setup();

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation((url) => {
            switch (url) {
                case 'http://localhost:8080/tm/getLatestTaskCardData':
                    return Promise.resolve({
                        json: () => Promise.resolve([
                            {id: "1", title: "Task Card 1", taskIdList: ["1", "2"]},
                            {id: "2", title: "Task Card 2", taskIdList: []}
                        ])
                    });
                case 'http://localhost:8080/tm/getLatestTaskData': 
                    return Promise.resolve({
                        json: () => Promise.resolve([
                            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["1"]},
                            {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: []}
                        ])
                    });
                case 'http://localhost:8080/tm/updateTaskCardData':
                    return;
                case 'http://localhost:8080/tm/updateTaskData':
                    return;
                default:
                    return Promise.reject(new Error('not found'));
            }
        });
    });

    test('render Body', async () => {

        render(
            <Body />
        );

        await waitFor(() => {
            const title1 = screen.getByText('Task Card 1');
            expect(title1).toBeInTheDocument();
        });

        const button = screen.getByRole('button', {name: 'add'});
        expect(button).toBeInTheDocument();

    });

    test('click drawer button', async () => {
            
            render(
                <Body />
            );
    
            await waitFor(() => {
                const button = screen.getAllByRole('button', {name: 'openDrawer'})[0];
                user.click(button);
            });

            await waitFor(() => {
                const drawerModule = screen.getByText('SubTask');
                expect(drawerModule).toBeInTheDocument();
            });

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});