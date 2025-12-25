import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
};

export default function CheckoutScreen() {
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' }}
          style={styles.successImage}
        />
        <View style={styles.successContent}>
          <Text style={styles.successTitle}>Success!</Text>
          <Text style={styles.successSubtitle}>
            Your order will be delivered soon.{"\n"}Thank you for choosing our app!
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.continueBtnText}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Shipping address</Text>
        {/* <View style={styles.addressCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.nameText}>Jane Doe</Text>
            <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
          </View>
          <Text style={styles.addressText}>3 Newbridge Court{"\n"}Chino Hills, CA 91709, United States</Text>
        </View> */}
        <View style={styles.cardHeader}>
          <Text style={styles.nameText}>Jane Doe</Text>
          {/* Update this link */}
          <TouchableOpacity onPress={() => router.push('/shipping')}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
        </View> */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment</Text>
          {/* Update this button to navigate to payment.jsx */}
          <TouchableOpacity onPress={() => router.push('/payment')}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentRow}>
          <View style={styles.cardLogoBg}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' }} style={styles.cardLogo} />
          </View>
          <Text style={styles.cardNumber}>**** **** **** 3947</Text>
        </View>

        <Text style={styles.sectionTitle}>Delivery method</Text>
        <View style={styles.deliveryRow}>
          <View style={[styles.deliveryCard, styles.activeDelivery]}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_Logo.svg/1280px-FedEx_Corporation_-_Logo.svg.png' }} style={styles.deliveryLogo} />
            <Text style={styles.deliveryTime}>2-3 days</Text>
          </View>
          <View style={styles.deliveryCard}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/USPS_logo.svg/1200px-USPS_logo.svg.png' }} style={styles.deliveryLogo} />
            <Text style={styles.deliveryTime}>2-3 days</Text>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}><Text style={styles.label}>Order:</Text><Text style={styles.val}>112$</Text></View>
          <View style={styles.summaryRow}><Text style={styles.label}>Delivery:</Text><Text style={styles.val}>15$</Text></View>
          <View style={styles.summaryRow}><Text style={styles.totalLabel}>Summary:</Text><Text style={styles.totalVal}>127$</Text></View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={() => router.push('/payment')}>
          <Text style={styles.submitBtnText}>SUBMIT ORDER</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  changeText: { color: COLORS.primary, fontWeight: '600' },
  addressCard: { backgroundColor: 'white', padding: 20, borderRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  nameText: { fontWeight: '700' },
  addressText: { fontSize: 14, lineHeight: 21 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  cardLogoBg: { backgroundColor: 'white', padding: 8, borderRadius: 4, elevation: 2, marginRight: 15 },
  cardLogo: { width: 32, height: 20, resizeMode: 'contain' },
  deliveryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  deliveryCard: { width: '48%', backgroundColor: 'white', padding: 12, borderRadius: 8, alignItems: 'center', elevation: 2 },
  activeDelivery: { borderWidth: 1, borderColor: COLORS.primary },
  deliveryLogo: { width: 45, height: 18, resizeMode: 'contain', marginBottom: 8 },
  deliveryTime: { fontSize: 10, color: COLORS.gray },
  summaryContainer: { marginTop: 40 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  label: { color: COLORS.gray },
  val: { fontWeight: '700' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: COLORS.gray },
  totalVal: { fontSize: 18, fontWeight: '900' },
  submitBtn: { backgroundColor: COLORS.primary, height: 48, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 30, elevation: 4 },
  submitBtnText: { color: 'white', fontWeight: '700' },
  successContainer: { flex: 1, backgroundColor: COLORS.white },
  successImage: { width: '100%', height: '50%', resizeMode: 'cover' },
  successContent: { flex: 1, alignItems: 'center', padding: 30 },
  successTitle: { fontSize: 34, fontWeight: '900', marginTop: 20 },
  successSubtitle: { textAlign: 'center', fontSize: 16, marginVertical: 20 },
  continueBtn: { backgroundColor: COLORS.primary, width: '100%', height: 48, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  continueBtnText: { color: 'white', fontWeight: '700' }
});