import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const TutorFen = () => {
  const stateNav = useSelector(state => state.nav);

  const stateTutorFen = useSelector(state => state.tutorFen);

  if (stateNav.dialogs.settings.fields.eval === 'on') {
    return (
      <Typography
        sx={{m: 2}}
        variant="body2"
      >
        {stateTutorFen.explanation}
      </Typography>
    );
  }

  return null;
}

export default TutorFen;
