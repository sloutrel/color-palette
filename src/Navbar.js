import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';
// import { Select } from '@material-ui/core';
// import { MenuItem } from '@material-ui/core';
// import { Snackbar } from '@material-ui/core';
// import { IconButton } from '@material-ui/core';
// import { Close } from '@material-ui/icons';
import { Close } from '@mui/icons-material';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './css/Navbar.css';

const Navbar = (props) => {
  const [format, setFormat] = useState('hex');
  const [snack, setSnack] = useState(false);
  const { level, handleSetLevel, handleSetFormat, showingAllColors } = props;

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    handleSetFormat(e.target.value);
    setSnack(true);
  };
  const handleCloseSnack = () => {
    setSnack(false);
  };

  return (
    <nav className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
        <div className="slider-wrapper">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={handleSetLevel}
            />
          </div>
        </div>
      )}
      <div className="select-wrapper">
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #000000</MenuItem>
          <MenuItem value="hsl">HSL - hsl(0,0%,0%)</MenuItem>
          <MenuItem value="rgb">RBG - rgb(0,0,0)</MenuItem>
          <MenuItem value="rgba">RBGA - rgba(0,0,0, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snack}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}</span>
        }
        ContentProps={{ 'aria-describedby': 'message-id' }}
        onClose={handleCloseSnack}
        action={[
          <IconButton
            onClick={handleCloseSnack}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <Close />
          </IconButton>,
        ]}
      />
    </nav>
  );
};

export default Navbar;
