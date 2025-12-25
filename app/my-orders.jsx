import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = { primary: '#DB3022', black: '#222222', gray: '#9B9B9B', white: '#FFFFFF', background: '#F9F9F9' };

export default function MyOrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} /></TouchableOpacity>
        <Ionicons name="search" size={24} />
      </View>
      
      <Text style={styles.pageTitle}>My Orders</Text>

      {/* Filter Tabs */}
      <View style={styles.tabs}>
        {['Delivered', 'Processing', 'Cancelled'].map((tab, i) => (
          <TouchableOpacity key={tab} style={[styles.tab, i === 0 && styles.activeTab]}>
            <Text style={[styles.tabText, i === 0 && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>Order №1947034</Text>
              <Text style={styles.orderDate}>05-12-2019</Text>
            </View>
            <Text style={styles.trackingLabel}>Tracking number: <Text style={styles.trackingValue}>IW3475453455</Text></Text>
            <View style={styles.orderInfoRow}>
              <Text style={styles.infoLabel}>Quantity: <Text style={styles.infoValue}>3</Text></Text>
              <Text style={styles.infoLabel}>Total Amount: <Text style={styles.infoValue}>112$</Text></Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.detailsBtn}
                onPress={() => router.push('/order-details')}
              >
                <Text>Details</Text>
              </TouchableOpacity>
              <Text style={styles.statusText}>Delivered</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  pageTitle: { fontSize: 34, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 20 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  activeTab: { backgroundColor: COLORS.black },
  tabText: { color: COLORS.black, fontSize: 14 },
  activeTabText: { color: 'white' },
  orderCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 20, elevation: 3 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  orderNumber: { fontWeight: '600', fontSize: 16 },
  orderDate: { color: COLORS.gray },
  trackingLabel: { color: COLORS.gray, marginBottom: 10 },
  trackingValue: { color: COLORS.black, fontWeight: '500' },
  orderInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  infoLabel: { color: COLORS.gray },
  infoValue: { color: COLORS.black, fontWeight: '600' },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailsBtn: { borderWidth: 1, paddingVertical: 6, paddingHorizontal: 20, borderRadius: 20 },
  statusText: { color: '#2AA952', fontWeight: '600' }
});