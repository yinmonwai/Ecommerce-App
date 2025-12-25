import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
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

const ADDRESSES = [
  {
    id: '1',
    name: 'Jane Doe',
    address: '3 Newbridge Court',
    city: 'Chino Hills',
    state: 'CA',
    zip: '91709',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    name: 'John Doe',
    address: '3 Newbridge Court',
    city: 'Chino Hills',
    state: 'CA',
    zip: '91709',
    country: 'United States',
    isDefault: false,
  },
  {
    id: '3',
    name: 'John Doe',
    address: '51 Riverside',
    city: 'Chino Hills',
    state: 'CA',
    zip: '91709',
    country: 'United States',
    isDefault: false,
  },
];

export default function ShippingScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {ADDRESSES.map((item) => (
          <View key={item.id} style={styles.addressCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.nameText}>{item.name}</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.addressText}>
              {item.address}{"\n"}
              {item.city}, {item.state} {item.zip}, {item.country}
            </Text>

            <TouchableOpacity 
              style={styles.checkboxRow} 
              onPress={() => setSelectedId(item.id)}
            >
              <Ionicons 
                name={selectedId === item.id ? "checkbox" : "square-outline"} 
                size={22} 
                color={selectedId === item.id ? COLORS.black : COLORS.gray} 
              />
              <Text style={styles.checkboxLabel}>Use as the shipping address</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* FAB - Add Address */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/add-address')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
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
    backgroundColor: 'white' 
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  addressCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 8, 
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  nameText: { fontSize: 14, fontWeight: '600', color: COLORS.black },
  editText: { color: COLORS.primary, fontWeight: '500' },
  addressText: { 
    fontSize: 14, 
    color: COLORS.black, 
    lineHeight: 21, 
    marginBottom: 15 
  },
  checkboxRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  checkboxLabel: { 
    marginLeft: 10, 
    fontSize: 14, 
    color: COLORS.black 
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 30,
    backgroundColor: COLORS.black,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});