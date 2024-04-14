import { render, screen } from "@testing-library/react";
import { TaskCard } from "./TaskCard";
import { DragDropContext } from "react-beautiful-dnd";


describe('TaskCard', () => {
    let taskList;
    let setTaskCardList;
    let taskCardId;
    let taskCardList;
    let taskCardIndex;

    beforeEach(() => {
        taskList = [
            {id: "1", name: "Task 1"},
            {id: "2", name: "Task 2"}
        ];
        setTaskCardList = jest.fn();
        taskCardId = "1";
        taskCardList = [
            {id: "1", title: "Task Card 1", taskList: [
                {id: "1", name: "Task 1"},
                {id: "2", name: "Task 2"}
            ]},
            {id: "2", title: "Task Card 2", taskList: []}
        ];
        taskCardIndex = 0;
    });

    test('render TaskCard', () => {
        render(
            <DragDropContext>
                <TaskCard taskList={taskList} setTaskCardList={setTaskCardList} 
                taskCardId={taskCardId} taskCardList={taskCardList} taskCardIndex={taskCardIndex}/>
            </DragDropContext>
        );

        const title = screen.getByText('Task Card 1');
        expect(title).toBeInTheDocument();

        const newTask = screen.getByRole('textbox')
        expect(newTask).toBeInTheDocument();

        const task = screen.getByText('Task 1');
        expect(task).toBeInTheDocument();

    });

    test('DroppableContainer has scroll bar', () => {
        render(
            <DragDropContext>
                <TaskCard taskList={taskList} setTaskCardList={setTaskCardList} 
                taskCardId={taskCardId} taskCardList={taskCardList} taskCardIndex={taskCardIndex}/>
            </DragDropContext>
        );

        const droppableContainer = screen.getByTestId('DroppableContainerInTaskCard');
        const style = window.getComputedStyle(droppableContainer);
        expect(style.overflowY).toBe('auto');
    });
});