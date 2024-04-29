import { fireEvent, render, screen } from "@testing-library/react";
import { SubTaskModule } from "./SubTaskModule";

describe("SubTaskModule", () => {
    let taskList;
    let setTaskList;
    let taskCardList;
    let setTaskCardList;
    let subTask;
    let subTaskID;

    beforeEach(() => {
        taskList = [
            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["2"], color: "white"},
            {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: ["3"], color: "white"},
            {id: "3", name: "Task3", parentTaskId: "2", childrenTaskIdList: [], color: "white"}
        ];
        setTaskList = jest.fn();
        taskCardList = [
            {id: "card-1", title: "Task Card 1", taskIdList: ["1","2","3"]},
            {id: "card-2", title: "Task Card 2", taskIdList: []}
        ];
        setTaskCardList = jest.fn();
        subTask = {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: ["3"], color: "white"};
        subTaskID = "2";
    
    });
  test('render SubTaskModule', () => {
    render(<SubTaskModule subTask={subTask} subTaskID={subTaskID} 
        taskList={taskList} setTaskList={setTaskList} taskCardList={taskCardList} setTaskCardList={setTaskCardList} />);

    const subTaskModule = screen.getByText('Task2');
    expect(subTaskModule).toBeInTheDocument();

  });

  test('change sub task name with click', async () => {
    render(<SubTaskModule subTask={subTask} subTaskID={subTaskID} 
        taskList={taskList} setTaskList={setTaskList} taskCardList={taskCardList} setTaskCardList={setTaskCardList} />);

    const subTaskModule = screen.getByText('Task2');
    fireEvent.click(subTaskModule);

    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, {target: {value: 'Task2 changed'}});
    fireEvent.keyDown(textField, {key: 'Enter', code: 'Enter'});

    expect(setTaskList).toHaveBeenCalledWith(
        [
            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["2"], color: "white"},
            {id: "2", name: "Task2 changed", parentTaskId: "1", childrenTaskIdList: ["3"], color: "white"},
            {id: "3", name: "Task3", parentTaskId: "2", childrenTaskIdList: [], color: "white"}
        ]
    );
  });

});