import * as React from 'react';
import { useState, useEffect } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const drawerWidth = 226;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: '100vh',
    width: '100%',
    padding: 0,
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
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const NewPaletteForm = (props) => {
  const theme = useTheme();
  let navigate = useNavigate();

  const { maxColors = 20 } = props;
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingColor, setEditingColor] = useState('');
  const [curColor, setCurColor] = useState('teal');
  const [colorsList, setColorsList] = useState([
    { name: 'teal', color: 'teal' },
  ]);
  const [newPalette, setNewPalette] = useState({
    colorName: '',
    paletteName: '',
  });
  const paletteIsFull = colorsList.length >= maxColors;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updateCurrentColor = (newColor) => {
    setCurColor(newColor.hex);
  };
  const addNewColor = (e) => {
    const newColor = { name: newPalette.colorName, color: curColor };
    setColorsList([...colorsList, newColor]);
    setNewPalette({ colorName: '' });
    setCurColor( 'cadetblue' );
  };
  const handleUpdateColor = () => {
    if (editing) {
      setColorsList((current) =>
        current.map((obj) => {
          if (obj.name === editingColor.name) {
            return {
              ...obj,
              color: curColor,
              name: newPalette.colorName,
            };
          }
          return obj;
        })
      );
    }
    setEditing(false);
    setNewPalette({ colorName: '' });
    setCurColor( 'cadetblue' );
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setNewPalette({ ...newPalette, [e.target.name]: e.target.value });
  };
  const handleSavePalette = (paletteName, emoji) => {
    setEditing(false);
    const newPaletteSet = {
      paletteName: paletteName,
      colors: colorsList,
      emoji: emoji,
      id: paletteName.toLowerCase().replace(/ /g, '-'),
    };
    props.savePalette(newPaletteSet);
    navigate('/');
  };
  const handleEdit = (name, color) => {
    setOpen(true);
    setEditing(true);
    setCurColor(color);
    setNewPalette({ colorName: name });
    setEditingColor({ name: name, color: color });
  };
  const handleCancelUpdateColor = () => {
    setEditing(false);
    setNewPalette({ colorName: '' });
  };
  const handleClearPalette = () => {
    setColorsList([]);
    setCurColor('');
  };
  const handleRandomColorGeneration = () => {
    let randomColor;
    const generateRandomColor = () => {
      let random = Math.round(Math.random() * 16777215).toString(16);
      if(random.length < 6 ){
        random = `${random}0`
      }
      randomColor = random;
    };

    if (
      randomColor === undefined ||
      colorsList.forEach((c) => c.color === randomColor)
    ) {
      generateRandomColor();
    }

    setColorsList([
      ...colorsList,
      { name: randomColor.toString(), color: `#${randomColor}` },
    ]);
    setCurColor(randomColor);
  };
  const handleDelete = (colorName) => {
    setColorsList(colorsList.filter((color) => color.name !== colorName));
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColorsList((items) => {
        const oldIndex = items.findIndex((a) => a.name === active.id);
        const newIndex = items.findIndex((o) => o.name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('colorNameUnique', (value) => {
      return colorsList.every((list) => {
        if (list.name.toLowerCase() !== value.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
    });
    ValidatorForm.addValidationRule('colorUnique', (value) => {
      return colorsList.every((list) => {
        if (list.color !== curColor) {
          return true;
        } else {
          return false;
        }
      });
    });
  }, [curColor, colorsList]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <PaletteFormNav
        palettes={props.palettes}
        colorsList={colorsList}
        open={open}
        drawerWidth={drawerWidth}
        handleSavePalette={handleSavePalette}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Main open={open}>
        <DrawerHeader />
        <ul style={{ height: '100%', padding: 0, margin:0 }}>
          <DndContext>
            <DraggableColorList
              colorsList={colorsList}
              handleDelete={handleDelete}
              handleDrag={handleDragEnd}
              handleEdit={handleEdit}
            />
          </DndContext>
        </ul>
      </Main>
      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
          ...(open && {
            width: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            aria-label="close drawer"
            edge="end"
            onClick={handleDrawerClose}
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />
        <Typography style={{fontFamily: "'Jost', sans-serif", margin: '0 auto'}} variant="h4">Add to Palette</Typography>
        <div className="button-wrapper">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClearPalette}
            style={{width: '100%', fontFamily: "'Jost', sans-serif"}}
          >
            Clear Palette
          </Button>
          <Button
            variant="contained"
            style={{width: '100%', fontFamily: "'Jost', sans-serif"}}
            color="secondary"
            disabled={paletteIsFull}
            onClick={handleRandomColorGeneration}
          >
            Generate Random Color
          </Button>
        </div>
        <ColorPickerForm
          addNewColor={addNewColor}
          updateCurrentColor={updateCurrentColor}
          newPalette={newPalette}
          curColor={curColor}
          handleNameChange={handleNameChange}
          paletteIsFull={paletteIsFull}
          editing={editing}
          handleUpdateColor={handleUpdateColor}
          handleCancelUpdateColor={handleCancelUpdateColor}
        />
        <Divider />
      </Drawer>
    </Box>
  );
};

export default NewPaletteForm;