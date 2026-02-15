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

  const getCropCategoriesInfo = () => {
    return `🌾 Crop Categories Management

📊 SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Total Crop Categories: 45
Active Crops: 42
Seasonal Crops: 35
Year-round Crops: 10

📋 CEREALS (12 varieties):
━━━━━━━━━━━━━━━━━━━━━━
1. Wheat
   Varieties: HD-2967, PBW-343, DBW-187
   Season: Rabi (Oct-Nov)
   Duration: 120-150 days
   Avg Yield: 40-50 quintals/acre
   MSP 2024: ₹2,125/quintal
   Status: ✅ Active

2. Rice (Paddy)
   Varieties: Pusa Basmati 1509, IR-64, Swarna
   Season: Kharif (Jun-Jul)
   Duration: 120-140 days
   Avg Yield: 50-60 quintals/acre
   MSP 2024: ₹2,183/quintal
   Status: ✅ Active

3. Maize
   Varieties: Kaveri, Pioneer, DHM-117
   Season: Both Kharif & Rabi
   Duration: 90-110 days
   Avg Yield: 30-40 quintals/acre
   MSP 2024: ₹1,962/quintal
   Status: ✅ Active

4. Bajra (Pearl Millet)
   Varieties: HHB-67, GHB-538
   Season: Kharif (Jun-Jul)
   Duration: 75-90 days
   Avg Yield: 20-25 quintals/acre
   Status: ✅ Active

🫘 PULSES (8 varieties):
━━━━━━━━━━━━━━━━━━━━━━
1. Tur Dal (Pigeon Pea)
   Varieties: Asha, Maruti, ICPL-87
   Season: Kharif (Jun-Jul)
   Duration: 150-180 days
   Avg Yield: 15-20 quintals/acre
   MSP 2024: ₹7,000/quintal
   Status: ✅ Active

2. Moong Dal
   Varieties: Pusa Vishal, SML-668
   Season: Kharif/Summer
   Duration: 65-70 days
   Avg Yield: 8-10 quintals/acre
   MSP 2024: ₹7,755/quintal
   Status: ✅ Active

3. Chana (Chickpea)
   Varieties: Pusa-256, Vijay
   Season: Rabi (Oct-Nov)
   Duration: 110-130 days
   Avg Yield: 15-18 quintals/acre
   MSP 2024: ₹5,335/quintal
   Status: ✅ Active

🥬 VEGETABLES (15 varieties):
━━━━━━━━━━━━━━━━━━━━━━
• Tomato - Year-round
• Onion - Rabi/Kharif
• Potato - Rabi season
• Cauliflower - Winter (Rabi)
• Cabbage - Winter (Rabi)
• Brinjal - Year-round
• Okra (Bhindi) - Kharif/Summer
• Green Chilli - Year-round
• Capsicum - Year-round
• Cucumber - Summer
• Beans - Kharif
• Carrot - Rabi
• Radish - Rabi
• Spinach - Rabi
• Coriander - Year-round

🌻 CASH CROPS (10 varieties):
━━━━━━━━━━━━━━━━━━━━━━
1. Cotton
   Season: Kharif (May-Jun)
   Duration: 150-180 days
   Avg Yield: 15-20 quintals/acre
   MSP 2024: ₹6,620/quintal
   Status: ✅ Active

2. Sugarcane
   Season: Year-round
   Duration: 12-18 months
   Avg Yield: 300-400 quintals/acre
   MSP 2024: ₹315/quintal
   Status: ✅ Active

3. Groundnut
   Season: Kharif/Summer
   Duration: 100-130 days
   Avg Yield: 15-20 quintals/acre
   MSP 2024: ₹5,850/quintal
   Status: ✅ Active

4. Soybean
   Season: Kharif (Jun-Jul)
   Duration: 90-110 days
   Status: ✅ Active

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━
✏️ Add New Crop Category
📝 Edit Crop Details
🗑️ Delete Inactive Crops
📊 Update MSP Rates
🌱 Add Varieties
📸 Upload Crop Images
📄 Update Cultivation Guide
✅ Activate/Deactivate Crops

📊 STATISTICS:
━━━━━━━━━━━━━━━━━━━━━━
• Most Cultivated: Wheat (45% farmers)
• High Demand: Rice, Cotton
• Emerging: Organic vegetables
• Seasonal Peak: Kharif (June-July)

💡 RECOMMENDATIONS:
• Update MSP rates monthly
• Add region-specific varieties
• Create cultivation calendars
• Link with market prices`;
  };

  const getAPMCMarketInfo = () => {
    return `📊 APMC Market Rate Management

🎯 SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Active Markets (Mandis): 450
Daily Updates: Automated
Last Updated: Today, 9:30 AM
Price Sources: Government APMC portals

📈 PRICE MANAGEMENT:
━━━━━━━━━━━━━━━━━━━━━━

🌾 CEREALS - Current Rates (₹/Quintal):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wheat
• Minimum: ₹2,100
• Maximum: ₹2,200
• Modal: ₹2,150
• Change: ↑ ₹50 (2.4%)
• MSP: ₹2,125
• Markets: 234 mandis
• Trade Volume: 45,678 quintals/day

Rice (Paddy)
• Minimum: ₹1,900
• Maximum: ₹1,980
• Modal: ₹1,940
• Change: → Stable
• MSP: ₹2,183
• Markets: 189 mandis
• Trade Volume: 38,234 quintals/day

Maize
• Minimum: ₹1,820
• Maximum: ₹1,880
• Modal: ₹1,850
• Change: ↓ ₹20 (1.1%)
• MSP: ₹1,962
• Markets: 156 mandis
• Trade Volume: 23,456 quintals/day

Bajra
• Minimum: ₹2,200
• Maximum: ₹2,280
• Modal: ₹2,250
• Change: ↑ ₹30 (1.4%)
• Markets: 98 mandis

🫘 PULSES - Current Rates (₹/Quintal):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tur Dal
• Modal: ₹6,200
• Change: ↑ ₹100 (1.6%)
• MSP: ₹7,000
• Trade Volume: 12,345 quintals/day

Moong Dal
• Modal: ₹7,500
• Change: ↑ ₹150 (2.0%)
• MSP: ₹7,755
• Trade Volume: 8,976 quintals/day

Chana
• Modal: ₹5,100
• Change: → Stable
• MSP: ₹5,335
• Trade Volume: 15,234 quintals/day

🥬 VEGETABLES - Current Rates (₹/Kg):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tomato: ₹25 (↑ ₹5)
  Volume: 234 tonnes/day
• Onion: ₹30 (→ Stable)
  Volume: 456 tonnes/day
• Potato: ₹22 (↓ ₹3)
  Volume: 567 tonnes/day
• Cauliflower: ₹35 (↑ ₹8)
  Volume: 123 tonnes/day
• Green Chilli: ₹60 (↑ ₹10)
  Volume: 89 tonnes/day

🌻 CASH CROPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cotton: ₹6,500/quintal (↑ ₹120)
• Groundnut: ₹5,800/quintal (→)
• Soybean: ₹4,200/quintal (↑ ₹80)
• Sugarcane: ₹315/quintal (→)

📊 TOP PERFORMING MARKETS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Azadpur Mandi, Delhi
   Daily Trade: ₹45 Cr
   Commodities: Vegetables, Fruits
   Status: ✅ Active

2. Kota Mandi, Rajasthan
   Daily Trade: ₹23 Cr
   Commodities: Soybean, Wheat
   Status: ✅ Active

3. Pune APMC, Maharashtra
   Daily Trade: ₹19 Cr
   Commodities: Vegetables, Grains
   Status: ✅ Active

📈 PRICE TRENDS (7-Day):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rising:
• Wheat: +3.2%
• Tur Dal: +2.8%
• Moong: +2.5%
• Tomato: +25% (seasonal)

Falling:
• Maize: -1.2%
• Potato: -8%

Stable:
• Rice, Onion, Chana

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Update Prices Manually
⚡ Bulk Price Import (CSV/Excel)
🔄 Sync with Government APIs
📊 View Historical Data
📈 Generate Price Reports
🔔 Set Price Alerts
🌍 Add New Markets
✅ Verify Price Accuracy

⚠️ ALERTS & NOTIFICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 High Priority (3):
• Tomato prices up 25% - Alert farmers
• Wheat above MSP - Good selling time
• Onion shortage in 5 states

🟡 Medium Priority (7):
• Update missing rates for 12 mandis
• Verify cotton prices (3 markets)
• Sync failed for 2 state portals

💡 SYSTEM FEATURES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Real-time price updates
✅ Multi-state coverage
✅ Historical price data (5 years)
✅ Price comparison tools
✅ SMS/App notifications to farmers
✅ Export reports (PDF/Excel)
✅ Integration with e-NAM portal

📞 DATA SOURCES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Agmarknet.gov.in (Primary)
• State APMC portals
• e-NAM platform
• Manual updates from field officers

🎯 UPCOMING FEATURES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• AI-based price prediction
• Demand-supply analytics
• Weather impact analysis
• Automated alerts to farmers`;
  };

  const getGovernmentSchemesInfo = () => {
    return `🏛️ Government Schemes Management

📊 SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Total Active Schemes: 18
Central Schemes: 12
State Schemes: 6
Total Beneficiaries: ${stats.totalFarmers * 3}
Pending Applications: 45

💰 CENTRAL GOVERNMENT SCHEMES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Details:
• Benefit: ₹6,000/year in 3 installments
• Eligibility: All landholding farmers
• Enrollment: ${Math.floor(stats.totalFarmers * 0.85)} farmers
• Pending: ${Math.floor(stats.totalFarmers * 0.15)} applications

💰 Payment Status:
• 16th Installment: Released (Jan 2025)
• Amount Disbursed: ₹${(stats.totalFarmers * 0.85 * 2000).toLocaleString()}
• Next Installment: May 2025
• Success Rate: 98.5%

📊 Statistics:
• Total Registered: ${stats.totalFarmers * 2}
• Active: ${Math.floor(stats.totalFarmers * 0.85)}
• Rejected: ${Math.floor(stats.totalFarmers * 0.05)}
• Pending Verification: ${Math.floor(stats.totalFarmers * 0.10)}

⚙️ Admin Actions:
• Verify pending applications
• Update beneficiary list
• Process refund cases
• Generate disbursement reports


2. PMFBY (Pradhan Mantri Fasal Bima Yojana)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Details:
• Type: Crop Insurance
• Premium: 1.5-5% (subsidized)
• Coverage: Natural calamities
• Enrolled Farmers: ${Math.floor(stats.totalFarmers * 0.60)}

💰 Current Season (Rabi 2024-25):
• Applications: ${Math.floor(stats.totalFarmers * 0.60)}
• Premium Collected: ₹${(stats.totalFarmers * 0.60 * 1200).toLocaleString()}
• Claims Pending: 23
• Claims Settled: 156

📊 Coverage Statistics:
Kharif 2024:
• Insured Area: 45,678 acres
• Claims Filed: 234
• Claims Approved: 189
• Amount Disbursed: ₹1.2 Cr

Rabi 2024-25:
• Insured Area: 38,234 acres
• Ongoing season
• Enrollment deadline: 31 Mar 2025

⚙️ Admin Actions:
• Process crop loss claims
• Upload satellite imagery
• Approve/Reject applications
• Send enrollment reminders


3. PM-KUSUM (Solar Pump Scheme)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Details:
• Subsidy: 60% Central + 30% State
• Farmer Share: 10%
• Applications: 89
• Approved: 56
• Installed: 34
• Pending: 22

💰 Subsidy Details:
• 5 HP Solar Pump Cost: ₹2,50,000
• Subsidy (90%): ₹2,25,000
• Farmer Payment: ₹25,000

📊 Statistics:
• Total Capacity: 170 HP installed
• Energy Saved: 45,000 kWh/year
• Farmers Benefited: 34
• Pending Installations: 22


4. Soil Health Card Scheme
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Details:
• Service: Free soil testing
• Cards Issued: ${Math.floor(stats.totalFarmers * 0.75)}
• Pending Tests: ${Math.floor(stats.totalFarmers * 0.25)}
• Validity: 3 years

📊 Testing Statistics:
This Quarter:
• Samples Collected: 234
• Tests Completed: 189
• Cards Issued: 156
• Pending: 45

Next Soil Camp: 25th February 2025
Expected Samples: 150

Nutrient Status (Average):
• Nitrogen: Medium (67%)
• Phosphorus: Low (45%)
• Potassium: Medium (58%)
• pH Level: 6.8 (Neutral)

⚙️ Admin Actions:
• Schedule soil testing camps
• Upload test results
• Print & dispatch cards
• Track card distribution


5. Kisan Credit Card (KCC)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Details:
• Credit Limit: Up to ₹3 lakh
• Interest Rate: 7% (4% with subsidy)
• Active Cards: ${Math.floor(stats.totalFarmers * 0.55)}
• Total Credit: ₹${(stats.totalFarmers * 0.55 * 150000).toLocaleString()}

💰 Loan Statistics:
• Active Loans: ${Math.floor(stats.totalFarmers * 0.55)}
• Total Sanctioned: ₹${(stats.totalFarmers * 0.55 * 150000).toLocaleString()}
• Disbursed: ₹${(stats.totalFarmers * 0.55 * 145000).toLocaleString()}
• Outstanding: ₹${(stats.totalFarmers * 0.55 * 89000).toLocaleString()}

Repayment Status:
• On-time: 85%
• Overdue: 12%
• NPA: 3%


6. National Agriculture Market (e-NAM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Details:
• Registered Farmers: ${Math.floor(stats.totalFarmers * 0.35)}
• Active Traders: 1,234
• Markets Connected: 1,361
• Daily Transactions: ₹125 Cr

📊 Trading Statistics (This Month):
• Total Trades: 5,678
• Trade Value: ₹45 Cr
• Commodities: 234
• Avg Price Realization: +12%


🏛️ STATE SCHEMES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. State Subsidy on Fertilizers
   Active Farmers: ${Math.floor(stats.totalFarmers * 0.40)}
   Subsidy Amount: 50% on DAP, Urea

2. Drip Irrigation Subsidy
   Applications: 67
   Approved: 45
   Subsidy: 90% (Central + State)

3. Farm Machinery Bank
   Equipment: 45 units
   Rental Farmers: ${Math.floor(stats.totalFarmers * 0.30)}

4. Organic Farming Promotion
   Enrolled: 89 farmers
   Certification: 34 completed

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Add/Edit Scheme Details
✅ Approve/Reject Applications
💰 Disburse Benefits
📊 Generate Reports
🔔 Send Notifications
📄 Upload Guidelines
👥 Assign Verification Officers
📈 Track Scheme Performance

📈 SCHEME PERFORMANCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top Performing:
• PM-KISAN: 98.5% success
• Soil Health: 75% coverage
• PMFBY: 60% enrollment

Need Attention:
• e-NAM: Low farmer awareness
• KCC: 15% repayment issues
• Solar Pump: Slow implementation

⚠️ PENDING ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 High Priority (8):
• Approve 45 PMFBY claims
• Process 23 KCC applications
• Verify 34 PM-KISAN rejections

🟡 Medium Priority (15):
• Update scheme guidelines
• Schedule soil testing camps
• Send enrollment reminders

💡 RECOMMENDATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Conduct awareness campaigns
• Simplify application process
• Increase field officer visits
• Launch mobile enrollment drives`;
  };

  const getWeatherInfo = () => {
    return `🌤️ Weather Information Management

📊 SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Coverage: Pan-India
Active Stations: 567
Update Frequency: Every 30 minutes
Data Source: IMD, Agrimet
Last Update: 15 min ago

🌍 REGIONAL WEATHER DATA:
━━━━━━━━━━━━━━━━━━━━━━

📍 NORTH INDIA:
━━━━━━━━━━━━━━━━━━━━━━
Punjab
• Temperature: 18-28°C
• Conditions: Clear skies
• Humidity: 55%
• Wind: 12 km/h NW
• Rainfall: 0 mm (last 24h)
• Advisory: Good for wheat harvesting

Haryana
• Temperature: 19-29°C
• Conditions: Partly cloudy
• Humidity: 58%
• Wind: 10 km/h W
• Rainfall: 0 mm
• Advisory: Continue irrigation

Uttar Pradesh
• Temperature: 20-30°C
• Conditions: Sunny
• Humidity: 52%
• Wind: 8 km/h SE
• Rainfall: 0 mm
• Advisory: Ideal for sowing

📍 WEST INDIA:
━━━━━━━━━━━━━━━━━━━━━━
Maharashtra
• Temperature: 22-33°C
• Conditions: Hot & dry
• Humidity: 45%
• Wind: 15 km/h SW
• Rainfall: 0 mm
• Advisory: Increase irrigation frequency

Gujarat
• Temperature: 21-32°C
• Conditions: Clear
• Humidity: 48%
• Wind: 14 km/h W
• Rainfall: 0 mm
• Advisory: Monitor soil moisture

📍 SOUTH INDIA:
━━━━━━━━━━━━━━━━━━━━━━
Tamil Nadu
• Temperature: 24-35°C
• Conditions: Hot & humid
• Humidity: 72%
• Wind: 18 km/h SE
• Rainfall: 5 mm (last 24h)
• Advisory: Light showers expected

Karnataka
• Temperature: 23-34°C
• Conditions: Partly cloudy
• Humidity: 65%
• Wind: 12 km/h S
• Rainfall: 2 mm
• Advisory: Good for transplanting

📍 EAST INDIA:
━━━━━━━━━━━━━━━━━━━━━━
West Bengal
• Temperature: 22-32°C
• Conditions: Cloudy
• Humidity: 78%
• Wind: 10 km/h E
• Rainfall: 8 mm (last 24h)
• Advisory: Delay spraying operations

Bihar
• Temperature: 21-31°C
• Conditions: Clear to cloudy
• Humidity: 68%
• Wind: 8 km/h NE
• Rainfall: 0 mm
• Advisory: Resume field work

⚠️ WEATHER ALERTS (Active):
━━━━━━━━━━━━━━━━━━━━━━━━

🔴 RED ALERT (2):
━━━━━━━━━━━━━━━━━━━━━━
1. Heavy Rainfall Warning
   Region: Coastal Maharashtra
   Duration: 18-20 Feb
   Expected: 100-150 mm
   Impact: Flooding risk
   Affected Farmers: 2,345
   Advisory: Harvest standing crops
   Status: Active
   Notification Sent: ✅

2. Heatwave Warning
   Region: Gujarat, Rajasthan
   Duration: 19-22 Feb
   Temperature: 38-42°C
   Impact: Crop stress, water shortage
   Affected Farmers: 3,456
   Advisory: Increase irrigation
   Status: Active
   Notification Sent: ✅

🟡 YELLOW ALERT (5):
━━━━━━━━━━━━━━━━━━━━━━
1. Thunderstorm Warning
   Region: UP, Bihar
   Duration: 18-19 Feb
   Impact: Moderate rain, lightning
   Affected Farmers: 4,567
   Advisory: Postpone spraying

2. Strong Winds
   Region: Punjab, Haryana
   Duration: 20-21 Feb
   Speed: 40-50 km/h
   Impact: Lodging of wheat crop
   Affected Farmers: 3,234

3. Fog Alert
   Region: North India
   Duration: Next 3 days (morning)
   Visibility: 50-200 meters
   Impact: Delayed field work

4. Dry Spell
   Region: Karnataka
   Duration: Next 7 days
   Impact: Water stress
   Advisory: Plan irrigation

5. Cold Wave
   Region: Himachal, J&K
   Duration: 18-20 Feb
   Temperature: 2-8°C
   Impact: Frost damage risk

📅 7-DAY FORECAST:
━━━━━━━━━━━━━━━━━━━━━━━━

All India Overview:
━━━━━━━━━━━━━━━━━━━━━━
Mon 18: Partly cloudy, isolated rain
Tue 19: Thunderstorms in East & South
Wed 20: Heavy rain coastal areas
Thu 21: Scattered showers
Fri 22: Clearing up, sunny
Sat 23: Clear skies
Sun 24: Pleasant weather

🌡️ TEMPERATURE TRENDS:
━━━━━━━━━━━━━━━━━━━━━━━━
• North: Rising trend (+2°C)
• South: Stable, humid
• East: Moderate, cloudy
• West: Hot & dry

💧 RAINFALL FORECAST:
━━━━━━━━━━━━━━━━━━━━━━━━
Next 7 Days:
• Heavy: Coastal areas (100+ mm)
• Moderate: East India (20-50 mm)
• Light: South India (10-20 mm)
• Dry: North & West India (<5 mm)

🌾 FARMING ADVISORIES:
━━━━━━━━━━━━━━━━━━━━━━━━

✅ RECOMMENDED ACTIVITIES:
━━━━━━━━━━━━━━━━━━━━━━
• Wheat harvesting: Punjab, Haryana
• Rice transplanting: Tamil Nadu
• Irrigation: Gujarat, Maharashtra
• Sowing summer crops: Karnataka

⚠️ AVOID:
━━━━━━━━━━━━━━━━━━━━━━
• Spraying: East India (rain expected)
• Harvesting: Coastal areas (heavy rain)
• Sowing: Regions with heatwave

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━
📊 View Detailed Reports
🔔 Create Weather Alert
📱 Send SMS to Farmers
📧 Email Regional Officers
🌍 Update Weather Stations
⚙️ Configure Auto-Alerts
📈 Generate Weather Analytics
🗺️ View Weather Map

📊 ALERT STATISTICS:
━━━━━━━━━━━━━━━━━━━━━━━━
This Month:
• Total Alerts Issued: 45
• Red Alerts: 8
• Yellow Alerts: 22
• Notifications Sent: 2,34,567
• Farmer Response: 78%

Impact:
• Crop Saved: ₹12 Cr (estimated)
• Farmers Benefited: 23,456
• Timely Action: 85%

💡 DATA SOURCES:
━━━━━━━━━━━━━━━━━━━━━━━━
• IMD (India Meteorological Dept)
• Agrimet Network
• ISRO Satellite Data
• AWS (Automatic Weather Stations)
• Local field reports

🎯 UPCOMING FEATURES:
━━━━━━━━━━━━━━━━━━━━━━━━
• AI-based weather prediction
• Micro-level forecasts
• Climate change analytics
• Integration with crop advisory`;
  };

  const getDiseaseAlertsInfo = () => {
    return `🦠 Crop Disease Alert Management

📊 SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Active Alerts: 5
Disease Reports: 67
Affected Areas: 12 districts
Farmers Notified: 3,456
Response Rate: 82%

🔴 CRITICAL ALERTS (2):
━━━━━━━━━━━━━━━━━━━━━━

1. Yellow Rust in Wheat
━━━━━━━━━━━━━━━━━━━━━━
📍 Location:
• Punjab: 15 villages
• Haryana: 12 villages
• UP: 8 villages

📊 Severity: HIGH ⚠️
Affected Area: 2,345 acres
Affected Farmers: 456
Detection Date: 10 Feb 2025

🔬 Disease Details:
• Pathogen: Puccinia striiformis
• Stage: Heading stage
• Spread Rate: Fast (wind-borne)
• Weather Condition: Cool & humid
• Favorable Temp: 10-15°C

💊 Treatment:
Recommended:
• Propiconazole 25% EC (500 ml/acre)
• Tebuconazole 25% WG (200 g/acre)
• Spray at 15-day intervals (2 sprays)

Organic Option:
• Neem oil 1500 ppm (1 liter/acre)
• Copper oxychloride (2 kg/acre)

💰 Economic Impact:
• Potential Yield Loss: 30-50%
• Estimated Loss: ₹2.5 Cr
• Treatment Cost: ₹1,200/acre

📱 Actions Taken:
✅ SMS alert sent: 456 farmers
✅ Officers notified: 15
✅ Video advisory: Uploaded
✅ Spray schedule: Shared
✅ Subsidy approved: 50% on fungicide

📊 Treatment Progress:
• Area Treated: 1,234 acres (53%)
• Pending: 1,111 acres (47%)
• Recovered: 234 acres
• Monitoring: Ongoing


2. Bacterial Blight in Rice
━━━━━━━━━━━━━━━━━━━━━━━━
📍 Location:
• West Bengal: 23 villages
• Bihar: 18 villages
• Odisha: 12 villages

📊 Severity: HIGH ⚠️
Affected Area: 3,567 acres
Affected Farmers: 678
Detection Date: 12 Feb 2025

🔬 Disease Details:
• Pathogen: Xanthomonas oryzae
• Stage: Tillering to flowering
• Spread: Water, rain splash
• Favorable: High humidity (>80%)
• Symptoms: Leaf yellowing, wilting

💊 Treatment:
• Copper hydroxide (2 kg/acre)
• Streptocycline (15g + Copper oxy 500g)
• Drain excess water
• Balanced fertilization

💰 Economic Impact:
• Potential Loss: 20-40%
• Estimated: ₹4.2 Cr
• Treatment: ₹800/acre

📱 Actions Taken:
✅ Alerts sent: 678 farmers
✅ Field visits: 45 completed
✅ Samples collected: 34
✅ Lab tests: Confirmed

🟡 MODERATE ALERTS (3):
━━━━━━━━━━━━━━━━━━━━━━━━

3. Leaf Curl Virus in Tomato
━━━━━━━━━━━━━━━━━━━━━━━━
📍 Location: Karnataka, Maharashtra
Affected Area: 456 acres
Affected Farmers: 123
Severity: MODERATE

🔬 Details:
• Vector: Whitefly
• Symptoms: Upward leaf curl
• Stage: Vegetative growth

💊 Treatment:
• Imidacloprid (0.3 ml/liter)
• Remove infected plants
• Use yellow sticky traps
• Resistant varieties

📱 Status:
✅ Advisory sent
✅ Vector control ongoing
⏳ 65% area treated


4. Late Blight in Potato
━━━━━━━━━━━━━━━━━━━━━━━
📍 Location: UP, Punjab
Affected Area: 789 acres
Affected Farmers: 156
Severity: MODERATE

🔬 Details:
• Pathogen: Phytophthora infestans
• Weather: Cool, wet conditions
• Symptoms: Dark lesions on leaves

💊 Treatment:
• Mancozeb (2 kg/acre)
• Metalaxyl + Mancozeb
• Improve drainage
• Preventive sprays

📱 Status:
✅ Farmers alerted
✅ Preventive measures shared
⏳ Monitoring continues


5. Powdery Mildew in Peas
━━━━━━━━━━━━━━━━━━━━━━━
📍 Location: Haryana, Rajasthan
Affected Area: 345 acres
Affected Farmers: 89
Severity: LOW-MODERATE

🔬 Details:
• White powdery growth on leaves
• Favorable: Dry weather
• Yield loss: 10-20%

💊 Treatment:
• Sulfur 80% WP (2 kg/acre)
• Triadimefon (0.5 ml/liter)
• Adequate spacing

📱 Status:
✅ Advisory issued
⏳ Treatment in progress

📊 DISEASE MONITORING STATS:
━━━━━━━━━━━━━━━━━━━━━━━━

This Month:
━━━━━━━━━━━━━━━━━━━━━━
• Reports Received: 67
• Verified: 45
• False Alarms: 22
• Field Inspections: 134
• Lab Tests: 56
• Advisories Issued: 45

By Crop:
━━━━━━━━━━━━━━━━━━━━━━
• Wheat: 23 reports
• Rice: 15 reports
• Vegetables: 18 reports
• Pulses: 11 reports

By Region:
━━━━━━━━━━━━━━━━━━━━━━
• North: 28 reports
• East: 19 reports
• South: 12 reports
• West: 8 reports

Treatment Success:
━━━━━━━━━━━━━━━━━━━━━━
• Recovered: 78%
• Under Treatment: 15%
• Severe Loss: 7%

📸 DISEASE IDENTIFICATION:
━━━━━━━━━━━━━━━━━━━━━━━━
AI-Powered System:
• Images Uploaded: 234
• Auto-Identified: 189 (81%)
• Manual Review: 45
• Accuracy: 85%

Common Diseases DB:
• Total Diseases: 156
• Crops Covered: 45
• With Images: 142
• Treatment Guides: 156

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━
🔔 Create New Alert
📝 Update Alert Status
📊 View Disease Reports
📱 Send Mass Notifications
🔬 Request Lab Analysis
📸 Upload Disease Images
👨‍🌾 Assign Field Officers
📈 Generate Reports
🗺️ View Disease Map

⚠️ PENDING ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━
🔴 High Priority (8):
• Verify 12 new disease reports
• Send treatment reminders (456 farmers)
• Schedule field visits (23 villages)
• Update treatment progress

🟡 Medium Priority (15):
• Upload disease photos to DB
• Update treatment guidelines
• Train officers on new diseases
• Organize awareness camps

💡 PREVENTION MEASURES:
━━━━━━━━━━━━━━━━━━━━━━━━
Recommended:
• Regular field monitoring
• Use resistant varieties
• Crop rotation
• Balanced fertilization
• Timely irrigation
• Sanitation practices

Awareness Campaigns:
• Scheduled: 25 Feb 2025
• Target: 500 farmers
• Topics: Early detection, IPM

🎯 UPCOMING FEATURES:
━━━━━━━━━━━━━━━━━━━━━━━━
• Drone-based disease detection
• Real-time satellite monitoring
• Predictive disease models
• Mobile app for farmers`;
  };

  const getSendNotificationsInfo = () => {
    return `🔔 Send Notifications to Users

📊 NOTIFICATION SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Sent (This Month): 12,456
Delivery Rate: 97.8%
Read Rate: 78.5%
Response Rate: 45.2%
Active Recipients: ${stats.totalFarmers + stats.totalOfficers}

📱 NOTIFICATION CHANNELS:
━━━━━━━━━━━━━━━━━━━━━━━━

✅ SMS: Active
   Sent: 8,234 | Delivered: 8,067 (98%)

✅ Push Notification: Active
   Sent: 12,456 | Delivered: 12,178 (97.8%)

✅ Email: Active
   Sent: 2,345 | Delivered: 2,267 (96.7%)

✅ WhatsApp: In Development
   Coming Soon

🎯 NOTIFICATION CATEGORIES:
━━━━━━━━━━━━━━━━━━━━━━━━

1. ⚠️ WEATHER ALERTS
━━━━━━━━━━━━━━━━━━━━━━
Priority: HIGH
Recipients: All Farmers

Recent Alerts:
• Heavy rainfall warning (18 Feb)
  Recipients: 2,345 farmers
  Delivered: 2,298 (98%)
  Read: 1,834 (80%)

• Heatwave alert (19 Feb)
  Recipients: 3,456 farmers
  Delivered: 3,389 (98%)
  Read: 2,712 (80%)

Template Examples:
"⚠️ Heavy rain expected in [District] on [Date]. Harvest standing crops. Drain excess water. For help, call KCC: 1800-180-1551"

"🌡️ Heatwave alert! Temperature may reach 40°C. Increase irrigation frequency. Avoid midday field work."


2. 💰 MARKET PRICE UPDATES
━━━━━━━━━━━━━━━━━━━━━━━━
Priority: MEDIUM
Frequency: Daily (10 AM)
Recipients: Active Farmers

Recent Updates:
• Daily mandi rates (Today)
  Recipients: ${stats.totalFarmers} farmers
  Delivered: ${Math.floor(stats.totalFarmers * 0.98)}
  Read: ${Math.floor(stats.totalFarmers * 0.75)}

• Wheat price surge alert
  Recipients: 1,234 farmers
  Delivered: 1,209 (98%)
  Action Taken: 567 sold crops (47%)

Template:
"📊 Today's Mandi Rates - [District]
Wheat: ₹2,150/q (↑₹50)
Rice: ₹1,940/q
Tur: ₹6,200/q (↑₹100)
Good selling time for wheat!"


3. 🏛️ GOVERNMENT SCHEMES
━━━━━━━━━━━━━━━━━━━━━━━━
Priority: HIGH
Recipients: Eligible Farmers

Recent Notifications:
• PM-KISAN 16th installment release
  Recipients: ${Math.floor(stats.totalFarmers * 0.85)}
  Delivered: ${Math.floor(stats.totalFarmers * 0.85 * 0.98)}
  Bank Check: 89%

• PMFBY enrollment reminder
  Recipients: ${stats.totalFarmers}
  Delivered: ${Math.floor(stats.totalFarmers * 0.97)}
  Applications: 234 (increased 45%)

• Soil Health Camp notification
  Recipients: 456 farmers
  Delivered: 447 (98%)
  Attendance: 278 (61%)

Template:
"🏛️ PM-KISAN Alert!
16th installment of ₹2,000 released. Check your bank account. If not received, contact: [Officer Name] - [Phone]"


4. 🦠 DISEASE & PEST ALERTS
━━━━━━━━━━━━━━━━━━━━━━━━
Priority: CRITICAL
Recipients: Affected Region

Active Alerts:
• Yellow rust in wheat
  Recipients: 456 farmers (Punjab, Haryana, UP)
  Delivered: 447 (98%)
  Treatment Started: 312 (68%)

• Bacterial blight in rice
  Recipients: 678 farmers (WB, Bihar, Odisha)
  Delivered: 664 (98%)
  Field Visits: 45 completed

Template:
"🦠 DISEASE ALERT!
Yellow rust detected in wheat crops in [Village]. Spray Propiconazole 25% EC (500ml/acre) immediately. 50% subsidy available. Contact: [Officer] - [Phone]"


5. 📚 TRAINING & EVENTS
━━━━━━━━━━━━━━━━━━━━━━━
Priority: MEDIUM
Recipients: All Users

Upcoming Events:
• Drip irrigation workshop (20 Feb)
  Invites: 234 farmers
  Confirmed: 156 (67%)

• Organic farming training (25 Feb)
  Invites: 189 farmers
  Confirmed: 134 (71%)

• Soil testing camp (28 Feb)
  Invites: 456 farmers
  Interested: 298 (65%)

Template:
"📚 Training Invitation
Workshop on Drip Irrigation
📅 Date: 20 Feb, 10 AM
📍 Venue: Community Hall
👨‍🏫 Expert: [Name]
Free registration. Confirm: Reply Y"


6. 💳 PAYMENT & SUBSIDY
━━━━━━━━━━━━━━━━━━━━━━
Priority: HIGH
Recipients: Beneficiaries

Recent:
• PM-KISAN payment credit
  Recipients: ${Math.floor(stats.totalFarmers * 0.85)}
  Amount: ₹2,000 per farmer

• Fertilizer subsidy credit
  Recipients: 345 farmers
  Amount: Variable

• Solar pump subsidy approved
  Recipients: 34 farmers
  Amount: ₹2,25,000 per farmer

Template:
"💰 Payment Alert
₹2,000 credited to your account under PM-KISAN. Transaction ID: [XXXXX]. For queries: 1800-180-1551"


7. 📢 GENERAL ANNOUNCEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━
Priority: LOW-MEDIUM
Recipients: All Users

Recent:
• Mandi holiday notification
  Date: 26 Jan (Republic Day)
  Recipients: All

• App update notification
  New features available
  Users: All

• Survey participation request
  Response: 456 farmers (35%)

📊 NOTIFICATION STATISTICS:
━━━━━━━━━━━━━━━━━━━━━━━━

By Type (This Month):
━━━━━━━━━━━━━━━━━━━━━━
• Weather Alerts: 3,456 (27.7%)
• Market Updates: 5,678 (45.6%)
• Scheme Info: 1,234 (9.9%)
• Disease Alerts: 567 (4.6%)
• Training: 789 (6.3%)
• Payments: 456 (3.7%)
• General: 276 (2.2%)

By Priority:
━━━━━━━━━━━━━━━━━━━━━━
• Critical: 1,023 (8.2%)
• High: 4,567 (36.7%)
• Medium: 5,234 (42.0%)
• Low: 1,632 (13.1%)

Performance Metrics:
━━━━━━━━━━━━━━━━━━━━━━
• Avg Delivery Time: 3.5 seconds
• Avg Read Time: 12 minutes
• Peak Time: 10 AM - 12 PM
• Best Day: Tuesday
• Opt-out Rate: 2.1%

By Region:
━━━━━━━━━━━━━━━━━━━━━━
• North: 4,234 (34%)
• South: 2,567 (20.6%)
• East: 3,456 (27.7%)
• West: 2,199 (17.7%)

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━

✏️ CREATE NOTIFICATION:
━━━━━━━━━━━━━━━━━━━━━━
Step 1: Select Type
• Weather Alert
• Market Update
• Scheme Info
• Disease Alert
• Training Event
• Payment Info
• General Announcement

Step 2: Choose Recipients
• All Farmers
• All Officers
• By State/District
• By Crop Type
• Custom Group

Step 3: Compose Message
• Subject (50 chars max)
• Body (160 chars for SMS)
• Add links/attachments

Step 4: Select Channels
☑️ SMS
☑️ Push Notification
☑️ Email
☐ WhatsApp (Coming soon)

Step 5: Schedule
• Send Now
• Schedule for later
• Recurring (daily/weekly)

Step 6: Review & Send
• Preview message
• Estimated recipients
• Estimated cost
• Send/Schedule

📊 VIEW REPORTS:
━━━━━━━━━━━━━━━━━━━━━━
• Delivery reports
• Read receipts
• Engagement analytics
• Failed deliveries
• Opt-out tracking

🔔 MANAGE TEMPLATES:
━━━━━━━━━━━━━━━━━━━━━━
• Create new template
• Edit existing
• Delete unused
• Set as default

⚙️ CONFIGURE SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━
• SMS gateway config
• Push notification settings
• Email SMTP setup
• Character limits
• Cost management

💰 COST TRACKING:
━━━━━━━━━━━━━━━━━━━━━━━━

This Month:
━━━━━━━━━━━━━━━━━━━━━━
• SMS Cost: ₹24,702 (8,234 × ₹3)
• Push: Free
• Email: ₹1,173 (2,345 × ₹0.50)
• Total: ₹25,875

Budget: ₹50,000/month
Remaining: ₹24,125 (48.2%)

⚠️ BEST PRACTICES:
━━━━━━━━━━━━━━━━━━━━━━━━
✅ Keep messages concise
✅ Use local language
✅ Include action items
✅ Provide contact info
✅ Send at optimal times
✅ Test before bulk send
✅ Track engagement
✅ Respect opt-outs

🎯 UPCOMING FEATURES:
━━━━━━━━━━━━━━━━━━━━━━━━
• WhatsApp integration
• Voice calls
• Rich media support
• A/B testing
• Auto-translations
• AI-powered scheduling`;
  };

  const getPendingQueriesInfo = () => {
    return `❓ Pending Queries Management

📊 QUERY SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Total Queries (This Month): 156
Pending: 15
Resolved: 141
Resolution Rate: 90.4%
Avg Response Time: 8.5 hours

🔴 HIGH PRIORITY QUERIES (5):
━━━━━━━━━━━━━━━━━━━━━━━━━

Query #1234 - Crop Disease Emergency
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Farmer: Ramesh Kumar
📱 Phone: +91-98765-43210
📍 Location: Village Kharar, Mohali, Punjab
🌾 Crop: Wheat (5 acres)
⏰ Submitted: 16 Feb 2025, 8:30 AM (6 hours ago)
🔥 Priority: CRITICAL

Query Details:
"Yellow spots appearing on wheat leaves. Spreading very fast. Entire 5-acre field affected. What to do urgently?"

📸 Photos Attached: 3
🔬 AI Analysis: 85% match - Yellow Rust
💊 Suggested Treatment:
• Spray Propiconazole 25% EC (500 ml/acre)
• Immediate action needed
• Expected cost: ₹6,000

👨‍💼 Assigned To: Dr. Suresh Singh (Agricultural Officer)
📧 Status: Awaiting field visit
⏰ SLA: 4 hours remaining

Actions Available:
✅ Approve Treatment Subsidy (50%)
📞 Call Farmer
📱 Send Treatment Advisory
👨‍🌾 Schedule Field Visit
✔️ Mark as Resolved


Query #1235 - PM-KISAN Payment Issue
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Farmer: Sunita Devi
📱 Phone: +91-98123-45678
📍 Location: Jaipur, Rajasthan
⏰ Submitted: 15 Feb 2025, 2:00 PM (Yesterday)
🔥 Priority: HIGH

Query Details:
"My PM-KISAN 16th installment not received. Bank account verified. All previous installments received. Please help."

📄 Documents: Bank passbook copy, Aadhaar
🔍 Verification Status:
• Aadhaar: Verified ✅
• Bank Account: Verified ✅
• Land Records: Verified ✅
• Previous Payments: 15/15 received ✅

🔍 Issue Identified:
Bank account number mismatch in system (digit transposed)

👨‍💼 Assigned To: Admin Support Team
📧 Status: Correction in progress
⏰ Expected Resolution: 17 Feb 2025

Actions:
✅ Update Bank Details
💰 Initiate Manual Payment
📱 Send Update SMS
✔️ Mark as Resolved


Query #1236 - Crop Insurance Claim
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Farmer: Vijay Singh
📱 Phone: +91-97654-32109
📍 Location: Guntur, Andhra Pradesh
🌾 Crop: Paddy (10 acres)
⏰ Submitted: 14 Feb 2025, 5:30 PM (2 days ago)
🔥 Priority: HIGH

Query Details:
"Crop damaged by heavy rains on 10 Feb. Insured under PMFBY. How to claim? Visited field officer but no response."

📸 Photos: 8 (flood damage)
📋 Insurance Details:
• Policy No: PMFBY/2024/AP/12345
• Sum Insured: ₹2,50,000
• Premium Paid: ₹3,750 (1.5%)
• Coverage: Kharif 2024

🔍 Verification:
• Policy Active: Yes ✅
• Premium Paid: Yes ✅
• Loss Event: Verified (Satellite data) ✅
• Damage Extent: 60-70% (Preliminary)

👨‍💼 Assigned To: Insurance Surveyor
📧 Status: Field inspection scheduled (18 Feb)
⏰ Claim Settlement: Within 60 days

Actions:
📅 Confirm Inspection Date
📱 Send Claim Status Update
💰 Estimate Claim Amount
📄 Process Claim Documents


Query #1237 - Loan Application Help
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Farmer: Priya Sharma
📱 Phone: +91-99887-76655
📍 Location: Nashik, Maharashtra
⏰ Submitted: 14 Feb 2025, 11:00 AM (2 days ago)
🔥 Priority: MEDIUM-HIGH

Query Details:
"Want to apply for KCC loan but don't have all documents. Land is in father's name. Can I still apply? Need ₹2 lakh for irrigation."

📋 Available Documents:
• Aadhaar Card: Yes ✅
• Land Documents: Father's name
• Bank Account: Yes ✅
• Cultivation Proof: Yes ✅

🔍 Eligibility Check:
• Landowner: Father (Need consent letter)
• Cultivation: Self (Verified)
• Age: 28 years ✅
• Credit Score: Not checked yet

💡 Solution Provided:
"You can apply as a tenant farmer with:
1. Father's consent letter (notarized)
2. Lease agreement (if applicable)
3. Cultivation certificate from Patwari
4. Father's land documents (copy)"

👨‍💼 Assigned To: Loan Officer
📧 Status: Document list shared
⏰ Follow-up: Pending farmer response

Actions:
📄 Send Document Checklist
📞 Schedule Bank Visit
✔️ Await Documents


Query #1238 - Fertilizer Subsidy
━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Farmer: Harjeet Singh
📱 Phone: +91-96543-21098
📍 Location: Ludhiana, Punjab
⏰ Submitted: 13 Feb 2025, 4:00 PM (3 days ago)
🔥 Priority: MEDIUM

Query Details:
"Applied for fertilizer subsidy 2 months ago. Status shows pending. When will I get the benefit? Need fertilizer for wheat crop."

📋 Application Details:
• Application No: FS/2024/PB/5678
• Applied Date: 15 Dec 2024
• Subsidy Amount: ₹4,500
• Status: Pending verification

🔍 Investigation:
• Documents: Complete ✅
• Land Verification: Pending ⏳
• Patwari Report: Not submitted ❌

Issue: Patwari not submitted land verification report

👨‍💼 Assigned To: District Agriculture Officer
📧 Status: Escalated to Patwari office
⏰ Expected: 20 Feb 2025

Actions:
📞 Contact Patwari Office
⚡ Expedite Verification
💰 Process Subsidy
📱 Update Farmer

🟡 MEDIUM PRIORITY QUERIES (10):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Soil testing camp inquiry (3 queries)
• Market price information (2 queries)
• Training session registration (2 queries)
• App technical issues (2 queries)
• General farming advice (1 query)

Avg Response Time: 12-24 hours
All assigned to respective officers

📊 QUERY STATISTICS:
━━━━━━━━━━━━━━━━━━━━━━━━

By Category (This Month):
━━━━━━━━━━━━━━━━━━━━━━
• Crop Diseases: 45 (28.8%)
• Government Schemes: 38 (24.4%)
• Loans & Credit: 28 (17.9%)
• Market Prices: 18 (11.5%)
• Technical Support: 15 (9.6%)
• Insurance Claims: 12 (7.7%)

By Priority:
━━━━━━━━━━━━━━━━━━━━━━
• Critical: 12 (7.7%)
• High: 34 (21.8%)
• Medium: 78 (50.0%)
• Low: 32 (20.5%)

By Status:
━━━━━━━━━━━━━━━━━━━━━━
• Resolved: 141 (90.4%)
• In Progress: 10 (6.4%)
• Pending: 5 (3.2%)

Resolution Time:
━━━━━━━━━━━━━━━━━━━━━━
• <6 hours: 45 (28.8%)
• 6-24 hours: 78 (50.0%)
• 1-3 days: 28 (17.9%)
• >3 days: 5 (3.2%)

Satisfaction Rating:
━━━━━━━━━━━━━━━━━━━━━━
• Excellent (5★): 89 (63.1%)
• Good (4★): 38 (27.0%)
• Average (3★): 12 (8.5%)
• Poor (1-2★): 2 (1.4%)

By Region:
━━━━━━━━━━━━━━━━━━━━━━
• North: 56 (35.9%)
• South: 38 (24.4%)
• East: 34 (21.8%)
• West: 28 (17.9%)

🔧 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━

Query Management:
━━━━━━━━━━━━━━━━━━━━━━
✏️ View All Queries
🔍 Filter by Priority/Status
👨‍💼 Assign to Officer
📝 Add Internal Notes
📱 Contact Farmer
✔️ Mark as Resolved
📊 Generate Reports
⭐ View Ratings & Feedback

Bulk Actions:
━━━━━━━━━━━━━━━━━━━━━━
• Assign multiple queries
• Send bulk updates
• Export to Excel
• Close resolved queries

Escalation:
━━━━━━━━━━━━━━━━━━━━━━
• Auto-escalate after 24 hours
• Notify senior officers
• Mark as urgent
• Fast-track resolution

⚠️ SLA TRACKING:
━━━━━━━━━━━━━━━━━━━━━━━━

Response Time Targets:
━━━━━━━━━━━━━━━━━━━━━━
• Critical: 4 hours
• High: 12 hours
• Medium: 24 hours
• Low: 48 hours

Current Performance:
━━━━━━━━━━━━━━━━━━━━━━
• Critical: 3.5 hours avg ✅
• High: 10.2 hours avg ✅
• Medium: 18.5 hours avg ✅
• Low: 36.8 hours avg ✅

Breached SLA: 8 queries (5.1%)
Reasons: Officer unavailable, complex issues

💡 COMMON ISSUES:
━━━━━━━━━━━━━━━━━━━━━━━━
1. PM-KISAN payment delays (24%)
2. Crop disease identification (18%)
3. Insurance claim process (15%)
4. Loan documentation (12%)
5. Subsidy status (10%)

🎯 IMPROVEMENTS NEEDED:
━━━━━━━━━━━━━━━━━━━━━━━━
• Faster officer response
• Better documentation guidance
• Automated status updates
• Video call support
• Multi-language support`;
  };

  const getReportsAnalyticsInfo = () => {
    return `📈 Reports & Analytics Dashboard

📊 SYSTEM OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━
Data Period: Last 30 days
Total Users: ${stats.totalFarmers + stats.totalOfficers + 1}
Active Users: ${Math.floor((stats.totalFarmers + stats.totalOfficers) * 0.85)}
System Uptime: 99.8%
Total Transactions: 23,456

👥 USER STATISTICS:
━━━━━━━━━━━━━━━━━━━━━━

Registration Trends:
━━━━━━━━━━━━━━━━━━━━━━
This Month: ${Math.floor(stats.totalFarmers * 0.15)} new users
Last Month: ${Math.floor(stats.totalFarmers * 0.12)} new users
Growth: +25%

User Breakdown:
━━━━━━━━━━━━━━━━━━━━━━
• Farmers: ${stats.totalFarmers} (${((stats.totalFarmers / (stats.totalFarmers + stats.totalOfficers + 1)) * 100).toFixed(1)}%)
• Officers: ${stats.totalOfficers} (${((stats.totalOfficers / (stats.totalFarmers + stats.totalOfficers + 1)) * 100).toFixed(1)}%)
• Admins: 1 (0.1%)

Active Users (Last 30 days):
━━━━━━━━━━━━━━━━━━━━━━
• Daily Active: ${Math.floor((stats.totalFarmers + stats.totalOfficers) * 0.35)}
• Weekly Active: ${Math.floor((stats.totalFarmers + stats.totalOfficers) * 0.65)}
• Monthly Active: ${Math.floor((stats.totalFarmers + stats.totalOfficers) * 0.85)}
• Engagement Rate: 85%

By Region:
━━━━━━━━━━━━━━━━━━━━━━
• North India: ${Math.floor(stats.totalFarmers * 0.40)} (40%)
• South India: ${Math.floor(stats.totalFarmers * 0.25)} (25%)
• East India: ${Math.floor(stats.totalFarmers * 0.20)} (20%)
• West India: ${Math.floor(stats.totalFarmers * 0.15)} (15%)

Top 5 States:
━━━━━━━━━━━━━━━━━━━━━━
1. Punjab: ${Math.floor(stats.totalFarmers * 0.18)} farmers
2. Uttar Pradesh: ${Math.floor(stats.totalFarmers * 0.15)} farmers
3. Maharashtra: ${Math.floor(stats.totalFarmers * 0.12)} farmers
4. Karnataka: ${Math.floor(stats.totalFarmers * 0.10)} farmers
5. Haryana: ${Math.floor(stats.totalFarmers * 0.09)} farmers

🌾 CROP ANALYTICS:
━━━━━━━━━━━━━━━━━━━━━━

Most Cultivated Crops:
━━━━━━━━━━━━━━━━━━━━━━
1. Wheat: ${Math.floor(stats.totalFarmers * 0.45)} farmers (45%)
   Total Area: 45,678 acres
   Avg Yield: 42 quintals/acre

2. Rice: ${Math.floor(stats.totalFarmers * 0.38)} farmers (38%)
   Total Area: 38,234 acres
   Avg Yield: 55 quintals/acre

3. Cotton: ${Math.floor(stats.totalFarmers * 0.22)} farmers (22%)
   Total Area: 22,345 acres
   Avg Yield: 18 quintals/acre

4. Vegetables: ${Math.floor(stats.totalFarmers * 0.28)} farmers (28%)
   Total Area: 12,456 acres
   Mixed crops

5. Pulses: ${Math.floor(stats.totalFarmers * 0.18)} farmers (18%)
   Total Area: 8,765 acres
   Various varieties

Seasonal Distribution:
━━━━━━━━━━━━━━━━━━━━━━
• Kharif Crops: 58%
• Rabi Crops: 67%
• Zaid/Summer: 15%
*Multiple cropping practiced

Crop Diversity:
━━━━━━━━━━━━━━━━━━━━━━
• Single crop: 45% farmers
• Two crops: 38% farmers
• Three+ crops: 17% farmers

💰 FINANCIAL ANALYTICS:
━━━━━━━━━━━━━━━━━━━━━━

Government Schemes:
━━━━━━━━━━━━━━━━━━━━━━
PM-KISAN Disbursements:
• Beneficiaries: ${Math.floor(stats.totalFarmers * 0.85)}
• Amount Disbursed: ₹${(stats.totalFarmers * 0.85 * 6000).toLocaleString()}
• Installments Paid: 16
• Pending: ${Math.floor(stats.totalFarmers * 0.15)} applications

Crop Insurance (PMFBY):
• Policies Active: ${Math.floor(stats.totalFarmers * 0.60)}
• Premium Collected: ₹${(stats.totalFarmers * 0.60 * 1200).toLocaleString()}
• Claims Settled: 189
• Claim Amount: ₹1.2 Cr
• Settlement Ratio: 85%

KCC Loans:
• Active Cards: ${Math.floor(stats.totalFarmers * 0.55)}
• Total Credit: ₹${(stats.totalFarmers * 0.55 * 150000).toLocaleString()}
• Average Loan: ₹1,50,000
• Repayment Rate: 88%
• NPA: 3%

Subsidies Distributed:
• Fertilizer Subsidy: ₹45.6 lakh
• Irrigation Subsidy: ₹23.4 lakh
• Solar Pump: ₹76.5 lakh
• Total: ₹1.45 Cr

📊 MARKET ANALYTICS:
━━━━━━━━━━━━━━━━━━━━━━

APMC Trading Volume:
━━━━━━━━━━━━━━━━━━━━━━
This Month:
• Wheat: 45,678 quintals
• Rice: 38,234 quintals
• Cotton: 12,345 quintals
• Vegetables: 23,456 tonnes

Total Trade Value: ₹234 Cr

Price Trends (30 days):
━━━━━━━━━━━━━━━━━━━━━━
Rising Commodities:
• Wheat: +3.2% (₹2,150/q)
• Tur Dal: +2.8% (₹6,200/q)
• Tomato: +25% (₹25/kg)

Falling Commodities:
• Maize: -1.2% (₹1,850/q)
• Potato: -8% (₹22/kg)

Stable:
• Rice, Onion, Chana

Top Trading Markets:
━━━━━━━━━━━━━━━━━━━━━━
1. Azadpur, Delhi: ₹45 Cr/day
2. Kota, Rajasthan: ₹23 Cr/day
3. Pune, Maharashtra: ₹19 Cr/day

🌤️ WEATHER & ADVISORIES:
━━━━━━━━━━━━━━━━━━━━━━━━

Weather Alerts Issued:
━━━━━━━━━━━━━━━━━━━━━━
• Total Alerts: 45
• Red Alerts: 8
• Yellow Alerts: 22
• Farmers Notified: ${(stats.totalFarmers * 2.5).toLocaleString()}
• Response Rate: 78%

Advisory Impact:
━━━━━━━━━━━━━━━━━━━━━━
• Crop Saved (Est.): ₹12 Cr
• Farmers Benefited: ${Math.floor(stats.totalFarmers * 0.68)}
• Timely Action: 85%

Agro-Advisories Sent:
━━━━━━━━━━━━━━━━━━━━━━
• SMS: 8,234
• Push Notifications: 12,456
• Emails: 2,345
• Delivery Rate: 97.8%

🦠 DISEASE MANAGEMENT:
━━━━━━━━━━━━━━━━━━━━━━

Disease Reports:
━━━━━━━━━━━━━━━━━━━━━━
• Total Reports: 67
• Verified: 45
• Active Alerts: 5
• Affected Area: 6,789 acres
• Farmers Affected: 1,234

Treatment Success:
━━━━━━━━━━━━━━━━━━━━━━
• Recovered: 78%
• Under Treatment: 15%
• Severe Loss: 7%

Economic Impact:
━━━━━━━━━━━━━━━━━━━━━━
• Potential Loss Prevented: ₹8.5 Cr
• Treatment Cost: ₹2.3 Cr
• Subsidy Provided: ₹1.15 Cr (50%)

📱 SYSTEM USAGE:
━━━━━━━━━━━━━━━━━━━━━━

App Analytics:
━━━━━━━━━━━━━━━━━━━━━━
• Total Downloads: ${(stats.totalFarmers + stats.totalOfficers) * 1.2}
• Active Installs: ${stats.totalFarmers + stats.totalOfficers}
• Daily Active: ${Math.floor((stats.totalFarmers + stats.totalOfficers) * 0.35)}
• Avg Session: 8.5 minutes
• Sessions/User: 4.2/day

Most Used Features:
━━━━━━━━━━━━━━━━━━━━━━
1. Weather Info: 45% users
2. Market Prices: 38% users
3. Crop Advisory: 32% users
4. Scheme Info: 28% users
5. Expert Contact: 15% users

Platform Distribution:
━━━━━━━━━━━━━━━━━━━━━━
• Android: 85%
• iOS: 12%
• Web: 3%

Language Preference:
━━━━━━━━━━━━━━━━━━━━━━
• Hindi: 45%
• English: 25%
• Punjabi: 12%
• Marathi: 8%
• Other: 10%

📞 SUPPORT ANALYTICS:
━━━━━━━━━━━━━━━━━━━━━━

Query Management:
━━━━━━━━━━━━━━━━━━━━━━
• Total Queries: 156
• Resolved: 141 (90.4%)
• Pending: 15 (9.6%)
• Avg Response: 8.5 hours
• Satisfaction: 4.2/5

KCC Helpline:
━━━━━━━━━━━━━━━━━━━━━━
• Calls Received: 2,345
• Avg Wait Time: 45 seconds
• Resolution Rate: 87%
• Call Duration: 4.2 minutes

Top Query Categories:
━━━━━━━━━━━━━━━━━━━━━━
1. Crop Diseases: 28.8%
2. Schemes: 24.4%
3. Loans: 17.9%
4. Market Info: 11.5%
5. Technical: 9.6%

🔧 AVAILABLE REPORTS:
━━━━━━━━━━━━━━━━━━━━━━━━

📄 Standard Reports:
━━━━━━━━━━━━━━━━━━━━━━
• User Registration Report
• Crop Cultivation Report
• Scheme Beneficiary Report
• Financial Disbursement Report
• Market Price Trends Report
• Weather Alert Report
• Disease Outbreak Report
• Query Resolution Report

📊 Custom Reports:
━━━━━━━━━━━━━━━━━━━━━━
• State/District-wise Analytics
• Crop-specific Performance
• Scheme-wise Coverage
• Time-period Comparison
• Farmer Satisfaction Survey

📥 Export Options:
━━━━━━━━━━━━━━━━━━━━━━
• PDF Format
• Excel Spreadsheet
• CSV Data
• Email Delivery
• Scheduled Reports

🎯 KEY INSIGHTS:
━━━━━━━━━━━━━━━━━━━━━━━━

Achievements:
━━━━━━━━━━━━━━━━━━━━━━
✅ 85% scheme enrollment rate
✅ 90.4% query resolution
✅ 97.8% notification delivery
✅ 85% user satisfaction
✅ 99.8% system uptime

Areas for Improvement:
━━━━━━━━━━━━━━━━━━━━━━
⚠️ Increase e-NAM adoption
⚠️ Faster insurance claims
⚠️ More regional language support
⚠️ Officer training programs
⚠️ Rural internet connectivity

Recommendations:
━━━━━━━━━━━━━━━━━━━━━━
💡 Launch awareness campaigns
💡 Simplify application processes
💡 Increase field officer presence
💡 Add video consultation
💡 Develop offline features`;
  };

  const getSystemSettingsInfo = () => {
    return `⚙️ System Settings & Configuration

🎛️ GENERAL SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━

Application Info:
━━━━━━━━━━━━━━━━━━━━━━
• App Name: Farmer Support System
• Version: 2.5.1
• Build: 251
• Last Updated: 10 Feb 2025
• Environment: Production
• Server Location: Mumbai, India
• Uptime: 99.8% (30 days)

Database:
━━━━━━━━━━━━━━━━━━━━━━
• Total Records: ${(stats.totalFarmers + stats.totalOfficers) * 100}
• Users: ${stats.totalFarmers + stats.totalOfficers + 1}
• Transactions: 23,456
• Storage Used: 4.5 GB / 50 GB (9%)
• Backup: Daily at 2:00 AM
• Last Backup: Today, 2:05 AM ✅

Performance:
━━━━━━━━━━━━━━━━━━━━━━
• Avg Response Time: 245ms
• API Latency: 180ms
• Page Load: 1.2s
• Database Query: 45ms
• Status: Optimal ✅

👥 USER MANAGEMENT:
━━━━━━━━━━━━━━━━━━━━━━

User Roles & Permissions:
━━━━━━━━━━━━━━━━━━━━━━
1. Admin (1 user)
   ✅ Full system access
   ✅ User management
   ✅ System configuration
   ✅ Reports & analytics
   ✅ All modules

2. Agricultural Officer (${stats.totalOfficers})
   ✅ Farmer management
   ✅ Query resolution
   ✅ Field reports
   ✅ Advisory services
   ❌ System settings

3. Farmer (${stats.totalFarmers})
   ✅ Profile management
   ✅ Crop information
   ✅ Scheme applications
   ✅ Query submission
   ❌ Admin functions

Registration Settings:
━━━━━━━━━━━━━━━━━━━━━━
✅ Auto-approval: Disabled
✅ Email Verification: Required
✅ Phone OTP: Enabled
✅ Document Upload: Required
✅ Aadhaar Verification: Mandatory

Account Security:
━━━━━━━━━━━━━━━━━━━━━━
• Password Policy: Strong (8+ chars)
• Max Login Attempts: 5
• Session Timeout: 30 minutes
• Two-Factor Auth: Optional
• Password Reset: Email/SMS

📱 NOTIFICATION SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━━━

SMS Configuration:
━━━━━━━━━━━━━━━━━━━━━━
Provider: Twilio/TextLocal
• API Key: ****-****-****-****
• Sender ID: FARMR
• Credits Remaining: 45,678
• Rate: ₹0.25/SMS
• Character Limit: 160
• Status: Active ✅

Push Notifications:
━━━━━━━━━━━━━━━━━━━━━━
Provider: Firebase Cloud Messaging
• API Key: Configured ✅
• Daily Limit: 100,000
• Sent Today: 2,345
• Delivery Rate: 97.8%
• Status: Active ✅

Email Configuration:
━━━━━━━━━━━━━━━━━━━━━━
Provider: SendGrid/AWS SES
• SMTP Server: mail.farmersupport.gov.in
• Port: 587 (TLS)
• From Address: noreply@farmersupport.gov.in
• Daily Limit: 50,000
• Sent Today: 456
• Status: Active ✅

WhatsApp Business:
━━━━━━━━━━━━━━━━━━━━━━
• Status: In Development 🚧
• Provider: Twilio/Meta
• Expected Launch: March 2025

Notification Preferences:
━━━━━━━━━━━━━━━━━━━━━━
✅ Weather Alerts: Auto-send
✅ Market Updates: Daily 10 AM
✅ Scheme Updates: As available
✅ Payment Alerts: Immediate
✅ Disease Alerts: Immediate
⚙️ DND Period: 10 PM - 6 AM

🌐 API CONFIGURATION:
━━━━━━━━━━━━━━━━━━━━━━

Government APIs:
━━━━━━━━━━━━━━━━━━━━━━
PM-KISAN Portal:
• API Endpoint: pmkisan.gov.in/api
• Auth Token: Active ✅
• Last Sync: 2 hours ago
• Sync Frequency: Every 6 hours
• Status: Connected ✅

PMFBY Insurance:
• API Endpoint: pmfby.gov.in/api
• Status: Connected ✅
• Sync: Real-time

Agmarknet (APMC):
• API Endpoint: agmarknet.gov.in/api
• Last Update: 15 min ago
• Sync: Every 30 minutes
• Markets: 450 connected
• Status: Active ✅

e-NAM Portal:
• API Endpoint: enam.gov.in/api
• Status: Connected ✅
• Trading: Real-time

IMD Weather:
• API Endpoint: imd.gov.in/api
• Update: Every 30 minutes
• Last Update: 15 min ago
• Status: Active ✅

Aadhaar Verification:
• Provider: UIDAI
• API Status: Active ✅
• Verification Time: 2-3 seconds
• Success Rate: 98.5%

Third-Party Services:
━━━━━━━━━━━━━━━━━━━━━━
Google Maps:
• API Key: Configured ✅
• Usage: 2,345 requests/day
• Limit: 25,000/day
• Status: Active ✅

Firebase:
• Project: farmer-support-prod
• Services: Auth, FCM, Analytics
• Status: Active ✅

AWS Services:
• S3 Storage: 4.5 GB / 100 GB
• CloudFront CDN: Enabled
• RDS Database: Active
• Status: All services running ✅

🔒 SECURITY SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━

Data Protection:
━━━━━━━━━━━━━━━━━━━━━━
✅ SSL/TLS Encryption: Enabled
✅ Data Encryption at Rest: AES-256
✅ Database Encryption: Enabled
✅ API Authentication: JWT Tokens
✅ HTTPS Only: Enforced

Firewall & Protection:
━━━━━━━━━━━━━━━━━━━━━━
✅ WAF (Web App Firewall): Active
✅ DDoS Protection: Enabled
✅ Rate Limiting: 1000 req/min
✅ IP Whitelisting: Admin panel
✅ Intrusion Detection: Active

Backup & Recovery:
━━━━━━━━━━━━━━━━━━━━━━
• Frequency: Daily at 2:00 AM
• Retention: 30 days
• Location: AWS S3 (encrypted)
• Last Backup: Today, 2:05 AM ✅
• Backup Size: 4.2 GB
• Recovery Time: <2 hours
• Disaster Recovery: Multi-region

Audit Logs:
━━━━━━━━━━━━━━━━━━━━━━
✅ User Activity: Tracked
✅ Login/Logout: Logged
✅ Data Changes: Versioned
✅ API Calls: Monitored
✅ Admin Actions: Recorded
• Retention: 90 days

🌍 REGIONAL SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━

Supported Languages:
━━━━━━━━━━━━━━━━━━━━━━
✅ English (Default)
✅ हिंदी (Hindi)
✅ ਪੰਜਾਬੀ (Punjabi)
✅ मराठी (Marathi)
✅ தமிழ் (Tamil)
✅ తెలుగు (Telugu)
✅ ગુજરાતી (Gujarati)
✅ বাংলা (Bengali)
✅ ಕನ್ನಡ (Kannada)
✅ മലയാളം (Malayalam)
✅ ଓଡ଼ିଆ (Odia)

Locale Settings:
━━━━━━━━━━━━━━━━━━━━━━
• Time Zone: IST (UTC+5:30)
• Date Format: DD/MM/YYYY
• Currency: INR (₹)
• Number Format: Indian (1,00,000)
• First Day of Week: Monday

📊 ANALYTICS & TRACKING:
━━━━━━━━━━━━━━━━━━━━━━━━

Google Analytics:
━━━━━━━━━━━━━━━━━━━━━━
• Tracking ID: UA-XXXXXXXX-X
• Status: Active ✅
• Data Retention: 14 months
• Demographics: Enabled
• Interests: Enabled

Firebase Analytics:
━━━━━━━━━━━━━━━━━━━━━━
• Project: farmer-support-prod
• Events Tracked: 45
• User Properties: 12
• Status: Active ✅

Custom Analytics:
━━━━━━━━━━━━━━━━━━━━━━
✅ User Engagement
✅ Feature Usage
✅ Conversion Tracking
✅ Error Monitoring
✅ Performance Metrics

📧 SUPPORT CONFIGURATION:
━━━━━━━━━━━━━━━━━━━━━━━━

Helpdesk Settings:
━━━━━━━━━━━━━━━━━━━━━━
• Support Email: support@farmersupport.gov.in
• KCC Helpline: 1800-180-1551
• Working Hours: 9 AM - 6 PM
• Days: Monday - Saturday
• Language: 22+ supported

Ticketing System:
━━━━━━━━━━━━━━━━━━━━━━
• Platform: Custom/Freshdesk
• Auto-assignment: Enabled
• SLA Tracking: Active
• Priority Levels: 4
• Status: Active ✅

Live Chat:
━━━━━━━━━━━━━━━━━━━━━━
• Status: In Development 🚧
• Provider: Intercom/Zendesk
• Expected: April 2025

🔧 MAINTENANCE SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━━━

System Maintenance:
━━━━━━━━━━━━━━━━━━━━━━
• Scheduled: Every Sunday 2-4 AM
• Next Maintenance: 23 Feb 2025
• Notification: 48 hours advance
• Status: No issues ✅

Update Policy:
━━━━━━━━━━━━━━━━━━━━━━
• Major Updates: Quarterly
• Minor Updates: Monthly
• Security Patches: As needed
• Next Update: 1 March 2025

Server Monitoring:
━━━━━━━━━━━━━━━━━━━━━━
✅ CPU Usage: 45% (Normal)
✅ Memory: 3.2 GB / 8 GB (40%)
✅ Disk I/O: Optimal
✅ Network: 25 Mbps avg
✅ Health: Excellent

Error Monitoring:
━━━━━━━━━━━━━━━━━━━━━━
• Tool: Sentry/New Relic
• Errors Today: 23
• Critical: 0
• Warnings: 23
• Status: Monitored ✅

💾 DATA MANAGEMENT:
━━━━━━━━━━━━━━━━━━━━━━

Storage Allocation:
━━━━━━━━━━━━━━━━━━━━━━
• Total: 50 GB
• Used: 4.5 GB (9%)
• User Data: 2.1 GB
• Media Files: 1.8 GB
• Backups: 0.6 GB
• Available: 45.5 GB

Data Retention:
━━━━━━━━━━━━━━━━━━━━━━
• User Accounts: Permanent
• Transactions: 7 years
• Logs: 90 days
• Backups: 30 days
• Analytics: 14 months

Data Export:
━━━━━━━━━━━━━━━━━━━━━━
✅ User can export own data
✅ Format: PDF, CSV, Excel
✅ GDPR Compliant
✅ Request Processing: 48 hours

⚙️ ADVANCED SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━━━

Feature Flags:
━━━━━━━━━━━━━━━━━━━━━━
✅ Weather Module: Enabled
✅ Market Prices: Enabled
✅ Schemes: Enabled
✅ Disease Alerts: Enabled
✅ E-NAM Integration: Enabled
🚧 WhatsApp: In Development
🚧 Video Consultation: Coming Soon
🚧 AI Chatbot: Planned

Rate Limiting:
━━━━━━━━━━━━━━━━━━━━━━
• API Calls: 1000/min per user
• Login Attempts: 5 per 15 min
• OTP Requests: 3 per hour
• File Upload: 10 MB max size
• Bulk Operations: Admin only

Caching:
━━━━━━━━━━━━━━━━━━━━━━
✅ Redis Cache: Enabled
• Hit Rate: 87%
• TTL: 15 minutes
• Storage: 512 MB

🎯 ADMIN ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━

✏️ Update System Settings
🔄 Restart Services
📊 View System Logs
🔍 Run Diagnostics
💾 Backup Database Now
🔐 Manage API Keys
👥 User Role Management
⚙️ Configure Integrations
📧 Test Email/SMS
🔔 Send System Alert

⚠️ SYSTEM HEALTH:
━━━━━━━━━━━━━━━━━━━━━━━━

Overall Status: ✅ HEALTHY

Components:
━━━━━━━━━━━━━━━━━━━━━━
✅ Web Server: Running
✅ API Server: Running
✅ Database: Connected
✅ Cache: Active
✅ Queue Jobs: Processing
✅ Scheduled Tasks: Running
✅ External APIs: Connected

Recent Issues: None (30 days)

Last Incident:
• Date: 15 Jan 2025
• Issue: Brief API slowdown
• Duration: 12 minutes
• Resolution: Auto-scaled
• Impact: Minimal

💡 RECOMMENDATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━
✅ Current configuration optimal
⚠️ Consider upgrading to 100 GB storage
💡 Enable WhatsApp integration
💡 Implement AI chatbot
💡 Add video consultation
💡 Increase API rate limits`;
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
            onPress={() => showModal('Crop Categories', getCropCategoriesInfo())}
          />

          <MenuItem
            title="APMC Market Rates"
            icon="📊"
            subtitle="Update daily mandi prices"
            onPress={() => showModal('APMC Market Rates', getAPMCMarketInfo())}
          />

          <MenuItem
            title="Government Schemes"
            icon="🏛️"
            subtitle="Manage subsidies & insurance"
            onPress={() => showModal('Government Schemes', getGovernmentSchemesInfo())}
          />

          <MenuItem
            title="Weather Information"
            icon="🌤️"
            subtitle="Weather data & alerts"
            onPress={() => showModal('Weather Information', getWeatherInfo())}
          />

          <MenuItem
            title="Disease Alerts"
            icon="🦠"
            subtitle="Crop disease monitoring"
            badge="5"
            onPress={() => showModal('Disease Alerts', getDiseaseAlertsInfo())}
          />

          <MenuItem
            title="Send Notifications"
            icon="🔔"
            subtitle="Broadcast alerts to users"
            onPress={() => showModal('Send Notifications', getSendNotificationsInfo())}
          />

          <MenuItem
            title="Pending Queries"
            icon="❓"
            subtitle="Farmer support requests"
            badge={stats.pendingQueries.toString()}
            onPress={() => showModal('Pending Queries', getPendingQueriesInfo())}
          />

          <MenuItem
            title="Reports & Analytics"
            icon="📈"
            subtitle="System statistics & insights"
            onPress={() => showModal('Reports & Analytics', getReportsAnalyticsInfo())}
          />

          <MenuItem
            title="System Settings"
            icon="⚙️"
            subtitle="Configure application"
            onPress={() => showModal('System Settings', getSystemSettingsInfo())}
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