import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CROPS_STORAGE_KEY = '@farmer_crops';

const ManageCropsScreen = ({ navigation }) => {
  const [crops, setCrops] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [newCrop, setNewCrop] = useState({
    name: '',
    area: '',
    sowingDate: '',
  });

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      const cropsData = await AsyncStorage.getItem(CROPS_STORAGE_KEY);
      if (cropsData) {
        setCrops(JSON.parse(cropsData));
      } else {
        // Initialize with default crops
        const defaultCrops = [
          { id: '1', name: 'Onion', icon: '🧅', area: '2.5', sowingDate: '2025-01-15', status: 'Active' },
          { id: '2', name: 'Tomato', icon: '🍅', area: '1.5', sowingDate: '2025-01-20', status: 'Active' },
          { id: '3', name: 'Grapes', icon: '🍇', area: '3.0', sowingDate: '2025-02-01', status: 'Active' },
          { id: '4', name: 'Sugarcane', icon: '🌿', area: '5.0', sowingDate: '2024-11-10', status: 'Active' },
          { id: '5', name: 'Wheat', icon: '🌾', area: '4.0', sowingDate: '2024-11-01', status: 'Active' },
        ];
        await AsyncStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(defaultCrops));
        setCrops(defaultCrops);
      }
    } catch (error) {
      console.error('Error loading crops:', error);
    }
  };

  const handleAddCrop = async () => {
    if (!newCrop.name || !newCrop.area || !newCrop.sowingDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const crop = {
      id: Date.now().toString(),
      name: newCrop.name,
      icon: getCropIcon(newCrop.name),
      area: newCrop.area,
      sowingDate: newCrop.sowingDate,
      status: 'Active',
    };

    const updatedCrops = [...crops, crop];
    await AsyncStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(updatedCrops));
    setCrops(updatedCrops);
    setShowAddModal(false);
    setNewCrop({ name: '', area: '', sowingDate: '' });
    Alert.alert('Success', 'Crop added successfully');
  };

  const handleEditCrop = (crop) => {
    setSelectedCrop(crop);
    setNewCrop({
      name: crop.name,
      area: crop.area,
      sowingDate: crop.sowingDate,
    });
    setShowEditModal(true);
  };

  const handleUpdateCrop = async () => {
    const updatedCrops = crops.map(crop =>
      crop.id === selectedCrop.id
        ? { ...crop, name: newCrop.name, area: newCrop.area, sowingDate: newCrop.sowingDate }
        : crop
    );
    await AsyncStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(updatedCrops));
    setCrops(updatedCrops);
    setShowEditModal(false);
    setNewCrop({ name: '', area: '', sowingDate: '' });
    Alert.alert('Success', 'Crop updated successfully');
  };

  const handleDeleteCrop = (cropId) => {
    Alert.alert(
      'Delete Crop',
      'Are you sure you want to delete this crop?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedCrops = crops.filter(c => c.id !== cropId);
            await AsyncStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(updatedCrops));
            setCrops(updatedCrops);
            Alert.alert('Success', 'Crop deleted successfully');
          },
        },
      ]
    );
  };

  const getCropIcon = (cropName) => {
    const icons = {
      onion: '🧅',
      tomato: '🍅',
      grapes: '🍇',
      sugarcane: '🌿',
      wheat: '🌾',
      rice: '🌾',
      potato: '🥔',
      carrot: '🥕',
      corn: '🌽',
    };
    return icons[cropName.toLowerCase()] || '🌱';
  };

  const getTotalArea = () => {
    return crops.reduce((sum, crop) => sum + parseFloat(crop.area || 0), 0).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Manage Crops</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CropAnalytics')}>
            <Text style={styles.icon}>📊</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Crops</Text>
            <Text style={styles.statValue}>{crops.length}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Area</Text>
            <Text style={styles.statValue}>{getTotalArea()} acres</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Active</Text>
            <Text style={styles.statValue}>{crops.length}</Text>
          </View>
        </View>

        {/* Add Crop Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonIcon}>➕</Text>
          <Text style={styles.addButtonText}>Add New Crop</Text>
        </TouchableOpacity>

        {/* Alert Section */}
        <View style={styles.alertsSection}>
          <View style={styles.alertsHeader}>
            <Text style={styles.alertsTitle}>Alerts & Tips</Text>
          </View>
          
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <Text style={styles.alertText}>
              मौसम अपडेट: इस सप्ताह भारी बारिश की संभावना{'\n'}
              Weather update: Heavy rainfall expected this week
            </Text>
          </View>
        </View>

        {/* Crops List */}
        <View style={styles.cropsSection}>
          <View style={styles.cropsSectionHeader}>
            <Text style={styles.cropsSectionTitle}>My Crops ({crops.length})</Text>
          </View>

          {crops.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🌱</Text>
              <Text style={styles.emptyText}>No crops added yet</Text>
              <Text style={styles.emptySubtext}>Tap "Add New Crop" to get started</Text>
            </View>
          ) : (
            <View style={styles.cropsGrid}>
              {crops.map((crop) => (
                <View key={crop.id} style={styles.cropCard}>
                  <Text style={styles.cropIcon}>{crop.icon}</Text>
                  <Text style={styles.cropName}>{crop.name}</Text>
                  <Text style={styles.cropArea}>{crop.area} acres</Text>
                  <View style={styles.cropActions}>
                    <TouchableOpacity
                      style={[styles.cropButton, styles.editButton]}
                      onPress={() => handleEditCrop(crop)}
                    >
                      <Text style={styles.cropButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.cropButton, styles.deleteButton]}
                      onPress={() => handleDeleteCrop(crop.id)}
                    >
                      <Text style={styles.cropButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Navigation to other screens */}
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('CropAnalytics')}
          >
            <Text style={styles.menuIcon}>📊</Text>
            <Text style={styles.menuTitle}>Crop Analytics</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Coming Soon', 'Crop guidance feature coming soon')}
          >
            <Text style={styles.menuIcon}>📚</Text>
            <Text style={styles.menuTitle}>Crop Information</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Crop Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Crop</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Crop Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Wheat, Rice, Tomato"
                value={newCrop.name}
                onChangeText={(text) => setNewCrop({ ...newCrop, name: text })}
              />

              <Text style={styles.inputLabel}>Area (in acres)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 2.5"
                keyboardType="decimal-pad"
                value={newCrop.area}
                onChangeText={(text) => setNewCrop({ ...newCrop, area: text })}
              />

              <Text style={styles.inputLabel}>Sowing Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD (e.g., 2025-01-15)"
                value={newCrop.sowingDate}
                onChangeText={(text) => setNewCrop({ ...newCrop, sowingDate: text })}
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleAddCrop}>
                <Text style={styles.submitButtonText}>Add Crop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Crop Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Crop</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Crop Name</Text>
              <TextInput
                style={styles.input}
                value={newCrop.name}
                onChangeText={(text) => setNewCrop({ ...newCrop, name: text })}
              />

              <Text style={styles.inputLabel}>Area (in acres)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={newCrop.area}
                onChangeText={(text) => setNewCrop({ ...newCrop, area: text })}
              />

              <Text style={styles.inputLabel}>Sowing Date</Text>
              <TextInput
                style={styles.input}
                value={newCrop.sowingDate}
                onChangeText={(text) => setNewCrop({ ...newCrop, sowingDate: text })}
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleUpdateCrop}>
                <Text style={styles.submitButtonText}>Update Crop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F2',
  },
  header: {
    backgroundColor: '#2D5F3F',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
  },
  content: {
    flex: 1,
  },

  /* Statistics Card */
  statsCard: {
    backgroundColor: '#FFF',
    margin: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },

  /* Add Button */
  addButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /* Alerts */
  alertsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  alertsHeader: {
    marginBottom: 10,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },

  /* Crops Section */
  cropsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cropsSectionHeader: {
    marginBottom: 15,
  },
  cropsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cropCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    elevation: 3,
  },
  cropIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cropArea: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  cropActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cropButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#FF5722',
  },
  cropButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },

  /* Menu List */
  menuList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  chevron: {
    fontSize: 22,
    color: '#999',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ManageCropsScreen;