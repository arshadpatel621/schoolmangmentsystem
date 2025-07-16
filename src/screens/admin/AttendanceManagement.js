import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const AttendanceManagement = () => {
  return (
    <View style={styles.container}>
      <Header title="Attendance Management" showBack={true} />
      <View style={styles.content}>
        <Text style={styles.title}>Attendance Management</Text>
        <Text style={styles.subtitle}>
          This is a placeholder screen. Here, admin or teachers can mark attendance (student or teacher), view daily/monthly reports, and send absentee notifications.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AttendanceManagement; 