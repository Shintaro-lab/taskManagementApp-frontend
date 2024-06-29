import { Drawer, FormControl, FormControlLabel,List, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useState } from "react";
import { SubTaskModule } from "./SubTaskModule/SubTaskModule";
import {v4 as uuid} from "uuid";
import CheckIcon from '@mui/icons-material/Check';
import PaletteIcon from '@mui/icons-material/Palette';

const DrawerContainer = styled.div`
    width: 20vw;  
`;

const SubtaskTitleContainer = styled.div`
    display: flex;
`;

const FormControlLabelContainer = styled(FormControlLabel)`
    border: 2px solid black;
    color: 'blue';
`;

const OutOfCheckIconContainer = styled(CheckIcon)`
    visibility: hidden;
`;

const RadioGroupContainer = styled(RadioGroup)`
    margin: 2vw;
`;

export function DrawerModule({openDrawer,setOpenDrawer,taskList,setTaskList,taskCardList,
    setTaskCardList,selectedTaskIDByOpenDrawer,setSelectedTaskIDByOpenDrawer,setDeleteTarget,setIsDeleteModalOpen}) {

    const [inputValue,setInputValue] = useState("");

    let subTasks = [];
    let mainTask = "";
    let mainTaskColor = "";

    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id === selectedTaskIDByOpenDrawer) {
            for (let j=0; j<taskList.length; j++) {
                if (taskList[j].parentTaskId === taskList[i].id) {
                    subTasks = [
                        ...subTasks,
                        {id: taskList[j].id, name: taskList[j].name}]
                }
            }
            mainTask = taskList[i].name;
            mainTaskColor = taskList[i].color;
            break;
        }
    }

    const handleChangeColor = (event) => {
        const newTaskList = Array.from(taskList);

        for (let i=0; i<newTaskList.length; i++) {
            if (newTaskList[i].id === selectedTaskIDByOpenDrawer) {
                newTaskList[i].color = event.target.value;
                break;
            }
        }

        setTaskList(newTaskList);
    }

    const handleClose = () => {
        setOpenDrawer(false);
        setSelectedTaskIDByOpenDrawer("");
    }

    const addSubTask = (event) => {
        const id = uuid();
        const newTask = {id: id,name: event.target.value, parentTaskId: selectedTaskIDByOpenDrawer, 
            childrenTaskIdList: [], color: "white"};

        const newTaskList = taskList.map((task) => {
            if (task.id === selectedTaskIDByOpenDrawer) {
                return {id: task.id,name: task.name,parentTaskId: task.parentTaskId,
                    childrenTaskIdList: [...task.childrenTaskIdList,id], color: task.color};
            } else {
                return task;
            }
        });

        const newTaskCardList = Array.from(taskCardList);
        const newTaskIdList = [id,...newTaskCardList[0].taskIdList];

        newTaskCardList[0] = {id: newTaskCardList[0].id,title: newTaskCardList[0].title,taskIdList: newTaskIdList};

        setTaskList([...newTaskList,newTask]);
        setTaskCardList(newTaskCardList);
        setInputValue("");
    }

    const handleSubmit = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        addSubTask(event);
    }

    return (
        <Drawer open={openDrawer} onClose={handleClose} anchor="right">
            <DrawerContainer >
                <List>
                    <div>
                        <Typography variant="h4" component="h3" align="center">{mainTask}</Typography>
                    </div>
                    <SubtaskTitleContainer>
                        <PaletteIcon />
                        <Typography variant="h6" component="h3">Task Color</Typography>
                    </SubtaskTitleContainer>
                    <FormControl>
                        <RadioGroupContainer value={mainTaskColor} onChange={handleChangeColor} row >
                            <FormControlLabelContainer value="white"  
                                control={<Radio checkedIcon={<CheckIcon />} icon={<OutOfCheckIconContainer />}/>} />
                            <FormControlLabelContainer value="#ffef62" style={{backgroundColor: '#ffef62'}} 
                                control={<Radio checkedIcon={<CheckIcon />} icon={<OutOfCheckIconContainer />}/>} />
                            <FormControlLabelContainer value="#a2cf6e" style={{backgroundColor: '#a2cf6e'}} 
                                control={<Radio checkedIcon={<CheckIcon />} icon={<OutOfCheckIconContainer />}/>} />
                            <FormControlLabelContainer value="#ed4b82" style={{backgroundColor: '#ed4b82'}} 
                                control={<Radio checkedIcon={<CheckIcon />} icon={<OutOfCheckIconContainer />}/>} />
                        </RadioGroupContainer>
                    </FormControl>
                    <SubtaskTitleContainer>
                        <SubdirectoryArrowRightIcon />
                        <Typography variant="h6" component="h3">SubTask</Typography>
                    </SubtaskTitleContainer>
                    <List>
                        {subTasks.map((subTask,index) => {
                            return (
                                <SubTaskModule key={index} subTask={subTask} 
                                    subTasks={subTasks} subTaskID={subTask.id} taskList={taskList} 
                                    setTaskList={setTaskList} selectedTaskIDByOpenDrawer={selectedTaskIDByOpenDrawer}
                                    taskCardList={taskCardList} setTaskCardList={setTaskCardList}
                                    setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}
                                />
                            );
                        })}
                        <TextField label="Add a new subTask" variant="outlined" 
                            margin="normal" fullWidth 
                            value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                            onKeyDown={handleSubmit}/>
                    </List>
                </List>
            </DrawerContainer>
        </Drawer>
    );
}