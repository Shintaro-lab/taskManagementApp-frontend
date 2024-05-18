import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from "@mui/material";

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export function OpenDrawerButton({setOpenDrawer,setSelectedTaskIDByOpenDrawer,taskID}) {

  const handleClick = () => {
    setOpenDrawer(true);
    setSelectedTaskIDByOpenDrawer(taskID);
  }

  return (
    <Container>
      <IconButton aria-label="openDrawer" onClick={handleClick} size="small">
        <MoreHorizIcon />
      </IconButton>
    </Container>
  );
}