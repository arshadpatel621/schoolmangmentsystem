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

const StudentDashboard = ({ navigation }) => {
  // Mock data
  const studentStats = [
    { title: 'Attendance', value: '92%', icon: 'checkmark-circle', color: '#4CAF50', subtitle: 'This month' },
    { title: 'Average Marks', value: '85%', icon: 'document-text', color: '#2196F3', subtitle: 'This semester' },
    { title: 'Pending Homework', value: '3', icon: 'library', color: '#FF9800', subtitle: 'Due this week' },
    { title: 'Upcoming Exams', value: '2', icon: 'calendar', color: '#9C27B0', subtitle: 'Next week' },
  ];

  const todaySchedule = [
    { time: '8:00 - 9:00', subject: 'Mathematics', teacher: 'Mrs. Sarah Johnson', room: 'Room 101' },
    { time: '9:00 - 10:00', subject: 'English', teacher: 'Mr. David Wilson', room: 'Room 102' },
    { time: '10:15 - 11:15', subject: 'Science', teacher: 'Ms. Emily Brown', room: 'Room 103' },
    { time: '11:15 - 12:15', subject: 'History', teacher: 'Mr. James Davis', room: 'Room 104' },
  ];

  const upcomingHomework = [
    { subject: 'Mathematics', title: 'Algebra Problems', due: 'Tomorrow', status: 'pending' },
    { subject: 'English', title: 'Essay Writing', due: 'Friday', status: 'pending' },
    { subject: 'Science', title: 'Lab Report', due: 'Next Monday', status: 'pending' },
  ];

  const recentMarks = [
    { subject: 'Mathematics', exam: 'Unit Test 3', marks: '18/20', grade: 'A', date: 'Dec 5, 2024' },
    { subject: 'English', exam: 'Essay Test', marks: '16/20', grade: 'B+', date: 'Dec 3, 2024' },
    { subject: 'Science', exam: 'Lab Test', marks: '19/20', grade: 'A+', date: 'Dec 1, 2024' },
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
    color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#9C27B0',
    },
  };

  const renderScheduleItem = ({ item, index }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.timeSlot}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.subjectText}>{item.subject}</Text>
        <Text style={styles.teacherText}>{item.teacher}</Text>
        <Text style={styles.roomText}>{item.room}</Text>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chevron-forward" size={20} color="#9C27B0" />
      </TouchableOpacity>
    </View>
  );

  const renderHomeworkItem = ({ item, index }) => (
    <View style={[styles.homeworkItem, { borderLeftColor: getStatusColor(item.status) }]}>
      <View style={styles.homeworkIcon}>
        <Ionicons name="library" size={20} color={getStatusColor(item.status)} />
      </View>
      <View style={styles.homeworkContent}>
        <Text style={styles.homeworkSubject}>{item.subject}</Text>
        <Text style={styles.homeworkTitle}>{item.title}</Text>
        <Text style={styles.homeworkDue}>Due: {item.due}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  const renderMarksItem = ({ item, index }) => (
    <View style={styles.marksItem}>
      <View style={styles.marksIcon}>
        <Ionicons name="document-text" size={24} color="#2196F3" />
      </View>
      <View style={styles.marksInfo}>
        <Text style={styles.marksSubject}>{item.subject}</Text>
        <Text style={styles.marksExam}>{item.exam}</Text>
        <Text style={styles.marksDate}>{item.date}</Text>
      </View>
      <View style={styles.marksScore}>
        <Text style={styles.marksValue}>{item.marks}</Text>
        <Text style={[styles.marksGrade, { color: getGradeColor(item.grade) }]}>{item.grade}</Text>
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'completed': return '#4CAF50';
      case 'overdue': return '#f44336';
      default: return '#666';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return '#4CAF50';
      case 'A': return '#4CAF50';
      case 'B+': return '#2196F3';
      case 'B': return '#2196F3';
      case 'C+': return '#FF9800';
      case 'C': return '#FF9800';
      default: return '#f44336';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Student Dashboard" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Student Info Section */}
        <View style={styles.studentInfoSection}>
          <View style={styles.studentAvatar}>
            <Ionicons name="person-circle" size={60} color="#9C27B0" />
          </View>
          <View style={styles.studentDetails}>
            <Text style={styles.studentName}>Emma Johnson</Text>
            <Text style={styles.studentClass}>Class 5A • Roll No: 15</Text>
            <Text style={styles.studentAge}>Age: 10 years</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {studentStats.map((stat, index) => (
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

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}</Text>
          </View>
          <FlatList
            data={todaySchedule}
            renderItem={renderScheduleItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* This Week's Attendance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Week's Attendance</Text>
            <TouchableOpacity onPress={() => navigation.navigate('StudentAttendanceMarks')}>
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

        {/* Upcoming Homework */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Homework</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ViewAssignments')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingHomework}
            renderItem={renderHomeworkItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Recent Marks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Marks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('StudentAttendanceMarks')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentMarks}
            renderItem={renderMarksItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {[
              { title: 'View Assignments', icon: 'library', color: '#FF9800', screen: 'ViewAssignments' },
              { title: 'Check Marks', icon: 'document-text', color: '#2196F3', screen: 'StudentAttendanceMarks' },
              { title: 'Notifications', icon: 'notifications', color: '#9C27B0', screen: 'StudentNotifications' },
              { title: 'Chat with Teacher', icon: 'chatbubbles', color: '#4CAF50', screen: 'StudentChatWithTeacher' },
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
  studentInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  studentAvatar: {
    marginRight: 16,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  studentAge: {
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
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  viewAllText: {
    fontSize: 14,
    color: '#9C27B0',
    fontWeight: '600',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeSlot: {
    width: 80,
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C27B0',
  },
  classInfo: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  teacherText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  roomText: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    padding: 8,
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
  homeworkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderLeftWidth: 4,
    paddingLeft: 16,
  },
  homeworkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  homeworkContent: {
    flex: 1,
  },
  homeworkSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  homeworkTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  homeworkDue: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  marksItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  marksIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  marksInfo: {
    flex: 1,
  },
  marksSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  marksExam: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  marksDate: {
    fontSize: 12,
    color: '#999',
  },
  marksScore: {
    alignItems: 'flex-end',
  },
  marksValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  marksGrade: {
    fontSize: 14,
    fontWeight: '600',
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
});

export default StudentDashboard; 