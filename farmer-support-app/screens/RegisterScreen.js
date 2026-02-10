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

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    aadharNumber: '',
    address: '',
    pincode: '',
    state: '',
    district: '',
  });
  const [selectedRole, setSelectedRole] = useState('farmer');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhar number');
      return false;
    }

    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }

    if (!formData.pincode || formData.pincode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return false;
    }

    if (!formData.state.trim()) {
      Alert.alert('Error', 'Please enter your state');
      return false;
    }

    if (!formData.district.trim()) {
      Alert.alert('Error', 'Please enter your district');
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        'Registration successful! Please login with your mobile number.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }
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
                onPress={() => navigation.goBack()}
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
                />

                <InputField
                  icon="📱"
                  label="Mobile Number"
                  placeholder="10-digit mobile number"
                  value={formData.mobileNumber}
                  onChangeText={(text) => handleInputChange('mobileNumber', text)}
                  keyboardType="phone-pad"
                  maxLength={10}
                />

                <InputField
                  icon="📧"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                />

                <InputField
                  icon="🆔"
                  label="Aadhar Number"
                  placeholder="12-digit Aadhar number"
                  value={formData.aadharNumber}
                  onChangeText={(text) => handleInputChange('aadharNumber', text)}
                  keyboardType="number-pad"
                  maxLength={12}
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
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <InputField
                      icon="🏛️"
                      label="District"
                      placeholder="Your district"
                      value={formData.district}
                      onChangeText={(text) => handleInputChange('district', text)}
                    />
                  </View>
                </View>

                <InputField
                  icon="🗺️"
                  label="State"
                  placeholder="Your state"
                  value={formData.state}
                  onChangeText={(text) => handleInputChange('state', text)}
                />
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Register</Text>
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
      />
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
});

export default RegisterScreen;