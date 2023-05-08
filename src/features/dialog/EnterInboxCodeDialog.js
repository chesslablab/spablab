import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  TextField
} from '@mui/material';
import * as enterCorrespondenceCodeDialog from 'features/dialog/enterInboxCodeDialogSlice';
import WsAction from 'features/ws/WsAction';

const EnterInboxCodeDialog = () => {
  const state = useSelector(state => state);

  const initialState = {
    hash: '',
    pgn: ''
  };

  const [fields, setFields] = React.useState(initialState);

  const dispatch = useDispatch();

  const handleCheckInbox = () => {
    WsAction.inboxRead(fields.hash);
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
      pgn: event.target.value
    });
  };

  const handleSendMove = () => {
    dispatch(enterCorrespondenceCodeDialog.close());
    WsAction.inboxReply(fields.hash, fields.pgn);
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
          !state.enterCorrespondenceCodeDialog.inbox
            ? <FormGroup>
                <TextField
                  fullWidth
                  required
                  name="hash"
                  label="Inbox code"
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
                  Read Inbox
                </Button>
              </FormGroup>
          : null
        }
        {
          state.enterCorrespondenceCodeDialog.inbox
            ? <FormGroup>
                {
                  state.enterCorrespondenceCodeDialog.inbox.fen
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Button size="small">Copy FEN String</Button>
                          <TextField
                            id="EnterInboxCodeDialog-TextField-fen"
                            fullWidth
                            name="fen"
                            variant="filled"
                            margin="normal"
                            inputProps={{
                              spellCheck: false,
                              readOnly: true
                            }}
                            value={state.enterCorrespondenceCodeDialog.inbox.fen}
                          />
                        </CardContent>
                      </Card>
                    : null
                }
                {
                  state.enterCorrespondenceCodeDialog.inbox.movetext
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Button size="small">Copy PGN Movetext</Button>
                          <TextField
                            id="EnterInboxCodeDialog-TextField-fen"
                            multiline
                            rows={4}
                            fullWidth
                            name="movetext"
                            variant="filled"
                            margin="normal"
                            inputProps={{
                              spellCheck: false,
                              readOnly: true
                            }}
                            value={state.enterCorrespondenceCodeDialog.inbox.movetext}
                          />
                        </CardContent>
                      </Card>
                    : null
                }
                <TextField
                  id="EnterInboxCodeDialog-TextField-movetext"
                  required
                  fullWidth
                  name="pgn"
                  label="Your move"
                  variant="filled"
                  margin="normal"
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
                  Send
                </Button>
              </FormGroup>
            : null
        }
      </DialogContent>
    </Dialog>
  );
};

export default EnterInboxCodeDialog;
