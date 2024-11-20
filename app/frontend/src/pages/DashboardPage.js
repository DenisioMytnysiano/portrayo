import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Avatar, Chip, Stack, TablePagination } from '@mui/material';
import { ResultsService } from '../services/results.service';
import PostDate from '../components/dashboard/PostDate';

const DashboardPage = () => {
  const { analysisId } = useParams();
  const [profileInfo, setProfileInfo] = useState({});
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
      try {
        const profileInfo = await ResultsService.getProfileInfo(analysisId);
        setProfileInfo(profileInfo);

        const traits = await ResultsService.getTraitScores(analysisId);
        setTraitsData(traits.scores);

        const postsData = await ResultsService.getPosts(analysisId);
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
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
        setPage(0)
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
          <Avatar alt={profileInfo.name + profileInfo.surname} src="/path/to/profile-image.jpg" sx={{ width: 100, height: 100 }} />
          <Box>
            <Typography variant="body1">Name: {profileInfo.name}</Typography>
            <Typography variant="body1">Surname: {profileInfo.surname}</Typography>
            <Typography variant="body1">Age: {profileInfo.age || "unknown"}</Typography>
            <Typography variant="body1">Location: {profileInfo.location || "unknown"}</Typography>
            <Typography variant="body1">Occupation: {profileInfo.occupation || "unknown"}</Typography>
            <Typography variant="body1">Analysis ID: {analysisId}</Typography>
          </Box>
        </Box>
        <Typography variant="h5" gutterBottom>Personality Traits</Typography>
        <Plot
          data={[{
            type: 'bar',
            x: traitsData.map(trait => trait.trait),
            y: traitsData.map(trait => trait.score),
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
                  <TableCell>Media</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.text}</TableCell>
                    <TableCell>
                      {post.traits.map((trait) => (
                        <Chip key={trait + post.id} label={trait} sx={{ backgroundColor: traitColors[trait], marginRight: 1 }} />
                      ))}
                    </TableCell>
                    <TableCell>{post.media}</TableCell>
                    <TableCell><PostDate date={post.created_at} /></TableCell>
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