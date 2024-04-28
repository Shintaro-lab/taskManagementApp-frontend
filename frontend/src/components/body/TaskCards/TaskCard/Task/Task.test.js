import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task } from "./Task";
import { act, fireEvent, render, screen} from '@testing-library/react';

describe('Task Test', () => {
    let task;
    let taskList;
    let setTaskList;
    let setTaskCardList;
    let index;
    let taskCardList;
    let taskCardId;
    let setOpenDrawer;
    let setSelectedTaskIDByOpenDrawer;
    let parentTaskName;
    let taskIdList;

    beforeEach(() => {
        task = {id: "1", name: "Task 1", parentTaskId: "2", childrenTaskIdList: []};
        taskList = [{id: "1", name: "Task 1", parentTaskId:"2", childrenTaskIdList:[]}, 
            {id: "2", name: "Task 2", parentTaskId:"", childrenTaskIdList:["1"]}];
        setTaskList = jest.fn();

        setTaskCardList = jest.fn();
        
        index = 0;
        taskCardList = [{id: "card-1", title: "Task Card 1", taskIdList: ["1", "2"]}];
        taskCardId = "card-1";

        setOpenDrawer = jest.fn();
        setSelectedTaskIDByOpenDrawer = jest.fn();
        parentTaskName = "Task 2";
        taskIdList = ["1", "2"];
        setTaskList = jest.fn();
    });
    
    test('render Task', () => {
        render(
            <DragDropContext >
                <Droppable droppableId="1">
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <Task task={task} taskIdList={taskIdList} setTaskList={setTaskList}
                                setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} 
                                taskCardId={taskCardId} taskList={taskList} setOpenDrawer={setOpenDrawer}
                                setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} parentTaskName={parentTaskName}/>
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        );
        
        const taskName = screen.getByText(task.name);
        expect(taskName).toBeInTheDocument();

        const parentTaskNameElement = screen.getByText(parentTaskName);
        expect(parentTaskNameElement).toBeInTheDocument();

        const deleteTaskButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteTaskButton).toBeInTheDocument();

        const openDrawerButton = screen.getByRole('button', {name: 'openDrawer'});
        expect(openDrawerButton).toBeInTheDocument();
    });

    test('change task name with blur', async () => {
        render(
            <DragDropContext >
                <Droppable droppableId="1">
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <Task task={task} taskIdList={taskIdList} setTaskList={setTaskList}
                                setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} 
                                taskCardId={taskCardId} taskList={taskList} setOpenDrawer={setOpenDrawer}
                                setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} parentTaskName={parentTaskName}/>
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        );

        fireEvent.click(screen.getByText(task.name));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Task 1 changed' } });
        fireEvent.blur(screen.getByRole('textbox'));

        expect(setTaskList).toHaveBeenCalledWith(
            [
                {id: "1", name: "Task 1 changed", parentTaskId:"2", childrenTaskIdList:[]}, 
                {id: "2", name: "Task 2", parentTaskId:"", childrenTaskIdList:["1"]}
            ]
        );
        
    });

    test('change task name with enter', async () => {
        render(
            <DragDropContext >
                <Droppable droppableId="1">
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <Task task={task} taskIdList={taskIdList} setTaskList={setTaskList}
                                setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} 
                                taskCardId={taskCardId} taskList={taskList} setOpenDrawer={setOpenDrawer}
                                setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} parentTaskName={parentTaskName}/>
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        );

        fireEvent.click(screen.getByText(task.name));
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Task 1 changed' } });
        const form = input.closest('form');
        fireEvent.submit(form);

        expect(setTaskList).toHaveBeenCalledWith(
            [
                {id: "1", name: "Task 1 changed", parentTaskId:"2", childrenTaskIdList:[]}, 
                {id: "2", name: "Task 2", parentTaskId:"", childrenTaskIdList:["1"]}
            ]
        );
    });
    
});