import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import Pgn from 'common/Pgn';
import * as createCorrespondenceCodeDialog from 'features/dialog/createCorrespondenceCodeDialogSlice';
import SelectColorButtons from 'features/dialog/SelectColorButtons';
import * as variantConst from 'features/variant/variantConst';
import WsAction from 'features/ws/WsAction';

const CreateCorrespondenceCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.createCorrespondenceCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Invite a Friend
        <IconButton onClick={() => dispatch(createCorrespondenceCodeDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.createCorrespondenceCodeDialog.corresp?.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const [fields, setFields] = React.useState({
    color: 'rand',
    variant: variantConst.CLASSICAL,
    fen: '',
    startPos: '',
  });

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleStartPosChange = (event: Event) => {
    setFields({
      ...fields,
      startPos: event.target.value
    });
  };

  const handleCreateCode = (event) => {
    event.preventDefault();
    let settings = {
      color: fields.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : fields.color
    };
    if (fields.fen) {
      settings.fen = fields.fen;
    }
    if (fields.startPos) {
      settings.startPos = fields.startPos;
    }
    WsAction.correspCreate(fields.variant, JSON.stringify(settings));
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <Grid container justifyContent="center">
          <SelectColorButtons props={fields} />
        </Grid>
        <TextField
          select
          required
          fullWidth
          name="variant"
          label="Variant"
          variant="filled"
          defaultValue={variantConst.CLASSICAL}
          margin="normal"
          onChange={handleVariantChange}
          >
          <MenuItem key={0} value="classical">
            Classical
          </MenuItem>
          <MenuItem key={1} value="960">
            Fischer Random 960
          </MenuItem>
          <MenuItem key={2} value="capablanca80">
            Capablanca
          </MenuItem>
        </TextField>
        {
          fields.variant === variantConst.CHESS_960
            ? <TextField
              fullWidth
              required
              name="startPos"
              label="Start position"
              variant="filled"
              helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
              onChange={handleStartPosChange}
            />
            : null
        }
        <TextField
          fullWidth
          name="fen"
          label="From FEN position"
          variant="filled"
          margin="normal"
          onChange={handleFenChange}
        />
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Create Correspondence Code
        </Button>
      </form>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        margin="normal"
        value={state.createCorrespondenceCodeDialog.corresp.hash}
      />
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(state.createCorrespondenceCodeDialog.corresp.hash);
          dispatch(createCorrespondenceCodeDialog.close());
      }}>
        Copy Code
      </Button>
    </DialogContent>
  );
}

export default CreateCorrespondenceCodeDialog;
