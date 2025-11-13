import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import * as Screens from '../screens';
import {ScreenNames} from './ScreenName';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.ON_BOARDING}
        component={Screens.Onboarding}
      />
      <Stack.Screen name={ScreenNames.LOGIN} component={Screens.Login} />
      <Stack.Screen
        name={ScreenNames.FORGET_PASSWORD}
        component={Screens.ForgetPassword}
      />
      <Stack.Screen
        name={ScreenNames.VERIFICATION_CODE}
        component={Screens.VerificationCode}
      />
      <Stack.Screen
        name={ScreenNames.CREATE_NEW_PASS}
        component={Screens.CreateNewPass}
      />
      <Stack.Screen name={ScreenNames.REGISTER} component={Screens.Register} />
      <Stack.Screen
        name={ScreenNames.PERSONAL_DETAILS}
        component={Screens.PersonalDetails}
      />
      <Stack.Screen
        name={ScreenNames.PERSONAL_DETAILS2}
        component={Screens.PersonalDetails2}
      />
      <Stack.Screen
        name={ScreenNames.DATE_OF_BIRTH}
        component={Screens.DateOfBirth}
      />
      <Stack.Screen name={ScreenNames.WEIGHT} component={Screens.Weight} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
