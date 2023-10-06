export const getLastBySplit = (data, del) => {
  const splitData = data?.split(del) || [];
  const lastSplitEl = splitData[splitData.length - 1];
  return lastSplitEl;
};

// TODO: find better way to determine piece capture
export const checkCapture = moveText => {
  const lastMove = getLastBySplit(moveText, ' ');
  const lastMoveName = getLastBySplit(lastMove, '.');
  return lastMoveName?.[1] === 'x';
}
