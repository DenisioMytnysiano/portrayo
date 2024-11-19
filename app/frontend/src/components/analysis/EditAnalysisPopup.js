import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';

const EditAnalysisPopup = ({ open, onClose, onSubmit, analysis }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Big Five');
    const [sources, setSources] = useState([{ url: '', limit: '' }]);

    useEffect(() => {
        if (analysis) {
            setName(analysis.name || '');
            setType(analysis.type || 'Big Five');
            setSources(analysis.sources || [{ url: '', limit: '' }]);
        }
    }, [analysis]);

    const handleAddUrl = () => {
        setSources([...sources, { url: '', limit: '' }]);
    };

    const handleUrlChange = (index, field, value) => {
        const newSources = [...sources];
        newSources[index][field] = value;
        setSources(newSources);
    };

    const handleRemoveUrl = (index) => {
        const newSources = sources.filter((_, i) => i !== index);
        setSources(newSources);
    };

    const handleSubmit = () => {
        onSubmit({ name, type, sources });
        onClose()
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Analysis</DialogTitle>
            <DialogContent>
                <TextField
                    label="Analysis Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Analysis Type"
                    select
                    fullWidth
                    margin="normal"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="Big Five">Big Five</MenuItem>
                    <MenuItem value="MBTI">MBTI</MenuItem>
                </TextField>
                <Typography variant="h6" gutterBottom>
                    Sources
                </Typography>
                {sources.map((url, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <TextField
                            label="URL"
                            fullWidth
                            value={url.url}
                            onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                        />
                        <TextField
                            label="Number of Posts"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            value={url.limit}
                            onChange={(e) => handleUrlChange(index, 'limit', e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemoveUrl(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    variant="contained"
                    startIcon={<AddCircle />}
                    onClick={handleAddUrl}
                >
                    Add URL
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAnalysisPopup;