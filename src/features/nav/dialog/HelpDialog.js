import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  AppBar,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  Slide
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as nav from 'features/nav/navSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpDialog = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={state.dialogs.help.open}
      onClose={() => dispatch(nav.helpDialog({ open: false }))}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(nav.helpDialog({ open: false }))}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Help Center
          </Typography>
          <Button autoFocus color="inherit" onClick={() => dispatch(nav.helpDialog({ open: false }))}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ margin: 15 }}>
        <Alert
          className="info-alert"
          severity="info"
        >
          <AlertTitle>Did we miss something?</AlertTitle>
          Please let us know by either <a href="https://github.com/chesslablab/react-chess/issues" target="_blank" rel="noreferrer">raising an issue</a> on
          a GitHub repository or by <a href="https://github.com/orgs/chesslablab/discussions" target="_blank" rel="noreferrer">opening a discussion</a>.
          Your feedback is very much appreciated.
          Thank you!
        </Alert>
        <div style={{ marginTop: 15 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Does this website use cookies?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No, it allows to learn and play chess online without being tracked.
                It does not use cookies other than technical cookies because it
                does not collect user data for its purposes, not even nicknames
                or chess games. Besides, it is open-source, and can be used and
                extended by developers to create amazing chess web apps. A bunch
                of public chess repos ranging from React and JavaScript to PHP are
                available on the ChesslaBlab community on GitHub.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is IRC?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                IRC stands for Internet Relay Chat. It is a decentralized chat
                protocol meaning there is no central server, company or authority
                controlling the network. This website is embedding an IRC webchat
                provided by Libera Chat.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Dialog>
  );
};

export default HelpDialog;
