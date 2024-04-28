
export function DeleteFromTaskList(setTaskList, taskList, targetList) {
    let newTaskList = [];
    let childrenTaskIdList = [];

    for (let i=0; i<taskList.length; i++) {
        if (targetList.includes(taskList[i].id)) {
            childrenTaskIdList = [
                ...childrenTaskIdList,
                ...taskList[i].childrenTaskIdList
            ];
        } else {
            const newChildrenTaskIdList = taskList[i].childrenTaskIdList.filter((taskID) => {
                return !targetList.includes(taskID);
            });

            const editTask = {
                ...taskList[i],
                childrenTaskIdList: newChildrenTaskIdList
            };

            newTaskList = [
                ...newTaskList,
                editTask
            ];
        }
    }

    setTaskList(newTaskList);

    return [childrenTaskIdList,newTaskList];
}

export function DeleteFromTaskCardList(setTaskCardList, taskCardList, targetList) {

    const newTaskCardList = Array.from(taskCardList);
    for (let i=0; i<newTaskCardList.length; i++) {
        let newTaskIdList = newTaskCardList[i].taskIdList.filter((taskID) => {
            return !targetList.includes(taskID);
        });

        newTaskCardList[i] = {id: newTaskCardList[i].id,title: newTaskCardList[i].title,taskIdList: newTaskIdList};
    }
    
    setTaskCardList(newTaskCardList);

}