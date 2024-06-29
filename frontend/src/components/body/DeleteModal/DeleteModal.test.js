import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteModal } from './DeleteModal';

describe('DeleteModal', () => {
  test('should display modal when isOpen is true', () => {
    render(<DeleteModal isOpen={true} onClose={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('本当に削除しますか?')).toBeInTheDocument();
  });

  test('should not display modal when isOpen is false', () => {
    render(<DeleteModal isOpen={false} onClose={() => {}} onDelete={() => {}} />);
    expect(screen.queryByText('本当に削除しますか?')).not.toBeInTheDocument();
  });

  test('should call onClose when cancel button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<DeleteModal isOpen={true} onClose={onCloseMock} onDelete={() => {}} />);
    fireEvent.click(screen.getByText('キャンセル'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should call onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<DeleteModal isOpen={true} onClose={() => {}} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByText('削除する'));
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});