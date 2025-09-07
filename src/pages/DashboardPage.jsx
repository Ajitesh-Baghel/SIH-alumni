import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Divider,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  DashboardOutlined,
  PeopleOutlined,
  EventOutlined,
  WorkOutlined,
  ForumOutlined,
  TrendingUpOutlined,
  NotificationsOutlined,
  CalendarTodayOutlined,
  ArrowForwardOutlined,
  PersonAddOutlined,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockDashboardStats, mockEvents, mockJobs, mockAlumni, mockNotifications } from '@data/mockData';
import { formatNumber, getRelativeTime, isEventUpcoming, formatDate } from '@utils/helpers';
import Loading from '@components/common/Loading';

const DashboardPage = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentAlumni, setRecentAlumni] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Mock data for charts
  const departmentData = [
    { name: 'Computer Science', value: 35, color: '#0088FE' },
    { name: 'Engineering', value: 25, color: '#00C49F' },
    { name: 'Business', value: 20, color: '#FFBB28' },
    { name: 'Others', value: 20, color: '#FF8042' },
  ];

  const monthlyGrowthData = [
    { month: 'Jan', alumni: 45, events: 5, jobs: 8 },
    { month: 'Feb', alumni: 52, events: 7, jobs: 12 },
    { month: 'Mar', alumni: 61, events: 9, jobs: 15 },
    { month: 'Apr', alumni: 58, events: 6, jobs: 11 },
    { month: 'May', alumni: 67, events: 8, jobs: 18 },
    { month: 'Jun', alumni: 73, events: 12, jobs: 22 },
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(mockDashboardStats);
      setRecentEvents(mockEvents.slice(0, 3));
      setRecentJobs(mockJobs.slice(0, 3));
      setRecentAlumni(mockAlumni.slice(0, 5));
      setNotifications(mockNotifications.slice(0, 4));
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary', trend }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {formatNumber(value)}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpOutlined fontSize="small" color="success" />
                <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                  +{trend}% this month
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ icon: Icon, title, description, action, color = 'primary' }) => (
    <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={action}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Avatar sx={{ bgcolor: `${color}.main`, width: 48, height: 48, mx: 'auto', mb: 2 }}>
          <Icon />
        </Avatar>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <DashboardOutlined /> Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back, {user?.name || 'User'}!
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PeopleOutlined}
            title="Total Alumni"
            value={stats.totalAlumni}
            subtitle="Registered members"
            trend={12}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={EventOutlined}
            title="Upcoming Events"
            value={stats.upcomingEvents}
            subtitle="This month"
            trend={8}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={WorkOutlined}
            title="Active Jobs"
            value={stats.activeJobs}
            subtitle="Open positions"
            trend={15}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ForumOutlined}
            title="Forum Posts"
            value={stats.totalForumPosts}
            subtitle="Total discussions"
            trend={5}
            color="warning"
          />
        </Grid>

        {/* Quick Actions */}
        {role === 'admin' && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <QuickActionCard
                  icon={EventOutlined}
                  title="Create Event"
                  description="Add a new alumni event"
                  action={() => navigate('/events/create')}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <QuickActionCard
                  icon={WorkOutlined}
                  title="Post Job"
                  description="Add job opportunity"
                  action={() => navigate('/jobs/create')}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <QuickActionCard
                  icon={PersonAddOutlined}
                  title="Add Alumni"
                  description="Register new member"
                  action={() => navigate('/directory/add')}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <QuickActionCard
                  icon={NotificationsOutlined}
                  title="Send Notification"
                  description="Broadcast message"
                  action={() => navigate('/admin/notifications')}
                  color="warning"
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Growth Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alumni" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="events" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="jobs" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: 360 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Alumni by Department
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 1 }}>
              {departmentData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, bgcolor: item.color, mr: 1, borderRadius: 1 }} />
                  <Typography variant="body2">{item.name}: {item.value}%</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Recent Events */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Events</Typography>
                <Button size="small" onClick={() => navigate('/events')} endIcon={<ArrowForwardOutlined />}>
                  View All
                </Button>
              </Box>
              <List>
                {recentEvents.map((event, index) => (
                  <ListItem key={event.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <CalendarTodayOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={event.title}
                      secondary={formatDate(event.date)}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Chip
                      label={event.type}
                      size="small"
                      color={event.type === 'reunion' ? 'primary' : 'default'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Jobs */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Jobs</Typography>
                <Button size="small" onClick={() => navigate('/jobs')} endIcon={<ArrowForwardOutlined />}>
                  View All
                </Button>
              </Box>
              <List>
                {recentJobs.map((job, index) => (
                  <ListItem key={job.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <WorkOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={job.title}
                      secondary={`${job.company} • ${job.applicants} applicants`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Chip
                      label={job.type}
                      size="small"
                      color={job.type === 'full-time' ? 'success' : 'warning'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alumni */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">New Alumni</Typography>
                <Button size="small" onClick={() => navigate('/directory')} endIcon={<ArrowForwardOutlined />}>
                  View All
                </Button>
              </Box>
              <List>
                {recentAlumni.map((alumni, index) => (
                  <ListItem key={alumni.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar>{alumni.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={alumni.name}
                      secondary={`${alumni.currentJob} at ${alumni.company}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    {alumni.isVerified && (
                      <Chip label="Verified" size="small" color="success" />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
