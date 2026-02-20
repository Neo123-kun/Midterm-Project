import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from './src/screens/JobFinderScreen';
import SavedJobsScreen from './src/screens/SavedJobsScreen';
import { JobsProvider } from './src/context/JobsContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <JobsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Job Finder">
          <Stack.Screen
            name="Job Finder"
            component={JobFinderScreen}
            options={{ title: 'Job Finder' }}
          />
          <Stack.Screen
            name="Saved Jobs"
            component={SavedJobsScreen}
            options={{ title: 'Saved Jobs' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </JobsProvider>
  );
}
