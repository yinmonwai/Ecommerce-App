import { Redirect } from 'expo-router';

export default function Index() {
  // In a design-only mode, we start at Sign Up
  return <Redirect href="/(auth)/signup" />;
}
