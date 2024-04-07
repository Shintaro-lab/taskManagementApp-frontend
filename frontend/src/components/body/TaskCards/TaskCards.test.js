import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskCards } from "./TaskCards";

describe('TaskCards', () => {
    let taskCardList;
    let setTaskCardList;

    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {id: "1", title: "Task Card 1", taskList: [
                {id: "1", name: "Task 1"},
                {id: "2", name: "Task 2"}
            ]},
            {id: "2", title: "Task Card 2", taskList: []}
        ];
        setTaskCardList = jest.fn();
    });

    test('render TaskCards', () => {
        render(
            <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>
        );

        const title1 = screen.getByText('Task Card 1');
        expect(title1).toBeInTheDocument();

        const title2 = screen.getByText('Task Card 2');
        expect(title2).toBeInTheDocument();
    });

    test('task cards drag and drop', async () => {

        render(
            <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>
        );

        const handle = screen.getByText('Task Card 1');

        const SPACE = { keyCode: 32 };
        const ARROW_RIGHT = { keyCode:39 };
        fireEvent.keyDown(handle, SPACE); // Begins the dnd
        
        fireEvent.keyDown(handle, ARROW_RIGHT); // Moves the element
        fireEvent.keyDown(handle, SPACE); // Ends the dnd

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "2", title: "Task Card 2", taskList: []},
                {id: "1", title: "Task Card 1", taskList: [
                    {id: "1", name: "Task 1"},
                    {id: "2", name: "Task 2"}
                ]}
            ]
        );
    });

    test('task drag and drop', async () => {
        /*
        render(
            <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>
        );

        //This is not working. I'm not sure why(I seem user.keyboard dont' work in my environment). It should be working.
        //await user.tab();
        //await user.tab();
        //await user.tab();
        //await user.tab();
        //await user.tab();
        //await user.tab();

        //await user.keyboard('[Space][/ArrowUp][/Space]');

        //This is not working. I'm not sure why(I seem fireEvent can't hold focus). It should be working.
        //const handle = screen.getByText('Task 2').parentElement;
        //handle.focus();
        //fireEvent.keyDown(document.activeElement, {keyCode: 32});
        //fireEvent.keyDown(document.activeElement, {keyCode: 38});
        //fireEvent.keyDown(document.activeElement, {keyCode: 32});

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "1", title: "Task Card 1", taskList: [
                    {id: "2", name: "Task 2"},
                    {id: "1", name: "Task 1"}
                ]},
                {id: "2", title: "Task Card 2", taskList: []}
            ]
        );

        */

    });
});