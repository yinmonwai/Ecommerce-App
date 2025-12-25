import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
  error: '#FF3B30',
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(true); // Set to true to show the error design from the image

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.pageTitle}>Forgot password</Text>

        <Text style={styles.instructionText}>
          Please, enter your email address. You will receive a link to create a new password via email.
        </Text>

        {/* Email Input Field */}
        <View style={[
          styles.inputContainer, 
          isError && styles.inputErrorBorder
        ]}>
          <Text style={[styles.label, isError && { color: COLORS.error }]}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {isError && (
              <Ionicons name="close" size={20} color={COLORS.error} />
            )}
          </View>
        </View>

        {/* Error Message */}
        {isError && (
          <Text style={styles.errorText}>
            Not a valid email address. Should be your@email.com
          </Text>
        )}

        <TouchableOpacity 
          style={styles.sendBtn} 
          onPress={() => console.log('Send link')}
        >
          <Text style={styles.sendBtnText}>SEND</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16 },
  content: { paddingHorizontal: 16, flex: 1 },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputErrorBorder: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  label: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    flex: 1,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sendBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});