import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
  cardBlack: '#222222',
};

export default function PaymentScreen() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [useDefault, setUseDefault] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Your payment cards</Text>

        {/* Black Card (Mastercard) */}
        <View style={[styles.creditCard, { backgroundColor: COLORS.cardBlack }]}>
          <View style={styles.cardChip} />
          <Text style={styles.cardNumberText}>**** **** **** 3947</Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>Card Holder Name</Text>
              <Text style={styles.cardValue}>Jennyfer Doe</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expiry Date</Text>
              <Text style={styles.cardValue}>05/23</Text>
            </View>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' }} 
              style={styles.cardBrandLogo} 
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setUseDefault(!useDefault)}
        >
          <Ionicons 
            name={useDefault ? "checkbox" : "square-outline"} 
            size={24} 
            color={useDefault ? COLORS.black : COLORS.gray} 
          />
          <Text style={styles.checkboxText}>Use as default payment method</Text>
        </TouchableOpacity>

      <View style={[styles.creditCard, { backgroundColor: COLORS.gray, marginTop: 25 }]}>
          <Text style={styles.cardNumberText}>**** **** **** 4546</Text>
          <View style={styles.cardBottom}>
            <View><Text style={styles.cardLabel}>Card Holder Name</Text><Text style={styles.cardValue}>Jennyfer Doe</Text></View>
            <View><Text style={styles.cardLabel}>Expiry Date</Text><Text style={styles.cardValue}>11/22</Text></View>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>VISA</Text>
          </View>
        </View>
      </ScrollView>

      {/* FAB - Add Card */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Add New Card Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderIndicator} />
            <Text style={styles.modalTitle}>Add new card</Text>
            
            <TextInput style={styles.input} placeholder="Name on card" />
            <TextInput style={styles.input} placeholder="Card number" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" />
            <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" />

            <TouchableOpacity style={styles.addCardBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.addCardBtnText}>ADD CARD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 20 },
  creditCard: {
    height: 200,
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardNumberText: { color: 'white', fontSize: 22, letterSpacing: 2, marginTop: 30 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', alignItems: 'flex-end' },
  cardLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
  cardValue: { color: 'white', fontSize: 14, fontWeight: '600' },
  cardBrandLogo: { width: 40, height: 25, resizeMode: 'contain' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  checkboxText: { marginLeft: 10, fontSize: 14 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.black,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeaderIndicator: { width: 40, height: 6, backgroundColor: '#C4C4C4', alignSelf: 'center', borderRadius: 3, marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 4, marginBottom: 15, elevation: 2 },
  addCardBtn: { backgroundColor: COLORS.primary, height: 48, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  addCardBtnText: { color: 'white', fontWeight: '700' }
});