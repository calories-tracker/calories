import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { AppProvider, useApp } from './src/AppContext';
import CustomTabBar from './src/components/CustomTabBar';
import GoalSheet from './src/components/GoalSheet';

import HomeScreen from './src/screens/HomeScreen';
import DiaryScreen from './src/screens/DiaryScreen';
import TrendsScreen from './src/screens/TrendsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator({ navigation: rootNav }) {
  const { theme, showGoalSheet, setShowGoalSheet, goal, setGoal } = useApp();
  const insets = useSafeAreaInsets();

  const tabBar = useCallback(
    (props) => (
      <CustomTabBar
        {...props}
        theme={theme}
        onCameraPress={() => rootNav.navigate('Camera')}
      />
    ),
    [theme, rootNav]
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Tab.Navigator
        tabBar={tabBar}
        screenOptions={{
          headerShown: false,
          animation: 'shift',
        }}
      >
        <Tab.Screen name="home">
          {() => <HomeScreen onEditGoal={() => setShowGoalSheet(true)} />}
        </Tab.Screen>
        <Tab.Screen name="diary" component={DiaryScreen} />
        <Tab.Screen name="trends" component={TrendsScreen} />
        <Tab.Screen name="profile">
          {() => <ProfileScreen onEditGoal={() => setShowGoalSheet(true)} />}
        </Tab.Screen>
      </Tab.Navigator>

      <GoalSheet
        visible={showGoalSheet}
        currentGoal={goal}
        onClose={() => setShowGoalSheet(false)}
        onSave={(g) => { setGoal(g); setShowGoalSheet(false); }}
        theme={theme}
      />
    </View>
  );
}

function RootNavigator() {
  const { theme } = useApp();
  return (
    <>
      <StatusBar style={theme.bg === '#0A0A0A' ? 'light' : 'dark'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ animation: 'slide_from_right' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
