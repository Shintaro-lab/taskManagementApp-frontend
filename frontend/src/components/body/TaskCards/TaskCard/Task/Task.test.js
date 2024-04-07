import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task } from "./Task";
import { act, fireEvent, render, screen} from '@testing-library/react';

describe('Task Test', () => {
    let task;
    let taskList;
    let setTaskCardList;
    let index;
    let taskCardList;
    let taskCardId;
    let handleDragEnd;

    beforeEach(() => {
        task = {id: "1", name: "Task 1"};
        taskList = [{id: "1", name: "Task 1"}, {id: "2", name: "Task 2"}];
        setTaskCardList = jest.fn();
        handleDragEnd = jest.fn();
        index = 0;
        taskCardList = [{id: "1", title: "Task Card 1", taskList: taskList}];
        taskCardId = "1";
    });
    
    test('render Task', () => {
        render(
            <DragDropContext >
                <Droppable droppableId="1">
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <Task task={task} taskList={taskList}
                                setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} taskCardId={taskCardId}/>
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        );
        
        const taskName = screen.getByText(task.name);
        expect(taskName).toBeInTheDocument();

        const deleteTaskButton = screen.getByRole('button', {name: 'delete'});
        expect(deleteTaskButton).toBeInTheDocument();
    });

    test('change task name with blur', async () => {
        render(
            <DragDropContext >
                <Droppable droppableId="1">
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <Task task={task} taskList={taskList}
                                setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} taskCardId={taskCardId}/>
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        );

        fireEvent.click(screen.getByText(task.name));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Task 1 changed' } });
        fireEvent.blur(screen.getByRole('textbox'));
        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {
                    id: '1',
                    title: 'Task Card 1',
                    taskList: [{id: "1", name: "Task 1 changed"}, {id: "2", name: "Task 2"}]
                }
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
                                <Task task={task} taskList={taskList}
                                setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} taskCardId={taskCardId}/>
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
        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {
                    id: '1',
                    title: 'Task Card 1',
                    taskList: [{id: "1", name: "Task 1 changed"}, {id: "2", name: "Task 2"}]
                }
            ]
        );
    });
    
});