import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import * as enterCorrespondenceCodeDialog from 'features/dialog/enterCorrespondenceCodeDialogSlice';
import WsAction from 'features/ws/WsAction';

const EnterCorrespondenceCodeDialog = () => {
  const state = useSelector(state => state);

  const initialState = {
    hash: '',
    movetext: ''
  };

  const [fields, setFields] = React.useState(initialState);

  const dispatch = useDispatch();

  const handleCheckInbox = () => {
    WsAction.correspRead(fields.hash);
  };

  const handleHashChange = (event: Event) => {
    setFields({
      ...fields,
      hash: event.target.value
    });
  };

  const handlePgnChange = (event: Event) => {
    setFields({
      ...fields,
      movetext: event.target.value
    });
  };

  const handleSendMove = () => {
    dispatch(enterCorrespondenceCodeDialog.close());
    WsAction.correspReply(fields.hash, fields.movetext);
    setFields(initialState);
  };

  return (
    <Dialog open={state.enterCorrespondenceCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Make a Move
        <IconButton onClick={() => dispatch(enterCorrespondenceCodeDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          !state.enterCorrespondenceCodeDialog.corresp
            ? <FormGroup>
                <TextField
                  fullWidth
                  required
                  name="hash"
                  label="Correspondence code"
                  variant="filled"
                  margin="normal"
                  onChange={handleHashChange}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleCheckInbox()}
                  sx={{ mt: 2 }}
                >
                  Check Inbox
                </Button>
              </FormGroup>
          : null
        }
        {
          state.enterCorrespondenceCodeDialog.corresp
            ? <FormGroup>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      FEN
                    </Typography>
                    <Typography variant="body2">
                      {state.enterCorrespondenceCodeDialog.corresp.fen}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Copy FEN</Button>
                  </CardActions>
                </Card>
                <TextField
                  id="EnterCorrespondenceCodeDialog-TextField-movetext"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="movetext"
                  label="Your move"
                  variant="filled"
                  margin="normal"
                  defaultValue={state.enterCorrespondenceCodeDialog.corresp.movetext}
                  inputProps={{
                    spellCheck: false
                  }}
                  onChange={handlePgnChange}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSendMove()}
                  sx={{ mt: 2 }}
                >
                  Send Move
                </Button>
              </FormGroup>
            : null
        }
      </DialogContent>
    </Dialog>
  );
};

export default EnterCorrespondenceCodeDialog;
