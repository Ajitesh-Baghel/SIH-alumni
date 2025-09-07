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

// ✅ relative imports instead of aliases
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
    // simulate API fetch
    setTimeout(() => {
      setStats(mockDashboardStats);
      setRecentEvents(mockEvents.slice(0, 3));
      setRecentJobs(mockJobs.slice(0, 3));
      setNotableAlumni(mockAlumni.slice(0, 3));
      setEngagementData(mockEngagementData);
    }, 1000);
  }, []);

  if (!stats) return <Loading />;

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name || "User"}!
      </Typography>

      {/* Stats cards */}
      <Grid container spacing={3}>
        <StatCard
          icon={<People />}
          title="Total Alumni"
          value={formatNumber(stats.totalAlumni)}
          trend="+12% this year"
        />
        <StatCard
          icon={<Work />}
          title="Job Postings"
          value={formatNumber(stats.totalJobs)}
          trend="+8% this month"
        />
        <StatCard
          icon={<Event />}
          title="Events Organized"
          value={formatNumber(stats.totalEvents)}
          trend="+15% this quarter"
        />
        <StatCard
          icon={<School />}
          title="Institutions"
          value={stats.totalInstitutions}
          trend="Stable"
        />
      </Grid>

      <Grid container spacing={3} className="mt-4">
        {/* Engagement chart */}
        <Grid item xs={12} md={8}>
          <Paper className="p-4 h-[400px]">
            <Typography variant="h6" gutterBottom>
              Alumni Engagement Over Time
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent events */}
        <Grid item xs={12} md={4}>
          <QuickActionCard title="Recent Events" items={recentEvents} />
        </Grid>
      </Grid>

      <Grid container spacing={3} className="mt-4">
        {/* Recent jobs */}
        <Grid item xs={12} md={6}>
          <QuickActionCard title="Recent Job Postings" items={recentJobs} />
        </Grid>

        {/* Notable alumni */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Notable Alumni
            </Typography>
            <List>
              {notableAlumni.map((alumni) => (
                <ListItem key={alumni.id}>
                  <Avatar src={alumni.avatar} className="mr-3" />
                  <ListItemText
                    primary={alumni.name}
                    secondary={`${alumni.currentJob || "N/A"} at ${
                      alumni.company || "N/A"
                    }`}
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

const StatCard = ({ icon, title, value, trend }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Paper className="p-4 flex flex-col items-center text-center h-full">
      <div className="text-blue-600 mb-2">{icon}</div>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" className="font-bold">
        {value}
      </Typography>
      <div className="flex items-center text-green-600 mt-2">
        <TrendingUp fontSize="small" />
        <Typography variant="body2" className="ml-1">
          {trend}
        </Typography>
      </div>
    </Paper>
  </Grid>
);

const QuickActionCard = ({ title, items }) => (
  <Paper className="p-4 h-full">
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          button
          className="hover:bg-gray-50 rounded-lg"
        >
          <ListItemText
            primary={item.title}
            secondary={getRelativeTime(item.date)}
          />
          <ArrowForward fontSize="small" />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default DashboardPage;
