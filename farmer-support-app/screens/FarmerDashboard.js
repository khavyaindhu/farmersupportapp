import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const FarmerDashboard = ({ navigation }) => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showOfficerModal, setShowOfficerModal] = useState(false);

  // Sample data
  const adminData = {
    name: 'Rajesh Kumar',
    role: 'System Administrator',
    employeeId: 'ADM-2024-001',
    email: 'rajesh.kumar@farmersupport.com',
    phone: '+91 9876543212',
    department: 'IT & Operations',
    joinDate: 'January 15, 2020',
    responsibilities: [
      'Manage system users and permissions',
      'Monitor platform performance',
      'Generate reports and analytics',
      'Handle escalated support issues',
    ],
  };

  const officerData = {
    name: 'Dr. Priya Sharma',
    role: 'Agricultural Officer',
    employeeId: 'OFF-2024-045',
    email: 'priya.sharma@farmersupport.com',
    phone: '+91 9876543211',
    department: 'Field Operations',
    specialization: 'Crop Management & Soil Science',
    assignedFarmers: 87,
    zone: 'North District',
    joinDate: 'March 10, 2021',
    responsibilities: [
      'Provide crop guidance to farmers',
      'Conduct field visits and assessments',
      'Monitor crop health and diseases',
      'Organize training sessions',
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.backButton}>←</Text>
          <Text style={styles.headerTitle}>🌾 Farmer Support App</Text>
          <Text style={styles.icon}>⚙️</Text>
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
            <Text style={styles.welcomeTitle}>Welcome, Rahul</Text>
            <Text style={styles.welcomeSubtitle}>Welcome, Admin</Text>
          </View>
        </ImageBackground>

        {/* ROLE CARDS */}
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={[styles.roleCard, styles.roleActive]}
            onPress={() => setShowAdminModal(true)}
          >
            <Text style={styles.roleIcon}>👤</Text>
            <Text style={styles.roleText}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => setShowOfficerModal(true)}
          >
            <Text style={styles.roleIcon}>👨‍💼</Text>
            <Text style={styles.roleTextDark}>Officer</Text>
          </TouchableOpacity>
        </View>

        {/* MENU */}
        <View style={styles.menuList}>
          <MenuItem icon="👥" title="Manage Farmers" count="320" />
          <MenuItem icon="👨‍🌾" title="Manage Experts" count="15" />
          <MenuItem icon="🌱" title="Crop Guidance" count="45" />
          <MenuItem icon="📊" title="APMC Rates" count="45" />
        </View>
      </ScrollView>

      {/* ADMIN MODAL */}
      <Modal
        visible={showAdminModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAdminModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>👤 Admin Details</Text>
              <TouchableOpacity onPress={() => setShowAdminModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.avatarText}>
                    {adminData.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <Text style={styles.profileName}>{adminData.name}</Text>
                <Text style={styles.profileRole}>{adminData.role}</Text>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>{adminData.employeeId}</Text>
                </View>
              </View>

              {/* Contact Information */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <InfoRow icon="📧" label="Email" value={adminData.email} />
                <InfoRow icon="📱" label="Phone" value={adminData.phone} />
                <InfoRow icon="🏢" label="Department" value={adminData.department} />
                <InfoRow icon="📅" label="Joined" value={adminData.joinDate} />
              </View>

              {/* Responsibilities */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Key Responsibilities</Text>
                {adminData.responsibilities.map((item, index) => (
                  <View key={index} style={styles.responsibilityItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.responsibilityText}>{item}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowAdminModal(false)}
            >
              <Text style={styles.actionButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* OFFICER MODAL */}
      <Modal
        visible={showOfficerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOfficerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>👨‍💼 Officer Details</Text>
              <TouchableOpacity onPress={() => setShowOfficerModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <View style={[styles.profileAvatar, styles.officerAvatar]}>
                  <Text style={styles.avatarText}>
                    {officerData.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <Text style={styles.profileName}>{officerData.name}</Text>
                <Text style={styles.profileRole}>{officerData.role}</Text>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>{officerData.employeeId}</Text>
                </View>
              </View>

              {/* Contact Information */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <InfoRow icon="📧" label="Email" value={officerData.email} />
                <InfoRow icon="📱" label="Phone" value={officerData.phone} />
                <InfoRow icon="🏢" label="Department" value={officerData.department} />
                <InfoRow icon="🎓" label="Specialization" value={officerData.specialization} />
              </View>

              {/* Work Details */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Work Details</Text>
                <InfoRow icon="📍" label="Assigned Zone" value={officerData.zone} />
                <InfoRow icon="👨‍🌾" label="Assigned Farmers" value={`${officerData.assignedFarmers} Farmers`} />
                <InfoRow icon="📅" label="Joined" value={officerData.joinDate} />
              </View>

              {/* Responsibilities */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Key Responsibilities</Text>
                {officerData.responsibilities.map((item, index) => (
                  <View key={index} style={styles.responsibilityItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.responsibilityText}>{item}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowOfficerModal(false)}
            >
              <Text style={styles.actionButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* -------- COMPONENTS -------- */

const MenuItem = ({ icon, title, count }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={styles.menuTitle}>{title}</Text>

    <View style={styles.countBadge}>
      <Text style={styles.countText}>{count}</Text>
    </View>

    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

/* -------- STYLES -------- */

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

  /* Role Cards */

  roleButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },

  roleCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 3,
  },

  roleActive: {
    backgroundColor: '#4CAF50',
  },

  roleIcon: {
    fontSize: 22,
  },

  roleText: {
    color: '#FFF',
    fontWeight: '600',
  },

  roleTextDark: {
    color: '#333',
    fontWeight: '600',
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

  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2F6B4F',
  },

  countBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 10,
  },

  countText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },

  chevron: {
    fontSize: 22,
    color: '#999',
  },

  /* Modal Styles */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '85%',
    paddingBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F5C45',
  },

  closeButton: {
    fontSize: 28,
    color: '#666',
    fontWeight: '300',
  },

  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* Profile Section */

  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 20,
  },

  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  officerAvatar: {
    backgroundColor: '#2196F3',
  },

  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },

  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },

  profileRole: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },

  idBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },

  idText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },

  /* Info Section */

  infoSection: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F5C45',
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },

  infoIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 30,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  /* Responsibilities */

  responsibilityItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 10,
  },

  bullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 10,
    fontWeight: 'bold',
  },

  responsibilityText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },

  /* Action Button */

  actionButton: {
    backgroundColor: '#1F5C45',
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FarmerDashboard;