import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookIcon from '@mui/icons-material/Book';
import SearchIcon from '@mui/icons-material/Search';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { Button, Menu, MenuItem } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as sanMode from 'features/mode/sanModeSlice';

const OpeningSearchMenu = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [anchorOpeningSearch, setAnchorOpeningSearch] = useState(null);

  const handleCloseOpeningSearch = () => {
    setAnchorOpeningSearch(null);
  };

  const handleClickOpeningSearch = (event) => {
    setAnchorOpeningSearch(event.currentTarget);
  };

  return (
    <>
      <Button
        id="Nav-openingSearch"
        sx={{ pl: 2, justifyContent: 'flex-start' }}
        variant={
          state.nav.name === navConst.OPENING_SEARCH ? "contained" : "text"
        }
        startIcon={<SearchIcon />}
        onClick={handleClickOpeningSearch}
      >
        Opening Search
      </Button>
      <Menu
        anchorEl={anchorOpeningSearch}
        open={Boolean(anchorOpeningSearch)}
        onClose={handleCloseOpeningSearch}
      >
        <MenuItem
          id="Nav-openingSearch-MenuItem-ecoCode"
          onClick={() => {
            dispatch(sanMode.searchEcoDialog({ open: true }));
            handleCloseOpeningSearch();
          }}
        >
          <BookIcon size="small" />
          &nbsp;ECO Code
        </MenuItem>
        <MenuItem
          id="Nav-openingSearch-MenuItem-sanMovetext"
          onClick={() => {
            dispatch(sanMode.searchMovetextDialog({ open: true }));
            handleCloseOpeningSearch();
          }}
        >
          <MoveDownIcon size="small" />
          &nbsp;SAN Movetext
        </MenuItem>
        <MenuItem
          id="Nav-openingSearch-MenuItem-name"
          onClick={() => {
            dispatch(sanMode.searchNameDialog({ open: true }));
            handleCloseOpeningSearch();
          }}
        >
          <SpellcheckIcon size="small" />
          &nbsp;Name
        </MenuItem>
      </Menu>
    </>
  );
};

export default OpeningSearchMenu;
