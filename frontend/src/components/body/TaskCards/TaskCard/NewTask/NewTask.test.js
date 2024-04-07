import {fireEvent, render, screen } from "@testing-library/react";
import { NewTask } from "./NewTask";
import userEvent from "@testing-library/user-event";

jest.mock('uuid', () => {
    return { v4: () => ('mock-uuid') };
  });

describe('NewTask', () => {
    let taskList;
    let setTaskCardList;
    let taskCardList;

    const user = userEvent.setup();

    beforeEach(() => {
        taskList = [];
        setTaskCardList = jest.fn();
        taskCardList = [{
            id: 'card-1',
            title: 'title',
            taskList: ['task1']
        },
        {
            id: 'card-2',
            title: 'title',
            taskList: []
        }];
    });

    test('renders input area',() => {
        render(<NewTask taskList={[]} setTaskCardList={() => {}} taskCardId="card-1" taskCardList={[]} />);
        const input = screen.getByPlaceholderText('Add a new task');
        expect(input).toBeInTheDocument();
    });

    test('add a new task when submitted', async () => {
        render(<NewTask taskList={taskList} setTaskCardList={setTaskCardList} taskCardId="card-1" taskCardList={taskCardList} />);
        const input = screen.getByRole('textbox');

        await user.type(input, 'New Task');
        const form = input.closest('form');
        fireEvent.submit(form);

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {
                    id: 'card-1',
                    title: 'title',
                    taskList: [{
                        id: 'mock-uuid',
                        name:'New Task'
                    }]
                },
                {
                    id: 'card-2',
                    title: 'title',
                    taskList: []
                }
            ]
        );

        expect(input.value).toBe("");
    });
});