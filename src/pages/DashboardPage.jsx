// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  People,
  Work,
  Event,
  School,
  TrendingUp,
  ArrowForward,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useAuth } from "../contexts/AuthContext";
import {
  mockDashboardStats,
  mockEvents,
  mockJobs,
  mockAlumni,
  mockEngagementData,
} from "../data/mockData";

import { formatNumber, getRelativeTime } from "../utils/helpers";
import Loading from "../components/common/Loading";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [notableAlumni, setNotableAlumni] = useState([]);
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats(mockDashboardStats);
      setRecentEvents(mockEvents.slice(0, 3));
      setRecentJobs(mockJobs.slice(0, 3));
      setNotableAlumni(mockAlumni.slice(0, 3));
      setEngagementData(mockEngagementData);
    }, 1000);
  }, []);

  if (!stats) return <Loading />;

  const statCards = [
    { icon: <People />, title: "Total Alumni", value: formatNumber(stats.totalAlumni), trend: "+12% this year" },
    { icon: <Work />, title: "Job Postings", value: formatNumber(stats.totalJobs), trend: "+8% this month" },
    { icon: <Event />, title: "Events Organized", value: formatNumber(stats.totalEvents), trend: "+15% this quarter" },
    { icon: <School />, title: "Institutions", value: stats.totalInstitutions || "N/A", trend: "Stable" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name || "User"}!
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} alignItems="stretch">
        {statCards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx} sx={{ display: "flex" }}>
            <Paper sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ color: "#1976d2", marginBottom: 8 }}>{card.icon}</div>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>{card.value}</Typography>
              <div style={{ display: "flex", alignItems: "center", color: "green", marginTop: 8 }}>
                <TrendingUp fontSize="small" />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>{card.trend}</Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Engagement Chart & Recent Events */}
      <Grid container spacing={3} sx={{ marginTop: 4 }} alignItems="stretch">
        <Grid item xs={12} md={8} sx={{ display: "flex" }}>
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Alumni Engagement Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <QuickActionCard title="Recent Events" items={recentEvents} />
        </Grid>
      </Grid>

      {/* Recent Jobs & Notable Alumni */}
      <Grid container spacing={3} sx={{ marginTop: 4 }} alignItems="stretch">
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <QuickActionCard title="Recent Job Postings" items={recentJobs} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Paper sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Notable Alumni
            </Typography>
            <List sx={{ flex: 1 }}>
              {notableAlumni.map((alumni) => (
                <ListItem key={alumni.id}>
                  <Avatar src={alumni.profilePicture} sx={{ marginRight: 2 }} />
                  <ListItemText
                    primary={alumni.name}
                    secondary={`${alumni.currentJob || "N/A"} at ${alumni.company || "N/A"}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

// QuickActionCard component
const QuickActionCard = ({ title, items }) => (
  <Paper sx={{ p: 3, display: "flex", flexDirection: "column", flex: 1 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <List sx={{ flex: 1 }}>
      {items.map((item) => (
        <ListItem key={item.id} button sx={{ borderRadius: 1, "&:hover": { backgroundColor: "#f5f5f5" } }}>
          <ListItemText primary={item.title} secondary={getRelativeTime(item.date)} />
          <ArrowForward fontSize="small" />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default DashboardPage;
