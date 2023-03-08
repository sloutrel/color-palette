import React from 'react';

const PaletteFooter = (props) => {
  const { name, emoji } = props;
  return (
    <footer className="Palette-footer">
      {name}
      <span className="Palette-emoji">{emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
