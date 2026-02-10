import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('farmer');

  const handleLogin = () => {
    // Navigate based on selected role
    if (selectedRole === 'admin') {
      navigation.navigate('AdminDashboard');
    } else if (selectedRole === 'officer') {
      navigation.navigate('ExpertDashboard');
    } else {
      navigation.navigate('FarmerDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.time}>9:41</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.signal}>📶</Text>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>🌾 Farmer Support App</Text>
      </View>

      <View style={styles.userIconContainer}>
        <View style={styles.userIcon}>
          <View style={styles.userHead} />
          <View style={styles.userBody} />
        </View>
      </View>

      <Text style={styles.userSelectionText}>User Selection</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>New User? Signup</Text>
        </TouchableOpacity>
      </View>

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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerLeft: {},
  headerRight: {},
  time: {
    fontSize: 14,
    fontWeight: '600',
  },
  signal: {
    fontSize: 14,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  userIconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  userIcon: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHead: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D4A574',
    marginBottom: 5,
  },
  userBody: {
    width: 50,
    height: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#4A7C59',
  },
  userSelectionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D5F3F',
    marginBottom: 30,
  },
  inputContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  loginButton: {
    backgroundColor: '#2D5F3F',
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  footerLink: {
    color: '#2D5F3F',
    fontSize: 13,
  },
  fieldBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#C4B896',
    opacity: 0.3,
    zIndex: -1,
  },
});

export default LoginScreen;
