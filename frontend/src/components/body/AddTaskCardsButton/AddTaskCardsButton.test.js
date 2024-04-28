import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddTaskCardsButton } from './AddTaskCardsButton';

jest.mock('uuid', () => {
  return { v4: () => ('mock-uuid') };
});

describe('AddTaskCardsButton', () => {
  let taskCardList;
  let setTaskCardList;
  
  const user = userEvent.setup();

  beforeEach(() => {
    taskCardList = [
      {
        id: 'card-1',
        title: 'title',
        taskIdList: []
      }
    ];
    setTaskCardList = jest.fn();
  });

  test('renders add button', () => {
    render(<AddTaskCardsButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} />);
    const addButton = screen.getByRole('button');
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new task card when clicked', async () => {
    render(<AddTaskCardsButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} />);
    const addButton = screen.getByRole('button');

    await user.click(addButton);

    expect(setTaskCardList).toHaveBeenCalledWith([
      ...taskCardList,
      {
        id: 'card-mock-uuid',
        title: 'title',
        taskIdList: []
      }
    ]);
  });
});