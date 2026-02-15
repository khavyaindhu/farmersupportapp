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
  Modal,
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
  const [allUsers, setAllUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

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
      const farmers = users.filter(u => u.role === 'farmer');
      const officers = users.filter(u => u.role === 'officer');
      
      setAllUsers(users);
      setStats({
        totalFarmers: farmers.length,
        totalOfficers: officers.length,
        pendingQueries: 15,
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

  const showModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const getFarmersInfo = () => {
    const farmers = allUsers.filter(u => u.role === 'farmer');
    
    if (farmers.length === 0) {
      return `👨‍🌾 No Farmers Registered Yet\n\n📝 Register farmers to get started with the system.\n\nYou can add farmers through the registration process.`;
    }

    const stateGroups = {};
    farmers.forEach(farmer => {
      const state = farmer.state || 'Unknown';
      if (!stateGroups[state]) {
        stateGroups[state] = [];
      }
      stateGroups[state].push(farmer);
    });

    let info = `👨‍🌾 Registered Farmers (${farmers.length})\n\n`;
    
    info += `📍 State-wise Distribution:\n`;
    Object.keys(stateGroups).forEach(state => {
      info += `• ${state}: ${stateGroups[state].length} farmers\n`;
    });
    info += `\n`;

    info += `📋 Farmer Details:\n\n`;
    farmers.forEach((farmer, index) => {
      info += `${index + 1}. ${farmer.fullName}\n`;
      info += `   📱 ${farmer.mobileNumber}\n`;
      info += `   📧 ${farmer.email}\n`;
      info += `   📍 ${farmer.district}, ${farmer.state}\n`;
      info += `   📮 PIN: ${farmer.pincode}\n`;
      info += `   📅 Registered: ${new Date(farmer.registeredAt).toLocaleDateString()}\n`;
      info += `   ✅ Status: ${farmer.isActive ? 'Active' : 'Inactive'}\n\n`;
    });

    return info;
  };

  const getOfficersInfo = () => {
    const officers = allUsers.filter(u => u.role === 'officer');
    
    if (officers.length === 0) {
      return `👨‍💼 No Officers Registered Yet\n\n📝 Register agricultural officers to manage farmers.\n\nOfficers help provide guidance and support to farmers.`;
    }

    const stateGroups = {};
    officers.forEach(officer => {
      const state = officer.state || 'Unknown';
      if (!stateGroups[state]) {
        stateGroups[state] = [];
      }
      stateGroups[state].push(officer);
    });

    let info = `👨‍💼 Registered Officers (${officers.length})\n\n`;
    
    info += `📍 State-wise Distribution:\n`;
    Object.keys(stateGroups).forEach(state => {
      info += `• ${state}: ${stateGroups[state].length} officers\n`;
    });
    info += `\n`;

    info += `📋 Officer Details:\n\n`;
    officers.forEach((officer, index) => {
      info += `${index + 1}. ${officer.fullName}\n`;
      info += `   📱 ${officer.mobileNumber}\n`;
      info += `   📧 ${officer.email}\n`;
      info += `   📍 ${officer.district}, ${officer.state}\n`;
      info += `   📮 PIN: ${officer.pincode}\n`;
      info += `   📅 Registered: ${new Date(officer.registeredAt).toLocaleDateString()}\n`;
      info += `   ✅ Status: ${officer.isActive ? 'Active' : 'Inactive'}\n\n`;
    });

    return info;
  };

  const getLocationManagementInfo = () => {
    const states = [...new Set(allUsers.map(u => u.state).filter(Boolean))];
    const districts = [...new Set(allUsers.map(u => u.district).filter(Boolean))];

    return `📍 Location Management\n\n📊 Active Locations:\n• States: ${states.length}\n• Districts: ${districts.length}\n\n🗺️ States in System:\n${states.map(s => `• ${s}`).join('\n') || '• No states registered yet'}\n\n🏘️ Districts in System:\n${districts.map(d => `• ${d}`).join('\n') || '• No districts registered yet'}\n\n📈 User Distribution by Location:\n${states.map(state => {
  const count = allUsers.filter(u => u.state === state).length;
  return `• ${state}: ${count} users`;
}).join('\n') || '• No data available'}\n\n💡 Note: Locations are automatically added when users register.\n\n🔧 Features Coming Soon:\n• Add/Edit locations manually\n• Set regional officers\n• Location-based analytics`;
  };

  const getActivityLogsInfo = () => {
    return `📋 Activity Logs\n\n👥 User Activity Summary:\n\n📊 Registration Activity:\n• Total Registrations: ${allUsers.length}\n• Farmers: ${stats.totalFarmers}\n• Officers: ${stats.totalOfficers}\n• Admins: ${allUsers.filter(u => u.role === 'admin').length}\n\n📅 Recent Registrations:\n${allUsers
  .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
  .slice(0, 5)
  .map((user, index) => {
    const date = new Date(user.registeredAt);
    return `${index + 1}. ${user.fullName} (${user.role})\n   📅 ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}\n   📍 ${user.district}, ${user.state}`;
  }).join('\n\n') || '• No recent activity'}\n\n🔐 Login Activity:\n• Active Sessions: 1\n• Last Login: Current session\n\n📈 Usage Statistics:\n• User engagement: High\n• System stability: Excellent\n\n💡 Insights:\n• Active users: ${allUsers.filter(u => u.isActive).length}\n• Total registered: ${allUsers.length}`;
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

        <View style={styles.menuList}>
          <MenuItem
            title="Manage Farmers"
            icon="👩‍🌾"
            subtitle={`${stats.totalFarmers} registered farmers`}
            onPress={() => showModal('Manage Farmers', getFarmersInfo())}
          />

          <MenuItem
            title="Manage Officers"
            icon="🧑‍💼"
            subtitle={`${stats.totalOfficers} agricultural officers`}
            onPress={() => showModal('Manage Officers', getOfficersInfo())}
          />

          <MenuItem
            title="Location Management"
            icon="📍"
            subtitle="Manage states & districts"
            onPress={() => showModal('Location Management', getLocationManagementInfo())}
          />

          <MenuItem
            title="Crop Categories"
            icon="🌾"
            subtitle="Manage crop types & info"
            onPress={() => Alert.alert('Crops', 'Crop management coming soon')}
          />

          <MenuItem
            title="APMC Market Rates"
            icon="📊"
            subtitle="Update daily mandi prices"
            onPress={() => Alert.alert('Market', 'Market management coming soon')}
          />

          <MenuItem
            title="Government Schemes"
            icon="🏛️"
            subtitle="Manage subsidies & insurance"
            onPress={() => Alert.alert('Schemes', 'Scheme management coming soon')}
          />

          <MenuItem
            title="Weather Information"
            icon="🌤️"
            subtitle="Weather data & alerts"
            onPress={() => Alert.alert('Weather', 'Weather management coming soon')}
          />

          <MenuItem
            title="Disease Alerts"
            icon="🦠"
            subtitle="Crop disease monitoring"
            badge="5"
            onPress={() => Alert.alert('Disease', 'Disease alert management coming soon')}
          />

          <MenuItem
            title="Send Notifications"
            icon="🔔"
            subtitle="Broadcast alerts to users"
            onPress={() => Alert.alert('Notifications', 'Notification system coming soon')}
          />

          <MenuItem
            title="Pending Queries"
            icon="❓"
            subtitle="Farmer support requests"
            badge={stats.pendingQueries.toString()}
            onPress={() => Alert.alert('Queries', 'Query management coming soon')}
          />

          <MenuItem
            title="Reports & Analytics"
            icon="📈"
            subtitle="System statistics & insights"
            onPress={() => Alert.alert('Reports', 'Reports coming soon')}
          />

          <MenuItem
            title="System Settings"
            icon="⚙️"
            subtitle="Configure application"
            onPress={() => Alert.alert('Settings', 'Settings coming soon')}
          />

          <MenuItem
            title="Activity Logs"
            icon="📋"
            subtitle="Track user activities"
            onPress={() => showModal('Activity Logs', getActivityLogsInfo())}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalContent.title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>{modalContent.content}</Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.okButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1F5C45',
    flex: 1,
  },

  closeButton: {
    fontSize: 24,
    color: '#666',
    fontWeight: '600',
  },

  modalBody: {
    padding: 20,
  },

  modalText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },

  okButton: {
    backgroundColor: '#1F5C45',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  okButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminDashboard;