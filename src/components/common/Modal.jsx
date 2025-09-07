import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen = false,
  sx = {},
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      sx={sx}
    >
      {title && (
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      
      <DialogContent>
        <Box sx={{ pt: title ? 0 : 2 }}>
          {children}
        </Box>
      </DialogContent>
      
      {actions && (
        <DialogActions sx={{ p: 2, pt: 0 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
