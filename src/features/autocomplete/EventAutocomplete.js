import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as eventAutocomplete from 'features/autocomplete/eventAutocompleteSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const EventAutocomplete = () => {
  const state = useSelector(state => state.eventAutocomplete);

  const dispatch = useDispatch();

  useEffect(() => {
    if (state.data.length === 0) {
      fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}/autocomplete/event`, {
        method: 'GET',
        headers: {
          'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            dispatch(eventAutocomplete.set(data));
          });
        } else {
          dispatch(warningAlert.show({ msg: 'Whoops! Something went wrong, please try again.' }));
        }
      });
    }
  }, [
    state.data.length,
    dispatch
  ]);

  return (
    <Autocomplete
      loading={state.data.length === 0}
      id="Event"
      options={state.data}
      filterOptions={filterOptions}
      renderInput={(params) =>
        <TextField {...params}
          label="Event"
          variant="filled"
          name="Event"
        />}
    />
  );
};

export default EventAutocomplete;
