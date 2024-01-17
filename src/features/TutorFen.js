import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TutorFen = () => {
  const stateNav = useSelector(state => state.nav);

  const stateTutorFen = useSelector(state => state.tutorFen);

  const hint = 'Please make a move for an heuristic explanation.';

  if (stateNav.dialogs.settings.fields.explanation === 'on') {
    return (
      <Card sx={{ ml: 2, mr: 2, mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Heuristic explanation
          </Typography>
          <Typography variant="body2">
            {stateTutorFen.explanation ? stateTutorFen.explanation : hint}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default TutorFen;
