import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DiabetesDiagnosticScreen from './src/DiabetesDiagnosticScreen';
import ResultScreen from './src/ResultScreen';
import DefineForm from './src/DefineForm';
import Men from './src/Men';
import Women from './src/Women';
import Loop from './src/Loop';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScreenHome">
        <Stack.Screen
          name="ScreenHome"
          component={DiabetesDiagnosticScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DefineForm"
          component={DefineForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Men"
          component={Men}
          options={{
            title: '', headerStyle: {
              height: 40,
              backgroundColor: '#008B81',
            },
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Women"
          component={Women}
          options={{
            title: '', headerStyle: {
              height: 40,
              backgroundColor: '#008B81',
            },
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Loop"
          component={Loop}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{
            title: '', headerStyle: {
              height: 40,
              backgroundColor: '#f0f0f0',
            },
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;