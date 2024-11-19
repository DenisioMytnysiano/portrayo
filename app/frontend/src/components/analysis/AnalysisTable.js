import React from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    Paper,
    TablePagination,
} from '@mui/material';
import AnalysisRow from './AnalysisRow';

const AnalysisTable = ({
    analyses,
    selectedAnalysis,
    setSelectedAnalysis,
    onRunComplete,
    page,
    setPage,
}) => {
    const rowsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {analyses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((analysis) => (
                        <AnalysisRow
                            key={analysis.id}
                            analysis={analysis}
                            isSelected={selectedAnalysis?.id === analysis.id}
                            onSelect={() => setSelectedAnalysis(analysis)}
                            onRunComplete={onRunComplete}
                        />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                size="small"
                rowsPerPageOptions={[5]}
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