import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import chroma from 'chroma-js';
import { styled } from '@mui/system';

const MainDiv = styled('div')({
  width: '20%',
  height: '24%',
  display: 'inline-block',
  position: 'relative',

  '@media (max-width: 900px)' : {
    width: '25%',
  },
  '@media (max-width: 600px)' : {
    width: '50%',
  },
  '@media (max-width: 400px)' : {
    width: '100%',
    height: '14%'
  },
});

const hoverEffect = {
  '&:hover svg': {
    color: '#fff',
    transform: 'scale(1.25)',
  },
};

const BoxContent = styled('div')({
  position: 'absolute',
  bottom: '0',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  textAlign: 'left',
  padding: '0.5rem',
  color: '#000',
  letterSpacing: '1px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const hoverTransition = {
  transition: 'all 0.3s ease-in-out !important',
  cursor: 'pointer',
};

const DraggableColorBox = (props) => {
  const { handleDelete, handleEdit, name, color, id } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    backgroundColor: color,
    transition,
  };
  const isDarkColor = chroma(color).luminance() <= 0.09;

  return (
    <MainDiv
      sx={hoverEffect}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <BoxContent>
        <EditIcon onClick={handleEdit} />
        <span style={{ color: isDarkColor ? 'white' : 'black' }}>{name}</span>
        <DeleteOutlineTwoToneIcon onClick={handleDelete} sx={hoverTransition} />
      </BoxContent>
    </MainDiv>
  );
};

export default DraggableColorBox;
