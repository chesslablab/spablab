import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import * as ravMode from 'features/mode/ravModeSlice';
import AnnotatedGamesTable from 'features/mode/rav/table/AnnotatedGamesTable.js';

const AnnotatedGamesDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);

  const annotatedGames = require('assets/json/annotated-games.json');

  useEffect(() => {
    setResult(annotatedGames);
  }, [annotatedGames]);

  return (
    <Dialog open={state.ravMode.dialogs.annotatedGames.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Annotated Games
        <IconButton onClick={() => dispatch(ravMode.annotatedGamesDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <AnnotatedGamesTable props={{ result: result }} />
      </DialogContent>
    </Dialog>
  );
};

export default AnnotatedGamesDialog;
