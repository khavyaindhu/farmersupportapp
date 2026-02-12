import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import StorageService from '../services/StorageService';

const FarmerDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await StorageService.getCurrentUser();
      console.log('Current user:', currentUser);
      
      if (currentUser) {
        setUserData(currentUser);
      } else {
        Alert.alert('Error', 'No user logged in');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await StorageService.logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Farmer Support App</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
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
            <Text style={styles.welcomeTitle}>
              Welcome, {userData?.fullName || 'Farmer'}
            </Text>
            <Text style={styles.welcomeSubtitle}>
              {userData?.district}, {userData?.state}
            </Text>
          </View>
        </ImageBackground>

        {/* FARMER FEATURES MENU */}
        <View style={styles.menuList}>
          {/* 1. My Profile */}
          <MenuItem
            icon="👤"
            title="My Profile"
            subtitle="View and edit profile"
            onPress={() => navigation.navigate('Profile')}
          />

          {/* 2. Location Module */}
          <MenuItem
            icon="📍"
            title="Location Settings"
            subtitle={`${userData?.district}, ${userData?.state}`}
            onPress={() => Alert.alert('Location', 'Location module coming soon')}
          />

          {/* 3. Crop Module */}
          <MenuItem
            icon="🌾"
            title="My Crops"
            subtitle="Manage your crops"
            onPress={() => navigation.navigate('ManageCrops')}
          />

          {/* 4. Crop Information */}
          <MenuItem
            icon="📚"
            title="Crop Information"
            subtitle="Get crop guidance"
          onPress={() => navigation.navigate('CropAnalytics')}
          />

          {/* 5. Weather Module */}
          <MenuItem
            icon="🌤️"
            title="Weather Information"
            subtitle="Current weather & forecast"
            onPress={() => Alert.alert('Weather', 'Weather module coming soon')}
          />

          {/* 6. Market Module */}
          <MenuItem
            icon="📊"
            title="Market Prices (Mandi)"
            subtitle="Daily APMC rates"
            onPress={() => Alert.alert('Market', 'Market module coming soon')}
          />

          {/* 7. Government Support */}
          <MenuItem
            icon="🏛️"
            title="Government Schemes"
            subtitle="Subsidies & insurance"
            onPress={() => Alert.alert('Schemes', 'Government schemes coming soon')}
          />

          {/* 8. Notifications */}
          <MenuItem
            icon="🔔"
            title="Notifications & Alerts"
            subtitle="Weather, prices, schemes"
            badge="3"
            onPress={() => Alert.alert('Notifications', 'Notification module coming soon')}
          />

          {/* 9. Expert Support */}
          <MenuItem
            icon="👨‍💼"
            title="Contact Expert"
            subtitle="Get agricultural guidance"
            onPress={() => Alert.alert('Expert', 'Expert support coming soon')}
          />

          {/* 10. Help & Support */}
          <MenuItem
            icon="❓"
            title="Help & Support"
            subtitle="FAQ and contact support"
            onPress={() => Alert.alert('Help', 'Help module coming soon')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

/* -------- COMPONENTS -------- */

const MenuItem = ({ icon, title, subtitle, badge, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>

    {badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}

    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F2',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 16,
    color: '#666',
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

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2F6B4F',
  },

  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },

  badge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },

  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  chevron: {
    fontSize: 22,
    color: '#999',
  },
});

export default FarmerDashboard;