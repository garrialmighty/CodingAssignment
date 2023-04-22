import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from 'src/screens/landing';
import QuestionScreen from 'src/screens/question';
import LeaderboardScreen from 'src/screens/leaderboard';

export type AppStackParamList = {
  Landing: undefined;
  Question: undefined;
  Leaderboards: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{
          headerTitleStyle: {
            fontSize: 30,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen name="Leaderboards" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
