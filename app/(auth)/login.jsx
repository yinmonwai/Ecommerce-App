import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Adjust this import path to match your project

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity
        style={styles.forgotLink}
        onPress={() => router.push('/forget-password')}
      >
        <Text style={styles.linkText}>Forgot your password? →</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>
      {/* Signup Link */}
      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => router.push('/signup')}
      >
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupBold}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      {/* Social Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Or login with social account</Text>
        <View style={styles.socialRow}>
          {/* Google */}
          <TouchableOpacity style={styles.socialCard}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.socialCard}>
            <FontAwesome name="facebook-square" size={24} color="#4267B2" />
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16
  },
  backButton: {
    marginTop: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontSize: 11,
    color: '#9B9B9B',
    marginBottom: 2,
  },
  input: {
    fontSize: 14,
    color: '#222222',
    fontWeight: '500',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 25
  },
  linkText: {
    color: '#222222',
    fontSize: 14,
  },
  btn: {
    backgroundColor: '#DB3022', // Standard Red color
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#222222',
    marginBottom: 12
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 18,
    color: '#222222',
  },
  signupBold: {
    color: '#DB3022',
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16
  },
  socialCard: {
    width: 92,
    height: 64,
    backgroundColor: '#FFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      android: { elevation: 2 }
    })
  },
});