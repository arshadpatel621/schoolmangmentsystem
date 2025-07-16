import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBack = false, showProfile = true, onProfilePress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {showProfile && (
        <TouchableOpacity 
          onPress={onProfilePress || (() => navigation.navigate('Profile'))} 
          style={styles.profileButton}
        >
          <Ionicons name="person-circle" size={32} color="#2196F3" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 4,
  },
});

export default Header; 