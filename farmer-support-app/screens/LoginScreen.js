import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Text style={styles.logoEmoji}>🌾</Text>
        <Text style={styles.logoText}>Farmer Support App</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshIcon}>⟳</Text>
        </TouchableOpacity>
      </View>

      {/* User Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarNeck} />
          <View style={styles.avatarShirt} />
        </View>
      </View>

      {/* User Selection Text */}
      <Text style={styles.userSelectionText}>👤  User Selection</Text>

      {/* Role Selection Buttons */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'farmer' && styles.roleButtonActive,
          ]}
          onPress={() => setSelectedRole('farmer')}
        >
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
            placeholder="Enter mobile number"
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
        <TouchableOpacity>
          <Text style={styles.footerLink}>New User? Sign-up</Text>
        </TouchableOpacity>
      </View>

      {/* Test Credentials Info */}
      <View style={styles.testCredentials}>
        <Text style={styles.testTitle}>Test Credentials:</Text>
        <Text style={styles.testText}>Farmer: 9876543210</Text>
        <Text style={styles.testText}>Officer: 9876543211</Text>
        <Text style={styles.testText}>Admin: 9876543212</Text>
      </View>

      {/* Field Background */}
      <View style={styles.fieldBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#3D6B4D',
    position: 'relative',
  },
  logoEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  refreshButton: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  refreshIcon: {
    fontSize: 24,
    color: '#FFF',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 50,
    paddingTop: 15,
  },
  avatarHead: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#D4A574',
    marginBottom: 2,
  },
  avatarNeck: {
    width: 15,
    height: 8,
    backgroundColor: '#D4A574',
    marginBottom: 0,
  },
  avatarShirt: {
    width: 60,
    height: 35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#5A8C69',
  },
  userSelectionText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginTop: 15,
    marginBottom: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginBottom: 30,
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#3D6B4D',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#3D6B4D',
  },
  roleButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3D6B4D',
  },
  roleButtonTextActive: {
    color: '#FFF',
  },
  inputContainer: {
    paddingHorizontal: 40,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#3D6B4D',
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  footerLink: {
    color: '#3D6B4D',
    fontSize: 13,
    fontWeight: '500',
  },
  testCredentials: {
    backgroundColor: '#FFF',
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  testTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  testText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  fieldBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#C4B896',
    opacity: 0.3,
    zIndex: -1,
  },
});

export default LoginScreen;