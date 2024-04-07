import { render, screen } from "@testing-library/react";
import { TaskCardHeader } from "./TaskCardHeader";

describe('TaskCardHeader', () => {
    let taskCardList;
    let setTaskCardList;
    let taskCardIndex;
    let taskCardId;

    beforeEach(() => {
        taskCardList = [
            {id: "1", title: "Task Card 1", taskList: []},
            {id: "2", title: "Task Card 2", taskList: []}
        ];
        setTaskCardList = jest.fn();
        taskCardIndex = 0;
        taskCardId = "1";
    });

    test('render TaskCardHeader', () => {
        render(<TaskCardHeader taskCardId={taskCardId}
        taskCardIndex={taskCardIndex} taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>)

        const title = screen.getByText('Task Card 1');
        expect(title).toBeInTheDocument();

        const deleteButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteButton).toBeInTheDocument();
    });
});