import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
  border: '#EEEEEE',
  star: '#FFBA49',
};

export default function ItemScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Women');
  const [isGridView, setIsGridView] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Price: lowest to high');

  const PRODUCTS = [
    { id: '1', name: 'T-Shirt SPANISH', brand: 'Mango', price: '9$', rating: 4, reviews: 3, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', discount: null },
    { id: '2', name: 'Blouse', brand: 'Dorothy Perkins', price: '14$', oldPrice: '21$', rating: 5, reviews: 10, img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400', discount: '-20%' },
    { id: '3', name: 'Shirt', brand: 'Mango', price: '9$', rating: 0, reviews: 0, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', discount: null },
    { id: '4', name: 'Light blouse', brand: 'Dorothy Perkins', price: '14$', oldPrice: '21$', rating: 5, reviews: 10, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', discount: '-20%' },
  ];

  const renderStars = (rating) => (
    <View style={styles.prodRatingRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name="star" size={12} color={i <= rating ? COLORS.star : '#D0D0D0'} />
      ))}
    </View>
  );

  const renderProductItem = ({ item }) => {
    if (isGridView) {
      return (
        <TouchableOpacity 
          style={styles.gridCard} 
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.img }} style={styles.gridImg} />
            {item.discount && (
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.gridFavBtn}>
              <Ionicons name="heart-outline" size={16} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <View style={styles.gridDetails}>
            <View style={styles.ratingWrapper}>
              {renderStars(item.rating)}
              <Text style={styles.prodReviewCount}>({item.reviews})</Text>
            </View>
            <Text style={styles.prodBrand}>{item.brand}</Text>
            <Text style={styles.prodName} numberOfLines={1}>{item.name}</Text>
            <View style={styles.priceRow}>
              {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
              <Text style={[styles.prodPrice, item.discount && { color: COLORS.primary }]}>{item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.listCard} 
        activeOpacity={0.8}
        // onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
      >
        <Image source={{ uri: item.img }} style={styles.listImg} />
        <View style={styles.listDetails}>
          <View>
            <Text style={styles.prodName}>{item.name}</Text>
            <Text style={styles.prodBrand}>{item.brand}</Text>
            <View style={styles.ratingWrapper}>
              {renderStars(item.rating)}
              <Text style={styles.prodReviewCount}>({item.reviews})</Text>
            </View>
          </View>
          <Text style={styles.prodPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.listFavBtn}>
          <Ionicons name="heart-outline" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => router.replace('/shop')}><Ionicons name="chevron-back" size={28} /></TouchableOpacity>
        <Ionicons name="search" size={26} />
      </View>

      <View style={styles.catalogHeaderContainer}>
        <Text style={styles.catalogLargeTitle}>{activeTab}'s tops</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagWrapper}>
          {['T-shirts', 'Crop tops', 'Blouses', 'Sleeveless'].map((tag) => (
            <TouchableOpacity key={tag} style={styles.tagItem}><Text style={styles.tagText}>{tag}</Text></TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterAction} onPress={() => router.push('/filters')}>
            <Ionicons name="filter" size={18} />
            <Text style={styles.filterActionText}> Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterAction} onPress={() => setIsSortVisible(true)}>
            <Ionicons name="swap-vertical" size={18} />
            <Text style={styles.filterActionText}> {selectedSort}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Ionicons name={isGridView ? "list" : "grid"} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        key={isGridView ? 'G' : 'L'}
        data={PRODUCTS}
        numColumns={isGridView ? 2 : 1}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
        columnWrapperStyle={isGridView ? { justifyContent: 'space-between' } : null}
      />

      <Modal visible={isSortVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.sortSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.sortTitle}>Sort by</Text>
            {['Popular', 'Newest', 'Customer review', 'Price: low to high', 'Price: high to low'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.sortOption, selectedSort === option && { backgroundColor: COLORS.primary }]}
                onPress={() => { setSelectedSort(option); setIsSortVisible(false); }}
              >
                <Text style={[styles.sortText, selectedSort === option && { color: COLORS.white }]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 50 },
  catalogHeaderContainer: { paddingHorizontal: 16, paddingTop: 10, backgroundColor: COLORS.white },
  catalogLargeTitle: { fontSize: 34, fontWeight: '800', color: COLORS.black, marginBottom: 15 },
  tagWrapper: { flexDirection: 'row', marginBottom: 15 },
  tagItem: { backgroundColor: COLORS.black, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 25, marginRight: 8 },
  tagText: { color: 'white', fontSize: 14 },
  filterBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', padding: 12, marginHorizontal: -16 },
  filterAction: { flexDirection: 'row', alignItems: 'center' },
  filterActionText: { fontSize: 12, color: COLORS.black },
  listPadding: { padding: 16 },

  // --- LIST CARD ---
  listCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, height: 104, marginBottom: 25, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, position: 'relative' },
  listImg: { width: 104, height: 104, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  listDetails: { flex: 1, padding: 12, justifyContent: 'space-between' },
  listFavBtn: { position: 'absolute', right: 0, bottom: -15, backgroundColor: 'white', padding: 10, borderRadius: 25, elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 },

  // --- GRID CARD ---
  gridCard: { width: (width / 2) - 24, marginBottom: 20 },
  imageContainer: { height: 184, borderRadius: 8, position: 'relative', overflow: 'hidden', backgroundColor: '#F0F0F0' },
  gridImg: { width: '100%', height: '100%' },
  discountTag: { position: 'absolute', top: 8, left: 8, backgroundColor: COLORS.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  discountText: { color: 'white', fontSize: 11, fontWeight: '700' },
  gridFavBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', padding: 8, borderTopLeftRadius: 15, elevation: 2 },
  gridDetails: { paddingTop: 8 },
  ratingWrapper: { flexDirection: 'row', alignItems: 'center' },
  
  // --- TEXT & COMMON ---
  prodName: { fontSize: 16, fontWeight: '700', color: COLORS.black },
  prodBrand: { fontSize: 11, color: COLORS.gray, marginVertical: 2 },
  prodRatingRow: { flexDirection: 'row' },
  prodReviewCount: { fontSize: 10, color: COLORS.gray, marginLeft: 4 },
  prodPrice: { fontSize: 14, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  oldPrice: { textDecorationLine: 'line-through', color: COLORS.gray, marginRight: 4, fontSize: 14 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sortSheet: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 40 },
  dragHandle: { width: 60, height: 6, backgroundColor: '#C4C4C4', alignSelf: 'center', marginVertical: 12, borderRadius: 3 },
  sortTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  sortOption: { paddingVertical: 16, paddingHorizontal: 16 },
  sortText: { fontSize: 16, color: COLORS.black },
});
