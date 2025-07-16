import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const ManageTeachers = ({ navigation }) => {
  const [teachers] = useState([
    { id: 1, name: 'Mrs. Sarah Johnson', subject: 'Mathematics', class: 'Class 5A', students: 32, attendance: '98%' },
    { id: 2, name: 'Mr. David Wilson', subject: 'English', class: 'Class 4B', students: 30, attendance: '95%' },
    { id: 3, name: 'Ms. Emily Brown', subject: 'Science', class: 'Class 3A', students: 28, attendance: '92%' },
    { id: 4, name: 'Mr. James Davis', subject: 'History', class: 'Class 2B', students: 31, attendance: '94%' },
    { id: 5, name: 'Mrs. Lisa Anderson', subject: 'Geography', class: 'Class 1A', students: 29, attendance: '96%' },
  ]);

  const renderTeacherItem = ({ item }) => (
    <View style={styles.teacherCard}>
      <View style={styles.teacherInfo}>
        <View style={styles.teacherAvatar}>
          <Ionicons name="person" size={24} color="#4CAF50" />
        </View>
        <View style={styles.teacherDetails}>
          <Text style={styles.teacherName}>{item.name}</Text>
          <Text style={styles.teacherSubject}>{item.subject}</Text>
          <Text style={styles.teacherClass}>{item.class}</Text>
        </View>
        <View style={styles.teacherStats}>
          <Text style={styles.studentsText}>{item.students}</Text>
          <Text style={styles.studentsLabel}>Students</Text>
          <Text style={styles.attendanceText}>{item.attendance}</Text>
          <Text style={styles.attendanceLabel}>Attendance</Text>
        </View>
      </View>
      
      <View style={styles.teacherActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#2196F3" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#FF9800" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#f44336" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Manage Teachers" />
      
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Total Teachers: {teachers.length}</Text>
          <Text style={styles.headerSubtitle}>Active Teachers</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={teachers}
        renderItem={renderTeacherItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 16,
  },
  teacherCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teacherAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teacherDetails: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  teacherSubject: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 2,
  },
  teacherClass: {
    fontSize: 12,
    color: '#666',
  },
  teacherStats: {
    alignItems: 'center',
  },
  studentsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  studentsLabel: {
    fontSize: 10,
    color: '#666',
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  attendanceLabel: {
    fontSize: 10,
    color: '#666',
  },
  teacherActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default ManageTeachers; 