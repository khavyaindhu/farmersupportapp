import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

const ManageCropsScreen = ({ navigation }) => {
  const crops = [
    { id: 1, name: 'Onion', icon: '🧅', status: 'Edit' },
    { id: 2, name: 'Tomato', icon: '🍅', status: 'Delete' },
    { id: 3, name: 'Grapes', icon: '🍇', status: 'Delete' },
    { id: 4, name: 'Sugarcane', icon: '🌿', status: 'Delete' },
    { id: 5, name: 'Wheat', icon: '🌾', status: 'Delete' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Manage Crops</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>📊</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.distributionCard}>
            <Text style={styles.distributionTitle}>Distribution</Text>
            <View style={styles.distributionStats}>
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.statText}>Visits</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: '#4ECDC4' }]} />
                <Text style={styles.statText}>Territory</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, styles.tabActive]}>
              <Text style={[styles.tabText, styles.tabTextActive]}>Field Owners</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.imageTitle}>Tomato Last Spots ⚠️(गहू)</Text>
          <Text style={styles.imageSubtitle}>कृपया विवरण देखें से चुनाव के साथ लिये देखें</Text>
          
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <View style={styles.leafPattern}>
                <Text style={styles.leafEmoji}>🍃</Text>
              </View>
              <Text style={styles.imageCaptionMain}>Properly not the population</Text>
              <Text style={styles.imageCaptionSub}>Details will be or Identified later</Text>
              <Text style={styles.imageCaptionDetails}>
                कृषि विवाह का चुनाव होने भी वर्णन जारी किया है,
                सहायताक भी बचाने में भ्रम्णः सहायता करें।
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewImageButton}>
            <Text style={styles.viewImageButtonText}>View as Images</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alertsSection}>
          <View style={styles.alertsHeader}>
            <Text style={styles.alertsTitle}>Alerts & Tips</Text>
            <Text style={styles.alertsDate}>16 April 2</Text>
          </View>
          
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <Text style={styles.alertText}>
              मौसम पूर्व साथ उद्योगास महत्वपूर्णता{'\n'}
              Weather update: Heavy rainfall this...
            </Text>
          </View>
        </View>

        <View style={styles.cropsSection}>
          <View style={styles.cropsSectionHeader}>
            <Text style={styles.cropsSectionTitle}>Crop</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropsList}>
            {crops.map((crop) => (
              <View key={crop.id} style={styles.cropCard}>
                <Text style={styles.cropIcon}>{crop.icon}</Text>
                <Text style={styles.cropName}>{crop.name}</Text>
                <TouchableOpacity style={styles.cropButton}>
                  <Text style={styles.cropButtonText}>{crop.status}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.fieldBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
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
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  topSection: {
    padding: 20,
  },
  distributionCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  distributionStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  imageSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  imageSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  imageContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  imagePlaceholder: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  leafPattern: {
    marginBottom: 15,
  },
  leafEmoji: {
    fontSize: 48,
  },
  imageCaptionMain: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  imageCaptionSub: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageCaptionDetails: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  viewImageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewImageButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  alertsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  alertsDate: {
    fontSize: 12,
    color: '#666',
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
  cropsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  cropsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cropsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cropsList: {
    flexDirection: 'row',
  },
  cropCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 10,
  },
  cropButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cropButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#856404',
  },
  fieldBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#C4B896',
    opacity: 0.3,
    zIndex: -1,
  },
});

export default ManageCropsScreen;
