import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import * as sanMode from 'features/mode/sanModeSlice';

const AnnotatedGamesDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRead = async (event) => {
    event.preventDefault();
    // TODO ...
  };

  return (
    <Dialog open={state.sanMode.dialogs.annotatedGames.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Annotated Games
        <IconButton onClick={() => dispatch(sanMode.annotatedGamesDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleRead}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            sx={{ mt: 2 }}
          >
            Read
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnnotatedGamesDialog;
