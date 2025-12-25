import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Ensure this path matches your project structure
// If Colors isn't defined, you can use: const primary = '#DB3022';

export default function SignUp() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput placeholder="Mr. Muffin" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      </View>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Already have an account? →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/login')}>
        <Text style={styles.btnText}>SIGN UP</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Or sign up with social account</Text>
        <View style={styles.socialRow}>
          {/* Google Icon */}
          <TouchableOpacity style={styles.socialCard}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          
          {/* Facebook Icon */}
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
  linkText: { 
    textAlign: 'right', 
    marginBottom: 25,
    color: '#222222',
    fontSize: 14,
  },
  btn: { 
    backgroundColor: '#DB3022', 
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