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
    pgn: ''
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
      pgn: event.target.value
    });
  };

  const handleSendMove = () => {
    dispatch(enterCorrespondenceCodeDialog.close());
    WsAction.correspReply(fields.hash, fields.pgn);
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
          state.enterCorrespondenceCodeDialog.corresp
            ? <FormGroup>
                {
                  state.enterCorrespondenceCodeDialog.corresp.fen
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            FEN String
                          </Typography>
                          <TextField
                            id="EnterCorrespondenceCodeDialog-TextField-fen"
                            fullWidth
                            name="fen"
                            variant="filled"
                            margin="normal"
                            inputProps={{
                              spellCheck: false,
                              readOnly: true
                            }}
                            value={state.enterCorrespondenceCodeDialog.corresp.fen}
                          />
                        </CardContent>
                        <CardActions>
                          <Button size="small">Copy</Button>
                        </CardActions>
                      </Card>
                    : null
                }
                {
                  state.enterCorrespondenceCodeDialog.corresp.movetext
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            PGN Movetext
                          </Typography>
                          <TextField
                            id="EnterCorrespondenceCodeDialog-TextField-fen"
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
                            value={state.enterCorrespondenceCodeDialog.corresp.movetext}
                          />
                        </CardContent>
                        <CardActions>
                          <Button size="small">Copy</Button>
                        </CardActions>
                      </Card>
                    : null
                }
                <TextField
                  id="EnterCorrespondenceCodeDialog-TextField-movetext"
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
