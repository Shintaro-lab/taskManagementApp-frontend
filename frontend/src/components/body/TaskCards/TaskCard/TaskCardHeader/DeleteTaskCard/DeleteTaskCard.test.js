import { DeleteTaskCard } from "./DeleteTaskCard";
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DeleteTaskCard Component Tests', () => {
    let taskCardList;
    let setDeleteTarget;
    let setIsDeleteModalOpen;
    let setDeleteTaskCard;
    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {id: "1", title: "Task Card 1", taskIdList: ["1", "2"]},
            {id: "2", title: "Task Card 2", taskIdList: []}
        ];
        setDeleteTarget = jest.fn();
        setIsDeleteModalOpen = jest.fn();
        setDeleteTaskCard = jest.fn();
    });

    test('renders DeleteTaskCard component', () => {
        render(<DeleteTaskCard taskCardList={taskCardList} taskCardIndex={0} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen} 
            setDeleteTaskCard={setDeleteTaskCard}/>);

        const deleteButton = screen.getByRole('button', {name: /delete/i});
        expect(deleteButton).toBeInTheDocument();
    });

    test('clicking delete button calls setDeleteTarget with correct arguments', async () => {
        render(<DeleteTaskCard taskCardList={taskCardList} taskCardIndex={0} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen} 
            setDeleteTaskCard={setDeleteTaskCard}/>);

        const deleteButton = screen.getByRole('button', {name: /delete/i});
        await user.click(deleteButton);

        expect(setDeleteTarget).toHaveBeenCalledWith(["1", "2"]);
    });

    test('clicking delete button sets modal open', async () => {
        render(<DeleteTaskCard taskCardList={taskCardList} taskCardIndex={0} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen} 
            setDeleteTaskCard={setDeleteTaskCard}/>);

        const deleteButton = screen.getByRole('button', {name: /delete/i});
        await user.click(deleteButton);

        expect(setIsDeleteModalOpen).toHaveBeenCalledWith(true);
    });

    test('clicking delete button updates task card list correctly', async () => {
        render(<DeleteTaskCard taskCardList={taskCardList} taskCardIndex={0} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen} 
            setDeleteTaskCard={setDeleteTaskCard}/>);

        const deleteButton = screen.getByRole('button', {name: /delete/i});
        await user.click(deleteButton);

        expect(setDeleteTaskCard).toHaveBeenCalledWith([
            {id: "2", title: "Task Card 2", taskIdList: []}
        ]);
    });
});