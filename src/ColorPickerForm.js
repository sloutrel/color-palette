import * as React from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ColorPickerForm = (props) => {
  const {
    addNewColor,
    updateCurrentColor,
    newPalette,
    curColor,
    handleNameChange,
    paletteIsFull,
    editing,
    handleUpdateColor,
    handleCancelUpdateColor,
  } = props;
  let defaultColor
  if (curColor !== ''){
    defaultColor = curColor
  } else { defaultColor = 'cadetblue'}
  const isDarkColor = chroma(defaultColor).luminance() <= 0.09;

  return (
    <div>
      <ChromePicker
        color={defaultColor}
        onChange={updateCurrentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm
        onSubmit={addNewColor}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          value={newPalette.colorName}
          name="colorName"
          style={{width: '100%', fontFamily: "'Jost', sans-serif"}}
          validators={
            editing ? [] : ['required', 'colorNameUnique', 'colorUnique']
          }
          placeholder='color name'
          errorMessages={[
            'this field is required',
            'color name already used. enter different name',
            'color already used. enter different color',
          ]}
          onChange={handleNameChange}
        />
        <Button
          variant="contained"
          type="submit"
          style={{fontFamily: "'Jost', sans-serif"}}
          disabled={paletteIsFull || editing}
          sx={{
            width: '100%',
            display: editing ? 'none' : 'block',
            background: paletteIsFull ? 'grey' : curColor,
            color: isDarkColor ? 'white' : 'black',
            '&:hover': {
              background: curColor,
            },
          }}
        >
          {paletteIsFull ? 'Palette is Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
      <Button
        variant="contained"
        onClick={handleUpdateColor}
        disabled={!editing}
        type="secondary"
        sx={{
          fontFamily: "'Jost', sans-serif",
          display: editing ? 'block' : 'none',
          background: paletteIsFull ? 'grey' : curColor,
          '&:hover': {
            background: curColor,
          },
        }}
      >
        Update Color
      </Button>
      <Button
        variant="contained"
        onClick={handleCancelUpdateColor}
        disabled={!editing}
        color="secondary"
        sx={{
          fontFamily: "'Jost', sans-serif",
          display: editing ? 'block' : 'none',
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ColorPickerForm;
