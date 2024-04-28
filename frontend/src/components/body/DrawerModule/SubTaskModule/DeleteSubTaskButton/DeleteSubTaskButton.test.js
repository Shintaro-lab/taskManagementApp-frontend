import { render, screen } from "@testing-library/react";
import { DeleteSubTaskButton } from "./DeleteSubTaskButton";
import userEvent from "@testing-library/user-event";

describe('DeleteSubTaskButton', () => {

    let taskCardList;
    let setTaskCardList;
    let taskList;
    let setTaskList;
    let subTaskID;

    const user = userEvent.setup();

    beforeEach(() => {
        taskCardList = [
            {id: "card-1", title: "Task Card 1", taskIdList: ["1","2","3"]},
            {id: "card-2", title: "Task Card 2", taskIdList: []}
        ];

        setTaskCardList = jest.fn();

        taskList = [
            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["2"]},
            {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: ["3"]},
            {id: "3", name: "Task3", parentTaskId: "2", childrenTaskIdList: []}
        ];

        setTaskList = jest.fn();

        subTaskID = "2";

    });

    test('render DeleteSubTaskButton', () => {
        render(<DeleteSubTaskButton subTaskID={subTaskID} setTaskCardList={setTaskCardList}
            taskCardList={taskCardList} setTaskList={setTaskList} taskList={taskList}/>);
        
        const deleteSubTaskButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteSubTaskButton).toBeInTheDocument();
    });

    test('delete sub task', async () => {
        render(<DeleteSubTaskButton subTaskID={subTaskID} setTaskCardList={setTaskCardList}
            taskCardList={taskCardList} setTaskList={setTaskList} taskList={taskList}/>);
        
        const deleteSubTaskButton = screen.getByRole('button', {name: 'delete'});

        await user.click(deleteSubTaskButton);
        
        expect(setTaskList).toHaveBeenCalledWith(
            [
                {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: []}
            ]
        );

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "card-1", title: "Task Card 1", taskIdList: ["1"]},
                {id: "card-2", title: "Task Card 2", taskIdList: []}
            ]
        );
    });
});