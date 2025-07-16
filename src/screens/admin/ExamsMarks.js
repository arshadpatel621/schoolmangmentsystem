import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const ExamsMarks = () => {
  return (
    <View style={styles.container}>
      <Header title="Exams & Marks Entry" showBack={true} />
      <View style={styles.content}>
        <Text style={styles.title}>Exams & Marks Entry</Text>
        <Text style={styles.subtitle}>
          This is a placeholder screen. Here, admin/teacher can schedule exams, enter subject-wise marks for students, and view result summary.
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

export default ExamsMarks; 