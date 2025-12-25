import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
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
};

export default function AddAddressScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adding Shipping Address</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Form Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full name</Text>
            <TextInput style={styles.input} placeholder="Jane Doe" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} placeholder="3 Newbridge Court" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} placeholder="Chino Hills" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>State/Province/Region</Text>
            <TextInput style={styles.input} placeholder="California" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Zip Code (Postal Code)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="91709" 
              keyboardType="numeric" 
            />
          </View>

          <TouchableOpacity style={styles.inputContainer}>
            <Text style={styles.label}>Country</Text>
            <View style={styles.countryPicker}>
              <Text style={styles.inputText}>United States</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.black} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.saveBtn} 
            onPress={() => router.back()}
          >
            <Text style={styles.saveBtnText}>SAVE ADDRESS</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    height: 60,
    backgroundColor: 'white',
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  inputContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  label: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 4,
  },
  input: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    paddingVertical: 4,
  },
  inputText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  countryPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});