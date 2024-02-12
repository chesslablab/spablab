'use client'

import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import * as variantConst from 'features/mode/variantConst';

const VariantTextField = ({ props }) => {
  const [variant, setVariant] = useState('classical');

  const [startPos, setStartPos] = useState('');

  useEffect(() => {
    props.variant = variant;
  }, [props, variant]);

  const handleVariantChange = (event) => {
    setVariant(event.target.value);
  };

  const handleStartPosChange = (event) => {
    setStartPos(event.target.value);
  };

  const StartPositionTextField = () => {
    if (variant === variantConst.CHESS_960) {
      return (
        <TextField
          id="Variant-TextField-startPos"
          fullWidth
          required
          name="startPos"
          label="Start position"
          variant="filled"
          helperText="Example: RNBQKBNR"
          value={startPos}
          onChange={handleStartPosChange}
          margin="dense"
        />
      );
    } else if (variant === variantConst.CAPABLANCA_FISCHER) {
      return (
        <TextField
          id="Variant-TextField-startPos"
          fullWidth
          required
          name="startPos"
          label="Start position"
          variant="filled"
          helperText="Example: ARNBQKBNRC"
          value={startPos}
          onChange={handleStartPosChange}
          margin="dense"
        />
      );
    }

    return null;
  }

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
        <MenuItem
          id="TextField-variant-MenuItem-capablanca-fischer"
          key={3}
          value="capablanca-fischer"
        >
          Capablanca-Fischer
        </MenuItem>
      </TextField>
      <StartPositionTextField />
    </>
  );
}

export default VariantTextField;
