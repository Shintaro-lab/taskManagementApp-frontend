import { render, screen, waitFor } from "@testing-library/react";
import Body from "./Body";

describe('Body', () => {
    test('render Body', async () => {

        global.fetch = jest.fn(
            () => Promise.resolve({
                json: () => Promise.resolve([
                    {id: "1", title: "Task Card 1", taskList: [
                        {id: "1", name: "Task 1"},
                        {id: "2", name: "Task 2"}
                    ]},
                    {id: "2", title: "Task Card 2", taskList: []}
                ])
            }))

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

    afterEach(() => {
        jest.restoreAllMocks();
    });
});