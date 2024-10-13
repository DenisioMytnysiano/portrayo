import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Avatar, Chip, Stack, TablePagination } from '@mui/material';

const DashboardPage = () => {
  const { analysisId } = useParams();
  const [personName, setPersonName] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [personLocation, setPersonLocation] = useState('');
  const [traitsData, setTraitsData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const theme = useTheme();

  const traitColors = {
    Openness: '#a3d9c5',
    Conscientiousness: '#ffdd94',
    Extraversion: '#ff9aa2',
    Agreeableness: '#c7ceea',
    Neuroticism: '#b2f2bb',
  };

  useEffect(() => {
    const fetchAnalysisData = async () => {
      setTraitsData([
        { trait: 'Openness', value: 70 },
        { trait: 'Conscientiousness', value: 50 },
        { trait: 'Extraversion', value: 60 },
        { trait: 'Agreeableness', value: 80 },
        { trait: 'Neuroticism', value: 40 },
      ]);
      setPersonName('John Doe');
      setPersonAge(29);
      setPersonLocation('New York, USA');
      const postsData = [
        { id: 1, content: 'This is the first post content.', date: '2024-10-01', author: 'Author A', traits: ['Openness', 'Extraversion'] },
        { id: 2, content: 'Another interesting post.', date: '2024-10-02', author: 'Author B', traits: ['Conscientiousness', 'Agreeableness'] },
        { id: 3, content: 'Insights on the topic.', date: '2024-10-03', author: 'Author C', traits: ['Neuroticism', 'Openness'] },
        { id: 4, content: 'Deep thoughts on various topics.', date: '2024-10-04', author: 'Author D', traits: ['Openness'] },
        { id: 5, content: 'A motivational quote.', date: '2024-10-05', author: 'Author E', traits: ['Extraversion', 'Agreeableness'] },
        { id: 6, content: 'Reflections on the day.', date: '2024-10-06', author: 'Author F', traits: ['Conscientiousness'] },
        { id: 7, content: 'Exciting news about a recent event.', date: '2024-10-07', author: 'Author G', traits: ['Extraversion'] },
        { id: 8, content: 'Thoughts on staying organized.', date: '2024-10-08', author: 'Author H', traits: ['Conscientiousness', 'Neuroticism'] },
        { id: 9, content: 'A calming message to relax.', date: '2024-10-09', author: 'Author I', traits: ['Agreeableness'] },
        { id: 10, content: 'A controversial opinion.', date: '2024-10-10', author: 'Author J', traits: ['Neuroticism'] },
        { id: 11, content: 'Updates on my latest project.', date: '2024-10-11', author: 'Author K', traits: ['Conscientiousness', 'Openness'] },
        { id: 12, content: 'Enjoying the little things in life.', date: '2024-10-12', author: 'Author L', traits: ['Agreeableness', 'Extraversion'] },
      ];
      setPosts(postsData);
      setFilteredPosts(postsData);
    };
    fetchAnalysisData();
  }, [analysisId]);

  const handleBarClick = (data) => {
    if (data.points && data.points.length > 0) {
      const trait = data.points[0].x;
      if (selectedTrait === trait) {
        setSelectedTrait(null);
        setFilteredPosts(posts);
      } else {
        setSelectedTrait(trait);
        const filtered = posts.filter(post => post.traits.includes(trait));
        setFilteredPosts(filtered);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container className="dashboard-container" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom>Personal Information</Typography>
        <Box display="flex" alignItems="center" gap={2} sx={{ paddingBottom: 2 }}>
          <Avatar alt={personName} src="/path/to/profile-image.jpg" sx={{ width: 100, height: 100 }} />
          <Box>
            <Typography variant="body1">Name: {personName}</Typography>
            <Typography variant="body1">Age: {personAge}</Typography>
            <Typography variant="body1">Location: {personLocation}</Typography>
            <Typography variant="body1">Analysis ID: {analysisId}</Typography>
          </Box>
        </Box>
        <Typography variant="h5" gutterBottom>Personality Traits</Typography>
        <Plot
          data={[{
            type: 'bar',
            x: traitsData.map(trait => trait.trait),
            y: traitsData.map(trait => trait.value),
            marker: {
              color: traitsData.map(trait => traitColors[trait.trait]),
            },
          }]}
          config={{
            displayModeBar: false,
            responsive: true
          }}
          layout={{
            height: 400,
            plot_bgcolor: theme.palette.background.default,
            paper_bgcolor: theme.palette.background.default,
            font: {
              color: theme.typography.body2.color
            },
            margin: { t: 0, l: 40, b: 40, r: 40 },
            xaxis: { title: 'Traits' },
            yaxis: { title: 'Values', gridcolor: theme.typography.body2.color }
          }}
          onClick={handleBarClick}
        />
        <Box>
          <Typography variant="h5" gutterBottom>Posts Analysis</Typography>
          <TableContainer component={Paper} className="posts-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Post Content</TableCell>
                  <TableCell>Extracted Traits</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.content}</TableCell>
                    <TableCell>
                      {post.traits.map((trait) => (
                        <Chip key={trait + post.id} label={trait} sx={{ backgroundColor: traitColors[trait], marginRight: 1 }} />
                      ))}
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={filteredPosts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
};

export default DashboardPage;