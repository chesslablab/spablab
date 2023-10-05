import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import * as variantConst from 'features/mode/variantConst';

const SelectVariantTextField = ({ props }) => {
  const [variant, setVariant] = useState('classical');

  const [startPos, setStartPos] = useState(null);

  useEffect(() => {
    props.variant = variant;
  }, [props, variant]);

  const handleVariantChange = (event: Event) => {
    setVariant(event.target.value);
  };

  const handleStartPosChange = (event: Event) => {
    setStartPos(event.target.value);
  };

  return (
    <>
      <TextField
        id="TextField-variant"
        select
        required
        fullWidth
        name="variant"
        label="Variant"
        variant="filled"
        value={variant}
        onChange={handleVariantChange}
        margin="dense"
      >
        <MenuItem
          id="TextField-variant-MenuItem-classical"
          key={0}
          value="classical"
        >
          Classical
        </MenuItem>
        <MenuItem
          id="TextField-variant-MenuItem-960"
          key={1}
          value="960"
        >
          Fischer Random
        </MenuItem>
        <MenuItem
          id="TextField-variant-MenuItem-capablanca"
          key={2}
          value="capablanca"
        >
          Capablanca
        </MenuItem>
        <MenuItem key={3} value="capablanca-fischer">
          Capablanca-Fischer
        </MenuItem>
      </TextField>
      {
        variant === variantConst.CHESS_960
          ? <TextField
              id="LoadFenDialog-TextField-startPos"
              fullWidth
              required
              name="startPos"
              label="Start position"
              variant="filled"
              helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
              value={startPos}
              onChange={handleStartPosChange}
              margin="dense"
            />
          : null
      }
      {
        variant === variantConst.CAPABLANCA_FISCHER
          ? <TextField
              id="LoadFenDialog-TextField-startPos"
              fullWidth
              required
              name="startPos"
              label="Start position"
              variant="filled"
              helperText="Examples: ARNBQKBNRC, RABBKRQNCN, NRCKNBBQAR, etc."
              value={startPos}
              onChange={handleStartPosChange}
              margin="dense"
          />
          : null
      }
    </>
  );
}

export default SelectVariantTextField;
