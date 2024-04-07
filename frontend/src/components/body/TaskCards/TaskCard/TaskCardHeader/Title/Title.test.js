import { fireEvent, render, screen } from "@testing-library/react";
import { Title } from "./Title";

describe('Title', () => {
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

    test('render Title', () => {
        render(<Title taskCardId={taskCardId} taskCardIndex={taskCardIndex}
        taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>);

        const title = screen.getByText('Task Card 1');
        expect(title).toBeInTheDocument();
    });

    test('change title with blur', async () => {
        render(<Title taskCardId={taskCardId} taskCardIndex={taskCardIndex}
        taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>);

        fireEvent.click(screen.getByText('Task Card 1'));
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'Task Card 1 changed'}});
        fireEvent.blur(input);

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "1", title: "Task Card 1 changed", taskList: []},
                {id: "2", title: "Task Card 2", taskList: []}
            ]
        );
    });

    test('change title with enter', async () => {
        render(<Title taskCardId={taskCardId} taskCardIndex={taskCardIndex}
        taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>);

        fireEvent.click(screen.getByText('Task Card 1'));
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'Task Card 1 changed'}});
        fireEvent.keyDown(input, {key: 'Enter'});

        expect(setTaskCardList).toHaveBeenCalledWith(
            [
                {id: "1", title: "Task Card 1 changed", taskList: []},
                {id: "2", title: "Task Card 2", taskList: []}
            ]
        );
    });
});