import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Square = ({ square, color }) => {
  const state = useSelector(state => state);

  return (
    <div className={['square', color].join(' ')}>
      <span>
        {square}
      </span>
    </div>
  );
}

export default Square;
