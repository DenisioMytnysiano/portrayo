import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Toolbar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  TablePagination
} from '@mui/material';
import { Add, Edit, Delete, Output, PlayArrow } from '@mui/icons-material';
import {AnalysisService} from '../services/analysis.service';

const AnalysisPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const data = await AnalysisService.getAllAnalyses();
        setAnalyses(data);
      } catch (error) {
        console.error('Error fetching analyses:', error);
      }
    };

    fetchAnalyses();
  }, []);

  const handleCreateAnalysis = async () => {
    try {
      const newAnalysis = await AnalysisService.createAnalysis({
        name: `New Analysis`,
        status: 'In Progress',
      });
      setAnalyses([...analyses, newAnalysis]);
    } catch (error) {
      console.error('Error creating analysis:', error);
    }
  };

  const handleEditAnalysis = async () => {
    if (selectedAnalysis) {
      try {
        const updatedAnalysis = await AnalysisService.updateAnalysis(selectedAnalysis.id, {
          name: `${selectedAnalysis.name} (Edited)`,
        });
        setAnalyses(
          analyses.map((analysis) =>
            analysis.id === selectedAnalysis.id ? updatedAnalysis : analysis
          )
        );
        setSelectedAnalysis(null);
      } catch (error) {
        console.error('Error updating analysis:', error);
      }
    }
  };

  const handleDeleteAnalysis = async () => {
    if (selectedAnalysis) {
      try {
        await AnalysisService.deleteAnalysis(selectedAnalysis.id);
        setAnalyses(analyses.filter((analysis) => analysis.id !== selectedAnalysis.id));
        setSelectedAnalysis(null);
      } catch (error) {
        console.error('Error deleting analysis:', error);
      }
    }
  };

  const handleRunAnalysis = async (id) => {
    try {
      const updatedAnalysis = await AnalysisService.runAnalysis(id);
      setAnalyses(
        analyses.map((analysis) =>
          analysis.id === id ? updatedAnalysis : analysis
        )
      );
    } catch (error) {
      console.error('Error running analysis:', error);
    }
  };

  const handleRowClick = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredAnalyses = analyses.filter(
    (analysis) =>
      analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || analysis.status === statusFilter)
  );

  return (
    <Container disableGutters className="analysis-container" sx={{ padding: 2 }}>
      <Typography variant="h4">Analysis Runs</Typography>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'flex-start', flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAnalysis}
            startIcon={<Add />}
            sx={{ marginRight: 1 }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={handleEditAnalysis}
            startIcon={<Edit />}
            disabled={!selectedAnalysis}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteAnalysis}
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
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </TextField>
        </Toolbar>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {filteredAnalyses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((analysis) => (
              <TableRow
                key={analysis.id}
                onClick={() => handleRowClick(analysis)}
                sx={{ cursor: 'pointer' }}
                selected={selectedAnalysis?.id === analysis.id}
              >
                <TableCell size="small">{analysis.name}</TableCell>
                <TableCell size="small">
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRunAnalysis(analysis.id);
                    }}
                    startIcon={<PlayArrow />}
                  ></Button>
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
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          size="small"
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredAnalyses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </Container>
  );
};

export default AnalysisPage;
