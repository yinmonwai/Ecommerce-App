import { Redirect } from 'expo-router';

export default function Index() {
  // In a design-only mode, we start at Login
  return <Redirect href="/(auth)/login" />;
}
