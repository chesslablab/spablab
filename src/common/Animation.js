import store from '../app/store';
import Ascii from '../common/Ascii';
import Piece from '../common/Piece';

export default class Animation {
  constructor (sqSize) {
    this.sqSize = sqSize;
    this.r = document.querySelector(':root');
  }

  pieces() {
    const lan = Ascii.longAlgebraicNotation(
      store.getState().board.history[store.getState().board.history.length - 2],
      store.getState().board.history[store.getState().board.history.length - 1]
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

    this.r.style.setProperty('--xAxis', `${xAxis}vw`);
    this.r.style.setProperty('--yAxis', `${yAxis}vw`);

    const hiddenImg = document.querySelector(`.${lan[1]}`).querySelector('img');
    hiddenImg.classList.add('hidden');

    const unicode = hiddenImg.getAttribute('data-unicode');

    const animatedImg = document.createElement('img');
    animatedImg.setAttribute('src', Piece.unicode[unicode].char);
    animatedImg.addEventListener('transitionend', function() {
      this.remove();
      hiddenImg.classList.remove('hidden');
    });

    const sq = document.querySelector(`.${lan[0]}`);
    sq.appendChild(animatedImg);

    getComputedStyle(document.documentElement).getPropertyValue('--xAxis');
    getComputedStyle(document.documentElement).getPropertyValue('--yAxis');

    animatedImg.classList.add('moved');
  }
}
