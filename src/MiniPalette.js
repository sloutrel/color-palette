import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

const MainDiv = styled('div')({
  backgroundColor: '#fff',
  border: '1px solid #000',
  borderRadius: '5px',
  padding: '.5rem',
  position: 'relative',
  overflow: 'hidden',
  height: 'fit-content',
  cursor: 'pointer',
});
const hoverCursorEffect = {
  '&:hover svg': {
    opacity: 1
  },
};
const ColorsDiv = styled('div')({
  backgroundColor: '#dae1e4',
  height: '15vh',
  width: '100%',
  borderRadius: '5px',
  overflow: 'hidden',
  lineHeight: '0',
});
const TitleH = styled('h5')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0',
  color: '#000',
  paddingTop: '.5rem',
  fontSize: '.75rem',
  position: 'relative',
});
const EmojiSpan = styled('span')({
  marginLeft: '.5rem',
  fontSize: '1.5rem',
});
const MiniColorDiv = styled('div')({
  height: '25%',
  width: '20%',
  display: 'inline-block',
  margin: '0 auto',
  position: 'relative',
});

const MiniPalette =(props) => {
  const { paletteName, emoji, colors, id, handleSetPalette, handleOpenDialog } = props;
  const navigate = useNavigate();
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
    backgroundColor: colors,
    transition,
  };

  const miniColorBoxes = colors.map((color) => (
    <MiniColorDiv
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  const handleDelete = (e) => {
    e.stopPropagation();
    handleOpenDialog(id)
  }
  const handleNavigate = (e) => {
    handleSetPalette(id);
    navigate(`/palette/${id}`);
  };
  return (
    <MainDiv 
      onClick={handleNavigate} 
      sx={hoverCursorEffect}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <DeleteOutlineTwoToneIcon 
        onClick={handleDelete}
        sx={{color: 'white', backgroundColor: '#ba0000', 'padding': '0.3rem', position: 'absolute', top: 0, right: 0, zIndex: 10, opacity: 0, borderRadius: '5px', transition: 'opacity 0.3s ease-in-out', boxShadow: '1px 2px 3px 4px rgb(0 0 0 / 50%)'}}
      />
      <ColorsDiv>{miniColorBoxes}</ColorsDiv>
      <TitleH>
        {paletteName} <EmojiSpan>{emoji}</EmojiSpan>
      </TitleH>
    </MainDiv>
  );
};

export default memo(MiniPalette);