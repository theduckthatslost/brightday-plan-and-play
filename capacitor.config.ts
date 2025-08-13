import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.brightday',
  appName: 'BrightDay',
  webDir: 'dist',
  server: {
    url: 'https://20d86989-5adb-4bf0-aa58-4988bccb926c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      backgroundColor: '#8B5CF6',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#8B5CF6',
    }
  }
};

export default config;