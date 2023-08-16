import LoadSanDialog from 'features/mode/san/dialog/LoadSanDialog';
import SearchEcoDialog from 'features/mode/san/dialog/SearchEcoDialog';
import SearchGamesDialog from 'features/mode/san/dialog/SearchGamesDialog';
import SearchMovetextDialog from 'features/mode/san/dialog/SearchMovetextDialog';
import SearchNameDialog from 'features/mode/san/dialog/SearchNameDialog';

const SanDialogs = () => {
  return (
    <>
      <LoadSanDialog />
      <SearchEcoDialog />
      <SearchGamesDialog />
      <SearchMovetextDialog />
      <SearchNameDialog />
    </>
  );
}

export default SanDialogs;
