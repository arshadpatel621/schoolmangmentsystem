import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const AttendanceSummary = () => {
  return (
    <View style={styles.container}>
      <Header title="Attendance Summary" showBack={true} />
      <View style={styles.content}>
        <Text style={styles.title}>Attendance Summary</Text>
        <Text style={styles.subtitle}>
          This is a placeholder screen. Here, parents can view a monthly calendar view of child's attendance with stats like total present/absent and percentage.
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

export default AttendanceSummary; 