import { fireEvent, render, screen } from "@testing-library/react";
import { TaskCards } from "./TaskCards";

describe('TaskCards', () => {
    let taskCardList;
    let setTaskCardList;
    let setOpenDrawer;
    let taskList;
    let setTaskList;
    let setSelectedTaskIDByOpenDrawer;

    beforeEach(() => {
        taskCardList = [
            {id: "card-1", title: "Task Card 1", taskIdList: ["1", "2"]},
            {id: "card-2", title: "Task Card 2", taskIdList: []}
        ];
        setTaskCardList = jest.fn();
        setOpenDrawer = jest.fn();
        taskList = [
            {id: "1", name: "Task1",parentTaskId: "", childrenTaskIdList: [], color: "white"},
            {id: "2", name: "Task2",parentTaskId: "", childrenTaskIdList: [], color: "white"}
        ];
        setTaskList = jest.fn();
        setSelectedTaskIDByOpenDrawer = jest.fn();
    });

    test('render TaskCards', () => {
        render(
            <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList} setOpenDrawer={setOpenDrawer}
                taskList={taskList} setTaskList={setTaskList} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}/>
        );

        const title1 = screen.getByText('Task Card 1');
        expect(title1).toBeInTheDocument();

        const title2 = screen.getByText('Task Card 2');
        expect(title2).toBeInTheDocument();
    });

    test('task cards drag and drop', async () => {

        render(
            <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList} setOpenDrawer={setOpenDrawer}
                taskList={taskList} setTaskList={setTaskList} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}/>
        );

        const handle = screen.getByText('Task Card 1');

        const SPACE = { keyCode: 32 };
        const ARROW_RIGHT = { keyCode:39 };
        fireEvent.keyDown(handle, SPACE); // Begins the dnd
        
        fireEvent.keyDown(handle, ARROW_RIGHT); // Moves the element
        fireEvent.keyDown(handle, SPACE); // Ends the dnd

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "card-2", title: "Task Card 2", taskIdList: []},
                {id: "card-1", title: "Task Card 1", taskIdList: ["1", "2"]}
            ]
        );

        expect(setTaskList).not.toHaveBeenCalled();
    });

    test('task drag and drop', async () => {
        render(
            <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList} setOpenDrawer={setOpenDrawer}
                taskList={taskList} setTaskList={setTaskList} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}/>
        );

        const handle = screen.getByText('Task1');

        const SPACE = { keyCode: 32 };
        const ARROW_DOWN = { keyCode:40 };

        fireEvent.keyDown(handle, SPACE); // Begins the dnd
        fireEvent.keyDown(handle, ARROW_DOWN); // Moves the element
        fireEvent.keyDown(handle, SPACE); // Ends the dnd

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "card-1", title: "Task Card 1", taskIdList: ["2","1"]},
                {id: "card-2", title: "Task Card 2", taskIdList: []}
            ]
        );

    });
});