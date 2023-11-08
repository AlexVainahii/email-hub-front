import React, { useState } from 'react';
import { CirclePicker } from 'react-color'; // Імпортуйте компонент відповідного пікера
import { OptionBox } from './ColorPicker.styled';

const ColorPicker = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleColorChange = newColor => {
    onChange(newColor.hex); // Передавайте HEX значення кольору
  };
  const defaultColors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#ff9800',
    '#ff5722',
  ];

  return (
    <div>
      <div
        style={{
          background: color,
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={() => setDisplayColorPicker(!displayColorPicker)}
      ></div>
      {displayColorPicker ? (
        <OptionBox>
          <div
            onClick={() => setDisplayColorPicker(false)}
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
          />
          <CirclePicker
            colors={defaultColors}
            color={color}
            width={'260px'}
            onChange={handleColorChange}
          />
        </OptionBox>
      ) : null}
    </div>
  );
};

export default ColorPicker;
