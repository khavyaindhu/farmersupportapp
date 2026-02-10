import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('farmer');

  // Test credentials
  const testCredentials = {
    farmer: '9876543210',
    officer: '9876543211',
    admin: '9876543212',
  };

  const handleLogin = () => {
    // Validate mobile number
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter mobile number');
      return;
    }

    if (mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    // Check test credentials
    if (mobileNumber === testCredentials.farmer) {
      navigation.navigate('FarmerDashboard');
    } else if (mobileNumber === testCredentials.officer) {
      navigation.navigate('ExpertDashboard');
    } else if (mobileNumber === testCredentials.admin) {
      navigation.navigate('AdminDashboard');
    } else {
      // For demo purposes, navigate based on selected role
      if (selectedRole === 'admin') {
        navigation.navigate('AdminDashboard');
      } else if (selectedRole === 'officer') {
        navigation.navigate('ExpertDashboard');
      } else {
        navigation.navigate('FarmerDashboard');
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🌾</Text>
              </View>
              <Text style={styles.appTitle}>Farmer Support App</Text>
              <Text style={styles.appSubtitle}>Empowering Agriculture Together</Text>
            </View>

            {/* Login Card */}
            <View style={styles.loginCard}>
              {/* User Selection Text */}
              <Text style={styles.cardTitle}>👤 User Login</Text>

              {/* Role Selection Buttons */}
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    selectedRole === 'farmer' && styles.roleButtonActive,
                  ]}
                  onPress={() => setSelectedRole('farmer')}
                >
                  <Text style={styles.roleEmoji}>👨‍🌾</Text>
                  <Text
                    style={[
                      styles.roleButtonText,
                      selectedRole === 'farmer' && styles.roleButtonTextActive,
                    ]}
                  >
                    Farmer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    selectedRole === 'officer' && styles.roleButtonActive,
                  ]}
                  onPress={() => setSelectedRole('officer')}
                >
                  <Text style={styles.roleEmoji}>👨‍💼</Text>
                  <Text
                    style={[
                      styles.roleButtonText,
                      selectedRole === 'officer' && styles.roleButtonTextActive,
                    ]}
                  >
                    Officer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    selectedRole === 'admin' && styles.roleButtonActive,
                  ]}
                  onPress={() => setSelectedRole('admin')}
                >
                  <Text style={styles.roleEmoji}>👤</Text>
                  <Text
                    style={[
                      styles.roleButtonText,
                      selectedRole === 'admin' && styles.roleButtonTextActive,
                    ]}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Mobile Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>📱</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* Footer Links */}
              <View style={styles.footer}>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.footerLinkBold}>New User? Sign-up</Text>
                </TouchableOpacity>
              </View>

              {/* Test Credentials Info */}
              <View style={styles.testCredentials}>
                <Text style={styles.testTitle}>🔑 Test Credentials:</Text>
                <View style={styles.credentialRow}>
                  <Text style={styles.credentialLabel}>Farmer:</Text>
                  <Text style={styles.credentialValue}>9876543210</Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text style={styles.credentialLabel}>Officer:</Text>
                  <Text style={styles.credentialValue}>9876543211</Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text style={styles.credentialLabel}>Admin:</Text>
                  <Text style={styles.credentialValue}>9876543212</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },

  /* Logo Section */

  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  logoEmoji: {
    fontSize: 40,
  },

  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  appSubtitle: {
    fontSize: 14,
    color: '#E8F5E9',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  /* Login Card */

  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* Role Selection */

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 8,
  },

  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3D6B4D',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },

  roleButtonActive: {
    backgroundColor: '#3D6B4D',
    borderColor: '#3D6B4D',
  },

  roleEmoji: {
    fontSize: 20,
    marginBottom: 5,
  },

  roleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3D6B4D',
  },

  roleButtonTextActive: {
    color: '#FFF',
  },

  /* Input */

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD',
    paddingHorizontal: 15,
  },

  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },

  /* Login Button */

  loginButton: {
    backgroundColor: '#3D6B4D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  loginButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },

  /* Footer */

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  footerLink: {
    color: '#3D6B4D',
    fontSize: 13,
    fontWeight: '500',
  },

  footerLinkBold: {
    color: '#3D6B4D',
    fontSize: 13,
    fontWeight: '700',
  },

  /* Test Credentials */

  testCredentials: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },

  testTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },

  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  credentialLabel: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },

  credentialValue: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '700',
  },
});

export default LoginScreen;