import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import FarmerDashboard from './screens/FarmerDashboard';
import ExpertDashboard from './screens/ExpertDashboard';
import ManageCropsScreen from './screens/ManageCropsScreen';
import CropAnalyticsScreen from './screens/CropAnalyticsScreen';
import VisitFrequencyScreen from './screens/VisitFrequencyScreen';

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
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="ExpertDashboard" component={ExpertDashboard} />
        <Stack.Screen name="ManageCrops" component={ManageCropsScreen} />
        <Stack.Screen name="CropAnalytics" component={CropAnalyticsScreen} />
        <Stack.Screen name="VisitFrequency" component={VisitFrequencyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
