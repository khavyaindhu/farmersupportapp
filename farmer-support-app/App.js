import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboard from './screens/AdminDashboard';
import FarmerDashboard from './screens/FarmerDashboard';
import ExpertDashboard from './screens/ExpertDashboard';
import ManageCropsScreen from './screens/ManageCropsScreen';
import CropAnalyticsScreen from './screens/CropAnalyticsScreen';
import VisitFrequencyScreen from './screens/VisitFrequencyScreen';
import DiseaseDetectionScreen from './screens/DiseaseDetectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="ExpertDashboard" component={ExpertDashboard} />
        <Stack.Screen name="ManageCrops" component={ManageCropsScreen} />
        <Stack.Screen name="CropAnalytics" component={CropAnalyticsScreen} />
        <Stack.Screen name="VisitFrequency" component={VisitFrequencyScreen} />
       <Stack.Screen
  name="DiseaseDetection"
  component={DiseaseDetectionScreen}
  options={{ headerShown: false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}