import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    TablePagination,
    Button,
    Typography,
} from '@mui/material';
import { PlayArrow, Output } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AnalysisTable = ({
    analyses,
    selectedAnalysis,
    setSelectedAnalysis,
    onRun,
    page,
    setPage,
}) => {
    const rowsPerPage = 5;
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {analyses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((analysis) => (
                        <TableRow
                            key={analysis.id}
                            onClick={() => setSelectedAnalysis(analysis)}
                            sx={{ cursor: 'pointer' }}
                            selected={selectedAnalysis?.id === analysis.id}
                        >
                            <TableCell size="small">{analysis.name}</TableCell>
                            <TableCell size="small">
                                <Button
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRun(analysis.id);
                                    }}
                                    startIcon={<PlayArrow />}
                                />
                            </TableCell>
                            <TableCell size="small">
                                <Typography noWrap size="small">{analysis.status}</Typography>
                            </TableCell>
                            <TableCell size="small" sx={{ textAlign: 'right', pr: 1 }}>
                                <Button
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/dashboard/${analysis.id}`);
                                    }}
                                    disabled={analysis.status !== 'Completed'}
                                    endIcon={<Output />}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                size="small"
                rowsPerPageOptions={[10]}
                component="div"
                count={analyses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </TableContainer>
    );
};

export default AnalysisTable;