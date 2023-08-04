import React from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const WhitePlayerAutocomplete = ({props}) => {
  const state = useSelector((state) => state);

  return (
    <Autocomplete
      id="White"
      options={state.playerAutocomplete.data}
      filterOptions={filterOptions}
      renderInput={(params) => <TextField {...params} label="White" variant="filled" name="White" />}
    />
  );
};

export default WhitePlayerAutocomplete;
