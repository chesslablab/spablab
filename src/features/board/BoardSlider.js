import Slider from "@mui/material/Slider";
import { useRef, useState } from "react";

const BoardSlider = () => {
  const [sliderValue, setSliderValue] = useState(100);

  const sliderRef = useRef(document.documentElement);

  const handleChange = (e, val) => {
    setSliderValue(val);
    sliderRef.current.style.setProperty("--slider-value", val);
  };

  return (
    <>
      <Slider
        aria-label="Volume"
        value={sliderValue}
        onChange={handleChange}
        min={30}
        max={100}
        className="slider"
        sx={{
            marginTop: '10px'
        }}
      />
    </>
  );
};

export default BoardSlider;
