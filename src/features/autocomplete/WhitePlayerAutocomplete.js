import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as playerAutocomplete from 'features/autocomplete/playerAutocompleteSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const WhitePlayerAutocomplete = () => {
  const state = useSelector(state => state.playerAutocomplete);

  const dispatch = useDispatch();

  useEffect(() => {
    if (state.data.length === 0) {
      fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/autocomplete/player`)
        .then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              dispatch(playerAutocomplete.set(data));
            });
          } else {
            dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
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
      id="White"
      options={state.data}
      filterOptions={filterOptions}
      renderInput={(params) =>
        <TextField {...params}
          label="White"
          variant="filled"
          name="White"
        />}
    />
  );
};

export default WhitePlayerAutocomplete;
