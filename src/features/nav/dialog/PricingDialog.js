import { useState } from 'react';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Slide
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import * as nav from 'features/nav/navSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PricingDialog = () => {
  const state = useSelector(state => state.nav);

  const [studentRequest, setStudentRequest] = useState(true);

  const [managerRequest, setManagerRequest] = useState(true);

  const [sponsorRequest, setSponsorRequest] = useState(true);

  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={state.dialogs.pricing.open}
      onClose={() => dispatch(nav.pricingDialog({ open: false }))}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(nav.pricingDialog({ open: false }))}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Pricing
          </Typography>
          <Button autoFocus color="inherit" onClick={() => dispatch(nav.pricingDialog({ open: false }))}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{p:2}}>
        <Grid item xs={12} sx={{ m: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Subscription Plans
          </Typography>
          <Typography variant="h6" align="center">
            Choose the subscription plan that suits you best
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" align="center" gutterBottom>
                Student
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
                Intended for students who want to improve their development skills.
                Solve online chess issues on GitHub while being mentored at the
                same time.
              </Typography>
              <Typography sx={{ m: 3 }} variant="h4" component="div" align="center">
                €95 <Chip label="Month" />
              </Typography>
              <FormControlLabel
                control={<Checkbox onClick={() => setStudentRequest(!studentRequest)} />}
                label="I agree to be kept up to date with this promotion according to the legal notice below."
                componentsProps={{ typography: { variant: 'body2' } }}
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                href={`mailto:${process.env.REACT_APP_LEGAL_INFO_EMAIL}?subject=Student subscription request`}
                disabled={studentRequest}
              >
                Request Info
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" align="center" gutterBottom>
                Manager
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
                Aimed at chess companies and entrepreneurial individuals taking
                on business opportunities in the online chess industry.
              </Typography>
              <Typography sx={{ m: 3 }} variant="h4" component="div" align="center">
                €295 <Chip label="Month" />
              </Typography>
              <FormControlLabel
                control={<Checkbox onClick={() => setManagerRequest(!managerRequest)} />}
                label="I agree to be kept up to date with this promotion according to the legal notice below."
                componentsProps={{ typography: { variant: 'body2' } }}
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                href={`mailto:${process.env.REACT_APP_LEGAL_INFO_EMAIL}?subject=Manager subscription request`}
                disabled={managerRequest}
              >
                Request Info
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" align="center" gutterBottom>
                Sponsor
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
                Display your logo on this website as well as in ChesslaBlab's GitHub
                repos. Shout-out on social media recognizing your sponsorship.
              </Typography>
              <Typography sx={{ m: 3 }} variant="h4" component="div" align="center">
                €495 <Chip label="Month" />
              </Typography>
              <FormControlLabel
                control={<Checkbox onClick={() => setSponsorRequest(!sponsorRequest)} />}
                label="I agree to be kept up to date with this promotion according to the legal notice below."
                componentsProps={{ typography: { variant: 'body2' } }}
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                href={`mailto:${process.env.REACT_APP_LEGAL_INFO_EMAIL}?subject=Sponsor subscription request`}
                disabled={sponsorRequest}
              >
                Request Info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PricingDialog;
