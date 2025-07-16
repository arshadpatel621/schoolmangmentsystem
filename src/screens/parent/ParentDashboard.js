import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';

const ParentDashboard = ({ navigation }) => {
  // Mock data
  const childStats = [
    { title: 'Attendance', value: '92%', icon: 'checkmark-circle', color: '#4CAF50', subtitle: 'This month' },
    { title: 'Fee Due', value: '₹5,000', icon: 'card', color: '#FF9800', subtitle: 'Due in 5 days' },
    { title: 'Average Marks', value: '85%', icon: 'document-text', color: '#2196F3', subtitle: 'This semester' },
    { title: 'Upcoming Exams', value: '2', icon: 'calendar', color: '#9C27B0', subtitle: 'Next week' },
  ];

  const upcomingExams = [
    { subject: 'Mathematics', date: 'Dec 15, 2024', time: '9:00 AM', class: 'Class 5A' },
    { subject: 'Science', date: 'Dec 17, 2024', time: '10:00 AM', class: 'Class 5A' },
  ];

  const recentNotifications = [
    { title: 'Fee Payment Reminder', message: 'Fee payment of ₹5,000 is due on Dec 20, 2024', time: '2 hours ago', type: 'fee' },
    { title: 'Exam Schedule', message: 'Mathematics exam scheduled for Dec 15, 2024', time: '1 day ago', type: 'exam' },
    { title: 'Attendance Alert', message: 'Your child was absent on Dec 10, 2024', time: '2 days ago', type: 'attendance' },
    { title: 'Homework Assignment', message: 'New homework assigned in Mathematics', time: '3 days ago', type: 'homework' },
  ];

  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [1, 1, 0, 1, 1], // 1 for present, 0 for absent
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  const renderExamItem = ({ item, index }) => (
    <View style={styles.examItem}>
      <View style={styles.examIcon}>
        <Ionicons name="calendar" size={24} color="#9C27B0" />
      </View>
      <View style={styles.examInfo}>
        <Text style={styles.examSubject}>{item.subject}</Text>
        <Text style={styles.examDetails}>{item.date} • {item.time}</Text>
        <Text style={styles.examClass}>{item.class}</Text>
      </View>
      <TouchableOpacity style={styles.examAction}>
        <Ionicons name="chevron-forward" size={20} color="#9C27B0" />
      </TouchableOpacity>
    </View>
  );

  const renderNotificationItem = ({ item, index }) => (
    <View style={[styles.notificationItem, { borderLeftColor: getNotificationColor(item.type) }]}>
      <View style={styles.notificationIcon}>
        <Ionicons name={getNotificationIcon(item.type)} size={20} color={getNotificationColor(item.type)} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  const getNotificationColor = (type) => {
    switch (type) {
      case 'fee': return '#FF9800';
      case 'exam': return '#9C27B0';
      case 'attendance': return '#f44336';
      case 'homework': return '#2196F3';
      default: return '#666';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'fee': return 'card';
      case 'exam': return 'calendar';
      case 'attendance': return 'checkmark-circle';
      case 'homework': return 'library';
      default: return 'notifications';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Parent Dashboard" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Child Info Section */}
        <View style={styles.childInfoSection}>
          <View style={styles.childAvatar}>
            <Ionicons name="person-circle" size={60} color="#FF9800" />
          </View>
          <View style={styles.childDetails}>
            <Text style={styles.childName}>Emma Johnson</Text>
            <Text style={styles.childClass}>Class 5A • Roll No: 15</Text>
            <Text style={styles.childAge}>Age: 10 years</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {childStats.map((stat, index) => (
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

        {/* This Week's Attendance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Week's Attendance</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AttendanceSummary')}>
              <Text style={styles.viewAllText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={attendanceData}
              width={350}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
            <View style={styles.attendanceLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.legendText}>Present</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#f44336' }]} />
                <Text style={styles.legendText}>Absent</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Exams */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ViewReportCard')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingExams}
            renderItem={renderExamItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {[
              { title: 'Pay Fees', icon: 'card', color: '#FF9800', screen: 'FeePayment' },
              { title: 'View Report Card', icon: 'document-text', color: '#2196F3', screen: 'ViewReportCard' },
              { title: 'Attendance Details', icon: 'calendar', color: '#4CAF50', screen: 'AttendanceSummary' },
              { title: 'Chat with Teacher', icon: 'chatbubbles', color: '#9C27B0', screen: 'ChatWithTeacher' },
            ].map((action, index) => (
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

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentNotifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
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
  childInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  childAvatar: {
    marginRight: 16,
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  childClass: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  childAge: {
    fontSize: 14,
    color: '#999',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
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
  attendanceLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  examItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  examIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3e5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  examInfo: {
    flex: 1,
  },
  examSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  examDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  examClass: {
    fontSize: 12,
    color: '#999',
  },
  examAction: {
    padding: 8,
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderLeftWidth: 4,
    paddingLeft: 16,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default ParentDashboard; 