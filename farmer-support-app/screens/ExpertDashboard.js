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

const ExpertDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.backButton}>←</Text>
          <Text style={styles.headerTitle}>🌾 Expert / Officer</Text>
          <Text style={styles.icon}>⚙️</Text>
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
            <Text style={styles.bannerTitle}>Welcome, Prakash</Text>
            <Text style={styles.bannerSub}>Field Expert / Officer</Text>
          </View>
        </ImageBackground>

        {/* MENU */}
        <View style={styles.menuList}>
          <MenuItem
            icon="👨‍🌾"
            title="Farmer"
            subtitle="Assigned Farmers"
          />
          <MenuItem
            icon="🌾"
            title="मेरे खेत"
            subtitle="देखें और प्रबंधित करें"
          />
          <MenuItem
            icon="🌱"
            title="फसल मार्गदर्शन"
            subtitle="किसान मार्गदर्शन देखें"
          />
          <MenuItem
            icon="📊"
            title="बिक और तीर्थ तीना"
            subtitle="एपीएमसी दरें देखें"
          />
          <MenuItem
            icon="📋"
            title="सहायताक मांगण"
            subtitle="Support Requests"
          />
        </View>

      </ScrollView>
    </View>
  );
};

/* ---------------- COMPONENT ---------------- */

const MenuItem = ({ icon, title, subtitle }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

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

  chevron: {
    fontSize: 22,
    color: '#999',
  },
});

export default ExpertDashboard;