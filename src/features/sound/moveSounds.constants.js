import captureAsset from 'assets/mp3/Capture.mp3';
import checkAsset from 'assets/mp3/Check.mp3';
import moveAsset from 'assets/mp3/Move.mp3';

export const MOVE_SOUND_ID = {
  CHECK: 'CHECK',
  MOVE: 'MOVE',
  CAPTURE: 'CAPTURE',
}

export const MOVE_SOUND_NODES = {
  [MOVE_SOUND_ID.CAPTURE]: new Audio(captureAsset),
  [MOVE_SOUND_ID.CHECK]: new Audio(checkAsset),
  [MOVE_SOUND_ID.MOVE]: new Audio(moveAsset),
};
