import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useRouter } from 'expo-router';

// Global Colors matching your UI
const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
};

const INITIAL_BAG_ITEMS = [
  { id: '1', name: 'Pullover', color: 'Black', size: 'L', price: 51, quantity: 1, image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4' },
  { id: '2', name: 'T-Shirt', color: 'Gray', size: 'L', price: 30, quantity: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
  { id: '3', name: 'Sport Dress', color: 'Black', size: 'M', price: 43, quantity: 1, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c' },
];

export default function BagScreen() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_BAG_ITEMS);
  const [promoCode, setPromoCode] = useState('');

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderBagItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <div style={{ flex: 1 }}>
        <View style={styles.info}>
          <View style={styles.headerRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity><Ionicons name="ellipsis-vertical" size={20} color={COLORS.gray} /></TouchableOpacity>
          </View>
          <Text style={styles.itemSpecs}>Color: {item.color}  Size: {item.size}</Text>
          <View style={styles.controls}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                <Ionicons name="remove" size={20} color={COLORS.gray} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
                <Ionicons name="add" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.priceText}>{item.price * item.quantity}$</Text>
          </View>
        </View>
      </div>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity><Ionicons name="search" size={26} color={COLORS.black} /></TouchableOpacity>
      </View>
      <Text style={styles.title}>My Bag</Text>
      <FlatList
        data={items}
        renderItem={renderBagItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footerArea}>
            <View style={styles.promoContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter your promo code"
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity style={styles.promoBtn}>
                <Ionicons name="arrow-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total amount:</Text>
              <Text style={styles.totalValue}>{totalAmount}$</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutBtn}
              onPress={() => router.push('/checkout')} 
            >
              <Text style={styles.checkoutText}>CHECK OUT</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { alignItems: 'flex-end', paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 34, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 24 },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, marginBottom: 24, height: 104, elevation: 3, shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  image: { width: 104, height: 104, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: '700' },
  itemSpecs: { fontSize: 11, color: COLORS.gray },
  controls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  qtyText: { marginHorizontal: 15, fontSize: 14, fontWeight: '600' },
  priceText: { fontSize: 14, fontWeight: '700' },
  footerArea: { marginTop: 10 },
  promoContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, height: 52, alignItems: 'center', marginBottom: 28, overflow: 'hidden' },
  promoInput: { flex: 1, paddingLeft: 20, fontSize: 14 },
  promoBtn: { backgroundColor: COLORS.black, width: 52, height: 52, justifyContent: 'center', alignItems: 'center' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  totalLabel: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },
  totalValue: { fontSize: 18, fontWeight: '700' },
  checkoutBtn: { backgroundColor: COLORS.primary, height: 48, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  checkoutText: { color: 'white', fontSize: 14, fontWeight: '700' }
});