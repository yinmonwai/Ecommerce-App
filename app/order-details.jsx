import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
  success: '#2AA952',
};

const ORDER_ITEMS = [
  { id: '1', name: 'Pullover', brand: 'Mango', color: 'Gray', size: 'L', price: '51$', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105' },
  { id: '2', name: 'Pullover', brand: 'Mango', color: 'Gray', size: 'L', price: '51$', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea' },
  { id: '3', name: 'Pullover', brand: 'Mango', color: 'Gray', size: 'L', price: '51$', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a4bb4' },
];

export default function OrderDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Meta Info */}
        <View style={styles.orderMeta}>
          <Text style={styles.orderID}>Order №1947034</Text>
          <Text style={styles.orderDate}>05-12-2019</Text>
        </View>

        <View style={styles.trackingRow}>
          <Text style={styles.trackingLabel}>Tracking number: <Text style={styles.trackingValue}>IW3475453455</Text></Text>
          <Text style={styles.statusText}>Delivered</Text>
        </View>

        <Text style={styles.itemsCount}>3 items</Text>

        {/* Items List */}
        {ORDER_ITEMS.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemBrand}>{item.brand}</Text>
              <View style={styles.itemSpecs}>
                <Text style={styles.specText}>Color: <Text style={styles.specValue}>{item.color}</Text></Text>
                <Text style={styles.specText}>Size: <Text style={styles.specValue}>{item.size}</Text></Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        ))}

        {/* Order Information Section */}
        <Text style={styles.sectionTitle}>Order information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Shipping Address:</Text>
          <Text style={styles.infoValue}>3 Newbridge Court, Chino Hills,{"\n"}CA 91709, United States</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Payment method:</Text>
          <View style={styles.paymentRow}>
             <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' }} style={styles.cardIcon} />
             <Text style={styles.infoValue}>**** **** **** 3947</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Delivery method:</Text>
          <Text style={styles.infoValue}>FedEx, 3 days, 15$</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Discount:</Text>
          <Text style={styles.infoValue}>10%, Personal promo code</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>133$</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.reorderBtn}>
            <Text style={styles.reorderBtnText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackBtn}>
            <Text style={styles.feedbackBtnText}>Leave feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 16 },
  orderMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderID: { fontSize: 16, fontWeight: '700' },
  orderDate: { color: COLORS.gray },
  trackingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  trackingLabel: { color: COLORS.gray },
  trackingValue: { color: COLORS.black, fontWeight: '600' },
  statusText: { color: COLORS.success, fontWeight: '600' },
  itemsCount: { fontSize: 14, fontWeight: '600', marginBottom: 15 },
  itemCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, marginBottom: 15, overflow: 'hidden', elevation: 2 },
  itemImage: { width: 100, height: 100 },
  itemDetails: { flex: 1, padding: 12 },
  itemName: { fontSize: 16, fontWeight: '700' },
  itemBrand: { color: COLORS.gray, fontSize: 12, marginBottom: 8 },
  itemSpecs: { flexDirection: 'row' },
  specText: { fontSize: 11, color: COLORS.gray, marginRight: 10 },
  specValue: { color: COLORS.black },
  itemPrice: { padding: 12, fontWeight: '700', alignSelf: 'flex-end' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 15 },
  infoRow: { flexDirection: 'row', marginBottom: 15 },
  infoLabel: { width: 120, color: COLORS.gray, fontSize: 14 },
  infoValue: { flex: 1, color: COLORS.black, fontSize: 14, fontWeight: '500' },
  paymentRow: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  cardIcon: { width: 25, height: 15, resizeMode: 'contain', marginRight: 10 },
  totalValue: { color: COLORS.black, fontSize: 16, fontWeight: '700' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 20 },
  reorderBtn: { flex: 0.48, height: 40, borderRadius: 20, borderWidth: 1, borderColor: COLORS.black, justifyContent: 'center', alignItems: 'center' },
  reorderBtnText: { fontWeight: '600' },
  feedbackBtn: { flex: 0.48, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  feedbackBtnText: { color: 'white', fontWeight: '600' },
});