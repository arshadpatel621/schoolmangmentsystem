import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';

const { width } = Dimensions.get('window');

const AdminDashboard = ({ navigation }) => {
  // Mock data
  const stats = [
    { title: 'Total Students', value: '1,247', icon: 'people', color: '#2196F3', subtitle: '+12 this month' },
    { title: 'Total Teachers', value: '89', icon: 'person', color: '#4CAF50', subtitle: '+3 this month' },
    { title: 'Attendance Today', value: '94.2%', icon: 'checkmark-circle', color: '#FF9800', subtitle: '1,173 present' },
    { title: 'Fee Collection', value: '₹2.4M', icon: 'card', color: '#9C27B0', subtitle: '87% collected' },
  ];

  const quickActions = [
    { title: 'Manage Classes', icon: 'school', color: '#2196F3', screen: 'ManageClasses' },
    { title: 'Add Student', icon: 'person-add', color: '#4CAF50', screen: 'ManageStudents' },
    { title: 'Attendance', icon: 'calendar', color: '#FF9800', screen: 'AttendanceManagement' },
    { title: 'Fee Management', icon: 'card', color: '#9C27B0', screen: 'FeeManagement' },
    { title: 'Exams & Marks', icon: 'document-text', color: '#607D8B', screen: 'ExamsMarks' },
    { title: 'Notifications', icon: 'notifications', color: '#E91E63', screen: 'NotificationManagement' },
  ];

  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [92, 94, 89, 96, 94],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const performanceData = {
    labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    datasets: [
      {
        data: [85, 78, 92, 88, 95],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  return (
    <View style={styles.container}>
      <Header title="Admin Dashboard" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, Admin!</Text>
          <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              subtitle={stat.subtitle}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Charts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Attendance Trend</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={attendanceData}
              width={width - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class Performance</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={performanceData}
              width={width - 40}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              verticalLabelRotation={0}
            />
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activitiesList}>
            {[
              { text: 'New student registered: John Doe (Class 3A)', time: '2 hours ago', icon: 'person-add' },
              { text: 'Fee payment received: ₹15,000 from Class 5B', time: '4 hours ago', icon: 'card' },
              { text: 'Attendance marked for Class 2A (95% present)', time: '6 hours ago', icon: 'checkmark-circle' },
              { text: 'Exam scheduled: Mathematics for Class 4A', time: '1 day ago', icon: 'calendar' },
            ].map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name={activity.icon} size={16} color="#2196F3" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  chart: {
    borderRadius: 12,
  },
  activitiesList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default AdminDashboard; 