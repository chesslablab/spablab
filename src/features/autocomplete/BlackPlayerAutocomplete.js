'use client'

import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const BlackPlayerAutocomplete = () => {
  const state = useSelector(state => state.playerAutocomplete);

  return (
    <Autocomplete
      loading={state.data.length === 0}
      id="Black"
      options={state.data}
      filterOptions={filterOptions}
      renderInput={(params) =>
        <TextField {...params}
          label="Black"
          variant="filled"
          name="Black"
        />}
    />
  );
};

export default BlackPlayerAutocomplete;
