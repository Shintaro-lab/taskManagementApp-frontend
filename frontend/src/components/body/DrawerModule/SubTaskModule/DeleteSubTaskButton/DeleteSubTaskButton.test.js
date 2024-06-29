import { render, screen } from "@testing-library/react";
import { DeleteSubTaskButton } from "./DeleteSubTaskButton";
import userEvent from "@testing-library/user-event";

describe('DeleteSubTaskButton', () => {

    let subTaskID;
    let setDeleteTarget;
    let setIsDeleteModalOpen;

    const user = userEvent.setup();

    beforeEach(() => {
        subTaskID = "2";
        setDeleteTarget = jest.fn();
        setIsDeleteModalOpen = jest.fn();

    });

    test('render DeleteSubTaskButton', () => {
        render(<DeleteSubTaskButton subTaskID={subTaskID} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}/>);
        
        const deleteSubTaskButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteSubTaskButton).toBeInTheDocument();
    });

    test('delete sub task', async () => {
        render(<DeleteSubTaskButton subTaskID={subTaskID} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}/>);
        
        const deleteSubTaskButton = screen.getByRole('button', {name: 'delete'});

        await user.click(deleteSubTaskButton);
        
        expect(setDeleteTarget).toHaveBeenCalledWith(["2"]);
        expect(setIsDeleteModalOpen).toHaveBeenCalledWith(true);
    });
});