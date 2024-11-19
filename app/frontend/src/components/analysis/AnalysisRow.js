import React, { useState } from 'react';
import {
    TableRow,
    TableCell,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material';
import { PlayArrow, Output } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AnalysisService } from '../../services/analysis.service';

const AnalysisRow = ({ analysis, isSelected, onSelect, onRunComplete }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRun = async (e) => {
        e.stopPropagation();
        setLoading(true);
        try {
            await AnalysisService.runAnalysis(analysis.id);
            pollStatus();
        } catch (error) {
            console.error('Error starting analysis:', error);
            setLoading(false);
        }
    };

    const pollStatus = () => {
        const interval = setInterval(async () => {
            try {
                const updatedAnalysis = await AnalysisService.getAnalysisById(analysis.id);
                if (updatedAnalysis.status === 'Completed' || updatedAnalysis.status === 'Failed') {
                    clearInterval(interval);
                    setLoading(false);
                }
                onRunComplete(updatedAnalysis);
            } catch (error) {
                console.error('Error polling analysis status:', error);
                clearInterval(interval);
                setLoading(false);
            }
        }, 2000);
    };

    const handleNavigate = (e) => {
        e.stopPropagation();
        navigate(`/dashboard/${analysis.id}`);
    };

    return (
        <TableRow
            onClick={onSelect}
            sx={{ cursor: 'pointer' }}
            selected={isSelected}
        >
            <TableCell size="small">{analysis.name}</TableCell>
            <TableCell size="small">
                {loading ? (
                    <Button
                    size="small"
                    onClick={handleRun}
                    startIcon={<CircularProgress size={14} />}
                />
                ) : (
                    <Button
                        size="small"
                        onClick={handleRun}
                        startIcon={<PlayArrow />}
                    />
                )}
            </TableCell>
            <TableCell size="small">
                <Typography noWrap size="small">{analysis.status}</Typography>
            </TableCell>
            <TableCell size="small" sx={{ textAlign: 'right', pr: 1 }}>
                <Button
                    size="small"
                    onClick={handleNavigate}
                    disabled={analysis.status !== 'Completed'}
                    endIcon={<Output />}
                />
            </TableCell>
        </TableRow>
    );
};

export default AnalysisRow;
