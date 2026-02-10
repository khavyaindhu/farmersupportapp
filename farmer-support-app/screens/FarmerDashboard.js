import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

const FarmerDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.backButton}>←</Text>
          <Text style={styles.headerTitle}>🌾 Farmer Support App</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>⚙️</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, Rahul</Text>
          <Text style={styles.welcomeSubtitle}>Welcome, Aamra</Text>
        </View>

        <View style={styles.roleButtons}>
          <TouchableOpacity style={[styles.roleButton, styles.roleButtonActive]}>
            <Text style={styles.roleIcon}>👤</Text>
            <Text style={styles.roleText}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roleButton}>
            <Text style={styles.roleIcon}>👨‍💼</Text>
            <Text style={styles.roleText}>Officer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👥</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Manage Farmers</Text>
              <Text style={styles.menuSubtitle}>320 Farmers</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>320</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👨‍🌾</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Manage Experts</Text>
              <Text style={styles.menuSubtitle}>15 Experts</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>15</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🌱</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Crop Guidance</Text>
              <Text style={styles.menuSubtitle}>मार्गदर्शन देखें</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>45</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>APMC Rates</Text>
              <Text style={styles.menuSubtitle}>एपीएमसी दरें देखें</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>320</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>320 min</Text>
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
  roleButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  roleButtonActive: {
    backgroundColor: '#4CAF50',
  },
  roleIcon: {
    fontSize: 24,
  },
  roleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  menuList: {
    marginTop: 20,
    paddingHorizontal: 20,
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
  countBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  countText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    color: '#999',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCC',
  },
  dotActive: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
  timeContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
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

export default FarmerDashboard;
