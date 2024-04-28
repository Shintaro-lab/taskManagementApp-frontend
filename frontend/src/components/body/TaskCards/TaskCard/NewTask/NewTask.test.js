import {fireEvent, render, screen } from "@testing-library/react";
import { NewTask } from "./NewTask";
import userEvent from "@testing-library/user-event";

jest.mock('uuid', () => {
    return { v4: () => ('mock-uuid') };
  });

describe('NewTask', () => {
    let taskList;
    let setTaskList;
    let setTaskCardList;
    let taskCardList;
    let taskCardId;
    let taskIdList;

    const user = userEvent.setup();

    beforeEach(() => {
        taskList = [];
        setTaskList = jest.fn();
        setTaskCardList = jest.fn();
        taskCardList = [
            {
                id: 'card-1',
                title: 'title',
                taskIdList: []
            },
            {
                id: 'card-2',
                title: 'title',
                taskIdList: []
            }
        ];
        taskCardId = 'card-1';
        taskIdList = [];
    });

    test('renders input area',() => {
        render(<NewTask taskCardId={taskCardId} taskCardList={taskCardList} setTaskCardList={setTaskCardList}
            taskList={taskList} setTaskList={setTaskList} taskIdList={taskIdList} />);
        const input = screen.getByPlaceholderText('Add a new task');
        expect(input).toBeInTheDocument();
    });

    test('add a new task when submitted', async () => {
        render(<NewTask taskCardId={taskCardId} taskCardList={taskCardList} setTaskCardList={setTaskCardList}
            taskList={taskList} setTaskList={setTaskList} taskIdList={taskIdList} />);
        
        const input = screen.getByRole('textbox');

        await user.type(input, 'New Task');
        const form = input.closest('form');
        fireEvent.submit(form);

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {
                    id: 'card-1',
                    title: 'title',
                    taskIdList: ['mock-uuid']
                },
                {
                    id: 'card-2',
                    title: 'title',
                    taskIdList: []
                }
            ]
        );

        expect(setTaskList).toHaveBeenCalledWith(
            [
                {
                    id: 'mock-uuid',
                    name: 'New Task',
                    parentTaskId: '',
                    childrenTaskIdList: []
                }
            ]
        );

        expect(input.value).toBe("");
    });
});