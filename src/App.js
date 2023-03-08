import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import './App.css';

function App() {
  const storedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
  let startingPalette = storedPalettes || seedColors;
  const [displayPalette, setDisplayPalette] = useState('material-ui-colors');
  const [singleColor, setSingleColor] = useState('teal');
  const [palettes, setPalettes] = useState(startingPalette);


  const handleListDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPalettes((items) => {
        const oldIndex = items.findIndex((a) => a.id === active.id);
        const newIndex = items.findIndex((o) => o.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const findPalette = (displayId) => {
    return palettes.find(function(palette) {
      return palette.id === displayId;
    });
  };
  const handleSetPalette = (palette) => {
    setDisplayPalette(palette);
  };
  const handleSetSingleColor = (color) => {
    setSingleColor(color);
  };
  const handleSavePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };
  const handleDeletePalette = (deletedId) => {
    setPalettes(palettes.filter(palette => palette.id !==deletedId))
  }

  useEffect(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }, [palettes]);

  return (
    <Routes>
      <Route
        path="/palette/new"
        element={
          <NewPaletteForm palettes={palettes} savePalette={handleSavePalette} />
        }
      />
      <Route
        path="/"
        element={
          <DndContext>
            <PaletteList palettes={palettes} handleListDrag={handleListDragEnd} setPalette={handleSetPalette} handleDeletePalette={handleDeletePalette} />
          </DndContext>
        }
      />
      <Route
        path="/palette/:id/"
        element={
          <Palette
            palette={generatePalette(findPalette(displayPalette))}
            setSingleColor={handleSetSingleColor}
          />
        }
      />
      <Route
        path="/palette/:paletteId/:colorId"
        element={
          <SingleColorPalette
            palette={generatePalette(findPalette(displayPalette))}
            setPalette={handleSetPalette}
            singleColor={singleColor}
          />
        }
      />
      <Route 
        path="*"
        element={
          <DndContext>
            <PaletteList palettes={palettes} handleListDrag={handleListDragEnd} setPalette={handleSetPalette} handleDeletePalette={handleDeletePalette} />
          </DndContext>
        }
      />
    </Routes>
  );
}

export default App;