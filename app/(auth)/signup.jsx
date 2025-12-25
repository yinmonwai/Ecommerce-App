import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function SignUp() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Already have an account? →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/login')}>
        <Text style={styles.btnText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  title: { fontSize: 34, fontWeight: 'bold', marginTop: 80, marginBottom: 30 },
  input: { backgroundColor: 'white', padding: 18, borderRadius: 4, marginBottom: 15, elevation: 2 },
  linkText: { textAlign: 'right', marginBottom: 25 },
  btn: { backgroundColor: Colors.primary, padding: 15, borderRadius: 25, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
});