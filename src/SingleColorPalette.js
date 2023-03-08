import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

const SingleColorPalette = (props) => {
  const { palette, singleColor } = props;
  const [format, setFormat] = useState('hex');

  const aggregateShades = (palette, singleColor) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === singleColor)
      );
    }
    return shades.slice(1);
  };
  const shades = aggregateShades(palette, singleColor);

  const colorBox = shades.map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.name}
      showLink={false}
    />
  ));

  const handleSetFormat = (newFormat) => {
    setFormat(newFormat);
  };

  return (
    <div className="Palette SingleColorPalette">
      <Navbar handleSetFormat={handleSetFormat} showingAllColors={false} />
      <div className="Palette-colors">
        {colorBox}
        <div className="back-button-container ColorBox">
          <Link to={`/palette/${palette.id}`} className="back-button">
            Back
          </Link>
        </div>
      </div>
      <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;