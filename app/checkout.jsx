import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Shipping Address Section */}
        <Text style={styles.sectionTitle}>Shipping address</Text>
        <View style={styles.addressCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.nameText}>Jane Doe</Text>
            <TouchableOpacity onPress={() => router.push('/shipping')}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            3 Newbridge Court{"\n"}
            Chino Hills, CA 91709, United States
          </Text>
        </View>

        {/* Payment Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity onPress={() => router.push('/payment')}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentRow}>
          <View style={styles.paymentIconContainer}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' }} 
              style={styles.mastercardLogo} 
            />
          </View>
          <Text style={styles.cardNumber}>**** **** **** 3947</Text>
        </View>

        {/* Delivery Method Section */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Delivery method</Text>
        <View style={styles.deliveryRow}>
          <View style={styles.deliveryCard}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_Logo.svg/1280px-FedEx_Corporation_-_Logo.svg.png' }} style={styles.deliveryLogo} />
            <Text style={styles.deliveryTime}>2-3 days</Text>
          </View>
          <View style={styles.deliveryCard}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/USPS_logo.svg/1200px-USPS_logo.svg.png' }} style={styles.deliveryLogo} />
            <Text style={styles.deliveryTime}>2-3 days</Text>
          </View>
          <View style={styles.deliveryCard}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/DHL_Express_logo.svg/1200px-DHL_Express_logo.svg.png' }} style={styles.deliveryLogo} />
            <Text style={styles.deliveryTime}>2-3 days</Text>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order:</Text>
            <Text style={styles.summaryValue}>112$</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery:</Text>
            <Text style={styles.summaryValue}>15$</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Summary:</Text>
            <Text style={styles.totalValue}>127$</Text>
          </View>
        </View>

        {/* Submit Button */}
              <TouchableOpacity style={styles.submitBtn} onPress={() => router.push('/payment')}>
           <Text style={styles.submitBtnText}>SUBMIT ORDER</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  addressCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
  },
  changeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mastercardLogo: {
    width: 35,
    height: 25,
    resizeMode: 'contain',
  },
  cardNumber: {
    fontSize: 14,
    color: COLORS.black,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  deliveryLogo: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 11,
    color: COLORS.gray,
  },
  summaryContainer: {
    marginTop: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});