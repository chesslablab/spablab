import store from 'app/store';
import Ascii from 'common/Ascii';

export default class Animation {
  constructor (sqSize, imgsRef, sqsRef) {
    this.sqSize = sqSize;
    this.imgsRef = imgsRef;
    this.sqsRef = sqsRef;
  }

  pieces() {
    if (store.getState().settingsDialog.fields.animation === 'on') {
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

      const distance = (Math.abs(xAxis) + Math.abs(yAxis)) / this.sqSize;

      img.animate(
        {
          transform: `translate(${xAxis}vw, ${yAxis}vw)`
        },
        {
          duration: 25 + (10 * distance)
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
