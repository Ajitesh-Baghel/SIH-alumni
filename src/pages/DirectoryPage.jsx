import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Avatar,
  Chip,
  Button,
  IconButton,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Tooltip,
  Pagination,
} from '@mui/material';
import {
  SearchOutlined,
  FilterListOutlined,
  PeopleOutlined,
  LocationOnOutlined,
  WorkOutlined,
  SchoolOutlined,
  EmailOutlined,
  LinkedInOutlined,
  ExpandMoreOutlined,
  ViewListOutlined,
  ViewModuleOutlined,
  VerifiedOutlined,
} from '@mui/icons-material';
import { mockAlumni, departments, graduationYears } from '@data/mockData';
import { filterBySearch, sortByProperty } from '@utils/helpers';
import Loading from '@components/common/Loading';
import Modal from '@components/common/Modal';

const DirectoryPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    graduationYear: '',
    location: '',
    verified: 'all',
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const itemsPerPage = 12;

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAlumni(mockAlumni);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...alumni];

    // Apply search
    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm, [
        'name', 'email', 'department', 'currentJob', 'company', 'location', 'skills'
      ]);
    }

    // Apply filters
    if (filters.department) {
      filtered = filtered.filter(a => a.department === filters.department);
    }
    if (filters.graduationYear) {
      filtered = filtered.filter(a => a.graduationYear === parseInt(filters.graduationYear));
    }
    if (filters.location) {
      filtered = filtered.filter(a => 
        a.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.verified !== 'all') {
      filtered = filtered.filter(a => 
        filters.verified === 'verified' ? a.isVerified : !a.isVerified
      );
    }

    // Apply sorting
    filtered = sortByProperty(filtered, sortBy, sortOrder);

    setFilteredAlumni(filtered);
    setPage(1); // Reset to first page when filters change
  }, [alumni, searchTerm, filters, sortBy, sortOrder]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      graduationYear: '',
      location: '',
      verified: 'all',
    });
    setSearchTerm('');
  };

  const handleViewProfile = (alumniData) => {
    setSelectedAlumni(alumniData);
    setShowProfileModal(true);
  };

  // Get unique locations for filter dropdown
  const locations = [...new Set(alumni.map(a => a.location))].sort();

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAlumni = filteredAlumni.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);

  const AlumniCard = ({ alumniData }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: 'pointer', 
        transition: 'all 0.2s',
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: 4 
        } 
      }}
      onClick={() => handleViewProfile(alumniData)}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar 
            sx={{ width: 60, height: 60, fontSize: '1.5rem', bgcolor: 'primary.main' }}
            src={alumniData.profilePicture}
          >
            {alumniData.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {alumniData.name}
              </Typography>
              {alumniData.isVerified && (
                <Tooltip title="Verified Alumni">
                  <VerifiedOutlined color="primary" fontSize="small" />
                </Tooltip>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {alumniData.currentJob} at {alumniData.company}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SchoolOutlined fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {alumniData.department} • Class of {alumniData.graduationYear}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnOutlined fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {alumniData.location}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Skills */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {alumniData.skills.slice(0, 3).map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                size="small" 
                variant="outlined"
                color="primary"
              />
            ))}
            {alumniData.skills.length > 3 && (
              <Chip 
                label={`+${alumniData.skills.length - 3} more`} 
                size="small" 
                variant="outlined"
              />
            )}
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Joined {new Date(alumniData.joinedDate).toLocaleDateString()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" href={`mailto:${alumniData.email}`}>
              <EmailOutlined fontSize="small" />
            </IconButton>
            {alumniData.linkedinUrl && (
              <IconButton size="small" href={alumniData.linkedinUrl} target="_blank">
                <LinkedInOutlined fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const AlumniListItem = ({ alumniData }) => (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer', 
        '&:hover': { boxShadow: 2 } 
      }}
      onClick={() => handleViewProfile(alumniData)}
    >
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={alumniData.profilePicture}
            sx={{ width: 50, height: 50 }}
          >
            {alumniData.name.charAt(0)}
          </Avatar>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h6">{alumniData.name}</Typography>
              {alumniData.isVerified && (
                <VerifiedOutlined color="primary" fontSize="small" />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {alumniData.currentJob} at {alumniData.company}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 0.5 }}>
            <Typography variant="body2">
              {alumniData.department}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Class of {alumniData.graduationYear}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 0.5 }}>
            <Typography variant="body2">
              {alumniData.location}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small" href={`mailto:${alumniData.email}`}>
                <EmailOutlined fontSize="small" />
              </IconButton>
              {alumniData.linkedinUrl && (
                <IconButton size="small" href={alumniData.linkedinUrl} target="_blank">
                  <LinkedInOutlined fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const ProfileModal = () => (
    <Modal
      open={showProfileModal}
      onClose={() => setShowProfileModal(false)}
      title="Alumni Profile"
      maxWidth="md"
    >
      {selectedAlumni && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
            <Avatar 
              src={selectedAlumni.profilePicture}
              sx={{ width: 120, height: 120, fontSize: '3rem' }}
            >
              {selectedAlumni.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h4">{selectedAlumni.name}</Typography>
                {selectedAlumni.isVerified && (
                  <VerifiedOutlined color="primary" />
                )}
              </Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {selectedAlumni.currentJob} at {selectedAlumni.company}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolOutlined color="action" />
                    <Typography>
                      {selectedAlumni.department} • {selectedAlumni.batch}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnOutlined color="action" />
                    <Typography>{selectedAlumni.location}</Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button 
                  startIcon={<EmailOutlined />} 
                  variant="contained" 
                  size="small"
                  href={`mailto:${selectedAlumni.email}`}
                >
                  Email
                </Button>
                {selectedAlumni.linkedinUrl && (
                  <Button 
                    startIcon={<LinkedInOutlined />} 
                    variant="outlined" 
                    size="small"
                    href={selectedAlumni.linkedinUrl}
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          
          {selectedAlumni.bio && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>About</Typography>
              <Typography variant="body1">{selectedAlumni.bio}</Typography>
            </Box>
          )}
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedAlumni.skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" color="primary" />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );

  if (loading) {
    return <Loading message="Loading alumni directory..." />;
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <PeopleOutlined /> Alumni Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with {filteredAlumni.length} fellow alumni
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListOutlined /> Search & Filters
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Search */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              {/* Department Filter */}
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={filters.department}
                    label="Department"
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                  >
                    <MenuItem value="">All Departments</MenuItem>
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Graduation Year Filter */}
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Graduation Year</InputLabel>
                  <Select
                    value={filters.graduationYear}
                    label="Graduation Year"
                    onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
                  >
                    <MenuItem value="">All Years</MenuItem>
                    {graduationYears.map(year => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Location Filter */}
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={filters.location}
                    label="Location"
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    {locations.map(location => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Verified Filter */}
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.verified}
                    label="Status"
                    onChange={(e) => handleFilterChange('verified', e.target.value)}
                  >
                    <MenuItem value="all">All Alumni</MenuItem>
                    <MenuItem value="verified">Verified Only</MenuItem>
                    <MenuItem value="unverified">Unverified Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Button onClick={clearFilters} variant="outlined" size="small">
                Clear Filters
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Sort */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                  >
                    <MenuItem value="name-asc">Name A-Z</MenuItem>
                    <MenuItem value="name-desc">Name Z-A</MenuItem>
                    <MenuItem value="graduationYear-desc">Newest First</MenuItem>
                    <MenuItem value="graduationYear-asc">Oldest First</MenuItem>
                    <MenuItem value="joinedDate-desc">Recently Joined</MenuItem>
                  </Select>
                </FormControl>
                
                {/* View Mode */}
                <Box>
                  <IconButton 
                    onClick={() => setViewMode('grid')}
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                  >
                    <ViewModuleOutlined />
                  </IconButton>
                  <IconButton 
                    onClick={() => setViewMode('list')}
                    color={viewMode === 'list' ? 'primary' : 'default'}
                  >
                    <ViewListOutlined />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Results */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {filteredAlumni.length} Alumni Found
        </Typography>
        
        {viewMode === 'grid' ? (
          <Grid container spacing={3}>
            {paginatedAlumni.map(alumniData => (
              <Grid item xs={12} sm={6} lg={4} key={alumniData.id}>
                <AlumniCard alumniData={alumniData} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            {paginatedAlumni.map(alumniData => (
              <AlumniListItem key={alumniData.id} alumniData={alumniData} />
            ))}
          </Box>
        )}
        
        {filteredAlumni.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PeopleOutlined sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No alumni found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try adjusting your search terms or filters
            </Typography>
            <Button onClick={clearFilters} variant="outlined">
              Clear All Filters
            </Button>
          </Box>
        )}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Profile Modal */}
      <ProfileModal />
    </Container>
  );
};

export default DirectoryPage;
