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

const FarmerDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

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

  const showModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const getWeatherInfo = () => {
    return `📍 ${userData?.district}, ${userData?.state}

🌡️ Current Temperature: 28°C
💧 Humidity: 65%
💨 Wind Speed: 12 km/h
☁️ Conditions: Partly Cloudy

📅 5-Day Forecast:
• Mon: 30°C - Sunny ☀️
• Tue: 28°C - Cloudy ☁️
• Wed: 26°C - Rainy 🌧️
• Thu: 27°C - Partly Cloudy ⛅
• Fri: 29°C - Sunny ☀️

💡 Farming Tip: Good weather conditions for irrigation this week.`;
  };

  const getMarketInfo = () => {
    return `📊 Today's APMC Market Prices
📍 ${userData?.district} Mandi

🌾 Cereals:
• Wheat: ₹2,150/quintal
• Rice (Paddy): ₹1,940/quintal
• Maize: ₹1,850/quintal

🫘 Pulses:
• Tur Dal: ₹6,200/quintal
• Moong: ₹7,500/quintal
• Chana: ₹5,100/quintal

🥬 Vegetables:
• Tomato: ₹25/kg
• Onion: ₹30/kg
• Potato: ₹22/kg

📈 Trend: Prices stable compared to last week
🔔 Best time to sell: Wheat & Pulses`;
  };

  const getGovernmentSchemes = () => {
    return `🏛️ Available Government Schemes

1. PM-KISAN
💰 ₹6,000/year in 3 installments
✅ All landholding farmers eligible

2. Pradhan Mantri Fasal Bima Yojana
🛡️ Crop insurance at 2% premium
📋 Covers natural calamities

3. Soil Health Card Scheme
🧪 Free soil testing
📊 Get fertilizer recommendations

4. KCC (Kisan Credit Card)
💳 Easy credit at 7% interest
💵 Up to ₹3 lakh loan

5. National Agriculture Market (e-NAM)
🌐 Online trading platform
📱 Better price discovery

📞 For more info: Call 1800-180-1551`;
  };

  const getNotifications = () => {
    return `🔔 Recent Notifications

⚠️ Weather Alert (2 hours ago)
Heavy rainfall expected in next 48 hours. Take necessary precautions for standing crops.

💰 Market Update (Today)
Wheat prices increased by ₹50/quintal in local mandi. Good time to sell.

🏛️ New Scheme (Yesterday)
PM-KISAN 16th installment released. Check your bank account.

📢 General (2 days ago)
Free soil health camp organized at district office on 20th Feb.

🌾 Advisory (3 days ago)
Apply pre-monsoon fertilizers for better yield this season.`;
  };

  const getExpertInfo = () => {
    return `👨‍🌾 Agricultural Expert Support

📞 Helpline Numbers:
• Kisan Call Center: 1800-180-1551
• Agricultural Officer: +91-XXXXXXXXXX

💬 Expert Services:
• Crop disease diagnosis
• Pest management advice
• Soil health consultation
• Best practices guidance
• Irrigation planning

📅 Schedule:
• Monday - Friday: 9 AM - 6 PM
• Saturday: 9 AM - 2 PM
• Emergency: 24/7 helpline

🌐 Online Consultation:
Visit our website or use the video call feature for virtual expert support.

💡 Pro Tip: Take clear photos of affected crops for faster diagnosis.`;
  };

  const getHelpInfo = () => {
    return `❓ Help & Support

📚 Frequently Asked Questions:

Q: How do I update my profile?
A: Go to 'My Profile' > Edit details > Save

Q: How to check market prices?
A: Navigate to 'Market Prices' for daily APMC rates

Q: Where can I find weather forecasts?
A: Check 'Weather Information' for 5-day forecast

Q: How to apply for schemes?
A: Visit 'Government Schemes' for eligibility and application process

📞 Contact Support:
• Email: support@farmersapp.gov.in
• Phone: 1800-XXX-XXXX
• WhatsApp: +91-XXXXXXXXXX

⏰ Support Hours:
Mon-Sat: 9 AM - 6 PM

🌐 Visit our website:
www.farmersupportapp.gov.in`;
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
          {/* <MenuItem
            icon="📍"
            title="Location Settings"
            subtitle={`${userData?.district}, ${userData?.state}`}
            onPress={() => Alert.alert('Location', 'Location settings coming soon')}
          /> */}

          {/* 3. Crop Module - KEEP AS IS */}
          <MenuItem
            icon="🌾"
            title="My Crops"
            subtitle="Manage your crops"
            onPress={() => navigation.navigate('ManageCrops')}
          />

          {/* 4. Crop Information - KEEP AS IS */}
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
            onPress={() => showModal('Weather Information', getWeatherInfo())}
          />

          {/* 6. Market Module */}
          <MenuItem
            icon="📊"
            title="Market Prices (Mandi)"
            subtitle="Daily APMC rates"
            onPress={() => showModal('Market Prices', getMarketInfo())}
          />

          {/* 7. Government Support */}
          <MenuItem
            icon="🏛️"
            title="Government Schemes"
            subtitle="Subsidies & insurance"
            onPress={() => showModal('Government Schemes', getGovernmentSchemes())}
          />

          {/* 8. Notifications */}
          <MenuItem
            icon="🔔"
            title="Notifications & Alerts"
            subtitle="Weather, prices, schemes"
            badge="3"
            onPress={() => showModal('Notifications', getNotifications())}
          />

          {/* 9. Expert Support */}
          <MenuItem
            icon="👨‍💼"
            title="Contact Expert"
            subtitle="Get agricultural guidance"
            onPress={() => showModal('Contact Expert', getExpertInfo())}
          />

          {/* 10. Help & Support */}
          <MenuItem
            icon="❓"
            title="Help & Support"
            subtitle="FAQ and contact support"
            onPress={() => showModal('Help & Support', getHelpInfo())}
          />
        </View>
      </ScrollView>

      {/* INFORMATION MODAL */}
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

  /* Modal Styles */

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

export default FarmerDashboard;