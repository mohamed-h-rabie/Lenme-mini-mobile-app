export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Verification: { type?: "resetPassword" } | undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  AppTabs: undefined;
};

export type AppTabsParamList = {
  Home: undefined;
  Wallet: undefined;
  Activity: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};
