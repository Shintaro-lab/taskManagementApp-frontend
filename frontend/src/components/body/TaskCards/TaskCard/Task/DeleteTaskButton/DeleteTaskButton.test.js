import { render, screen } from "@testing-library/react";
import {DeleteTaskButton} from "./DeleteTaskButton";
import userEvent from "@testing-library/user-event";

describe('delete task button test', () => {
    let taskCardList;
    let setTaskCardList;
    let taskCardId;
    let taskList;
    let index;

    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {
                id: 'card-1',
                title: 'title',
                taskList: [
                    {id: 'task-1', name: 'task-1'},
                    {id: 'task-2', name: 'task-2'},
                    {id: 'task-3', name: 'task-3'}
                ]
            }
        ];
        setTaskCardList = jest.fn();
        taskCardId = 'card-1';
        taskList = [
            {id: 'task-1', name: 'task-1'},
            {id: 'task-2', name: 'task-2'},
            {id: 'task-3', name: 'task-3'}
        ];
        index = 1;
    });

    test('render delete button', () => {
        render(<DeleteTaskButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
            taskCardId={taskCardId} taskList={taskList}
            index={index}
            />);
        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();
    });

    test('delete task when clicked', async () => {
        render(<DeleteTaskButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
            taskCardId={taskCardId} taskList={taskList}
            index={index}
            />);
        const deleteButton = screen.getByRole('button');
        await user.click(deleteButton);
        
        expect(setTaskCardList).toHaveBeenCalledWith([
            {
                id: 'card-1',
                title: 'title',
                taskList: [
                    {id: 'task-1', name: 'task-1'},
                    {id: 'task-3', name: 'task-3'}
                ]
            }
        ]);
    });
});