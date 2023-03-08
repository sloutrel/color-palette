import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './css/Palette.css';

const Palette = (props) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');
  const { colors, paletteName, emoji, id } = props.palette;
  const handleSetLevel = (newLevel) => {
    setLevel(newLevel);
  };

  const handleSetFormat = (newFormat) => {
    setFormat(newFormat);
  };
  const handleSetSingleColor = (color) => {
    props.setSingleColor(color);
  };
  const colorBoxes = colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      paletteId={id}
      setSingleColor={handleSetSingleColor}
      showLink={true}
    />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        handleSetLevel={handleSetLevel}
        handleSetFormat={handleSetFormat}
        showingAllColors={true}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter name={paletteName} emoji={emoji} />
    </div>
  );
};

export default Palette;