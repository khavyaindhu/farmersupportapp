import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.plantIcon}>
          <View style={styles.leaf1} />
          <View style={styles.leaf2} />
          <View style={styles.stem} />
        </View>
      </View>
      <Text style={styles.title}>Farmer Support App</Text>
      <View style={styles.fieldBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  plantIcon: {
    width: 80,
    height: 100,
    position: 'relative',
  },
  leaf1: {
    width: 30,
    height: 40,
    backgroundColor: '#4A7C59',
    borderRadius: 15,
    position: 'absolute',
    top: 10,
    left: 10,
    transform: [{ rotate: '-30deg' }],
  },
  leaf2: {
    width: 30,
    height: 40,
    backgroundColor: '#5A8C69',
    borderRadius: 15,
    position: 'absolute',
    top: 20,
    right: 10,
    transform: [{ rotate: '30deg' }],
  },
  stem: {
    width: 4,
    height: 50,
    backgroundColor: '#4A7C59',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginTop: 20,
  },
  fieldBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#C4B896',
    opacity: 0.3,
  },
});

export default SplashScreen;
