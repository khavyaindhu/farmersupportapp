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

const ExpertDashboard = ({ navigation }) => {
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

  const getAssignedFarmersInfo = () => {
    return `👨‍🌾 Assigned Farmers - ${userData?.district}

📊 Total Farmers: 87

📍 Zone-wise Distribution:
• Zone A (North): 23 farmers
• Zone B (South): 19 farmers
• Zone C (East): 25 farmers
• Zone D (West): 20 farmers

🌾 Crop-wise Distribution:
• Wheat: 32 farmers
• Rice: 28 farmers
• Vegetables: 15 farmers
• Pulses: 12 farmers

📈 Recent Activities:
• New registrations this week: 3
• Active queries: 12
• Scheduled visits: 8

⚠️ Action Required:
• 5 farmers need soil testing
• 3 farmers awaiting scheme approval
• 7 farmers requested field visit

💡 Tip: Check pending queries for urgent support requests.`;
  };

  const getFarmerQueriesInfo = () => {
    return `❓ Farmer Queries (12 Pending)

🔴 High Priority (3):
1. Pest infestation in wheat crop
   Farmer: Ramesh Kumar | 2 hours ago
   Status: Awaiting response

2. Crop insurance claim assistance
   Farmer: Sunita Devi | 4 hours ago
   Status: Awaiting response

3. Irrigation system issue
   Farmer: Vijay Singh | 6 hours ago
   Status: Awaiting response

🟡 Medium Priority (5):
• Fertilizer recommendation query
• Government scheme eligibility
• Soil health card request
• Market price information
• Seed variety selection

🟢 Low Priority (4):
• General farming tips
• Weather forecast inquiry
• Training session schedule
• Certificate request

📞 Response Target: 24 hours
⏰ Avg Response Time: 8 hours

💬 Quick Action: Tap to view and respond to queries`;
  };

  const getCropGuidanceInfo = () => {
    return `🌱 Crop Guidance Services

📚 Expert Advice Areas:

1. Crop Selection
• Soil-based recommendations
• Season-appropriate crops
• Market demand analysis

2. Pest & Disease Management
• Early identification
• Treatment protocols
• Preventive measures

3. Fertilizer Management
• Soil test analysis
• NPK recommendations
• Organic alternatives

4. Irrigation Planning
• Water requirement calculation
• Scheduling advice
• Efficient methods

5. Harvest Timing
• Maturity indicators
• Market timing
• Storage guidance

📊 This Month's Stats:
• Guidance sessions: 45
• Success rate: 92%
• Farmer satisfaction: 4.7/5

📝 Recent Topics:
• Wheat rust prevention
• Organic farming transition
• Drip irrigation setup

🎯 Goal: Support farmers for better yields`;
  };

  const getDiseaseMonitoringInfo = () => {
    return `🦠 Crop Disease Monitoring

⚠️ Active Alerts (3):

1. 🔴 Yellow Rust in Wheat
   Location: North Zone (15 cases)
   Severity: High
   Action: Fungicide spray recommended

2. 🟡 Bacterial Blight in Rice
   Location: East Zone (8 cases)
   Severity: Medium
   Action: Field inspection scheduled

3. 🟡 Leaf Curl in Tomato
   Location: South Zone (5 cases)
   Severity: Medium
   Action: Vector control advised

📊 Disease Trends:
• Total cases this month: 28
• Resolved: 22
• Under treatment: 6

🔍 Monitoring Areas:
• Regular field surveys
• Farmer reports tracking
• Weather-disease correlation
• Early warning system

💊 Treatment Protocols:
• Chemical treatments
• Bio-pesticides
• Cultural practices
• Resistant varieties

📱 Report Disease: Farmers can submit photos and descriptions for quick diagnosis

🎯 Prevention Focus: Early detection saves crops`;
  };

  const getWeatherInfo = () => {
    return `🌤️ Weather Information
📍 ${userData?.district} Zone

🌡️ Current Conditions:
• Temperature: 26°C
• Humidity: 70%
• Wind: 10 km/h (NE)
• Conditions: Partly Cloudy

📅 7-Day Forecast:
Mon: 28°C - Sunny ☀️
Tue: 27°C - Partly Cloudy ⛅
Wed: 25°C - Rainy 🌧️ (15mm)
Thu: 24°C - Rainy 🌧️ (20mm)
Fri: 26°C - Cloudy ☁️
Sat: 28°C - Sunny ☀️
Sun: 29°C - Sunny ☀️

⚠️ Weather Alerts:
• Moderate rainfall expected Wed-Thu
• Advise farmers to postpone spraying
• Good for transplanting after rainfall

🌾 Farming Impact:
✅ Good for: Post-rain sowing
⚠️ Delay: Pesticide application
✅ Recommended: Drainage preparation

📲 Alert Status: Auto-notifications ON
Send weather alerts to all farmers in your zone

💡 Advisory: Share rain forecast with farmers today`;
  };

  const getMarketPricesInfo = () => {
    return `📊 APMC Market Prices
📍 ${userData?.district} Mandi

🌾 Today's Rates:

Cereals:
• Wheat: ₹2,150/quintal (↑ ₹50)
• Rice (Paddy): ₹1,940/quintal (→)
• Maize: ₹1,850/quintal (↓ ₹20)

Pulses:
• Tur Dal: ₹6,200/quintal (↑ ₹100)
• Moong: ₹7,500/quintal (↑ ₹150)
• Chana: ₹5,100/quintal (→)

Vegetables:
• Tomato: ₹25/kg (↑ ₹5)
• Onion: ₹30/kg (→)
• Potato: ₹22/kg (↓ ₹3)

📈 Weekly Trends:
• Wheat prices rising steadily
• High demand for pulses
• Vegetable prices stable

🎯 Recommendations for Farmers:
• Good time to sell: Wheat, Tur, Moong
• Hold if possible: Maize
• Monitor daily: Vegetables

📱 Share Info: Send price updates to farmers via notification

🔔 Auto-update: Prices refresh daily at 10 AM

💡 Pro Tip: Advise farmers on optimal selling time`;
  };

  const getGovernmentSchemesInfo = () => {
    return `🏛️ Government Schemes Information

📋 Active Schemes for Farmers:

1. PM-KISAN
💰 ₹6,000/year direct benefit
✅ Status: 16th installment released
📊 Your zone: 78/87 farmers enrolled

2. Pradhan Mantri Fasal Bima Yojana
🛡️ Crop insurance at subsidized rates
📝 Pending applications: 12
⏰ Deadline: 31st March

3. Soil Health Card Scheme
🧪 Free soil testing
📍 Next camp: 25th February
✅ Cards issued: 65 farmers

4. Kisan Credit Card (KCC)
💳 Easy agricultural credit
💵 Interest subsidy: 3%
📊 Active KCC: 54 farmers

5. Pradhan Mantri Kisan Samman Nidhi
📱 Direct income support
⚡ Quick registration available

📞 Helpline: 1800-180-1551

👥 Your Role:
• Help farmers with applications
• Verify documents
• Track application status
• Organize awareness camps

✅ This Month's Target:
• Enroll 10 more farmers in PM-KISAN
• Complete 15 crop insurance applications
• Issue 22 new soil health cards

💡 Action: Schedule scheme awareness session`;
  };

  const getTrainingSessionsInfo = () => {
    return `📚 Training Sessions for Farmers

📅 Upcoming Sessions:

1. Modern Irrigation Techniques
📍 Community Hall, North Zone
📆 20th February, 10:00 AM
👥 Expected: 25 farmers
Topics: Drip irrigation, sprinklers

2. Organic Farming Workshop
📍 Agricultural Office
📆 25th February, 2:00 PM
👥 Expected: 30 farmers
Topics: Composting, bio-pesticides

3. Digital Agriculture Tools
📍 District Training Center
📆 1st March, 11:00 AM
👥 Expected: 20 farmers
Topics: Mobile apps, e-NAM

✅ Completed Sessions (This Month):
• Soil Health Management - 35 farmers
• Pest Control Methods - 28 farmers
• Market Linkage - 22 farmers

📊 Training Impact:
• Total sessions: 12 this year
• Farmers trained: 340
• Satisfaction rate: 4.5/5
• Adoption rate: 78%

📝 Session Planning:
• Identify training needs
• Schedule venue & resources
• Send invitations to farmers
• Arrange expert speakers
• Collect feedback

💡 Next Steps:
• Send reminders for upcoming sessions
• Prepare training materials
• Arrange refreshments
• Update attendance register

🎯 Goal: Train all farmers in modern techniques`;
  };

  const getReportsInfo = () => {
    return `📄 Generate Reports

📊 Available Report Types:

1. Monthly Activity Report
📅 Period: January 2025
✅ Includes:
• Farmers visited: 45
• Queries resolved: 87
• Training sessions: 3
• Diseases reported: 12

2. Field Visit Report
📍 Coverage: All zones
✅ Details:
• Total visits: 45
• Crops inspected: 120 acres
• Issues identified: 18
• Recommendations given: 45

3. Scheme Implementation Report
🏛️ Government schemes:
• PM-KISAN enrollments: 8
• Crop insurance: 12 applications
• KCC issued: 6
• Soil health cards: 15

4. Disease Monitoring Report
🦠 Health status:
• Active cases: 3
• Resolved: 22
• Prevention measures: 35 farms

5. Training Impact Report
📚 Sessions conducted:
• Participants: 340
• Topics covered: 8
• Success stories: 12

📥 Export Options:
• PDF format
• Excel spreadsheet
• Email to supervisor
• Share with department

⏰ Report Schedule:
• Weekly summary: Every Monday
• Monthly report: 1st of month
• Quarterly review: Every 3 months

💡 Tip: Generate monthly report before 5th`;
  };

  const getNotificationsInfo = () => {
    return `🔔 Send Notifications to Farmers

📱 Notification Types:

1. Weather Alerts
🌧️ Rain forecast
☀️ Heat wave warnings
❄️ Cold wave alerts
💨 Storm warnings

2. Market Updates
📊 Price changes
📈 Demand trends
🏪 Mandi holidays
💰 Best selling time

3. Disease Alerts
🦠 Outbreak warnings
💊 Treatment advisories
🔍 Inspection schedules
✅ Prevention tips

4. Scheme Updates
🏛️ New schemes launched
📝 Application deadlines
✅ Approval status
💰 Payment releases

5. Training Announcements
📚 Session schedules
📍 Venue details
👥 Registration open
🎓 Certificates ready

📊 Recent Notifications:
• Weather alert sent: 2 hours ago
  Recipients: 87 farmers

• Market update: Yesterday
  Recipients: 87 farmers

• Training reminder: 2 days ago
  Recipients: 30 farmers

📈 Engagement Stats:
• Delivery rate: 98%
• Read rate: 85%
• Response rate: 45%

✍️ Compose New Notification:
• Select farmer groups
• Choose notification type
• Write clear message
• Schedule or send now

💡 Best Practices:
• Send timely information
• Keep messages concise
• Use local language
• Follow up on urgent alerts`;
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
            onPress={() => showModal('Assigned Farmers', getAssignedFarmersInfo())}
          />

          {/* 3. Farmer Queries */}
          <MenuItem
            icon="❓"
            title="Farmer Queries"
            subtitle="Pending support requests"
            badge="12"
            onPress={() => showModal('Farmer Queries', getFarmerQueriesInfo())}
          />

          {/* 4. Crop Guidance */}
          <MenuItem
            icon="🌱"
            title="Provide Crop Guidance"
            subtitle="Give expert advice"
            onPress={() => showModal('Crop Guidance', getCropGuidanceInfo())}
          />

          {/* 5. Field Visits - KEEP AS IS */}
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
            onPress={() => showModal('Disease Monitoring', getDiseaseMonitoringInfo())}
          />

          {/* 7. Weather Information */}
          <MenuItem
            icon="🌤️"
            title="Weather Information"
            subtitle="Weather for your zone"
            onPress={() => showModal('Weather Information', getWeatherInfo())}
          />

          {/* 8. Market Prices */}
          <MenuItem
            icon="📊"
            title="Market Prices (APMC)"
            subtitle="Daily mandi rates"
            onPress={() => showModal('Market Prices', getMarketPricesInfo())}
          />

          {/* 9. Government Schemes */}
          <MenuItem
            icon="🏛️"
            title="Government Schemes"
            subtitle="Share scheme information"
            onPress={() => showModal('Government Schemes', getGovernmentSchemesInfo())}
          />

          {/* 10. Training Sessions */}
          <MenuItem
            icon="📚"
            title="Training Sessions"
            subtitle="Organize farmer training"
            onPress={() => showModal('Training Sessions', getTrainingSessionsInfo())}
          />

          {/* 11. Reports */}
          <MenuItem
            icon="📄"
            title="Generate Reports"
            subtitle="Activity and progress reports"
            onPress={() => showModal('Generate Reports', getReportsInfo())}
          />

          {/* 12. Notifications */}
          <MenuItem
            icon="🔔"
            title="Send Notifications"
            subtitle="Alert farmers about updates"
            onPress={() => showModal('Send Notifications', getNotificationsInfo())}
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

export default ExpertDashboard;