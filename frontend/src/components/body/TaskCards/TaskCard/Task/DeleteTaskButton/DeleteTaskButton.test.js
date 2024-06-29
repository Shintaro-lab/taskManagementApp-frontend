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
    let setDeleteTarget;
    let setIsDeleteModalOpen;

    const user = userEvent.setup();

    beforeEach(() => {
        taskIdList = ['task-1','task-2','task-3'];
        
        index = 1;
        setDeleteTarget = jest.fn();
        setIsDeleteModalOpen = jest.fn();

    });

    test('render delete button', () => {
        render(<DeleteTaskButton
            taskIdList={taskIdList} 
            index={index} setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}
            />);
        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();
    });

    test('delete task when clicked', async () => {
        render(<DeleteTaskButton
            taskIdList={taskIdList} 
            index={index} setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}
            />);
        const deleteButton = screen.getByRole('button');
        await user.click(deleteButton);
        
        expect(setDeleteTarget).toHaveBeenCalledWith(["task-2"]);
        expect(setIsDeleteModalOpen).toHaveBeenCalledWith(true);
    });
});