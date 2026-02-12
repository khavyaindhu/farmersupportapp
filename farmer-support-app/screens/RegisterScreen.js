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
  ActivityIndicator,
  Modal,
} from 'react-native';
import StorageService from '../services/StorageService';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadharNumber: '',
    address: '',
    pincode: '',
    state: '',
    district: '',
  });
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      showError('Please enter your full name');
      return false;
    }

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      showError('Please enter a valid 10-digit mobile number');
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      showError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      return false;
    }

    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      showError('Please enter a valid 12-digit Aadhar number');
      return false;
    }

    if (!formData.address.trim()) {
      showError('Please enter your address');
      return false;
    }

    if (!formData.pincode || formData.pincode.length !== 6) {
      showError('Please enter a valid 6-digit pincode');
      return false;
    }

    if (!formData.state.trim()) {
      showError('Please enter your state');
      return false;
    }

    if (!formData.district.trim()) {
      showError('Please enter your district');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    console.log('Register button pressed');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare user data with selected role
      const userData = {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        password: formData.password,
        aadharNumber: formData.aadharNumber,
        address: formData.address,
        pincode: formData.pincode,
        state: formData.state,
        district: formData.district,
        role: selectedRole,
      };

      console.log('Registering user:', { ...userData, password: '***' });

      // Register user using StorageService
      const result = await StorageService.registerUser(userData);

      console.log('Registration result:', result);

      if (result.success) {
        // Show success modal
        setShowSuccessModal(true);
      } else {
        // Show error modal with message from service
        showError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80',
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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Create Account</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Registration Card */}
            <View style={styles.registerCard}>
              <Text style={styles.cardTitle}>📝 User Registration</Text>
              <Text style={styles.cardSubtitle}>
                Fill in your details to get started
              </Text>

              {/* Role Selection */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Select Your Role</Text>
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
              </View>

              {/* Personal Information */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Personal Information</Text>

                <InputField
                  icon="👤"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChangeText={(text) => handleInputChange('fullName', text)}
                  editable={!isLoading}
                />

                <InputField
                  icon="📱"
                  label="Mobile Number"
                  placeholder="10-digit mobile number"
                  value={formData.mobileNumber}
                  onChangeText={(text) => handleInputChange('mobileNumber', text)}
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!isLoading}
                />

                <InputField
                  icon="📧"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  editable={!isLoading}
                />

                <PasswordField
                  icon="🔒"
                  label="Password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={!showPassword}
                  showPassword={showPassword}
                  toggleShowPassword={() => setShowPassword(!showPassword)}
                  editable={!isLoading}
                />

                <PasswordField
                  icon="🔒"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry={!showConfirmPassword}
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  editable={!isLoading}
                />

                <InputField
                  icon="🆔"
                  label="Aadhar Number"
                  placeholder="12-digit Aadhar number"
                  value={formData.aadharNumber}
                  onChangeText={(text) => handleInputChange('aadharNumber', text)}
                  keyboardType="number-pad"
                  maxLength={12}
                  editable={!isLoading}
                />
              </View>

              {/* Address Information */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Address Details</Text>

                <InputField
                  icon="🏠"
                  label="Address"
                  placeholder="House no., Street, Area"
                  value={formData.address}
                  onChangeText={(text) => handleInputChange('address', text)}
                  multiline
                  editable={!isLoading}
                />

                <View style={styles.rowContainer}>
                  <View style={styles.halfWidth}>
                    <InputField
                      icon="📮"
                      label="Pincode"
                      placeholder="6-digit"
                      value={formData.pincode}
                      onChangeText={(text) => handleInputChange('pincode', text)}
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!isLoading}
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <InputField
                      icon="🏛️"
                      label="District"
                      placeholder="Your district"
                      value={formData.district}
                      onChangeText={(text) => handleInputChange('district', text)}
                      editable={!isLoading}
                    />
                  </View>
                </View>

                <InputField
                  icon="🗺️"
                  label="State"
                  placeholder="Your state"
                  value={formData.state}
                  onChangeText={(text) => handleInputChange('state', text)}
                  editable={!isLoading}
                />
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.registerButtonText}>Register</Text>
                )}
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginLinkText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✅</Text>
            </View>
            <Text style={styles.modalTitle}>Registration Successful!</Text>
            <Text style={styles.modalMessage}>
              Your account has been created successfully. Please login with your mobile number and password.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSuccessClose}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
            <Text style={styles.modalTitle}>Registration Error</Text>
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

/* -------- INPUT FIELD COMPONENT -------- */

const InputField = ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  multiline = false,
  editable = true,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputWrapper, multiline && styles.multilineWrapper]}>
      <Text style={styles.inputIcon}>{icon}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        editable={editable}
      />
    </View>
  </View>
);

/* -------- PASSWORD FIELD COMPONENT -------- */

const PasswordField = ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showPassword,
  toggleShowPassword,
  editable = true,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Text style={styles.inputIcon}>{icon}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton}>
        <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  placeholder: {
    width: 40,
  },

  /* Registration Card */

  registerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5F3F',
    textAlign: 'center',
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* Sections */

  sectionContainer: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F5C45',
    marginBottom: 15,
  },

  /* Role Selection */

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
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
    fontSize: 18,
    marginBottom: 4,
  },

  roleButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3D6B4D',
  },

  roleButtonTextActive: {
    color: '#FFF',
  },

  /* Input Fields */

  inputContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DDD',
    paddingHorizontal: 12,
  },

  multilineWrapper: {
    alignItems: 'flex-start',
    paddingTop: 12,
  },

  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },

  multilineInput: {
    height: 70,
    textAlignVertical: 'top',
  },

  eyeButton: {
    padding: 5,
  },

  eyeIcon: {
    fontSize: 20,
  },

  /* Row Container */

  rowContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  halfWidth: {
    flex: 1,
  },

  /* Register Button */

  registerButton: {
    backgroundColor: '#3D6B4D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  registerButtonDisabled: {
    opacity: 0.6,
  },

  registerButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },

  /* Login Link */

  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginLinkText: {
    fontSize: 14,
    color: '#666',
  },

  loginLink: {
    fontSize: 14,
    color: '#3D6B4D',
    fontWeight: '700',
  },

  /* Modals */

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

  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  successIcon: {
    fontSize: 48,
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

export default RegisterScreen;