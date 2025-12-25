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

export default function FavoritesScreen() {
  const [isGridView, setIsGridView] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [isSizeModalVisible, setIsSizeModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Price: lowest to high');
  const router = useRouter();

  const FAVORITES = [
    { id: '1', name: 'Shirt', brand: 'LIME', price: '32$', color: 'Blue', size: 'L', rating: 5, reviews: 10, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', soldOut: false },
    { id: '2', name: 'Longsleeve Violeta', brand: 'Mango', price: '46$', color: 'Orange', size: 'S', rating: 0, reviews: 0, img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400', soldOut: false, isNew: true },
    { id: '3', name: 'Shirt', brand: 'Olivier', price: '52$', color: 'Gray', size: 'L', rating: 4, reviews: 3, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', soldOut: true },
    { id: '4', name: 'T-Shirt', brand: '&Berries', price: '39$', oldPrice: '55$', color: 'Black', size: 'S', rating: 0, reviews: 0, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', discount: '-30%', soldOut: false },
  ];

  const renderProductItem = ({ item }) => {
    if (isGridView) {
      return (
        <View style={[styles.gridCard, item.soldOut && { opacity: 0.6 }]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.img }} style={styles.gridImg} />
            {item.isNew && <View style={[styles.tag, {backgroundColor: COLORS.black}]}><Text style={styles.tagText}>NEW</Text></View>}
            {item.discount && <View style={[styles.tag, {backgroundColor: COLORS.primary}]}><Text style={styles.tagText}>{item.discount}</Text></View>}
            <TouchableOpacity style={styles.closeBtn}><Ionicons name="close" size={16} color={COLORS.gray} /></TouchableOpacity>
            {!item.soldOut && (
              <TouchableOpacity style={styles.bagBtn} onPress={() => setIsSizeModalVisible(true)}>
                <Ionicons name="bag-handle" size={18} color={COLORS.white} />
              </TouchableOpacity>
            )}
            {item.soldOut && <View style={styles.soldOutOverlay}><Text style={styles.soldOutText}>Sorry, this item is currently sold out</Text></View>}
          </View>
          <View style={styles.gridDetails}>
            <View style={styles.prodRatingRow}>
              {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={12} color={i <= item.rating ? COLORS.star : COLORS.gray} />)}
              <Text style={styles.prodReviewCount}>({item.reviews})</Text>
            </View>
            <Text style={styles.prodBrand}>{item.brand}</Text>
            <Text style={styles.prodName}>{item.name}</Text>
            <Text style={styles.prodMeta}>Color: {item.color}  Size: {item.size}</Text>
            <View style={styles.priceRow}>
              {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
              <Text style={[styles.prodPrice, item.discount && { color: COLORS.primary }]}>{item.price}</Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.listCard, item.soldOut && { opacity: 0.7 }]}>
        <Image source={{ uri: item.img }} style={styles.listImg} />
        <View style={styles.listDetails}>
          <View style={styles.listHeader}>
             <Text style={styles.prodBrand}>{item.brand}</Text>
             <TouchableOpacity><Ionicons name="close" size={20} color={COLORS.gray} /></TouchableOpacity>
          </View>
          <Text style={styles.prodName}>{item.name}</Text>
          <Text style={styles.prodMeta}>Color: {item.color}  Size: {item.size}</Text>
          <View style={styles.listFooter}>
            <Text style={styles.prodPrice}>{item.price}</Text>
            <View style={styles.prodRatingRow}>
               {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={13} color={i <= item.rating ? COLORS.star : COLORS.gray} />)}
               <Text style={styles.prodReviewCount}>({item.reviews})</Text>
            </View>
          </View>
          {item.soldOut && <Text style={styles.listSoldOutMessage}>Sorry, this item is currently sold out</Text>}
        </View>
        {!item.soldOut && (
          <TouchableOpacity style={styles.listBagBtn} onPress={() => setIsSizeModalVisible(true)}>
            <Ionicons name="bag-handle" size={20} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navHeader}>
        <View style={{ width: 28 }} />
        <Ionicons name="search" size={26} />
      </View>

      <View style={styles.catalogHeaderContainer}>
        <Text style={styles.catalogLargeTitle}>Favorites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagWrapper}>
          {['Summer', 'T-shirts', 'Shirts', 'Blouses'].map((tag) => (
            <TouchableOpacity key={tag} style={styles.tagItem}><Text style={styles.tagText}>{tag}</Text></TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterAction} onPress={() => router.push('/filters')}>
            <Ionicons name="filter" size={18} /><Text style={styles.filterActionText}> Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterAction} onPress={() => setIsSortVisible(true)}>
            <Ionicons name="swap-vertical" size={18} /><Text style={styles.filterActionText}> {selectedSort}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Ionicons name={isGridView ? "list" : "grid"} size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        key={isGridView ? 'G' : 'L'}
        data={FAVORITES}
        numColumns={isGridView ? 2 : 1}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Select Size Modal (from Favorites/Lists panel) */}
      <Modal visible={isSizeModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.sizeSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.sortTitle}>Select size</Text>
            <View style={styles.sizeGrid}>
              {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                <TouchableOpacity key={s} style={styles.sizeBox}><Text>{s}</Text></TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.sizeInfoRow}>
                <Text>Size info</Text>
                <Ionicons name="chevron-forward" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={() => setIsSizeModalVisible(false)}>
              <Text style={styles.applyBtnText}>ADD TO FAVORITES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={isSortVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.sortSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.sortTitle}>Sort by</Text>
            {['Popular', 'Newest', 'Customer review', 'Price: lowest to high', 'Price: highest to low'].map((option) => (
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
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, height: 40, alignItems: 'center' },
  catalogHeaderContainer: { paddingHorizontal: 16 },
  catalogLargeTitle: { fontSize: 34, fontWeight: '800', marginBottom: 15 },
  tagWrapper: { flexDirection: 'row', marginBottom: 15 },
  tagItem: { backgroundColor: COLORS.black, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 25, marginRight: 8 },
  tagText: { color: 'white', fontSize: 14 },
  filterBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', padding: 12, marginHorizontal: -16 },
  filterAction: { flexDirection: 'row', alignItems: 'center' },
  filterActionText: { fontSize: 12, color: COLORS.black },

  // --- LIST VIEW ---
  listCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, height: 115, marginBottom: 20, elevation: 3 },
  listImg: { width: 115, height: '100%', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  listDetails: { flex: 1, padding: 12 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  listFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' },
  listBagBtn: { position: 'absolute', bottom: -15, right: 0, backgroundColor: COLORS.primary, padding: 12, borderRadius: 30, elevation: 5 },
  listSoldOutMessage: { color: COLORS.gray, fontSize: 11, marginTop: 5 },

  // --- GRID VIEW ---
  gridCard: { width: (width - 48) / 2, marginBottom: 24, marginRight: 16 },
  imageContainer: { height: 184, borderRadius: 8, overflow: 'hidden', backgroundColor: '#eee' },
  gridImg: { width: '100%', height: '100%' },
  tag: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  tagText: { color: 'white', fontSize: 10, fontWeight: '700' },
  closeBtn: { position: 'absolute', top: 8, right: 8 },
  bagBtn: { position: 'absolute', bottom: -10, right: 0, backgroundColor: COLORS.primary, padding: 8, borderRadius: 20, elevation: 4 },
  soldOutOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.6)', justifyContent: 'flex-end', padding: 8 },
  soldOutText: { fontSize: 10, color: COLORS.black, fontWeight: '600' },

  // --- COMMON PRODUCT STYLES ---
  prodName: { fontSize: 16, fontWeight: '700', color: COLORS.black },
  prodBrand: { fontSize: 11, color: COLORS.gray },
  prodMeta: { fontSize: 11, color: COLORS.black, marginVertical: 4 },
  prodRatingRow: { flexDirection: 'row', alignItems: 'center' },
  prodReviewCount: { fontSize: 10, color: COLORS.gray, marginLeft: 4 },
  prodPrice: { fontSize: 14, fontWeight: '700' },
  oldPrice: { textDecorationLine: 'line-through', color: COLORS.gray, fontSize: 12, marginRight: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },

  // --- MODALS ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sortSheet: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 40 },
  sizeSheet: { backgroundColor: COLORS.background, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 16, paddingBottom: 40 },
  dragHandle: { width: 60, height: 6, backgroundColor: COLORS.gray, alignSelf: 'center', marginVertical: 12, borderRadius: 3 },
  sortTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  sortOption: { paddingVertical: 16, paddingHorizontal: 16 },
  sortText: { fontSize: 16 },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  sizeBox: { width: (width - 80) / 3, height: 40, backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  sizeInfoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: 20 },
  applyBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 25, alignItems: 'center' },
  applyBtnText: { color: 'white', fontWeight: '700' }
});