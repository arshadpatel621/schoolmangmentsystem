import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../utils/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              // Navigation will be handled automatically by AuthContext
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const renderSettingItem = (icon, title, subtitle, onPress, showSwitch = false, switchValue = false, onSwitchChange = null) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={showSwitch}>
      <View style={styles.settingItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#007AFF" />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={switchValue ? '#007AFF' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSettingItem('person-outline', 'Profile', 'Manage your profile information', () => navigation.navigate('Profile'))}
          {renderSettingItem('lock-closed-outline', 'Change Password', 'Update your password', () => Alert.alert('Change Password', 'Password change functionality would go here'))}
          {renderSettingItem('finger-print-outline', 'Biometric Login', 'Use fingerprint or face ID', null, true, biometricEnabled, setBiometricEnabled)}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          {renderSettingItem('notifications-outline', 'Notifications', 'Manage notification preferences', null, true, notificationsEnabled, setNotificationsEnabled)}
          {renderSettingItem('moon-outline', 'Dark Mode', 'Switch to dark theme', null, true, darkModeEnabled, setDarkModeEnabled)}
          {renderSettingItem('language-outline', 'Language', 'English', () => Alert.alert('Language', 'Language selection would go here'))}
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderSettingItem('help-circle-outline', 'Help & Support', 'Get help and contact support', () => Alert.alert('Help & Support', 'Support functionality would go here'))}
          {renderSettingItem('document-text-outline', 'Terms of Service', 'Read our terms of service', () => Alert.alert('Terms of Service', 'Terms of service would be displayed here'))}
          {renderSettingItem('shield-checkmark-outline', 'Privacy Policy', 'Read our privacy policy', () => Alert.alert('Privacy Policy', 'Privacy policy would be displayed here'))}
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          {renderSettingItem('information-circle-outline', 'App Version', '1.0.0', null)}
          {renderSettingItem('star-outline', 'Rate App', 'Rate us on the app store', () => Alert.alert('Rate App', 'App store rating functionality would go here'))}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    marginLeft: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
});

export default SettingsScreen; 