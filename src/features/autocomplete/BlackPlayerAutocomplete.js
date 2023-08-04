import React from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const BlackPlayerAutocomplete = ({props}) => {
  const state = useSelector((state) => state);

  return (
    <Autocomplete
      loading={state.playerAutocomplete.data.length === 0}
      id="Black"
      options={state.playerAutocomplete.data}
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
