import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

const AdminDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.profileLeft}>
            <Text style={styles.adminEmoji}>👨‍💼</Text>
            <Text style={styles.profileName}>Admin</Text>
          </View>

          <View style={styles.headerIcons}>
            <Text style={styles.icon}>🔔</Text>
            <Text style={styles.icon}>⚙️</Text>
          </View>
        </View>
      </View>

      <ScrollView>

        {/* BANNER IMAGE */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
          }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.bannerTitle}>Welcome, Admin</Text>
            <Text style={styles.bannerSub}>
              Manage Agriculture & Contracts Digitally
            </Text>
          </View>
        </ImageBackground>

        {/* ACTION GRID */}
        <View style={styles.actionGrid}>
          <ActionCard title="Manage Farmers" icon="👩‍🌾" />
          <ActionCard title="Manage Experts" icon="🧑‍💼" />
          <ActionCard title="Disease Alerts" icon="🦠" />
          <ActionCard title="APMC Yards" icon="🏬" />
        </View>

        {/* MENU */}
        <View style={styles.menuList}>
          <MenuItem title="Pending Queries" badge="Open" icon="❓" />
          <MenuItem title="Reports & Settings" icon="📊" />
        </View>

      </ScrollView>
    </View>
  );
};

/* ---------------- COMPONENTS ---------------- */

const ActionCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.actionCard}>
    <Text style={styles.actionIcon}>{icon}</Text>
    <Text style={styles.actionText}>{title}</Text>
  </TouchableOpacity>
);

const MenuItem = ({ title, icon, badge }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={styles.menuTitle}>{title}</Text>

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

  /* Grid */

  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 25,
  },

  actionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },

  actionIcon: {
    fontSize: 36,
    marginBottom: 10,
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F5C45',
  },

  /* Menu */

  menuList: {
    paddingHorizontal: 20,
    marginTop: 5,
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

  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  badge: {
    backgroundColor: '#43A047',
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