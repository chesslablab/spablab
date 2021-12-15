import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
import RematchOfferDialog from "./Dialog/RematchOfferDialog";
import Board from "./Board.js";
import Buttons from "./Buttons.js";
import History from "./History";
import MainBreadcrumbs from "./MainBreadcrumbs";
import MoveValidator from "./MoveValidator.js";
import { default as ButtonsPlayFriendMode } from "./PlayFriendMode/Buttons.js";
import GameClock from "./GameClock/GameClock";
import InfoAlert from "./InfoAlert.js";
import "../index.css";
import store from "../store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  panel: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
}));

const Chess = ({ props }) => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid item xs={12} md={5}>
          <Buttons props={props} />
          <Board props={props} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.panel}>
          <Grid item xs={12} className={classes.breadcrumbs}>
            <MainBreadcrumbs />
          </Grid>
          <Paper elevation={3} className={classes.paper}>
            <GameClock />
            <History />
            <MoveValidator />
            <ButtonsPlayFriendMode />
          </Paper>
          <InfoAlert />
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
      <RematchOfferDialog />
    </Provider>
  );
};

export default Chess;
