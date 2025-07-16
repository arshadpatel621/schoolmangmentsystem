import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const FeePayment = () => {
  return (
    <View style={styles.container}>
      <Header title="Fee Payment" showBack={true} />
      <View style={styles.content}>
        <Text style={styles.title}>Fee Payment</Text>
        <Text style={styles.subtitle}>
          This is a placeholder screen. Here, parents can view a fee breakdown for the academic year, total paid, total due, and link to pay online or confirm payment.
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

export default FeePayment; 