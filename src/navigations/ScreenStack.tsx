import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screens from '../screens';
import BottomStak from './BottomStak';
import { ScreenNames } from './ScreenName';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();
const ScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenNames.BOTTOM_STACK} component={BottomStak} />
      <Stack.Screen name={ScreenNames.ABOUT} component={Screens.About} />
      <Stack.Screen name={ScreenNames.MESSAGE} component={Screens.Message} />
      <Stack.Screen
        name={ScreenNames.NOTIFICATION}
        component={Screens.Notification}
      />
      <Stack.Screen
        name={ScreenNames.CHANGE_PASSWORD}
        component={Screens.ChangePass}
      />
      <Stack.Screen
        name={ScreenNames.NEW_PASSWORD}
        component={Screens.NewPass}
      />
      <Stack.Screen
        name={ScreenNames.PRIVACY_POLICY}
        component={Screens.PrivacyPolicy}
      />
      <Stack.Screen
        name={ScreenNames.TERMS_AND_CONDITION}
        component={Screens.TermsCondition}
      />
      <Stack.Screen name={ScreenNames.FAQS} component={Screens.Faqs} />
      <Stack.Screen
        name={ScreenNames.EDIT_PROFILE}
        component={Screens.EditProfile}
      />
      <Stack.Screen
        name={ScreenNames.TRACKERS_LIST}
        component={Screens.TrackersList}
      />
      <Stack.Screen
        name={ScreenNames.EXERCISE_LIST}
        component={Screens.ExerciseList}
      />

      {/* Trainer Screens  */}
      <Stack.Screen
        name={ScreenNames.ACTIVE_TRACKER}
        component={Screens.ActiveTracker}
      />
      <Stack.Screen
        name={ScreenNames.CLIENT_DETAIL}
        component={Screens.ClientDetail}
      />
      <Stack.Screen
        name={ScreenNames.CLIENTS_REGISTER}
        component={Screens.ClientRegister}
      />
      <Stack.Screen
        name={ScreenNames.CLIENTS_REGISTER1}
        component={Screens.ClientRegister1}
      />
      <Stack.Screen
        name={ScreenNames.CLIENTS_REGISTER2}
        component={Screens.ClientRegister2}
      />
      <Stack.Screen
        name={ScreenNames.CLIENTS_REGISTER3}
        component={Screens.ClientRegister3}
      />
      <Stack.Screen
        name={ScreenNames.PLAN_SUCCESS}
        component={Screens.PlanSuccess}
      />
      <Stack.Screen
        name={ScreenNames.CLIENTS_PROFILE}
        component={Screens.ClientProfile}
      />
      <Stack.Screen
        name={ScreenNames.ADD_NEW_TRACKER}
        component={Screens.AddNewTracker}
      />
      <Stack.Screen name={ScreenNames.DIET_PALN} component={Screens.DietPlan} />
    </Stack.Navigator>
  );
};

export default ScreenStack;

const styles = StyleSheet.create({});
