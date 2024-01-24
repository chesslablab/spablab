import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import EditNoteIcon from "@mui/icons-material/EditNote";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import StorageIcon from "@mui/icons-material/Storage";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import * as warningAlert from "features/alert/warningAlertSlice";
import * as sanMode from "features/mode/sanModeSlice";
import * as ravMode from "features/mode/ravModeSlice";
import * as progressDialog from "features/progressDialogSlice";
import * as navConst from "features/nav/navConst";
import * as nav from "features/nav/navSlice";

const DatabaseMenu = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  const [anchorElDatabase, setAnchorElDatabase] = useState(null);

  const handleCloseDatabase = () => {
    setAnchorElDatabase(null);
  };

  const handleClickDatabase = (event) => {
    setAnchorElDatabase(event.currentTarget);
  };

  return (
    <>
      <Button
        id="Nav-database"
        sx={{ pl: 2, justifyContent: 'flex-start' }}
        variant={state.name === navConst.DATABASE ? "contained" : "text"}
        startIcon={<StorageIcon />}
        onClick={handleClickDatabase}
      >
        Database
      </Button>
      <Menu
        anchorEl={anchorElDatabase}
        open={Boolean(anchorElDatabase)}
        onClose={handleCloseDatabase}
      >
        <MenuItem
          id="Nav-database-MenuItem-searchGames"
          onClick={() => {
            dispatch(sanMode.searchGamesDialog({ open: true }));
            handleCloseDatabase();
          }}
        >
          <TravelExploreIcon size="small" />
          &nbsp;Search Games
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-database-MenuItem-topOpenings"
          onClick={() => {
            dispatch(progressDialog.open());
            fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}/stats/opening`, {
              method: 'GET',
              headers: {
                'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
              }
            })
            .then((res) => {
              if (res.status === 200) {
                res.json().then((data) => {
                  dispatch(
                    nav.openingsStatsDialog({ open: true, stats: data })
                  );
                });
              } else {
                dispatch(
                  warningAlert.show({
                    mssg: "Whoops! Something went wrong, please try again.",
                  })
                );
              }
            })
            .finally(() => {
              dispatch(progressDialog.close());
              dispatch(nav.openingsStatsDialog({ open: true }));
              handleCloseDatabase();
            });
          }}
        >
          <AutoGraphIcon size="small" />
          &nbsp;Top 50 Openings
        </MenuItem>
        <MenuItem
          id="Nav-database-MenuItem-playersStats"
          onClick={() => {
            dispatch(nav.playersStatsDialog({ open: true }));
            handleCloseDatabase();
          }}
        >
          <QueryStatsIcon size="small" />
          &nbsp;Players Stats
        </MenuItem>
        <MenuItem
          id="Nav-database-MenuItem-eventsStats"
          onClick={() => {
            dispatch(nav.eventsStatsDialog({ open: true }));
            handleCloseDatabase();
          }}
        >
          <TroubleshootIcon size="small" />
          &nbsp;Events Stats
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-database-MenuItem-searchGames"
          onClick={() => {
            dispatch(progressDialog.open());
            fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}/annotations/games`, {
              method: 'GET',
              headers: {
                'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
              }
            })
            .then((res) => res.json())
            .then((res) => {
              dispatch(ravMode.annotatedGamesDialog({ open: true }));
              dispatch(ravMode.annotatedGamesTable(res.games));
            })
            .catch((error) => {
              dispatch(
                warningAlert.show({
                  mssg: "Whoops! Something went wrong, please try again.",
                })
              );
            })
            .finally(() => {
              dispatch(progressDialog.close());
              handleCloseDatabase();
            });
          }}
        >
          <EditNoteIcon size="small" />
          &nbsp;Annotated Games
        </MenuItem>
      </Menu>
    </>
  );
};

export default DatabaseMenu;
