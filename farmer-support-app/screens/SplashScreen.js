import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Overlay for better text visibility */}
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Plant Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.plantIcon}>
              <View style={styles.leaf1} />
              <View style={styles.leaf2} />
              <View style={styles.leaf3} />
              <View style={styles.stem} />
            </View>
          </View>

          {/* App Title */}
          <Text style={styles.title}>🌾 Farmer Support App</Text>
          <Text style={styles.subtitle}>Empowering Agriculture</Text>

          {/* Loading Indicator */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <View style={styles.loadingProgress} />
            </View>
          </View>
        </View>
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
    backgroundColor: 'rgba(245, 245, 220, 0.85)', // Beige overlay
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  iconContainer: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  plantIcon: {
    width: 100,
    height: 120,
    position: 'relative',
    alignItems: 'center',
  },

  leaf1: {
    width: 35,
    height: 45,
    backgroundColor: '#4A7C59',
    borderRadius: 20,
    position: 'absolute',
    top: 5,
    left: 5,
    transform: [{ rotate: '-35deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  leaf2: {
    width: 35,
    height: 45,
    backgroundColor: '#5A8C69',
    borderRadius: 20,
    position: 'absolute',
    top: 15,
    right: 5,
    transform: [{ rotate: '35deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  leaf3: {
    width: 32,
    height: 42,
    backgroundColor: '#6BA582',
    borderRadius: 18,
    position: 'absolute',
    top: 30,
    left: 20,
    transform: [{ rotate: '-10deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  stem: {
    width: 6,
    height: 60,
    backgroundColor: '#3D6B4D',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -3,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F5C45',
    marginTop: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  subtitle: {
    fontSize: 16,
    color: '#2D5F3F',
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  loadingContainer: {
    marginTop: 40,
    width: '60%',
    alignItems: 'center',
  },

  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
    overflow: 'hidden',
  },

  loadingProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    // Animation would be added with Animated API
  },
});

export default SplashScreen;