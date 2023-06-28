import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
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
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';

const EnterInboxCodeDialog = () => {
  const state = useSelector(state => state);

  const initialState = {
    hash: '',
    pgn: ''
  };

  const [fields, setFields] = React.useState(initialState);

  const dispatch = useDispatch();

  const handleCheckInbox = () => {
    Ws.inboxRead(fields.hash);
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
    dispatch(nav.enterInboxCodeDialog({ open: false }));
    Ws.inboxReply(fields.hash, fields.pgn);
    setFields(initialState);
  };

  return (
    <Dialog open={state.nav.dialogs.enterInboxCode.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Read Inbox
        <IconButton onClick={() => dispatch(nav.enterInboxCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          !state.nav.dialogs.enterInboxCode.inbox
            ? <FormGroup>
                <Alert severity="info">
                  Correspondence inboxes will automatically be deleted in 30 days. Have a nice game!
                </Alert>
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
          state.nav.dialogs.enterInboxCode.inbox
            ? <FormGroup>
                <Alert severity="info">
                  Both players can send a move to the shared correspondence inbox. Whose turn is it now to play?
                </Alert>
                {
                  state.nav.dialogs.enterInboxCode.inbox.fen
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Button
                            size="small"
                            onClick={() => navigator.clipboard.writeText(state.nav.dialogs.enterInboxCode.inbox.fen)}
                          >
                            Copy FEN String
                          </Button>
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
                            value={state.nav.dialogs.enterInboxCode.inbox.fen}
                          />
                        </CardContent>
                      </Card>
                    : null
                }
                {
                  state.nav.dialogs.enterInboxCode.inbox.movetext
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Button
                            size="small"
                            onClick={() => navigator.clipboard.writeText(state.nav.dialogs.enterInboxCode.inbox.movetext)}
                          >
                            Copy SAN Movetext
                          </Button>
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
                            value={state.nav.dialogs.enterInboxCode.inbox.movetext}
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
                  label="Your move in PGN format"
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
