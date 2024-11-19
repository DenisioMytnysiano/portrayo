import React, { useState } from 'react';
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

const CreateAnalysisPopup = ({ open, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Big Five');
    const [sources, setSources] = useState([{ url: '', limit: '' }]);

    const handleAddUrl = () => {
        setSources([...sources, { url: '', limit: '' }]);
    };

    const handleUrlChange = (index, field, value) => {
        const newUrls = [...sources];
        newUrls[index][field] = value;
        setSources(newUrls);
    };

    const handleRemoveUrl = (index) => {
        const newUrls = sources.filter((_, i) => i !== index);
        setSources(newUrls);
    };

    const handleSubmit = () => {
        onSubmit({ name, type, sources });
        close();
    };

    const close = () => {
        setName('');
        setType('Big Five');
        setSources([{ url: '', limit: '' }]);
        onClose()
    }

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Analysis</DialogTitle>
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
                    sources
                </Typography>
                {sources.map((url, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <TextField
                            label="URL"
                            fullWidth
                            value={url.key}
                            onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                        />
                        <TextField
                            label="Number of Posts"
                            fullWidth
                            type="number"
                            inputProps={{ min: 0 }}
                            value={url.value}
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
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAnalysisPopup;