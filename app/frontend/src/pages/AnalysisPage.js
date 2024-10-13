import React, { useState } from 'react';
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

const AnalysisPage = () => {
  const [analyses, setAnalyses] = useState([
    { id: 1, name: 'Analysis 1', status: 'In Progress' },
    { id: 2, name: 'Analysis 2', status: 'Completed' },
    { id: 3, name: 'Analysis 3', status: 'Failed' },
    { id: 4, name: 'Analysis 4', status: 'In Progress' },
    { id: 5, name: 'Analysis 5', status: 'In Progress' }
  ]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleCreateAnalysis = async () => {
    // Mock creation of new analysis
    const newAnalysis = { id: analyses.length + 1, name: `Analysis ${analyses.length + 1}`, status: 'In Progress' };
    setAnalyses([...analyses, newAnalysis]);
  };

  const handleEditAnalysis = async () => {
    if (selectedAnalysis) {
      // Mock edit analysis action
      console.log(`Edit analysis with ID: ${selectedAnalysis.id}`);
    }
  };

  const handleDeleteAnalysis = async () => {
    if (selectedAnalysis) {
      // Mock delete analysis
      setAnalyses(analyses.filter(analysis => analysis.id !== selectedAnalysis.id));
      setSelectedAnalysis(null);
    }
  };

  const handleRunAnalysis = async (id) => {
    // Mock run analysis action
    console.log(`Run analysis with ID: ${id}`);
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
          <Button variant="contained" color="primary" onClick={handleCreateAnalysis} startIcon={<Add />} sx={{ marginRight: 1 }}>
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
          <TextField label="Filter by Status" size="small" select sx={{ minWidth: 200 }}
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
                sx={{ cursor: 'pointer'}}
                selected={selectedAnalysis?.id === analysis.id}
              >
                <TableCell size="small">
                  {analysis.name}
                </TableCell>
                <TableCell size="small">
                  <Button
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRunAnalysis(analysis.id);
                    }}
                    startIcon={<PlayArrow />}>
                  </Button>
                </TableCell>
                <TableCell size='small'>
                  <Typography noWrap size="small">{analysis.status}</Typography>
                </TableCell>
                <TableCell size='small' sx={{ textAlign: 'right', pr: 1 }}>
                  <Button size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/${analysis.id}`);
                    }}
                    disabled={analysis.status !== 'Completed'}
                    endIcon={<Output />}
                  >
                  </Button>
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
    </Container >
  );
};

export default AnalysisPage;