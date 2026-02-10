import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';

const FarmerDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.backButton}>←</Text>
          <Text style={styles.headerTitle}>🌾 Farmer Support App</Text>
          <Text style={styles.icon}>⚙️</Text>
        </View>
      </View>

      <ScrollView>

        {/* BANNER */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
          }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.welcomeTitle}>Welcome, Rahul</Text>
            <Text style={styles.welcomeSubtitle}>Welcome, Admin</Text>
          </View>
        </ImageBackground>

        {/* ROLE CARDS */}
        <View style={styles.roleButtons}>
          <TouchableOpacity style={[styles.roleCard, styles.roleActive]}>
            <Text style={styles.roleIcon}>👤</Text>
            <Text style={styles.roleText}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roleCard}>
            <Text style={styles.roleIcon}>👨‍💼</Text>
            <Text style={styles.roleTextDark}>Officer</Text>
          </TouchableOpacity>
        </View>

        {/* MENU */}
        <View style={styles.menuList}>
          <MenuItem icon="👥" title="Manage Farmers" count="320" />
          <MenuItem icon="👨‍🌾" title="Manage Experts" count="15" />
          <MenuItem icon="🌱" title="Crop Guidance" count="45" />
          <MenuItem icon="📊" title="APMC Rates" count="45" />
        </View>

      </ScrollView>
    </View>
  );
};

/* -------- COMPONENT -------- */

const MenuItem = ({ icon, title, count }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={styles.menuTitle}>{title}</Text>

    <View style={styles.countBadge}>
      <Text style={styles.countText}>{count}</Text>
    </View>

    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F2',
  },

  header: {
    backgroundColor: '#1F5C45',
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    color: '#FFF',
    fontSize: 22,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },

  icon: {
    fontSize: 20,
    color: '#FFF',
  },

  /* Banner */

  banner: {
    height: 160,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },

  welcomeTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },

  welcomeSubtitle: {
    color: '#E0F2E9',
    fontSize: 14,
    marginTop: 4,
  },

  /* Role Cards */

  roleButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },

  roleCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 3,
  },

  roleActive: {
    backgroundColor: '#4CAF50',
  },

  roleIcon: {
    fontSize: 22,
  },

  roleText: {
    color: '#FFF',
    fontWeight: '600',
  },

  roleTextDark: {
    color: '#333',
    fontWeight: '600',
  },

  /* Menu */

  menuList: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },

  menuItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },

  menuIcon: {
    fontSize: 30,
    marginRight: 14,
    width: 36,
  },

  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2F6B4F',
  },

  countBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 10,
  },

  countText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },

  chevron: {
    fontSize: 22,
    color: '#999',
  },
});

export default FarmerDashboard;