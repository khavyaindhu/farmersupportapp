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
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOVERNMENT_SCHEMES = [
  {
    id: 'pm_kisan',
    icon: '🌾',
    name: 'PM-KISAN',
    benefit: '₹6,000/year in 3 installments',
    description: 'Direct income support to all landholding farmers. Eligible farmers receive ₹2,000 every 4 months directly to their bank account.',
    eligibility: 'All landholding farmer families',
  },
  {
    id: 'pmfby',
    icon: '🛡️',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    benefit: 'Crop insurance at 2% premium',
    description: 'Comprehensive crop insurance covering losses due to natural calamities, pests & diseases. Very low premium for farmers.',
    eligibility: 'All farmers growing notified crops',
  },
  {
    id: 'soil_health',
    icon: '🧪',
    name: 'Soil Health Card Scheme',
    benefit: 'Free soil testing & recommendations',
    description: 'Free soil testing every 2 years. Receive a Soil Health Card with crop-wise fertilizer recommendations for better yield.',
    eligibility: 'All farmers',
  },
  {
    id: 'kcc',
    icon: '💳',
    name: 'Kisan Credit Card (KCC)',
    benefit: 'Credit at 7% interest, up to ₹3 lakh',
    description: 'Easy access to credit for farming needs at subsidised interest rates. Covers crop cultivation, post-harvest expenses & more.',
    eligibility: 'All farmers, sharecroppers & tenant farmers',
  },
  {
    id: 'enam',
    icon: '🌐',
    name: 'National Agriculture Market (e-NAM)',
    benefit: 'Online trading for better prices',
    description: 'Pan-India electronic trading portal for agricultural commodities. Enables farmers to sell produce at the best available prices.',
    eligibility: 'All farmers with produce to sell',
  },
];

const FarmerDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [schemesModalVisible, setSchemesModalVisible] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await StorageService.getCurrentUser();
      if (currentUser) {
        setUserData(currentUser);
        const saved = await StorageService.getSelectedScheme(currentUser.id);
        setSelectedScheme(saved);
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

  // KEY FIX: For "Apply Now" — call async directly on press, no nested Alert.
  // Nested Alert.alert onPress + async/await is unreliable on Android and causes
  // the button to appear to do nothing.
  const handleApplyScheme = async (scheme) => {
    if (!userData) return;

    // Withdraw flow — a single non-nested Alert is fine here
    if (selectedScheme?.id === scheme.id) {
      Alert.alert(
        'Withdraw Application',
        `Do you want to withdraw your application for ${scheme.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Withdraw',
            style: 'destructive',
            onPress: async () => {
              await StorageService.removeSelectedScheme(userData.id);
              setSelectedScheme(null);
              setSchemesModalVisible(false);
            },
          },
        ]
      );
      return;
    }

    // Apply directly — NO wrapping Alert so async/await works reliably
    const result = await StorageService.saveSelectedScheme(userData.id, scheme);
    if (result.success) {
      const applied = { ...scheme, appliedAt: new Date().toISOString() };
      setSelectedScheme(applied);
      setSchemesModalVisible(false);
      setTimeout(() => {
        Alert.alert(
          '✅ Applied Successfully!',
          `You have applied for ${scheme.name}.\n\nBenefit: ${scheme.benefit}`
        );
      }, 300);
    } else {
      Alert.alert('Error', 'Could not save scheme. Please try again.');
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await StorageService.logout();
          navigation.replace('Login');
        },
      },
    ]);
  };

  const showModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const getWeatherInfo = () =>
    `📍 ${userData?.district}, ${userData?.state}\n\n🌡️ Current Temperature: 28°C\n💧 Humidity: 65%\n💨 Wind Speed: 12 km/h\n☁️ Conditions: Partly Cloudy\n\n📅 5-Day Forecast:\n• Mon: 30°C - Sunny ☀️\n• Tue: 28°C - Cloudy ☁️\n• Wed: 26°C - Rainy 🌧️\n• Thu: 27°C - Partly Cloudy ⛅\n• Fri: 29°C - Sunny ☀️\n\n💡 Farming Tip: Good weather conditions for irrigation this week.`;

const getMarketInfo = async () => {
  // Load the farmer's crops from storage
  const cropsData = await AsyncStorage.getItem('@farmer_crops');
  const farmerCrops = cropsData ? JSON.parse(cropsData) : [];
  const farmerCropNames = farmerCrops.map(c => c.name.toLowerCase());

  const allPrices = {
    wheat: '₹2,150/quintal',
    rice: '₹1,940/quintal',
    maize: '₹1,850/quintal',
    tomato: '₹25/kg',
    onion: '₹30/kg',
    potato: '₹22/kg',
    grapes: '₹80/kg',
    sugarcane: '₹350/quintal',
  };

  let mycropsSection = '';
  if (farmerCropNames.length > 0) {
    const lines = farmerCropNames
      .filter(name => allPrices[name])
      .map(name => `• ${name.charAt(0).toUpperCase() + name.slice(1)}: ${allPrices[name]} ⭐`)
      .join('\n');
    mycropsSection = lines
      ? `🌾 YOUR CROPS TODAY:\n${lines}\n\n`
      : '';
  }

  return `📊 Today's APMC Market Prices\n📍 ${userData?.district} Mandi\n\n${mycropsSection}📦 All Commodities:\n• Wheat: ₹2,150/quintal\n• Rice: ₹1,940/quintal\n• Tomato: ₹25/kg\n• Onion: ₹30/kg\n• Potato: ₹22/kg\n• Grapes: ₹80/kg\n• Sugarcane: ₹350/quintal`;
};
  const getNotifications = () =>
    `🔔 Recent Notifications\n\n⚠️ Weather Alert (2 hours ago)\nHeavy rainfall expected in next 48 hours.\n\n💰 Market Update (Today)\nWheat prices increased by ₹50/quintal.\n\n🏛️ New Scheme (Yesterday)\nPM-KISAN 16th installment released.\n\n📢 General (2 days ago)\nFree soil health camp on 20th Feb.\n\n🌾 Advisory (3 days ago)\nApply pre-monsoon fertilizers for better yield.`;

  const getExpertInfo = () =>
    `👨‍🌾 Agricultural Expert Support\n\n📞 Helpline Numbers:\n• Kisan Call Center: 1800-180-1551\n• Agricultural Officer: +91-XXXXXXXXXX\n\n💬 Expert Services:\n• Crop disease diagnosis\n• Pest management advice\n• Soil health consultation\n• Best practices guidance\n• Irrigation planning\n\n📅 Schedule:\n• Monday - Friday: 9 AM - 6 PM\n• Saturday: 9 AM - 2 PM\n• Emergency: 24/7 helpline`;

  const getHelpInfo = () =>
    `❓ Help & Support\n\n📚 FAQs:\n\nQ: How do I update my profile?\nA: Go to My Profile > Edit details > Save\n\nQ: How to check market prices?\nA: Navigate to Market Prices for daily APMC rates\n\n📞 Contact Support:\n• Email: support@farmersapp.gov.in\n• Phone: 1800-XXX-XXXX\n\n⏰ Support Hours: Mon-Sat: 9 AM - 6 PM\n🌐 www.farmersupportapp.gov.in`;

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
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6' }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.welcomeTitle}>Welcome, {userData?.fullName || 'Farmer'}</Text>
            <Text style={styles.welcomeSubtitle}>{userData?.district}, {userData?.state}</Text>
          </View>
        </ImageBackground>

        {/* Active Scheme Card */}
        {selectedScheme && (
          <View style={styles.activeSchemeCard}>
            <View style={styles.activeSchemeBadge}>
              <Text style={styles.activeSchemeBadgeText}>✅ Active Scheme</Text>
            </View>
            <View style={styles.activeSchemeRow}>
              <Text style={styles.activeSchemeIcon}>{selectedScheme.icon}</Text>
              <View style={styles.activeSchemeTextBox}>
                <Text style={styles.activeSchemeName}>{selectedScheme.name}</Text>
                <Text style={styles.activeSchemeBenefit}>{selectedScheme.benefit}</Text>
                {selectedScheme.appliedAt && (
                  <Text style={styles.activeSchemeDate}>
                    Applied: {new Date(selectedScheme.appliedAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.changeSchemeBtn} onPress={() => setSchemesModalVisible(true)}>
              <Text style={styles.changeSchemeBtnText}>Change / Withdraw</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.menuList}>
          <MenuItem icon="🌾" title="My Crops" subtitle="Manage your crops"
            onPress={() => navigation.navigate('ManageCrops')} />
          <MenuItem icon="📚" title="Crop Information" subtitle="Get crop guidance"
            onPress={() => navigation.navigate('CropAnalytics')} />
          <MenuItem icon="🔬" title="Crop Disease Detection"
            subtitle="Take a photo to identify crop disease" highlight
            onPress={() => navigation.navigate('DiseaseDetection', {
              farmerName: userData?.fullName || 'Farmer',
              district: userData?.district || '',
            })} />
          <MenuItem icon="🌤️" title="Weather Information" subtitle="Current weather & forecast"
            onPress={() => showModal('Weather Information', getWeatherInfo())} />
          <MenuItem icon="📊" title="Market Prices (Mandi)" subtitle="Daily APMC rates"
            onPress={async () => showModal('Market Prices', await getMarketInfo())}
          />
            <MenuItem
            icon="🏛️"
            title="Government Schemes"
            subtitle={selectedScheme ? `Active: ${selectedScheme.name}` : 'Subsidies & insurance'}
            onPress={() => setSchemesModalVisible(true)}
          />
          <MenuItem icon="🔔" title="Notifications & Alerts" subtitle="Weather, prices, schemes"
            badge="3" onPress={() => showModal('Notifications', getNotifications())} />
          <MenuItem icon="👨‍💼" title="Contact Expert" subtitle="Get agricultural guidance"
            onPress={() => showModal('Contact Expert', getExpertInfo())} />
          <MenuItem icon="❓" title="Help & Support" subtitle="FAQ and contact support"
            onPress={() => showModal('Help & Support', getHelpInfo())} />
        </View>
      </ScrollView>

      {/* Government Schemes Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={schemesModalVisible}
        onRequestClose={() => setSchemesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🏛️ Government Schemes</Text>
              <TouchableOpacity onPress={() => setSchemesModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.schemesSubheading}>
                Tap "Apply Now" to enrol. Only one scheme can be active at a time.
              </Text>

              {GOVERNMENT_SCHEMES.map((scheme) => {
                const isActive = selectedScheme?.id === scheme.id;
                return (
                  <View key={scheme.id} style={[styles.schemeCard, isActive && styles.schemeCardActive]}>
                    {isActive && (
                      <View style={styles.schemeActivePill}>
                        <Text style={styles.schemeActivePillText}>✅ Currently Applied</Text>
                      </View>
                    )}
                    <View style={styles.schemeCardHeader}>
                      <Text style={styles.schemeCardIcon}>{scheme.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.schemeCardName}>{scheme.name}</Text>
                        <Text style={styles.schemeCardBenefit}>{scheme.benefit}</Text>
                      </View>
                    </View>
                    <Text style={styles.schemeCardDesc}>{scheme.description}</Text>
                    <Text style={styles.schemeCardElig}>👤 Eligibility: {scheme.eligibility}</Text>

                    {/* FIXED: onPress calls async fn directly, no nested Alert wrapper */}
                    <TouchableOpacity
                      style={[styles.applyBtn, isActive && styles.applyBtnWithdraw]}
                      onPress={() => handleApplyScheme(scheme)}
                      activeOpacity={0.75}
                    >
                      <Text style={styles.applyBtnText}>
                        {isActive ? 'Withdraw Application' : 'Apply Now'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              <Text style={styles.schemesFooter}>
                📞 Helpline: 1800-180-1551 (free, Mon-Fri 9AM-6PM)
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Generic Info Modal */}
      <Modal
        animationType="slide"
        transparent
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
            <TouchableOpacity style={styles.okButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.okButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MenuItem = ({ icon, title, subtitle, badge, highlight, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, highlight && styles.menuItemHighlight]}
    onPress={onPress}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuTextContainer}>
      <Text style={[styles.menuTitle, highlight && styles.menuTitleHighlight]}>{title}</Text>
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
  container: { flex: 1, backgroundColor: '#F3F7F2' },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#666' },
  header: {
    backgroundColor: '#1F5C45', paddingTop: 55, paddingBottom: 20,
    paddingHorizontal: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: { color: '#FFF', fontSize: 22 },
  headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '600' },
  icon: { fontSize: 20, color: '#FFF' },
  banner: { height: 160, marginHorizontal: 20, marginTop: 20, borderRadius: 20, overflow: 'hidden', elevation: 4 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  welcomeTitle: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  welcomeSubtitle: { color: '#E0F2E9', fontSize: 14, marginTop: 4 },
  activeSchemeCard: {
    backgroundColor: '#E8F5E9', borderRadius: 16, marginHorizontal: 20,
    marginTop: 16, padding: 16, borderWidth: 1.5, borderColor: '#2E7D32', elevation: 3,
  },
  activeSchemeBadge: {
    backgroundColor: '#2E7D32', borderRadius: 8, paddingHorizontal: 10,
    paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 10,
  },
  activeSchemeBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  activeSchemeRow: { flexDirection: 'row', alignItems: 'center' },
  activeSchemeIcon: { fontSize: 36, marginRight: 12 },
  activeSchemeTextBox: { flex: 1 },
  activeSchemeName: { fontSize: 15, fontWeight: '700', color: '#1B5E20' },
  activeSchemeBenefit: { fontSize: 13, color: '#388E3C', marginTop: 2 },
  activeSchemeDate: { fontSize: 11, color: '#666', marginTop: 4 },
  changeSchemeBtn: { marginTop: 12, borderWidth: 1.5, borderColor: '#2E7D32', borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  changeSchemeBtnText: { color: '#2E7D32', fontWeight: '600', fontSize: 13 },
  menuList: { paddingHorizontal: 20, marginTop: 20, marginBottom: 40 },
  menuItem: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 3 },
  menuItemHighlight: { backgroundColor: '#E8F5E9', borderWidth: 1.5, borderColor: '#2E7D32', elevation: 4 },
  menuIcon: { fontSize: 30, marginRight: 14, width: 36 },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#2F6B4F' },
  menuTitleHighlight: { color: '#1B5E20', fontWeight: '700' },
  menuSubtitle: { fontSize: 12, color: '#666', marginTop: 3 },
  badge: { backgroundColor: '#FF5722', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 10 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  chevron: { fontSize: 22, color: '#999' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFF', borderRadius: 20, width: '92%', maxHeight: '88%', elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#1F5C45', flex: 1 },
  closeButton: { fontSize: 24, color: '#666', fontWeight: '600' },
  modalBody: { padding: 16 },
  modalText: { fontSize: 15, color: '#333', lineHeight: 24 },
  okButton: { backgroundColor: '#1F5C45', margin: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
  okButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  schemesSubheading: { fontSize: 13, color: '#666', marginBottom: 14, lineHeight: 19 },
  schemeCard: { backgroundColor: '#F9FBF9', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#DDE8DA', elevation: 2 },
  schemeCardActive: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32', borderWidth: 1.5 },
  schemeActivePill: { backgroundColor: '#2E7D32', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 8 },
  schemeActivePillText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  schemeCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  schemeCardIcon: { fontSize: 30, marginRight: 10 },
  schemeCardName: { fontSize: 15, fontWeight: '700', color: '#1F5C45' },
  schemeCardBenefit: { fontSize: 12, color: '#388E3C', marginTop: 2 },
  schemeCardDesc: { fontSize: 13, color: '#444', lineHeight: 19, marginBottom: 6 },
  schemeCardElig: { fontSize: 12, color: '#666', marginBottom: 12 },
  applyBtn: { backgroundColor: '#1F5C45', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  applyBtnWithdraw: { backgroundColor: '#B71C1C' },
  applyBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  schemesFooter: { fontSize: 12, color: '#888', textAlign: 'center', marginTop: 4, marginBottom: 16 },
});

export default FarmerDashboard;