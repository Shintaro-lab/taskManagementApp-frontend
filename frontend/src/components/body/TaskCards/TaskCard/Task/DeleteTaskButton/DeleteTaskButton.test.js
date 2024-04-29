import { render, screen } from "@testing-library/react";
import {DeleteTaskButton} from "./DeleteTaskButton";
import userEvent from "@testing-library/user-event";

describe('delete task button test', () => {
    let taskCardList;
    let setTaskCardList;
    let taskIdList
    let taskList;
    let setTaskList;
    let index;

    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {
                id: 'card-1',
                title: 'title',
                taskIdList: ['task-1','task-2','task-3']
            }
        ];
        setTaskCardList = jest.fn();
        taskIdList = ['task-1','task-2','task-3'];
        taskList = [
            {id: 'task-1', name: 'task-1', parentTaskId: '', childrenTaskIdList: [], color: 'white'},
            {id: 'task-2', name: 'task-2', parentTaskId: '', childrenTaskIdList: [], color: 'white'},
            {id: 'task-3', name: 'task-3', parentTaskId: '', childrenTaskIdList: [], color: 'white'}
        ];
        setTaskList = jest.fn();
        index = 1;
    });

    test('render delete button', () => {
        render(<DeleteTaskButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
            taskIdList={taskIdList} taskList={taskList} setTaskList={setTaskList}
            index={index}
            />);
        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();
    });

    test('delete task when clicked', async () => {
        render(<DeleteTaskButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
            taskIdList={taskIdList} taskList={taskList} setTaskList={setTaskList}
            index={index}
            />);
        const deleteButton = screen.getByRole('button');
        await user.click(deleteButton);
        
        expect(setTaskCardList).toHaveBeenCalledWith([
            {
                id: 'card-1',
                title: 'title',
                taskIdList: [
                    'task-1',
                    'task-3'
                ]
            }
        ]);

        expect(setTaskList).toHaveBeenCalledWith([
            {id: 'task-1', name: 'task-1', parentTaskId: '', childrenTaskIdList: [], color: 'white'},
            {id: 'task-3', name: 'task-3', parentTaskId: '', childrenTaskIdList: [], color: 'white'}
        ]);
    });
});