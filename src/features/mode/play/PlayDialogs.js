import AcceptDrawDialog from 'features/mode/play/dialog/AcceptDrawDialog';
import AcceptRematchDialog from 'features/mode/play/dialog/AcceptRematchDialog';
import AcceptTakebackDialog from 'features/mode/play/dialog/AcceptTakebackDialog';
import CreateInviteCodeDialog from 'features/mode/play/dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from 'features/mode/play/dialog/EnterInviteCodeDialog';
import PlayOnlineDialog from 'features/mode/play/dialog/PlayOnlineDialog';

const PlayDialogs = () => {
  return (
    <>
      <AcceptDrawDialog />
      <AcceptRematchDialog />
      <AcceptTakebackDialog />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <PlayOnlineDialog />
    </>
  );
}

export default PlayDialogs;
