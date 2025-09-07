import React from 'react';
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material';

// Main Loading Component
const Loading = ({ 
  size = 40, 
  message = 'Loading...', 
  fullScreen = false,
  sx = {} 
}) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
        ...sx,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

// Card Loading Skeleton
const CardSkeleton = ({ count = 1 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 1 }} />
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rectangular" width={60} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </Box>
      </Box>
    ))}
  </Box>
);

// List Loading Skeleton
const ListSkeleton = ({ count = 5 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="70%" />
        </Box>
      </Box>
    ))}
  </Box>
);

// Table Loading Skeleton
const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Box sx={{ width: '100%' }}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box key={rowIndex} sx={{ display: 'flex', gap: 2, mb: 1, p: 1 }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton 
            key={colIndex} 
            variant="text" 
            sx={{ flex: 1, minWidth: 100 }} 
          />
        ))}
      </Box>
    ))}
  </Box>
);

Loading.Card = CardSkeleton;
Loading.List = ListSkeleton;
Loading.Table = TableSkeleton;

export default Loading;
