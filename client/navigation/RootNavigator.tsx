import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBar from "@/components/TabBar";
import type { AppTabsParamList, RootStackParamList } from "./types";
import HomeScreen from "@/app/(app)/index";
import WalletScreen from "@/app/(app)/wallet";
import ActivityScreen from "@/app/(app)/activity";
import NotificationsScreen from "@/app/(app)/notifications";
import Profile from "@/app/(app)/profile";
import SettingsScreen from "@/app/(app)/settings";
import SignIn from "@/app/sign-in";
import SignUp from "@/app/sign-up";
import Verification from "@/app/verification";
import ForgetPassword from "@/app/forgetPassword";
import ResetPassword from "@/app/resetPassword";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabsParamList>();

function AppTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

type RootNavigatorProps = {
  isAuthenticated: boolean;
  backgroundColor: string;
};

export default function RootNavigator({
  isAuthenticated,
  backgroundColor,
}: RootNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="AppTabs" component={AppTabsNavigator} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}
