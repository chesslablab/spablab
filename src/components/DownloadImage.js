import html2canvas from 'html2canvas';

export const DownloadImage = async () => {
  const node = document.getElementsByClassName('board-with-options')[0];
  const board = document.getElementsByClassName('board')[0];
  const buttons = document.getElementsByClassName('buttons')[0];
  const history = document.getElementsByClassName('history')[0];

  const canvas = await html2canvas(node, {
    width: board.clientWidth,
    height: node.clientHeight - buttons.clientHeight - history.clientHeight,
    y: buttons.clientHeight
  });
  const croppedCanvas = document.createElement('canvas');
  const croppedCanvasContext = croppedCanvas.getContext('2d');

  const cropPositionTop = 0;
  const cropPositionLeft = 0;
  const cropWidth = canvas.width;
  const cropHeight = canvas.height;

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;

  croppedCanvasContext.drawImage(
    canvas,
    cropPositionLeft,
    cropPositionTop,
  );

  const base64Image = croppedCanvas.toDataURL('image/png', 1);
  const a = document.createElement('a');
  a.href = base64Image;
  a.download = "chess board.png";
  a.click();
  a.remove();
}
