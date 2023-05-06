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

  const [fields, setFields] = React.useState({
    hash: '',
    pgn: ''
  });
  const dispatch = useDispatch();

  const handleCheckInbox = () => {
    WsAction.correspondence(fields.hash, fields.pgn);
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
    WsAction.correspondence(fields.hash, fields.pgn);
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
          !state.enterCorrespondenceCodeDialog.game
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
          state.enterCorrespondenceCodeDialog.game
            ? <FormGroup>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Movetext
                    </Typography>
                    <Typography variant="body2">
                      {state.enterCorrespondenceCodeDialog.game.movetext}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Copy Movetext</Button>
                  </CardActions>
                </Card>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      FEN
                    </Typography>
                    <Typography variant="body2">
                      {state.enterCorrespondenceCodeDialog.game.fen}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Copy FEN</Button>
                  </CardActions>
                </Card>
                <TextField
                  id="EnterCorrespondenceCodeDialog-TextField-pgn"
                  required
                  fullWidth
                  name="pgn"
                  label="Your move"
                  variant="filled"
                  margin="normal"
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
