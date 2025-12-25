import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState('Women');
  const [viewState, setViewState] = useState('main'); // 'main' | 'sub' | 'catalog'

  const goBack = () => {
    if (viewState === 'catalog') setViewState('sub');
    else if (viewState === 'sub') setViewState('main');
  };

  // --- Screen 1: Main Categories ---
  const renderMainView = () => (
    <FlatList
      data={[
        { id: '1', title: 'New', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
        { id: '2', title: 'Clothes', img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400' },
        { id: '3', title: 'Shoes', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
        { id: '4', title: 'Accessories', img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400' },
      ]}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={styles.saleBanner}>
          <Text style={styles.saleTitle}>SUMMER SALES</Text>
          <Text style={styles.saleSubtitle}>Up to 50% off</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryCard} onPress={() => setViewState('sub')}>
          <Text style={styles.categoryCardText}>{item.title}</Text>
          <Image source={{ uri: item.img }} style={styles.categoryCardImg} />
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );

  // --- Screen 2: Sub-Categories ---
  const renderSubView = () => (
    <FlatList
      data={['Tops', 'Shirts & Blouses', 'Cardigans & Sweaters', 'Knitwear', 'Blazers', 'Outerwear', 'Pants', 'Jeans', 'Shorts', 'Skirts', 'Dresses']}
      keyExtractor={(item) => item}
      ListHeaderComponent={() => (
        <View style={{ padding: 16 }}>
          <TouchableOpacity style={styles.viewAllBtn} onPress={() => setViewState('catalog')}>
            <Text style={styles.viewAllBtnText}>VIEW ALL ITEMS</Text>
          </TouchableOpacity>
          <Text style={styles.chooseLabel}>Choose category</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listRow} onPress={() => setViewState('catalog')}>
          <Text style={styles.listText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );

  // --- Screen 3: Product Catalog (Women's Tops) ---
  const renderCatalogView = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.catalogHeaderContainer}>
        <Text style={styles.catalogLargeTitle}>{activeTab}'s tops</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagWrapper}>
          {['T-shirts', 'Crop tops', 'Sleeveless', 'Shirts'].map((tag) => (
            <TouchableOpacity key={tag} style={styles.tagItem}><Text style={styles.tagText}>{tag}</Text></TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterAction}><Ionicons name="filter" size={18}/><Text style={styles.filterActionText}> Filters</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterAction}><Ionicons name="swap-vertical" size={18}/><Text style={styles.filterActionText}> Price: lowest to high</Text></TouchableOpacity>
          <Ionicons name="grid" size={20} />
        </View>
      </View>
      <FlatList
        data={[
            { id: '1', name: 'Pullover', brand: 'Mango', price: '51$', rating: 4, reviews: 3, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300' },
            { id: '2', name: 'Blouse', brand: 'Dorothy Perkins', price: '34$', rating: 0, reviews: 0, img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300' },
            { id: '3', name: 'T-shirt', brand: 'LOST Ink', price: '12$', rating: 5, reviews: 10, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', fav: true },
        ]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.prodCard}>
            <Image source={{ uri: item.img }} style={styles.prodImg} />
            <View style={styles.prodDetails}>
              <Text style={styles.prodName}>{item.name}</Text>
              <Text style={styles.prodBrand}>{item.brand}</Text>
              <View style={styles.prodRatingRow}>
                {[1,2,3,4,5].map(i => <Ionicons key={i} name="star" size={13} color={i <= item.rating ? COLORS.star : COLORS.gray} />)}
                <Text style={styles.prodReviewCount}>({item.reviews})</Text>
              </View>
              <Text style={styles.prodPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={[styles.prodFavBtn, item.fav && { backgroundColor: COLORS.white }]}>
              <Ionicons name={item.fav ? "heart" : "heart-outline"} size={20} color={item.fav ? COLORS.primary : COLORS.gray} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Dynamic Header Title */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={goBack}><Ionicons name="chevron-back" size={28} /></TouchableOpacity>
        {viewState !== 'catalog' && <Text style={styles.navTitle}>Categories</Text>}
        <Ionicons name="search" size={26} />
      </View>

      {/* Tabs - Only visible on main/sub screens */}
      {viewState !== 'catalog' && (
        <View style={styles.tabContainer}>
          {['Women', 'Men', 'Kids'].map((t) => (
            <TouchableOpacity key={t} onPress={() => {setActiveTab(t); setViewState('main');}} style={[styles.tabButton, activeTab === t && styles.tabActive]}>
              <Text style={[styles.tabLabel, activeTab === t && styles.tabLabelActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {viewState === 'main' ? renderMainView() : viewState === 'sub' ? renderSubView() : renderCatalogView()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 50 },
  navTitle: { fontSize: 18, fontWeight: '700' },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  tabActive: { borderBottomWidth: 3, borderBottomColor: COLORS.primary },
  tabLabel: { fontSize: 16, color: COLORS.gray },
  tabLabelActive: { color: COLORS.black, fontWeight: '700' },

  // SCREEN 1
  saleBanner: { backgroundColor: COLORS.primary, paddingVertical: 28, borderRadius: 8, alignItems: 'center', margin: 16 },
  saleTitle: { color: 'white', fontSize: 24, fontWeight: '900' },
  saleSubtitle: { color: 'white', fontSize: 14 },
  categoryCard: { flexDirection: 'row', height: 100, backgroundColor: 'white', marginBottom: 16, borderRadius: 8, overflow: 'hidden', elevation: 4, shadowOpacity: 0.1, shadowRadius: 5 },
  categoryCardText: { flex: 1, alignSelf: 'center', paddingLeft: 25, fontSize: 18, fontWeight: '600' },
  categoryCardImg: { width: '48%', height: '100%' },

  // SCREEN 2
  viewAllBtn: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  viewAllBtnText: { color: 'white', fontWeight: '600', fontSize: 14 },
  chooseLabel: { marginTop: 15, color: COLORS.gray, fontSize: 14 },
  listRow: { paddingVertical: 18, borderBottomWidth: 0.5, borderBottomColor: COLORS.border, paddingLeft: 40 },
  listText: { fontSize: 16 },

  // SCREEN 3 (Equally fixed design)
  catalogHeaderContainer: { paddingHorizontal: 16, paddingTop: 10 },
  catalogLargeTitle: { fontSize: 34, fontWeight: '800', color: COLORS.black, marginBottom: 15 },
  tagWrapper: { flexDirection: 'row', marginBottom: 15 },
  tagItem: { backgroundColor: COLORS.black, paddingHorizontal: 25, paddingVertical: 8, borderRadius: 25, marginRight: 10 },
  tagText: { color: 'white', fontSize: 14, fontWeight: '500' },
  filterBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', padding: 12, marginHorizontal: -16 },
  filterAction: { flexDirection: 'row', alignItems: 'center' },
  filterActionText: { fontSize: 12, color: COLORS.black },

  prodCard: { flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 16, marginTop: 16, borderRadius: 8, height: 110, elevation: 3, position: 'relative' },
  prodImg: { width: 110, height: 110, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  prodDetails: { flex: 1, padding: 12, justifyContent: 'space-between' },
  prodName: { fontSize: 16, fontWeight: '700', color: COLORS.black },
  prodBrand: { fontSize: 11, color: COLORS.gray },
  prodRatingRow: { flexDirection: 'row', alignItems: 'center' },
  prodReviewCount: { fontSize: 10, color: COLORS.gray, marginLeft: 4 },
  prodPrice: { fontSize: 14, fontWeight: '700' },
  prodFavBtn: { position: 'absolute', right: 0, bottom: -12, backgroundColor: COLORS.white, padding: 10, borderRadius: 25, elevation: 5, shadowOpacity: 0.2 }
});