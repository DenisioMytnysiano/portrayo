import React from 'react';
import { Toolbar, Button, TextField, MenuItem } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const AnalysisToolbar = ({
    onAdd,
    onEdit,
    onDelete,
    selectedAnalysis,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
}) => (
    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'flex-start', flexGrow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={onAdd}
                startIcon={<Add />}
                sx={{ marginRight: 1 }}
            >
                Add
            </Button>
            <Button
                variant="contained"
                onClick={onEdit}
                startIcon={<Edit />}
                disabled={!selectedAnalysis}
                sx={{ marginRight: 1 }}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                onClick={onDelete}
                startIcon={<Delete />}
                disabled={!selectedAnalysis}
            >
                Remove
            </Button>
        </Toolbar>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <TextField
                label="Search by Title"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginRight: 2 }}
            />
            <TextField
                label="Filter by Status"
                size="small"
                select
                sx={{ minWidth: 200 }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Created">Created</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
            </TextField>
        </Toolbar>
    </Toolbar>
);

export default AnalysisToolbar;