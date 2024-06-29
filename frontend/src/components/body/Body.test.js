import { render, screen, waitFor, within } from "@testing-library/react";
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
                            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["2"], color: "white"},
                            {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: [], color: "white"}
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

    test('delete task', async () => {
        render(<Body />);
    
        // タスク1の削除ボタンをクリック
        await waitFor(() => {
            
            const container = screen.getAllByText('Task1')[0].parentElement;
            const deleteButtton = within(container).getByRole('button', {name: 'delete'});
            user.click(deleteButtton);

        });

        // Modalの削除するボタンをクリック
        await waitFor(() => {
            const deleteButton = screen.getByText('削除する');
            user.click(deleteButton);
        });
    
        await waitFor(() => {

            //　タスク1とタスク2が削除されていることを確認
            const task1 = screen.queryByText('Task1');
            expect(task1).not.toBeInTheDocument();

            const task2 = screen.queryByText('Task2');
            expect(task2).not.toBeInTheDocument();

            // タスクカード1とタスクカード2が残っていることを確認
            const taskCard1 = screen.queryByText('Task Card 1');
            expect(taskCard1).toBeInTheDocument();

            const taskCard2 = screen.queryByText('Task Card 2');
            expect(taskCard2).toBeInTheDocument();

        });
    });

    test('delete task card', async () => {
        render(<Body />);
    
        // タスクカード1の削除ボタンをクリック
        await waitFor(() => {
            
            const container = screen.getByText('Task Card 1').parentElement.parentElement;
            const deleteButtton = within(container).getByRole('button', {name: 'delete'});
            user.click(deleteButtton);

        });

        // Modalの削除するボタンをクリック
        await waitFor(() => {
            const deleteButton = screen.getByText('削除する');
            user.click(deleteButton);
        });
    
        await waitFor(() => {

            //　タスク1とタスク2が削除されていることを確認
            const task1 = screen.queryByText('Task1');
            expect(task1).not.toBeInTheDocument();

            const task2 = screen.queryByText('Task2');
            expect(task2).not.toBeInTheDocument();

            // タスクカード1が削除されていることを確認
            const taskCard1 = screen.queryByText('Task Card 1');
            expect(taskCard1).not.toBeInTheDocument();

            // タスクカード2が残っていることを確認
            const taskCard2 = screen.queryByText('Task Card 2');
            expect(taskCard2).toBeInTheDocument();

        });
    });

    // タスク1の削除ボタンをクリックし、削除せずにキャンセルボタンをクリック
    test('cancel delete task', async () => {
        render(<Body />);
    
        // タスク1の削除ボタンをクリック
        await waitFor(() => {
            
            const container = screen.getAllByText('Task1')[0].parentElement;
            const deleteButtton = within(container).getByRole('button', {name: 'delete'});
            user.click(deleteButtton);

        });

        // Modalのキャンセルボタンをクリック
        await waitFor(() => {
            const cancelButton = screen.getByText('キャンセル');
            user.click(cancelButton);
        });
    
        await waitFor(() => {

            //　タスク1とタスク2が削除されていないことを確認
            const task1 = screen.queryAllByText('Task1')[0];
            expect(task1).toBeInTheDocument();

            const task2 = screen.queryByText('Task2');
            expect(task2).toBeInTheDocument();

            // タスクカード1とタスクカード2が残っていることを確認
            const taskCard1 = screen.queryByText('Task Card 1');
            expect(taskCard1).toBeInTheDocument();

            const taskCard2 = screen.queryByText('Task Card 2');
            expect(taskCard2).toBeInTheDocument();

        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});