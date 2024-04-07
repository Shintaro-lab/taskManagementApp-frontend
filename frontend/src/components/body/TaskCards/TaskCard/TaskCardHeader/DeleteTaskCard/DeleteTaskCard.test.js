import { DeleteTaskCard } from "./DeleteTaskCard";
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Delete Task Card Test', () => {
    let taskCardList;
    let setTaskCardList;
    let taskCardIndex;

    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {id: "1", title: "Task Card 1", taskList: []},
            {id: "2", title: "Task Card 2", taskList: []}
        ];
        setTaskCardList = jest.fn();
        taskCardIndex = 0;
    });

    test('render delete task card', () => {
        render(<DeleteTaskCard taskCardIndex={taskCardIndex} 
            taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>);
        
        const deleteTaskCardButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteTaskCardButton).toBeInTheDocument();
    });

    test('delete task card', async () => {
        render(<DeleteTaskCard taskCardIndex={taskCardIndex} 
            taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>);
        
        const deleteTaskCardButton = screen.getByRole('button', {name: 'delete'});

        await user.click(deleteTaskCardButton);
        
        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "2", title: "Task Card 2", taskList: []}
            ]
        );
    });
});