import { render, screen } from "@testing-library/react";
import { TaskCard } from "./TaskCard";
import { DragDropContext } from "react-beautiful-dnd";


describe('TaskCard', () => {
    let taskList;
    let setTaskCardList;
    let taskCardId;
    let taskCardList;
    let taskCardIndex;
    let setOpenDrawer;
    let setTaskList;
    let setSelectedTaskIDByOpenDrawer;
    let taskIdList;

    beforeEach(() => {
        taskList = [
            {id: "1", name: "Task 1", parentTaskId: "", childrenTaskIdList: []},
            {id: "2", name: "Task 2", parentTaskId: "", childrenTaskIdList: []}
        ];
        setTaskCardList = jest.fn();
        taskCardId = "card-1";
        taskCardList = [
            {id: "card-1", title: "Task Card 1", taskIdList: ["1","2"]},
            {id: "card-2", title: "Task Card 2", taskIdList: []}
        ];
        taskIdList = ["1","2"];
        taskCardIndex = 0;
        setOpenDrawer = jest.fn();
        setTaskList = jest.fn();
        setSelectedTaskIDByOpenDrawer = jest.fn();
    });

    test('render TaskCard', () => {
        render(
            <DragDropContext>
                <TaskCard taskIdList={taskIdList} taskList={taskList} setTaskCardList={setTaskCardList} 
                taskCardId={taskCardId} taskCardList={taskCardList} taskCardIndex={taskCardIndex} 
                setOpenDrawer={setOpenDrawer} setTaskList={setTaskList} 
                setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}/>
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
                <TaskCard taskIdList={taskIdList} taskList={taskList} setTaskCardList={setTaskCardList} 
                taskCardId={taskCardId} taskCardList={taskCardList} taskCardIndex={taskCardIndex} 
                setOpenDrawer={setOpenDrawer} setTaskList={setTaskList} 
                setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}/>
            </DragDropContext>
        );

        const droppableContainer = screen.getByTestId('DroppableContainerInTaskCard');
        const style = window.getComputedStyle(droppableContainer);
        expect(style.overflowY).toBe('auto');
    });
});