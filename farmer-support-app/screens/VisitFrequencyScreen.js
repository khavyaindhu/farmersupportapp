import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VISITS_STORAGE_KEY = '@field_visits';

const VisitFrequencyScreen = ({ navigation }) => {
  const [visits, setVisits] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVisit, setNewVisit] = useState({
    farmerName: '',
    location: '',
    purpose: '',
    date: '',
  });

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      const visitsData = await AsyncStorage.getItem(VISITS_STORAGE_KEY);
      if (visitsData) {
        setVisits(JSON.parse(visitsData));
      } else {
        // Initialize with sample data
        const sampleVisits = generateSampleVisits();
        await AsyncStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(sampleVisits));
        setVisits(sampleVisits);
      }
    } catch (error) {
      console.error('Error loading visits:', error);
    }
  };

  const generateSampleVisits = () => {
    const visits = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 15) + 5;
      
      visits.push({
        id: i.toString(),
        date: date.toISOString().split('T')[0],
        count: count,
      });
    }
    
    return visits.reverse();
  };

  const handleAddVisit = async () => {
    if (!newVisit.farmerName || !newVisit.location || !newVisit.date) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const visit = {
      id: Date.now().toString(),
      ...newVisit,
      timestamp: new Date().toISOString(),
    };

    const updatedVisits = [...visits, visit];
    await AsyncStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(updatedVisits));
    setVisits(updatedVisits);
    setShowAddModal(false);
    setNewVisit({ farmerName: '', location: '', purpose: '', date: '' });
    Alert.alert('Success', 'Visit recorded successfully');
  };

  const getTotalVisits = () => {
    return visits.reduce((sum, v) => sum + (v.count || 1), 0);
  };

  const getThisMonthVisits = () => {
    const thisMonth = new Date().getMonth();
    return visits.filter(v => {
      const visitMonth = new Date(v.date).getMonth();
      return visitMonth === thisMonth;
    }).reduce((sum, v) => sum + (v.count || 1), 0);
  };

  const getRecentVisits = () => {
    return visits.slice(-7);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Visit Frequency</Text>
          <TouchableOpacity>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Visits</Text>
            <Text style={styles.statsValue}>{getTotalVisits()}</Text>
            <Text style={styles.statsSubtext}>All time</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>This Month</Text>
            <Text style={styles.statsValue}>{getThisMonthVisits()}</Text>
            <Text style={styles.statsSubtext}>Field visits</Text>
          </View>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTabs}>
              <TouchableOpacity style={[styles.chartTab, styles.chartTabActive]}>
                <Text style={[styles.chartTabText, styles.chartTabTextActive]}>
                  Last 7 Days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartTab}>
                <Text style={styles.chartTabText}>Last Month</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Simple Bar Chart */}
          <View style={styles.barChartContainer}>
            {getRecentVisits().map((visit, index) => {
              const maxCount = Math.max(...getRecentVisits().map(v => v.count || 1));
              const height = ((visit.count || 1) / maxCount) * 150;
              
              return (
                <View key={index} style={styles.barWrapper}>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, { height: height }]}>
                      <Text style={styles.barValue}>{visit.count || 1}</Text>
                    </View>
                  </View>
                  <Text style={styles.barLabel}>
                    {new Date(visit.date).getDate()}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.chartFooter}>
            <Text style={styles.chartFooterTitle}>
              Average: {(getTotalVisits() / visits.length).toFixed(1)} visits/day
            </Text>
            <Text style={styles.chartFooterDescription}>
              Your strategic visits make a big difference in farmer success and growth
            </Text>
          </View>
        </View>

        {/* Add Visit Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonIcon}>➕</Text>
          <Text style={styles.addButtonText}>Record New Visit</Text>
        </TouchableOpacity>

        {/* Info Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Text style={styles.summaryIconText}>📊</Text>
          </View>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>Field Visit Impact</Text>
            <Text style={styles.summaryText}>
              Regular field visits help monitor crop health, provide timely guidance, 
              and build strong relationships with farmers.
            </Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('CropAnalytics')}
          >
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Crop Analytics</Text>
              <Text style={styles.menuSubtitle}>View crop distribution</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👨‍🌾</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Assigned Farmers</Text>
              <Text style={styles.menuSubtitle}>View farmer list</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Visit Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Record Field Visit</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Farmer Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter farmer name"
                value={newVisit.farmerName}
                onChangeText={(text) => setNewVisit({ ...newVisit, farmerName: text })}
              />

              <Text style={styles.inputLabel}>Location *</Text>
              <TextInput
                style={styles.input}
                placeholder="Village/Area"
                value={newVisit.location}
                onChangeText={(text) => setNewVisit({ ...newVisit, location: text })}
              />

              <Text style={styles.inputLabel}>Purpose</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Reason for visit"
                multiline
                numberOfLines={3}
                value={newVisit.purpose}
                onChangeText={(text) => setNewVisit({ ...newVisit, purpose: text })}
              />

              <Text style={styles.inputLabel}>Date *</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={newVisit.date}
                onChangeText={(text) => setNewVisit({ ...newVisit, date: text })}
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleAddVisit}>
                <Text style={styles.submitButtonText}>Record Visit</Text>
              </TouchableOpacity>
            </ScrollView>
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

  /* Statistics */
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 15,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  statsSubtext: {
    fontSize: 11,
    color: '#999',
  },

  /* Chart Card */
  chartCard: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  chartHeader: {
    marginBottom: 15,
  },
  chartTabs: {
    flexDirection: 'row',
    gap: 10,
  },
  chartTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  chartTabActive: {
    backgroundColor: '#4CAF50',
  },
  chartTabText: {
    fontSize: 12,
    color: '#666',
  },
  chartTabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },

  /* Bar Chart */
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    marginVertical: 20,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 150,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  bar: {
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: 30,
    minHeight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
  },
  barValue: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },

  chartFooter: {
    marginTop: 10,
  },
  chartFooterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  chartFooterDescription: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
  },

  /* Add Button */
  addButton: {
    backgroundColor: '#2196F3',
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

  /* Summary Card */
  summaryCard: {
    backgroundColor: '#FFF9E6',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
  },
  summaryIcon: {
    marginRight: 15,
  },
  summaryIconText: {
    fontSize: 32,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },

  /* Menu */
  menuList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#999',
  },

  /* Modal */
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2196F3',
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

export default VisitFrequencyScreen;