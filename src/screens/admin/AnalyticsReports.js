import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';

const AnalyticsReports = ({ navigation }) => {
  const stats = [
    { title: 'Total Students', value: '1,247', icon: 'people', color: '#2196F3', subtitle: '+12 this month' },
    { title: 'Total Teachers', value: '89', icon: 'person', color: '#4CAF50', subtitle: '+3 this month' },
    { title: 'Average Attendance', value: '94.2%', icon: 'checkmark-circle', color: '#FF9800', subtitle: 'This month' },
    { title: 'Fee Collection', value: '₹2.4M', icon: 'card', color: '#9C27B0', subtitle: '87% collected' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Analytics & Reports" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reports</Text>
          <View style={styles.reportsList}>
            {[
              { title: 'Attendance Report', icon: 'checkmark-circle', color: '#4CAF50' },
              { title: 'Fee Collection Report', icon: 'card', color: '#9C27B0' },
              { title: 'Academic Performance', icon: 'document-text', color: '#2196F3' },
              { title: 'Student Progress Report', icon: 'trending-up', color: '#FF9800' },
            ].map((report, index) => (
              <View key={index} style={styles.reportItem}>
                <View style={[styles.reportIcon, { backgroundColor: report.color }]}>
                  <Ionicons name={report.icon} size={24} color="#fff" />
                </View>
                <View style={styles.reportContent}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportSubtitle}>Generate detailed report</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
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
  reportsList: {
    marginTop: 8,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default AnalyticsReports; 