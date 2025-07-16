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
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';

const TeacherDashboard = ({ navigation }) => {
  // Mock data
  const teacherStats = [
    { title: 'Classes Today', value: '4', icon: 'school', color: '#4CAF50', subtitle: '8:00 AM - 2:00 PM' },
    { title: 'Students', value: '156', icon: 'people', color: '#2196F3', subtitle: 'Across 4 classes' },
    { title: 'Attendance', value: '94%', icon: 'checkmark-circle', color: '#FF9800', subtitle: '147 present today' },
    { title: 'Pending Tasks', value: '3', icon: 'document-text', color: '#9C27B0', subtitle: 'Marks entry due' },
  ];

  const todayTimetable = [
    { time: '8:00 - 9:00', subject: 'Mathematics', class: 'Class 5A', room: 'Room 101' },
    { time: '9:00 - 10:00', subject: 'Mathematics', class: 'Class 4B', room: 'Room 102' },
    { time: '10:15 - 11:15', subject: 'Mathematics', class: 'Class 3A', room: 'Room 103' },
    { time: '11:15 - 12:15', subject: 'Mathematics', class: 'Class 5B', room: 'Room 104' },
  ];

  const pendingTasks = [
    { title: 'Enter marks for Class 5A Math Test', due: 'Today', priority: 'high' },
    { title: 'Review homework from Class 4B', due: 'Tomorrow', priority: 'medium' },
    { title: 'Prepare lesson plan for next week', due: 'Friday', priority: 'low' },
  ];

  const recentActivities = [
    { text: 'Attendance marked for Class 5A (95% present)', time: '2 hours ago', icon: 'checkmark-circle' },
    { text: 'Homework assigned to Class 4B', time: '4 hours ago', icon: 'library' },
    { text: 'Marks entered for Class 3A test', time: '1 day ago', icon: 'document-text' },
  ];

  const renderTimetableItem = ({ item, index }) => (
    <View style={styles.timetableItem}>
      <View style={styles.timeSlot}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.subjectText}>{item.subject}</Text>
        <Text style={styles.classText}>{item.class}</Text>
        <Text style={styles.roomText}>{item.room}</Text>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chevron-forward" size={20} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );

  const renderTaskItem = ({ item, index }) => (
    <View style={[styles.taskItem, { borderLeftColor: getPriorityColor(item.priority) }]}>
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDue}>Due: {item.due}</Text>
      </View>
      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
        <Text style={styles.priorityText}>{item.priority.toUpperCase()}</Text>
      </View>
    </View>
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Teacher Dashboard" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Good morning, Mrs. Sarah Johnson!</Text>
          <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {teacherStats.map((stat, index) => (
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

        {/* Today's Timetable */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Timetable</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SubjectsTimetable')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={todayTimetable}
            renderItem={renderTimetableItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Pending Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MarksEntry')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={pendingTasks}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {[
              { title: 'Take Attendance', icon: 'checkmark-circle', color: '#4CAF50', screen: 'TakeAttendance' },
              { title: 'Enter Marks', icon: 'document-text', color: '#2196F3', screen: 'MarksEntry' },
              { title: 'Upload Homework', icon: 'library', color: '#FF9800', screen: 'UploadHomework' },
              { title: 'View Students', icon: 'people', color: '#9C27B0', screen: 'ViewStudentInfo' },
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

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name={activity.icon} size={16} color="#4CAF50" />
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
    color: '#4CAF50',
    fontWeight: '600',
  },
  timetableItem: {
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
    color: '#4CAF50',
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
  classText: {
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderLeftWidth: 4,
    paddingLeft: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 12,
    color: '#666',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
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
    backgroundColor: '#e8f5e8',
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

export default TeacherDashboard; 