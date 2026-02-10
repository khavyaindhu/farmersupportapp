import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

const ExpertDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.backButton}>←</Text>
          <Text style={styles.headerTitle}>🌾 Expert / Officer Dashboard</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>⚙️</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, Prakash</Text>
          <Text style={styles.welcomeSubtitle}>Welcome, Aamra</Text>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👨‍🌾</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Farmer</Text>
              <Text style={styles.menuSubtitle}>Assigned Farmers</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🌾</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>मेरे खेत</Text>
              <Text style={styles.menuSubtitle}>देखें और प्रबंधित करें</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🌱</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>फसल मार्गदर्शन</Text>
              <Text style={styles.menuSubtitle}>किसान मार्गदर्शन देखें</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>बिक और तीर्थ तीना</Text>
              <Text style={styles.menuSubtitle">एपीएमसी दरें देखें</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📋</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>सहायताक मांगण</Text>
              <Text style={styles.menuSubtitle}>Support Requests</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
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
    fontSize: 16,
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
  welcomeSection: {
    padding: 20,
    backgroundColor: '#5A8C69',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#E8F5E9',
  },
  menuList: {
    marginTop: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginRight: 15,
    width: 40,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  chevron: {
    fontSize: 24,
    color: '#999',
  },
  fieldBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#C4B896',
    opacity: 0.3,
    zIndex: -1,
  },
});

export default ExpertDashboard;
