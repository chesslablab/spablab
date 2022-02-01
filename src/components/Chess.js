import React from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// ajax loader components
import ChessOpeningAnalysisAjaxLoader from "./AjaxLoader/ChessOpeningAnalysisAjaxLoader.js";
// alert components
import ChessOpeningAnalysisAlert from "./Alert/ChessOpeningAnalysisAlert.js";
import InfoAlert from "./Alert/InfoAlert.js";
// dialog components
import LoadFenDialog from "./Dialog/LoadFenDialog";
import FenDialog from "./Dialog/FenDialog";
import TakebackOfferDialog from "./Dialog/TakebackOfferDialog";
import TakebackAcceptDialog from "./Dialog/TakebackAcceptDialog";
import CreateInviteCodeDialog from "./Dialog/CreateInviteCodeDialog";
import EnterInviteCodeDialog from "./Dialog/EnterInviteCodeDialog";
import HeuristicPictureDialog from "./Dialog/HeuristicPictureDialog";
import DrawAcceptDialog from "./Dialog/DrawAcceptDialog";
import DrawOfferDialog from "./Dialog/DrawOfferDialog";
import ResignAcceptDialog from "./Dialog/ResignAcceptDialog";
import PgnDialog from "./Dialog/PgnDialog";
import LoadPgnDialog from "./Dialog/LoadPgnDialog";
import RematchAcceptDialog from "./Dialog/RematchAcceptDialog";
import RematchOfferDialog from "./Dialog/RematchOfferDialog";
import PlayLikeGrandmasterDialog from "./Dialog/PlayLikeGrandmasterDialog";
import ChessOpeningSearchEcoDialog from "./Dialog/ChessOpeningSearchEcoDialog";
import OpeningSearchNameDialog from "./Dialog/ChessOpeningSearchNameDialog";
import OpeningSearchMovetextDialog from "./Dialog/ChessOpeningSearchMovetextDialog";
import Board from "./Board.js";
import Buttons from "./Buttons.js";
import History from "./History";
import MainBreadcrumbs from "./MainBreadcrumbs";
import MoveValidator from "./MoveValidator.js";
import { default as ButtonsPlayFriendMode } from "./PlayFriendMode/Buttons.js";
import GameClock from "./GameClock/GameClock";
import "../index.css";
import store from "../store";

const useStyles = makeStyles({
  paper: {
    padding: 10,
  },
});

const Chess = ({ props }) => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Buttons props={props} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <MainBreadcrumbs />
            <History />
            <GameClock />
            <MoveValidator />
            <ButtonsPlayFriendMode />
          </Paper>
          <ChessOpeningAnalysisAjaxLoader />
          <ChessOpeningAnalysisAlert />
          <InfoAlert />
        </Grid>
        <Grid item xs={12} md={6}>
          <Board props={props} />
        </Grid>
      </Grid>
      <TakebackAcceptDialog />
      <TakebackOfferDialog />
      <LoadFenDialog />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <HeuristicPictureDialog />
      <FenDialog />
      <DrawAcceptDialog />
      <DrawOfferDialog />
      <ResignAcceptDialog />
      <PgnDialog />
      <LoadPgnDialog />
      <RematchAcceptDialog />
      <RematchOfferDialog />
      <PlayLikeGrandmasterDialog />
      <ChessOpeningSearchEcoDialog />
      <OpeningSearchNameDialog />
      <OpeningSearchMovetextDialog />
    </Provider>
  );
};

export default Chess;
