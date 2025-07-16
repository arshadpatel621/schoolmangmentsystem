import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  // Mock user data - in real app this would come from context/state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@school.com',
    phone: '+91 98765 43210',
    role: 'Admin',
    department: 'Administration',
    address: '123 School Street, City, State 12345',
    emergencyContact: '+91 98765 43211',
    bloodGroup: 'O+',
    dateOfBirth: '15-03-1985',
  });

  const [editedData, setEditedData] = useState({ ...userData });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedData({ ...userData });
    setIsEditing(false);
  };

  const updateField = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (label, field, value, keyboardType = 'default', editable = true) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => updateField(field, text)}
          keyboardType={keyboardType}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Profile" showBack={true} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.imageContainer} onPress={isEditing ? pickImage : null}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color="#fff" />
              </View>
            )}
            {isEditing && (
              <View style={styles.editImageOverlay}>
                <Ionicons name="camera" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileRole}>{userData.role}</Text>
            <Text style={styles.profileDepartment}>{userData.department}</Text>
          </View>
        </View>

        {/* Edit Button */}
        <View style={styles.editSection}>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Ionicons name="create" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Ionicons name="close" size={20} color="#666" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Profile Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          {renderField('Full Name', 'name', editedData.name)}
          {renderField('Email', 'email', editedData.email, 'email-address')}
          {renderField('Phone', 'phone', editedData.phone, 'phone-pad')}
          {renderField('Address', 'address', editedData.address)}
          {renderField('Date of Birth', 'dateOfBirth', editedData.dateOfBirth)}
          {renderField('Blood Group', 'bloodGroup', editedData.bloodGroup)}
          
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          {renderField('Emergency Contact', 'emergencyContact', editedData.emergencyContact, 'phone-pad')}
        </View>

        {/* Account Settings */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="lock-closed" size={24} color="#2196F3" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Change Password</Text>
              <Text style={styles.settingSubtitle}>Update your account password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="notifications" size={24} color="#FF9800" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notification Settings</Text>
              <Text style={styles.settingSubtitle}>Manage your notification preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Privacy Settings</Text>
              <Text style={styles.settingSubtitle}>Control your privacy and data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.detailsSection}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login') }
                ]
              );
            }}
          >
            <Ionicons name="log-out" size={20} color="#f44336" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 2,
  },
  profileDepartment: {
    fontSize: 14,
    color: '#666',
  },
  editSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffebee',
  },
  logoutButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen; 