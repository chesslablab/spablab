import React from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const EventAutocomplete = ({props}) => {
  const state = useSelector((state) => state);

  return (
    <Autocomplete
      id="Event"
      options={state.eventAutocomplete.data}
      filterOptions={filterOptions}
      renderInput={(params) => <TextField {...params} label="Event" variant="filled" name="Event" />}
    />
  );
};

export default EventAutocomplete;
