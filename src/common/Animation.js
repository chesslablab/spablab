import store from 'app/store';
import Ascii from 'common/Ascii';
import * as eventConst from 'features/eventConst';

export default class Animation {
  constructor (sqSize, imgsRef, sqsRef) {
    this.sqSize = sqSize;
    this.imgsRef = imgsRef;
    this.sqsRef = sqsRef;
  }

  piece() {
    if (store.getState().nav.dialogs.settings.fields.pieceAnimation === 'on') {
      if (
        store.getState().board?.piecePlaced?.event === eventConst.ON_MOUSE_DOWN ||
        store.getState().board?.piecePlaced?.event === eventConst.ON_STOCKFISH ||
        store.getState().board?.piecePlaced?.event === eventConst.ON_PLAY_LAN
      ) {
        if (
          !store.getState().board.isMate &&
          !store.getState().board.isStalemate
        ) {
          const fromFen = store.getState().board.fen[store.getState().board.fen.length - 2].split(' ');
          const toFen = store.getState().board.fen[store.getState().board.fen.length - 1].split(' ');

          const lan = Ascii.longAlgebraicNotation(
            Ascii.toAscii(fromFen[0]),
            Ascii.toAscii(toFen[0])
          );

          const sqDiff = Ascii.sqDiff(lan[0], lan[1]);

          const xAxis = Ascii.xAxisSign(
            lan[0],
            lan[1],
            store.getState().board.turn,
            store.getState().board.flip
          ) * this.sqSize * sqDiff.files;

          const yAxis = Ascii.yAxisSign(
            lan[0],
            lan[1],
            store.getState().board.turn,
            store.getState().board.flip
          ) * this.sqSize * sqDiff.ranks;

          const sqFrom = this.sqsRef.current[lan[0]];
          const sqTo = this.sqsRef.current[lan[1]];
          const img = this.imgsRef.current[lan[1]];

          sqFrom.appendChild(img);

          img.animate(
            {
              transform: `translate(${xAxis}vw, ${yAxis}vw)`
            },
            {
              duration: 100
            }
          );

          Promise.all(
            img.getAnimations().map((animation) => animation.finished),
          ).then(() => {
            sqTo.appendChild(img);
          });
        }
      }
    }
  }
}
