import React, { useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  IconButton,
  TableSortLabel,
  Checkbox,
  Chip,
  Tooltip,
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import Loading from './Loading';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  pagination = true,
  selectable = false,
  sortable = true,
  actions = [],
  emptyMessage = 'No data available',
  onRowClick,
  onSort,
  onPageChange,
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 10,
  totalCount,
  selectedRows = [],
  onRowSelect,
  sx = {},
}) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (columnId) => {
    if (!sortable) return;
    
    const isAsc = sortBy === columnId && sortDirection === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    
    setSortBy(columnId);
    setSortDirection(newDirection);
    
    if (onSort) {
      onSort(columnId, newDirection);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedRows = data.map((row, index) => index);
      onRowSelect(newSelectedRows);
    } else {
      onRowSelect([]);
    }
  };

  const handleSelectRow = (rowIndex) => {
    const selectedIndex = selectedRows.indexOf(rowIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowIndex);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    onRowSelect(newSelected);
  };

  const renderCellContent = (value, column) => {
    if (column.render) {
      return column.render(value);
    }

    if (column.type === 'chip') {
      return (
        <Chip
          label={value}
          size="small"
          color={column.chipColor || 'default'}
          variant={column.chipVariant || 'filled'}
        />
      );
    }

    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }

    if (column.type === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return value;
  };

  const renderActions = (row, rowIndex) => {
    if (!actions.length) return null;

    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {actions.map((action, actionIndex) => (
          <Tooltip key={actionIndex} title={action.tooltip || action.label}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row, rowIndex);
              }}
              color={action.color || 'default'}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    );
  };

  if (loading) {
    return <Loading.Table rows={rowsPerPage} columns={columns.length} />;
  }

  return (
    <Box sx={sx}>
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              
              {actions.length > 0 && (
                <TableCell align="right">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + 
                    (selectable ? 1 : 0) + 
                    (actions.length > 0 ? 1 : 0)
                  }
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => {
                const isSelected = selectedRows.indexOf(rowIndex) !== -1;
                
                return (
                  <TableRow
                    hover
                    key={rowIndex}
                    selected={isSelected}
                    onClick={() => onRowClick && onRowClick(row, rowIndex)}
                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowIndex)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                      >
                        {renderCellContent(row[column.id], column)}
                      </TableCell>
                    ))}
                    
                    {actions.length > 0 && (
                      <TableCell align="right">
                        {renderActions(row, rowIndex)}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount || data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => onPageChange && onPageChange(newPage)}
          onRowsPerPageChange={(event) => 
            onRowsPerPageChange && onRowsPerPageChange(parseInt(event.target.value, 10))
          }
        />
      )}
    </Box>
  );
};

export default Table;
