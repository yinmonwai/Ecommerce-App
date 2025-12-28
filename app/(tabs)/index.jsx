import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
// --- Dummy Data ---
const NEW_COLLECTION = [
  {
    id: '1',
    brand: 'Dorothy Perkins',
    name: 'Evening Dress',
    price: 15,
    discountPrice: 12,
    rating: 5,
    reviewCount: 10,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    isNew: true,
    discount: '-20%'
  },
  {
    id: '2',
    brand: 'Sitlly',
    name: 'Sport Dress',
    price: 22,
    discountPrice: 19,
    rating: 4,
    reviewCount: 10,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    isNew: true,
    discount: '-15%'
  },
  {
    id: '3',
    brand: 'Mango',
    name: 'T-Shirt Sailing',
    price: 10,
    rating: 0,
    reviewCount: 0,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    isNew: true
  },
  {
    id: '4',
    brand: 'Dorothy Perkins',
    name: 'Evening Dress',
    price: 15,
    discountPrice: 12,
    rating: 5,
    reviewCount: 10,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    isNew: true,
    discount: '-20%'
  },
  {
    id: '5',
    brand: 'Sitlly',
    name: 'Sport Dress',
    price: 22,
    discountPrice: 19,
    rating: 4,
    reviewCount: 10,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    isNew: true,
    discount: '-15%'
  },
  {
    id: '6',
    brand: 'Mango',
    name: 'T-Shirt Sailing',
    price: 10,
    rating: 0,
    reviewCount: 0,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    isNew: true
  }
];

// --- Sub-Component: Product Card ---
const ProductCard = ({ item }) => (
  
  <View style={styles.card}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.productImg} />
      {/* Labels: New or Discount */}
      {item.discount && (
        <View style={[styles.badge, { backgroundColor: Colors.primary }]}>
          <Text style={styles.badgeText}>{item.discount}</Text>
        </View>
      )}
      {item.isNew && !item.discount && (
        <View style={[styles.badge, { backgroundColor: Colors.black }]}>
          <Text style={styles.badgeText}>NEW</Text>
        </View>
      )}
      {/* Favorite Button */}
      <TouchableOpacity style={styles.favoriteBtn}>
        <Ionicons name="heart-outline" size={18} color={Colors.gray} />
      </TouchableOpacity>
    </View>

    {/* Rating Stars */}
    <View style={styles.ratingRow}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Ionicons 
          key={s} 
          name="star" 
          size={12} 
          color={s <= item.rating ? "#FFBA49" : Colors.gray} 
        />
      ))}
      <Text style={styles.reviewText}>({item.reviewCount})</Text>
    </View>

    <Text style={styles.brandText}>{item.brand}</Text>
    <Text style={styles.productName}>{item.name}</Text>
    
    <View style={styles.priceRow}>
      {item.discountPrice ? (
        <>
          <Text style={styles.oldPrice}>{item.price}$</Text>
          <Text style={styles.newPrice}>{item.discountPrice}$</Text>
        </>
      ) : (
        <Text style={styles.regularPrice}>{item.price}$</Text>
      )}
    </View>
  </View>
);

// --- Main Home Screen ---
export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner Section */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' }} 
        style={styles.hero}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Fashion{"\n"}sale</Text>
          <TouchableOpacity style={styles.checkBtn} onPress={() => router.push('/visual-search')}>
            <Text style={styles.checkBtnText}>Check</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* New Arrivals Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>New</Text>
            <Text style={styles.sectionSubtitle}>You’ve never seen it before!</Text>
          </View>
          <TouchableOpacity><Text style={styles.viewAllText}>View all</Text></TouchableOpacity>
        </View>

        <FlatList
          data={NEW_COLLECTION}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      </View>

      {/* Sale Section (Main 2 design) */}
      <View style={[styles.section, { marginBottom: 30 }]}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Sale</Text>
            <Text style={styles.sectionSubtitle}>Super summer sale</Text>
          </View>
          <TouchableOpacity><Text style={styles.viewAllText}>View all</Text></TouchableOpacity>
        </View>

        <FlatList
          data={NEW_COLLECTION} // Re-using data for demo
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `sale-${item.id}`}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  // Hero Styles
  hero: { width: '100%', height: 530 },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'flex-end', padding: 16, paddingBottom: 32 },
  heroTitle: { color: 'white', fontSize: 48, fontWeight: '900', lineHeight: 48, marginBottom: 18 },
  checkBtn: { backgroundColor: Colors.primary, width: 160, paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  checkBtnText: { color: 'white', fontWeight: 'bold', textTransform: 'uppercase' },
  
  // Section Header
  section: { marginTop: 30 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 34, fontWeight: 'bold', color: Colors.black },
  sectionSubtitle: { fontSize: 11, color: Colors.gray, marginTop: 4 },
  viewAllText: { fontSize: 12, color: Colors.black },
  listPadding: { paddingLeft: 16 },

  // Product Card Styles
  card: { width: 150, marginRight: 16 },
  imageContainer: { width: 150, height: 184, borderRadius: 8, overflow: 'hidden', position: 'relative' },
  productImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  badge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  favoriteBtn: { 
    position: 'absolute', 
    bottom: -15, 
    right: 0, 
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  reviewText: { fontSize: 10, color: Colors.gray, marginLeft: 4 },
  brandText: { fontSize: 11, color: Colors.gray, marginTop: 6 },
  productName: { fontSize: 16, fontWeight: '600', color: Colors.black, marginVertical: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  regularPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.black },
  oldPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.gray, textDecorationLine: 'line-through', marginRight: 4 },
  newPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.primary }
});