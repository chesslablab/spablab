import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as eventAutocomplete from 'features/autocomplete/eventAutocompleteSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as progressDialog from 'features/progressDialogSlice';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const EventAutocomplete = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/autocomplete/event`)
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            dispatch(eventAutocomplete.set(data));
          });
        } else {
          dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
        }
      })
      .finally(() => {
        dispatch(progressDialog.close());
      });
  }, [props, dispatch]);

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
