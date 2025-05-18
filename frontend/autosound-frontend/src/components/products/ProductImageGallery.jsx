import { useState } from 'react';
import { Box, ImageList, ImageListItem, Modal, IconButton } from '@mui/material';
import { Close, NavigateBefore, NavigateNext } from '@mui/icons-material';

const ProductImageGallery = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [product.image, ...(product.images || []).map(img => img.image)];

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <img
          src={images[0]}
          alt={product.name}
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxHeight: '400px', 
            objectFit: 'contain',
            cursor: 'pointer'
          }}
          onClick={() => handleOpen(0)}
        />
      </Box>

      {images.length > 1 && (
        <ImageList cols={4} gap={8} sx={{ mt: 2 }}>
          {images.slice(1).map((image, index) => (
            <ImageListItem key={index} sx={{ cursor: 'pointer' }}>
              <img
                src={image}
                alt={`${product.name} ${index + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onClick={() => handleOpen(index + 1)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          outline: 'none'
        }}>
          <IconButton 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)'
            }} 
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          
          <IconButton 
            sx={{ 
              position: 'absolute', 
              left: 8, 
              top: '50%', 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)'
            }} 
            onClick={handlePrev}
          >
            <NavigateBefore />
          </IconButton>
          
          <img
            src={images[selectedIndex]}
            alt={product.name}
            style={{ 
              width: '100%', 
              maxHeight: '70vh', 
              objectFit: 'contain' 
            }}
          />
          
          <IconButton 
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: '50%', 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)'
            }} 
            onClick={handleNext}
          >
            <NavigateNext />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
};

export default ProductImageGallery;