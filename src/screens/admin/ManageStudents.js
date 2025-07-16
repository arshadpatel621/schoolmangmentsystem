import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const ManageStudents = ({ navigation }) => {
  const [students] = useState([
    { id: 1, name: 'Emma Johnson', class: 'Class 5A', rollNo: 15, attendance: '92%', parent: 'Mr. John Johnson' },
    { id: 2, name: 'Michael Brown', class: 'Class 5A', rollNo: 16, attendance: '88%', parent: 'Mrs. Sarah Brown' },
    { id: 3, name: 'Sophia Davis', class: 'Class 5A', rollNo: 17, attendance: '95%', parent: 'Mr. Robert Davis' },
    { id: 4, name: 'William Wilson', class: 'Class 5A', rollNo: 18, attendance: '90%', parent: 'Mrs. Lisa Wilson' },
    { id: 5, name: 'Olivia Taylor', class: 'Class 5A', rollNo: 19, attendance: '87%', parent: 'Mr. James Taylor' },
  ]);

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <View style={styles.studentAvatar}>
          <Ionicons name="person" size={24} color="#2196F3" />
        </View>
        <View style={styles.studentDetails}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentClass}>{item.class} • Roll No: {item.rollNo}</Text>
          <Text style={styles.studentParent}>Parent: {item.parent}</Text>
        </View>
        <View style={styles.studentStats}>
          <Text style={styles.attendanceText}>{item.attendance}</Text>
          <Text style={styles.attendanceLabel}>Attendance</Text>
        </View>
      </View>
      
      <View style={styles.studentActions}>
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
      <Header title="Manage Students" />
      
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Total Students: {students.length}</Text>
          <Text style={styles.headerSubtitle}>Class 5A</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        renderItem={renderStudentItem}
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
    backgroundColor: '#2196F3',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 16,
  },
  studentCard: {
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
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  studentClass: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  studentParent: {
    fontSize: 12,
    color: '#999',
  },
  studentStats: {
    alignItems: 'center',
  },
  attendanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  attendanceLabel: {
    fontSize: 12,
    color: '#666',
  },
  studentActions: {
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

export default ManageStudents; 