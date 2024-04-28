import { DeleteFromTaskCardList, DeleteFromTaskList } from "./DeleteTaskUtil";

describe('deleteTaskUtil Test', () => {

    let setTaskList;
    let taskList;
    let taskCardList;
    let setTaskCardList;

    beforeEach(() => {
        setTaskList = jest.fn();
        taskList = [
            {
                id: "0",
                name: "Task1",
                parentTaskId: "",
                childrenTaskIdList: ["1"]
            },
            {
                id: "1",
                name: "Task2",
                parentTaskId: "0",
                childrenTaskIdList: []
            }
        ];
        setTaskCardList = jest.fn();
        taskCardList = [
            {
                id: "card-1",
                title: "TODO",
                taskIdList: ["0","1"]
            }
        ];
    });

    test('deleteTaskList', () => {

        const result = DeleteFromTaskList(setTaskList,taskList, ["0"]);
        expect(result).toEqual([["1"],[{id: "1", name: "Task2", parentTaskId: "0", childrenTaskIdList: []}]]);
    });

    test('DeleteFromTaskCardList', () => {
        DeleteFromTaskCardList(setTaskCardList,taskCardList, ["0"]);
        expect(setTaskCardList).toHaveBeenCalledWith([{id: "card-1", title: "TODO", taskIdList: ["1"]}]);
    });
});