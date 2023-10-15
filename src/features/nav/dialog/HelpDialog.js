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
  Link,
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
          The Frequently Asked Questions are currently being documented. Please let us know if we missed something by either <Link href="https://github.com/chesslablab/react-chess/issues" target="_blank" rel="noreferrer">raising an issue</Link> on
          a GitHub repository or by <Link href="https://github.com/orgs/chesslablab/discussions" target="_blank" rel="noreferrer">opening a discussion</Link>.
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
              <Typography variant="body2">
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
              <Typography variant="body2">
                This website is embedding an IRC webchat provided by Libera Chat.
                IRC stands for Internet Relay Chat. It is a decentralized chat
                protocol meaning there is no central server, company or authority
                controlling the network.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>What is Libera Chat?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Libera Chat is a non-profit organisation based in Sweden operating
                the Libera Chat IRC network and the website libera.chat. It
                provides a community platform for free and open-source software
                and peer directed projects.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography>What are the chess variants available for playing?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Classical, Fischer Random Chess, Capablanca and Capablanca-Fischer.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography>What is correspondence chess?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Correspondence chess allows people to play one another not
                necessarily sitting in front of the board at the same time.
                ChesslaBlab allows to play correspondence chess with easy-to-use
                shared inboxes. Both players can send a move to a shared
                correspondence inbox which will automatically be deleted after
                thirty days from the last move that was made.
                Have a nice game!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>How many chess games are in the database?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                There are about one million games in the database.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel7a-content"
              id="panel7a-header"
            >
              <Typography>Can I improve my chess skills using the database?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Click on <b>Database &gt; Search Games</b>. Studying games from
                titled FIDE players is definitely a great way to improve your
                game.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel8a-content"
              id="panel8a-header"
            >
              <Typography>What are annotated games?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Click on <b>Database &gt; Annotated Games</b>. Annotated games
                are games with comments that help understand what is going on
                the chessboard. They usually include variations showing the
                development of the game in selected positions that require an
                in-depth understanding.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel9a-content"
              id="panel9a-header"
            >
              <Typography>What is RAV?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                RAV stands for Recursive Annotation Variation. It is the standard
                format for annotated chess games.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel10a-content"
              id="panel10a-header"
            >
              <Typography>What is SAN?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                SAN stands for Standard Algebraic Notation. It is a human-readable
                text format that allows chess players to read and write chess
                games in Portable Game Notation (PGN) format. A SAN movetext is
                basically the same thing as a RAV movetext with the only
                difference that it doesn't include variations.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Dialog>
  );
};

export default HelpDialog;
