import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExtensionIcon from "@mui/icons-material/Extension";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Button, Menu, MenuItem } from "@mui/material";
import * as navConst from "features/nav/navConst";
import * as stockfishMode from "features/mode/stockfishModeSlice";

const Training = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [anchorElTraining, setAnchorElTraining] = useState(null);

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleClickTraining = (event) => {
    setAnchorElTraining(event.currentTarget);
  };

  return (
    <>
      <Button
        id="Nav-training"
        variant={state.nav.name === navConst.TRAINING ? "contained" : "text"}
        startIcon={<PsychologyIcon />}
        onClick={handleClickTraining}
      >
        Training
      </Button>
      <Menu
        anchorEl={anchorElTraining}
        open={Boolean(anchorElTraining)}
        onClose={handleCloseTraining}
      >
        <MenuItem
          id="Nav-training-MenuItem-endgameSkills"
          onClick={() => {
            dispatch(stockfishMode.endgameSkillsDialog({ open: true }));
            handleCloseTraining();
          }}
        >
          <ExtensionIcon size="small" />
          &nbsp;Endgame Skills
        </MenuItem>
        <MenuItem
          id="Nav-training-MenuItem-checkmateSkills"
          onClick={() => {
            dispatch(stockfishMode.checkmateSkillsDialog({ open: true }));
            handleCloseTraining();
          }}
        >
          <CheckBoxIcon size="small" />
          &nbsp;Checkmate Skills
        </MenuItem>
      </Menu>
    </>
  );
};

export default Training;
