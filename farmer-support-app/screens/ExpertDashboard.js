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

const ExpertDashboard = ({ navigation }) => {
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
          <Text style={styles.headerTitle}>🌾 Expert / Officer</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* BANNER */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8',
          }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.bannerTitle}>
              Welcome, {userData?.fullName || 'Officer'}
            </Text>
            <Text style={styles.bannerSub}>
              Agricultural Officer - {userData?.district}
            </Text>
          </View>
        </ImageBackground>

        {/* OFFICER FEATURES MENU */}
        <View style={styles.menuList}>
          {/* 1. My Profile */}
          <MenuItem
            icon="👤"
            title="My Profile"
            subtitle="View and edit profile"
            onPress={() => navigation.navigate('Profile')}
          />

          {/* 2. Assigned Farmers */}
          <MenuItem
            icon="👨‍🌾"
            title="Assigned Farmers"
            subtitle="View and manage farmers"
            badge="87"
            onPress={() => Alert.alert('Farmers', 'Farmer list coming soon')}
          />

          {/* 3. Farmer Queries */}
          <MenuItem
            icon="❓"
            title="Farmer Queries"
            subtitle="Pending support requests"
            badge="12"
            onPress={() => Alert.alert('Queries', 'Query management coming soon')}
          />

          {/* 4. Crop Guidance */}
          <MenuItem
            icon="🌱"
            title="Provide Crop Guidance"
            subtitle="Give expert advice"
            onPress={() => Alert.alert('Guidance', 'Crop guidance module coming soon')}
          />

          {/* 5. Field Visits */}
          <MenuItem
            icon="📍"
            title="Field Visit Schedule"
            subtitle="Plan and track visits"
           onPress={() => navigation.navigate('VisitFrequency')}
          />

          {/* 6. Disease Monitoring */}
          <MenuItem
            icon="🦠"
            title="Disease Monitoring"
            subtitle="Track crop diseases"
            badge="3"
            onPress={() => Alert.alert('Disease', 'Disease monitoring coming soon')}
          />

          {/* 7. Weather Information */}
          <MenuItem
            icon="🌤️"
            title="Weather Information"
            subtitle="Weather for your zone"
            onPress={() => Alert.alert('Weather', 'Weather module coming soon')}
          />

          {/* 8. Market Prices */}
          <MenuItem
            icon="📊"
            title="Market Prices (APMC)"
            subtitle="Daily mandi rates"
            onPress={() => Alert.alert('Market', 'Market module coming soon')}
          />

          {/* 9. Government Schemes */}
          <MenuItem
            icon="🏛️"
            title="Government Schemes"
            subtitle="Share scheme information"
            onPress={() => Alert.alert('Schemes', 'Schemes module coming soon')}
          />

          {/* 10. Training Sessions */}
          <MenuItem
            icon="📚"
            title="Training Sessions"
            subtitle="Organize farmer training"
            onPress={() => Alert.alert('Training', 'Training module coming soon')}
          />

          {/* 11. Reports */}
          <MenuItem
            icon="📄"
            title="Generate Reports"
            subtitle="Activity and progress reports"
            onPress={() => Alert.alert('Reports', 'Report module coming soon')}
          />

          {/* 12. Notifications */}
          <MenuItem
            icon="🔔"
            title="Send Notifications"
            subtitle="Alert farmers about updates"
            onPress={() => Alert.alert('Notifications', 'Notification module coming soon')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

/* ---------------- COMPONENT ---------------- */

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

/* ---------------- STYLES ---------------- */

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
    height: 165,
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

  bannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },

  bannerSub: {
    color: '#E0F2E9',
    fontSize: 14,
    marginTop: 5,
  },

  /* Menu */

  menuList: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  menuIcon: {
    fontSize: 30,
    marginRight: 15,
    width: 40,
    textAlign: 'center',
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F6B4F',
    marginBottom: 3,
  },

  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },

  badge: {
    backgroundColor: '#2196F3',
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

export default ExpertDashboard;