import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import StorageService from '../services/StorageService';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const handleLogin = async () => {
    console.log('Login button pressed');
    
    // Validate mobile number
    if (!mobileNumber) {
      showError('Please enter mobile number');
      return;
    }

    if (mobileNumber.length !== 10) {
      showError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Validate password
    if (!password) {
      showError('Please enter password');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting login with:', { mobileNumber, role: selectedRole });
      
      // Attempt login using StorageService
      const result = await StorageService.loginUser(mobileNumber, password, selectedRole);
      
      console.log('Login result:', result);

      if (result.success) {
        console.log('Login successful, navigating to dashboard');
        
        // Navigate based on role
        if (result.user.role === 'admin') {
          navigation.navigate('AdminDashboard');
        } else if (result.user.role === 'officer') {
          navigation.navigate('ExpertDashboard');
        } else {
          navigation.navigate('FarmerDashboard');
        }
      } else {
        showError(result.message || 'Invalid credentials or role mismatch');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
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
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)} 
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
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
                  <Text style={styles.credentialValue}>9876543210 / pass123</Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text style={styles.credentialLabel}>Officer:</Text>
                  <Text style={styles.credentialValue}>9876543211 / pass123</Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text style={styles.credentialLabel}>Admin:</Text>
                  <Text style={styles.credentialValue}>9876543212 / pass123</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Error Modal */}
      <Modal
        visible={showErrorModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.errorIconContainer}>
              <Text style={styles.errorIcon}>❌</Text>
            </View>
            <Text style={styles.modalTitle}>Login Error</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  eyeButton: {
    padding: 5,
  },

  eyeIcon: {
    fontSize: 20,
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

  loginButtonDisabled: {
    opacity: 0.6,
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

  /* Error Modal */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  errorIcon: {
    fontSize: 48,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 15,
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },

  modalButton: {
    backgroundColor: '#3D6B4D',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LoginScreen;