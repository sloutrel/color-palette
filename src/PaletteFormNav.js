import * as React from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

const PaletteFormNav = (props) => {
  const {
    open,
    drawerWidth,
    handleSavePalette,
    handleDrawerOpen,
  } = props;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const [formShowing, setFormShowing] = useState(false);

  const handleDialogOpen = () => {
    setFormShowing(true);
  };
  const handleDialogClose = () => {
    setFormShowing(false);
  };
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ bgcolor: '#dedede', color: '#333' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontFamily: "'Jost', sans-serif" }} component="div">
            Palette Creator
          </Typography>

          <Link to="/" style={{textDecoration: 'none'}}>
            <Button variant="outlined" color="info" style={{fontFamily: "'Jost', sans-serif"}}>
              Back
            </Button>
          </Link>
          <Button variant="contained" color="secondary" style={{fontFamily: "'Jost', sans-serif"}} onClick={handleDialogOpen}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={props.palettes}
          handleSavePalette={handleSavePalette}
          handleDialogClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default PaletteFormNav;
