import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import EmojiPicker from 'emoji-picker-react';

const PaletteMetaForm = (props) => {
  const {
    handleSavePalette,
    handleDialogClose,
    palettes,
  } = props;
  const [openForm, setFormOpen] = useState(true);
  const [openEmoji, setEmojiOpen] = useState(false);
  const [tempInput, setTempInput] = useState('');

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    handleDialogClose()
    setFormOpen(false);
    setEmojiOpen(false);
  };

  const handleAdvanceStage = (e) => {
    setFormOpen(false);
    setEmojiOpen(true);
  }

  const handleEmojiChoice = (e) => {
    handleSavePalette(tempInput, e.emoji);
  }

  const handleInput = (e) => {
    e.preventDefault();
    setTempInput(e.target.value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('paletteNameUnique', (value) => {
      return palettes.every(({ paletteName }) => {
        if (paletteName.toLowerCase() !== value.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
    });
  }, [tempInput]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={openEmoji}  onClose={handleClose}>
      <DialogTitle>Choose Palette Emoji</DialogTitle>
        <EmojiPicker
          previewConfig={{defaultCaption: 'Select Palette Emoji'}}
          onEmojiClick={handleEmojiChoice}
        />
      </Dialog>
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Choose Palette Name</DialogTitle>
        <ValidatorForm
          onSubmit={(e) => {
            handleAdvanceStage(e, tempInput);
          }}
          onError={(errors) => console.log(errors)}
          style={{ padding: '10px' }}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. Make sure it's unique!
            </DialogContentText>
            <TextValidator
              autoFocus
              fullWidth
              margin="normal"
              label="Create Palette Name"
              name="paletteName"
              value={tempInput}

              onChange={handleInput}
              validators={['required', 'paletteNameUnique']}
              errorMessages={[
                'this field is required - enter palette name',
                'palette name already used. enter different name',
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button variant="contained" color="secondary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
