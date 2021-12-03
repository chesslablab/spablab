import html2canvas from 'html2canvas';

export const DownloadImage = async () => {
  const board = document.getElementsByClassName('board')[0];

  const canvas = await html2canvas(board, {
    logging: false,
    width: board.clientWidth,
    height: board.clientHeight
  });

  const a = document.createElement('a');

  a.href = canvas.toDataURL('image/png', 1);
  a.download = "chessboard.png";
  a.click();
  a.remove();
}
