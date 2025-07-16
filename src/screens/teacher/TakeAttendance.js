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

const TakeAttendance = ({ navigation }) => {
  const [students] = useState([
    { id: 1, name: 'Emma Johnson', rollNo: 15, status: 'present' },
    { id: 2, name: 'Michael Brown', rollNo: 16, status: 'present' },
    { id: 3, name: 'Sophia Davis', rollNo: 17, status: 'absent' },
    { id: 4, name: 'William Wilson', rollNo: 18, status: 'present' },
    { id: 5, name: 'Olivia Taylor', rollNo: 19, status: 'present' },
  ]);

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentRoll}>Roll No: {item.rollNo}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.status === 'present' ? '#4CAF50' : '#f44336' }]}>
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Take Attendance" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Class 5A</Text>
        <Text style={styles.headerSubtitle}>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  listContainer: {
    padding: 16,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  studentRoll: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TakeAttendance; 