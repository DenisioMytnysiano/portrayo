import React, { useState, useEffect } from 'react';
import { AnalysisService } from '../services/analysis.service';
import { Container, Typography } from '@mui/material';
import AnalysisToolbar from '../components/analysis/AnalysisToolbar';
import AnalysisTable from '../components/analysis/AnalysisTable';
import CreateAnalysisPopup from '../components/analysis/CreateAnalysisPopup';
import EditAnalysisPopup from '../components/analysis/EditAnalysisPopup';

const AnalysisPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);

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

  const handleOpenPopup = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);

  const handleCreateAnalysis = async (analysisData) => {
    try {
      const newAnalysis = await AnalysisService.createAnalysis({
        name: analysisData.name,
        type: analysisData.type,
        sources: analysisData.sources,
        status: 'In Progress',
      });
      setAnalyses([newAnalysis, ...analyses]);
    } catch (error) {
      console.error('Error creating analysis:', error);
    }
  };

  const handleOpenEditPopup = () => setEditPopupOpen(true);
  const handleCloseEditPopup = () => setEditPopupOpen(false);

  const handleUpdateAnalysis = async (updatedData) => {
    if (selectedAnalysis) {
      try {
        const updatedAnalysis = await AnalysisService.updateAnalysis(selectedAnalysis.id, updatedData);
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

  const handleRunComplete = (updatedAnalysis) => {
    setAnalyses(
      analyses.map((analysis) =>
        analysis.id === updatedAnalysis.id ? updatedAnalysis : analysis
      )
    );
  };


  const filteredAnalyses = analyses.filter(
    (analysis) =>
      analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || analysis.status === statusFilter)
  );

  return (
    <Container disableGutters className="analysis-container" sx={{ padding: 2 }}>
      <Typography variant="h4">Analysis Runs</Typography>
      <AnalysisToolbar
        onAdd={handleOpenPopup}
        onEdit={handleOpenEditPopup}
        onDelete={handleDeleteAnalysis}
        selectedAnalysis={selectedAnalysis}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <AnalysisTable
        analyses={filteredAnalyses}
        selectedAnalysis={selectedAnalysis}
        setSelectedAnalysis={setSelectedAnalysis}
        onRunComplete={handleRunComplete}
        page={page}
        setPage={setPage}
      />
      <CreateAnalysisPopup
        open={popupOpen}
        onClose={handleClosePopup}
        onSubmit={handleCreateAnalysis}
      />
      <EditAnalysisPopup
        open={editPopupOpen}
        onClose={handleCloseEditPopup}
        onSubmit={handleUpdateAnalysis}
        analysis={selectedAnalysis}
      />
    </Container>
  );
};

export default AnalysisPage;
