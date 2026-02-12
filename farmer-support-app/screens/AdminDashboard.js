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

const AdminDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalOfficers: 0,
    pendingQueries: 0,
  });

  useEffect(() => {
    loadUserData();
    loadStats();
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

  const loadStats = async () => {
    try {
      const users = await StorageService.getAllUsers();
      const farmers = users.filter(u => u.role === 'farmer').length;
      const officers = users.filter(u => u.role === 'officer').length;
      
      setStats({
        totalFarmers: farmers,
        totalOfficers: officers,
        pendingQueries: 15, // This would come from a queries database
      });
    } catch (error) {
      console.error('Error loading stats:', error);
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
        <View style={styles.profileRow}>
          <View style={styles.profileLeft}>
            <Text style={styles.adminEmoji}>👨‍💼</Text>
            <Text style={styles.profileName}>
              {userData?.fullName || 'Admin'}
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.icon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* BANNER IMAGE */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
          }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.bannerTitle}>
              Welcome, {userData?.fullName || 'Admin'}
            </Text>
            <Text style={styles.bannerSub}>
              Manage Agriculture & Support System
            </Text>
          </View>
        </ImageBackground>

        {/* STATISTICS CARDS */}
        <View style={styles.statsContainer}>
          <StatsCard
            icon="👨‍🌾"
            title="Total Farmers"
            count={stats.totalFarmers}
            color="#4CAF50"
          />
          <StatsCard
            icon="👨‍💼"
            title="Total Officers"
            count={stats.totalOfficers}
            color="#2196F3"
          />
          <StatsCard
            icon="❓"
            title="Pending Queries"
            count={stats.pendingQueries}
            color="#FF9800"
          />
        </View>

        {/* ADMIN FEATURES MENU */}
        <View style={styles.menuList}>
          {/* 1. User Management */}
          <MenuItem
            title="Manage Farmers"
            icon="👩‍🌾"
            subtitle={`${stats.totalFarmers} registered farmers`}
            onPress={() => Alert.alert('Farmers', 'Farmer management coming soon')}
          />

          <MenuItem
            title="Manage Officers"
            icon="🧑‍💼"
            subtitle={`${stats.totalOfficers} agricultural officers`}
            onPress={() => Alert.alert('Officers', 'Officer management coming soon')}
          />

          {/* 2. Location Management */}
          <MenuItem
            title="Location Management"
            icon="📍"
            subtitle="Manage states & districts"
            onPress={() => Alert.alert('Location', 'Location management coming soon')}
          />

          {/* 3. Crop Management */}
          <MenuItem
            title="Crop Categories"
            icon="🌾"
            subtitle="Manage crop types & info"
            onPress={() => Alert.alert('Crops', 'Crop management coming soon')}
          />

          {/* 4. Market Management */}
          <MenuItem
            title="APMC Market Rates"
            icon="📊"
            subtitle="Update daily mandi prices"
            onPress={() => Alert.alert('Market', 'Market management coming soon')}
          />

          {/* 5. Government Schemes */}
          <MenuItem
            title="Government Schemes"
            icon="🏛️"
            subtitle="Manage subsidies & insurance"
            onPress={() => Alert.alert('Schemes', 'Scheme management coming soon')}
          />

          {/* 6. Weather Management */}
          <MenuItem
            title="Weather Information"
            icon="🌤️"
            subtitle="Weather data & alerts"
            onPress={() => Alert.alert('Weather', 'Weather management coming soon')}
          />

          {/* 7. Disease Alerts */}
          <MenuItem
            title="Disease Alerts"
            icon="🦠"
            subtitle="Crop disease monitoring"
            badge="5"
            onPress={() => Alert.alert('Disease', 'Disease alert management coming soon')}
          />

          {/* 8. Notifications */}
          <MenuItem
            title="Send Notifications"
            icon="🔔"
            subtitle="Broadcast alerts to users"
            onPress={() => Alert.alert('Notifications', 'Notification system coming soon')}
          />

          {/* 9. Queries & Support */}
          <MenuItem
            title="Pending Queries"
            icon="❓"
            subtitle="Farmer support requests"
            badge={stats.pendingQueries.toString()}
            onPress={() => Alert.alert('Queries', 'Query management coming soon')}
          />

          {/* 10. Reports & Analytics */}
          <MenuItem
            title="Reports & Analytics"
            icon="📈"
            subtitle="System statistics & insights"
            onPress={() => Alert.alert('Reports', 'Reports coming soon')}
          />

          {/* 11. Settings */}
          <MenuItem
            title="System Settings"
            icon="⚙️"
            subtitle="Configure application"
            onPress={() => Alert.alert('Settings', 'Settings coming soon')}
          />

          {/* 12. User Logs */}
          <MenuItem
            title="Activity Logs"
            icon="📋"
            subtitle="Track user activities"
            onPress={() => Alert.alert('Logs', 'Activity logs coming soon')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatsCard = ({ icon, title, count, color }) => (
  <View style={[styles.statsCard, { borderLeftColor: color }]}>
    <Text style={styles.statsIcon}>{icon}</Text>
    <View style={styles.statsTextContainer}>
      <Text style={styles.statsCount}>{count}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  </View>
);

const MenuItem = ({ title, icon, subtitle, badge, onPress }) => (
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

  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  adminEmoji: {
    fontSize: 28,
    marginRight: 8,
  },

  profileName: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },

  icon: {
    fontSize: 20,
  },

  /* Banner */

  banner: {
    height: 170,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
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

  /* Statistics Cards */

  statsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statsCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 4,
  },

  statsIcon: {
    fontSize: 36,
    marginRight: 15,
  },

  statsTextContainer: {
    flex: 1,
  },

  statsCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F5C45',
  },

  statsTitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  /* Menu */

  menuList: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 40,
  },

  menuItem: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },

  menuIcon: {
    fontSize: 22,
    marginRight: 12,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },

  badge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
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

export default AdminDashboard;