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

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/login')}>
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

// import { FontAwesome, Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import {
//   Alert,
//   StyleSheet, // ✅ FIX 1: import StyleSheet
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export default function SignUp() {
//   const router = useRouter();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     if (!name || !email || !password) {
//       Alert.alert('Error', 'All fields are required');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch('http://localhost:8000/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         const message =
//           data?.message ||
//           Object.values(data?.errors || {})[0]?.[0] ||
//           'Signup failed';
//         throw new Error(message);
//       }

//       Alert.alert('Success', 'Account created successfully');
//       router.replace('/login');
//     } catch (error) {
//       Alert.alert('Signup Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//         <Ionicons name="chevron-back" size={24} color="black" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Sign up</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           placeholder="Enter your name"
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           placeholder="Email"
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           placeholder="Password"
//           style={styles.input}
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       <TouchableOpacity onPress={() => router.push('/login')}>
//         <Text style={styles.linkText}>Already have an account? →</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.btn, loading && { opacity: 0.6 }]}
//         onPress={handleSignup}
//         disabled={loading}
//       >
//         <Text style={styles.btnText}>
//           {loading ? 'PLEASE WAIT...' : 'SIGN UP'}
//         </Text>
//       </TouchableOpacity>

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Or sign up with social account</Text>
//         <View style={styles.socialRow}>
//           <TouchableOpacity style={styles.socialCard}>
//             <FontAwesome name="google" size={24} color="#DB4437" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.socialCard}>
//             <FontAwesome name="facebook-square" size={24} color="#4267B2" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// /* ✅ FIX 2: styles definition */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//     padding: 16,
//   },
//   backButton: {
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   inputContainer: {
//     backgroundColor: '#FFF',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginBottom: 15,
//     elevation: 2,
//   },
//   label: {
//     fontSize: 11,
//     color: '#9B9B9B',
//     marginBottom: 2,
//   },
//   input: {
//     fontSize: 14,
//     color: '#222',
//   },
//   linkText: {
//     textAlign: 'right',
//     marginBottom: 25,
//     color: '#222',
//   },
//   btn: {
//     backgroundColor: '#DB3022',
//     height: 48,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   footer: {
//     marginTop: 'auto',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   footerText: {
//     marginBottom: 12,
//   },
//   socialRow: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   socialCard: {
//     width: 92,
//     height: 64,
//     backgroundColor: '#FFF',
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
// });
