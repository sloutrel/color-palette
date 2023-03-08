import React, { useState } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const MainDiv = styled('div')({
  backgroundColor: '#dedede',
  height: '100%',
  minHeight: '100vh',
  padding: '4rem 0 5rem',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
});
const MainDivContainer = styled('div')({
  width: '66%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  flexWrap: 'wrap',
});
const MainNav = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#333',
});
const MainNavATag = styled('div')({
  color: '#333',
  textDecoration: 'none',
  border: '1px solid #fff',
  borderRadius: '5px',
  padding: '.5rem',
});
const Palette = styled('div')({
  boxSizing: 'border-box',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 30%)',
  gridGap: '1.25rem',

  '@media (max-width: 640px)' : {
    gridTemplateColumns: 'repeat(2, 50%)',
  },
  '@media (max-width: 400px)' : {
    gridTemplateColumns: 'repeat(1, 100%)',
  },
});

const PaletteList = (props) => {
  const { palettes, setPalette, handleDeletePalette, handleListDrag } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState('')
  const handleSetPalette = (id) => {
    setPalette(id);
  };
  const handleOpenDialog = (id) => {
    setOpenDeleteDialog(true)
    setDeletingId(id)
  }
  const handleCloseDialog = () => {
    setOpenDeleteDialog(false)
  }
  const handleConfirmDelete = () => {
    handleDeletePalette(deletingId)
    handleCloseDialog()
    setDeletingId('')
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <MainDiv>
      <MainDivContainer>
        <MainNav>
          <h2>Palettes</h2>
          <Link to="/palette/new">
            <MainNavATag>Create Palette</MainNavATag>
          </Link>
        </MainNav>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleListDrag}
        >
          <SortableContext
            items={palettes.map((palette) => palette.id)}
            strategy={verticalListSortingStrategy}
          >
            <Palette>
                {palettes.map((palette) => (
                    <MiniPalette
                      {...palette}
                      key={palette.id}
                      handleSetPalette={handleSetPalette}
                      handleOpenDialog={handleOpenDialog}
                    />
                ))}
            </Palette>
            </SortableContext>
        </DndContext>
      </MainDivContainer>
      <Dialog onClose={handleCloseDialog} open={openDeleteDialog} aria-labelledby='delete-dialog-title'>
        <DialogTitle id='delete-dialog-title'>Are you sure you and to delete this Palette?</DialogTitle>
        <List style={{display: 'flex', justifyContent: 'center', margin: '0 auto'}}>
          <ListItem button onClick={handleConfirmDelete}>
              <ListItemAvatar>
                  <Avatar style={{backgroundColor: 'teal'}}>
                    <CheckIcon />
                  </Avatar>
                <ListItemText>Delete</ListItemText>
              </ListItemAvatar>
            </ListItem>
            <ListItem button onClick={handleCloseDialog}>
              <ListItemAvatar>
                  <Avatar style={{backgroundColor: 'indianred'}}>
                    <ClearIcon />
                  </Avatar>
                <ListItemText>Cancel</ListItemText>
              </ListItemAvatar>
          </ListItem>
        </List>
      </Dialog>
    </MainDiv>
  );
};

export default PaletteList;