import { DeleteTaskCard } from "./DeleteTaskCard";
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Delete Task Card Test', () => {
    let taskCardList;
    let setTaskCardList;
    let taskCardIndex;
    let taskList;
    let setTaskList;

    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {id: "1", title: "Task Card 1", taskIdList: ["1"]},
            {id: "2", title: "Task Card 2", taskIdList: []}
        ];
        setTaskCardList = jest.fn();
        taskCardIndex = 0;
        taskList = [
            {id: "1", name: "Task 1", parentTaskId: "", childrenTaskIdList: [], color: "white"}
        ];
        setTaskList = jest.fn();
    });

    test('render delete task card', () => {
        render(<DeleteTaskCard taskCardIndex={taskCardIndex} 
            taskCardList={taskCardList} setTaskCardList={setTaskCardList} taskList={taskList} setTaskList={setTaskList}/>);
        
        const deleteTaskCardButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteTaskCardButton).toBeInTheDocument();
    });

    test('delete task card', async () => {
        render(<DeleteTaskCard taskCardIndex={taskCardIndex} 
            taskCardList={taskCardList} setTaskCardList={setTaskCardList} taskList={taskList} setTaskList={setTaskList}/>);
        
        const deleteTaskCardButton = screen.getByRole('button', {name: 'delete'});

        await user.click(deleteTaskCardButton);
        
        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "2", title: "Task Card 2", taskIdList: []}
            ]
        );
    });
});