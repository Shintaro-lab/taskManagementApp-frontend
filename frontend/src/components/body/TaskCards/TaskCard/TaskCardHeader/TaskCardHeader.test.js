import { render, screen } from "@testing-library/react";
import { TaskCardHeader } from "./TaskCardHeader";

describe('TaskCardHeader', () => {
    let taskCardList;
    let setTaskCardList;
    let taskCardIndex;
    let taskCardId;
    let taskList;
    let setTaskList;

    beforeEach(() => {
        taskCardList = [
            {id: "1", title: "Task Card 1", taskIdList: []},
            {id: "2", title: "Task Card 2", taskIdList: []}
        ];
        setTaskCardList = jest.fn();
        taskCardIndex = 0;
        taskCardId = "1";
        taskList = [];
        setTaskList = jest.fn();
    });

    test('render TaskCardHeader', () => {
        render(<TaskCardHeader taskCardId={taskCardId}
        taskCardIndex={taskCardIndex} taskCardList={taskCardList} 
        setTaskCardList={setTaskCardList} taskList={taskList} setTaskList={setTaskList}/>)

        const title = screen.getByText('Task Card 1');
        expect(title).toBeInTheDocument();

        const deleteButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteButton).toBeInTheDocument();
    });
});