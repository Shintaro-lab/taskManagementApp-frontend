import { render, screen } from "@testing-library/react";
import { OpenDrawerButton } from "./OpenDrawerButton";
import userEvent from "@testing-library/user-event";

describe('open drawer button test', () => {

    let setOpenDrawer;
    let setSelectedTaskIDByOpenDrawer;
    let taskID;

    const user = userEvent.setup();

    beforeEach(() => {
        setOpenDrawer = jest.fn();
        setSelectedTaskIDByOpenDrawer = jest.fn();
        taskID = 'task-1';

    });

    test('render open drawer button', () => {
        render(<OpenDrawerButton setOpenDrawer={setOpenDrawer} 
            setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} taskID={taskID} />);

        const openDrawerButton = screen.getByRole('button');
        expect(openDrawerButton).toBeInTheDocument();
    });


    test('open drawer when clicked', async () => {
        render(<OpenDrawerButton setOpenDrawer={setOpenDrawer} 
            setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} taskID={taskID} />);

        const openDrawerButton = screen.getByRole('button');
        await user.click(openDrawerButton);

        expect(setOpenDrawer).toHaveBeenCalledWith(true);
        expect(setSelectedTaskIDByOpenDrawer).toHaveBeenCalledWith('task-1');
    });
});