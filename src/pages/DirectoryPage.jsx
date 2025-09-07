// File: src/pages/DirectoryPage.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { mockAlumni, departments, graduationYears } from "../data/mockData";
import { filterBySearch, sortByProperty } from "../utils/helpers";
import Loading from "../components/common/Loading";
import Modal from "../components/common/Modal";

const DirectoryPage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ department: "", graduationYear: "" });
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setAlumniData(mockAlumni);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAlumni = alumniData
    .filter((a) =>
      filterBySearch(a.name + a.department + a.graduationYear, search)
    )
    .filter(
      (a) =>
        (!filters.department || a.department === filters.department) &&
        (!filters.graduationYear ||
          a.graduationYear === parseInt(filters.graduationYear))
    );

  const paginatedAlumni = filteredAlumni.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <Loading />;

  return (
    <Container className="py-8">
      <Typography variant="h4" className="font-bold mb-6">
        Alumni Directory
      </Typography>

      {/* Search & Filters */}
      <Grid container spacing={2} className="mb-6">
        <Grid item xs={12} md={4}>
          <TextField
            label="Search Alumni"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Graduation Year</InputLabel>
            <Select
              value={filters.graduationYear}
              onChange={(e) =>
                setFilters({ ...filters, graduationYear: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              {graduationYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Alumni Cards */}
      {filteredAlumni.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No alumni found matching your criteria.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {paginatedAlumni.map((alumni) => (
            <Grid item xs={12} sm={6} md={4} key={alumni.id}>
              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedAlumni(alumni)}
              >
                <CardContent className="flex flex-col items-center">
                  <Avatar
                    src={alumni.profilePicture}
                    alt={alumni.name}
                    sx={{ width: 80, height: 80 }}
                    className="mb-3"
                  />
                  <Typography variant="h6">{alumni.name}</Typography>
                  <Typography color="textSecondary">
                    {alumni.department} • Class of {alumni.graduationYear}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {filteredAlumni.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={page * itemsPerPage >= filteredAlumni.length}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Alumni Details Modal */}
      {selectedAlumni && (
        <Modal open={true} onClose={() => setSelectedAlumni(null)}>
          <div className="flex flex-col items-center text-center p-6">
            <Avatar
              src={selectedAlumni.profilePicture}
              alt={selectedAlumni.name}
              sx={{ width: 100, height: 100 }}
              className="mb-3"
            />
            <Typography variant="h5" className="mb-2">
              {selectedAlumni.name}
            </Typography>
            <Typography color="textSecondary" className="mb-4">
              {selectedAlumni.department} • Class of{" "}
              {selectedAlumni.graduationYear}
            </Typography>
            <Typography variant="body1" className="mb-4">
              {selectedAlumni.bio}
            </Typography>
            {selectedAlumni.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                color="primary"
                className="m-1"
              />
            ))}
            <div className="mt-4 space-x-2">
              {selectedAlumni.linkedinUrl && (
                <Button
                  variant="outlined"
                  href={selectedAlumni.linkedinUrl}
                  target="_blank"
                >
                  LinkedIn
                </Button>
              )}
              {selectedAlumni.email && (
                <Button variant="outlined" href={`mailto:${selectedAlumni.email}`}>
                  Email
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default DirectoryPage;
