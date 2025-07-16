import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const ManageClasses = ({ navigation }) => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 1A', academicYear: '2024-25', section: 'A', teacher: 'Mrs. Sarah Johnson', students: 32, subjects: 6 },
    { id: 2, name: 'Class 1B', academicYear: '2024-25', section: 'B', teacher: 'Mr. David Wilson', students: 30, subjects: 6 },
    { id: 3, name: 'Class 2A', academicYear: '2024-25', section: 'A', teacher: 'Ms. Emily Brown', students: 28, subjects: 6 },
    { id: 4, name: 'Class 2B', academicYear: '2024-25', section: 'B', teacher: 'Mr. James Davis', students: 31, subjects: 6 },
    { id: 5, name: 'Class 3A', academicYear: '2024-25', section: 'A', teacher: 'Mrs. Lisa Anderson', students: 29, subjects: 7 },
    { id: 6, name: 'Class 3B', academicYear: '2024-25', section: 'B', teacher: 'Mr. Robert Taylor', students: 33, subjects: 7 },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newClass, setNewClass] = useState({
    name: '',
    academicYear: '2024-25',
    section: '',
    teacher: '',
  });

  const teachers = [
    'Mrs. Sarah Johnson',
    'Mr. David Wilson',
    'Ms. Emily Brown',
    'Mr. James Davis',
    'Mrs. Lisa Anderson',
    'Mr. Robert Taylor',
  ];

  const sections = ['A', 'B', 'C', 'D'];

  const handleAddClass = () => {
    if (!newClass.name || !newClass.section || !newClass.teacher) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const classToAdd = {
      id: Date.now(),
      ...newClass,
      students: 0,
      subjects: 6,
    };

    setClasses([...classes, classToAdd]);
    setNewClass({ name: '', academicYear: '2024-25', section: '', teacher: '' });
    setIsAddModalVisible(false);
    Alert.alert('Success', 'Class added successfully!');
  };

  const handleEditClass = () => {
    if (!selectedClass.name || !selectedClass.section || !selectedClass.teacher) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setClasses(classes.map(cls => 
      cls.id === selectedClass.id ? selectedClass : cls
    ));
    setIsEditModalVisible(false);
    setSelectedClass(null);
    Alert.alert('Success', 'Class updated successfully!');
  };

  const handleDeleteClass = (classId) => {
    Alert.alert(
      'Delete Class',
      'Are you sure you want to delete this class? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setClasses(classes.filter(cls => cls.id !== classId));
            Alert.alert('Success', 'Class deleted successfully!');
          },
        },
      ]
    );
  };

  const openEditModal = (classItem) => {
    setSelectedClass({ ...classItem });
    setIsEditModalVisible(true);
  };

  const renderClassItem = ({ item }) => (
    <View style={styles.classCard}>
      <View style={styles.classHeader}>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.classDetails}>
            Section {item.section} • {item.academicYear}
          </Text>
          <Text style={styles.classTeacher}>Teacher: {item.teacher}</Text>
        </View>
        <View style={styles.classStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.students}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.subjects}</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.classActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => navigation.navigate('ManageStudents', { classId: item.id })}
        >
          <Ionicons name="people" size={16} color="#2196F3" />
          <Text style={styles.viewButtonText}>View Students</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openEditModal(item)}
        >
          <Ionicons name="create" size={16} color="#FF9800" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteClass(item.id)}
        >
          <Ionicons name="trash" size={16} color="#f44336" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderModal = (isVisible, isEdit = false) => (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isEdit ? 'Edit Class' : 'Add New Class'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsAddModalVisible(false);
                setIsEditModalVisible(false);
              }}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Class Name</Text>
              <TextInput
                style={styles.input}
                value={isEdit ? selectedClass?.name : newClass.name}
                onChangeText={(text) => 
                  isEdit 
                    ? setSelectedClass({ ...selectedClass, name: text })
                    : setNewClass({ ...newClass, name: text })
                }
                placeholder="e.g., Class 1A"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Section</Text>
              <View style={styles.pickerContainer}>
                {sections.map((section) => (
                  <TouchableOpacity
                    key={section}
                    style={[
                      styles.pickerOption,
                      (isEdit ? selectedClass?.section : newClass.section) === section && 
                      styles.pickerOptionSelected
                    ]}
                    onPress={() => 
                      isEdit 
                        ? setSelectedClass({ ...selectedClass, section })
                        : setNewClass({ ...newClass, section })
                    }
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      (isEdit ? selectedClass?.section : newClass.section) === section && 
                      styles.pickerOptionTextSelected
                    ]}>
                      {section}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Class Teacher</Text>
              <View style={styles.pickerContainer}>
                {teachers.map((teacher) => (
                  <TouchableOpacity
                    key={teacher}
                    style={[
                      styles.pickerOption,
                      (isEdit ? selectedClass?.teacher : newClass.teacher) === teacher && 
                      styles.pickerOptionSelected
                    ]}
                    onPress={() => 
                      isEdit 
                        ? setSelectedClass({ ...selectedClass, teacher })
                        : setNewClass({ ...newClass, teacher })
                    }
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      (isEdit ? selectedClass?.teacher : newClass.teacher) === teacher && 
                      styles.pickerOptionTextSelected
                    ]}>
                      {teacher}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsAddModalVisible(false);
                setIsEditModalVisible(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={isEdit ? handleEditClass : handleAddClass}
            >
              <Text style={styles.saveButtonText}>
                {isEdit ? 'Update' : 'Add Class'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Header title="Manage Classes" />
      
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Total Classes: {classes.length}</Text>
          <Text style={styles.headerSubtitle}>Academic Year: 2024-25</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={classes}
        renderItem={renderClassItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {renderModal(isAddModalVisible, false)}
      {renderModal(isEditModalVisible, true)}
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
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  classDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  classTeacher: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  classStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    marginLeft: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  classActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#e3f2fd',
  },
  viewButtonText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: '#fff3e0',
  },
  editButtonText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#f44336',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
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
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#666',
  },
  pickerOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ManageClasses; 