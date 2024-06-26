import { fireEvent, render, screen } from "@testing-library/react";
import { DrawerModule } from "./DrawerModule";

jest.mock('uuid', () => {
    return { v4: () => ('mock-uuid') };
  });

describe('test DrawerModule', () => {

    let taskList;
    let setTaskList;
    let taskCardList;
    let setTaskCardList;
    let selectedTaskIDByOpenDrawer;
    let setSelectedTaskIDByOpenDrawer;
    let openDrawer;
    let setOpenDrawer;

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
        selectedTaskIDByOpenDrawer = "1";
        setSelectedTaskIDByOpenDrawer = jest.fn();
        openDrawer = true;
        setOpenDrawer = jest.fn();
    });

    test('render DrawerModule', () => {
        render(<DrawerModule openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} 
            taskList={taskList} setTaskList={setTaskList} taskCardList={taskCardList} 
            setTaskCardList={setTaskCardList} selectedTaskIDByOpenDrawer={selectedTaskIDByOpenDrawer} 
            setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} />);
        
        const mainTask = screen.getByText('Task1');
        expect(mainTask).toBeInTheDocument();

        const color = screen.getAllByRole('radio')[0];
        expect(color).toBeInTheDocument();
        
        const Task2 = screen.getByText('Task2');
        expect(Task2).toBeInTheDocument();

        const Task3 = screen.queryByText('Task3');
        expect(Task3).not.toBeInTheDocument();

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

    });

    test('add sub task', () => {
        render(<DrawerModule openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} 
            taskList={taskList} setTaskList={setTaskList} taskCardList={taskCardList} 
            setTaskCardList={setTaskCardList} selectedTaskIDByOpenDrawer={selectedTaskIDByOpenDrawer} 
            setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'Task4'}});
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});

        expect(setTaskList).toHaveBeenCalledWith([
            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["2","mock-uuid"], color: "white"},
            {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: ["3"], color: "white"},
            {id: "3", name: "Task3", parentTaskId: "2", childrenTaskIdList: [], color: "white"},
            {id: "mock-uuid", name: "Task4", parentTaskId: "1", childrenTaskIdList: [], color: "white"}
        ]);

        expect(setTaskCardList).toHaveBeenCalledWith([
            {id: "card-1", title: "Task Card 1", taskIdList: ["mock-uuid","1","2","3"]},
            {id: "card-2", title: "Task Card 2", taskIdList: []}
        ]);

    });

    test('change color', () => {
        render(<DrawerModule openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} 
            taskList={taskList} setTaskList={setTaskList} taskCardList={taskCardList} 
            setTaskCardList={setTaskCardList} selectedTaskIDByOpenDrawer={selectedTaskIDByOpenDrawer} 
            setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} />);
        
        const color = screen.getAllByRole('radio')[1];
        fireEvent.click(color);

        expect(setTaskList).toHaveBeenCalledWith([
            {id: "1", name: "Task1", parentTaskId: "", childrenTaskIdList: ["2"], color: "#ffef62"},
            {id: "2", name: "Task2", parentTaskId: "1", childrenTaskIdList: ["3"], color: "white"},
            {id: "3", name: "Task3", parentTaskId: "2", childrenTaskIdList: [], color: "white"}
        ]);
    });
});