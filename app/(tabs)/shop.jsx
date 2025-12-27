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
  View
} from 'react-native';
const { width } = Dimensions.get('window');
const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#ffffffff',
  background: '#efebebff',
  border: '#f7f3f3ff',
  star: '#FFBA49',
};

export default function ShopApp() {
  const router = useRouter();
  
  // VIEW STATES: 'main' (Categories), 'sub' (Sub-categories), 'catalog' (Product List)
  const [viewState, setViewState] = useState('main'); 
  const [activeTab, setActiveTab] = useState('Women');
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Price: lowest to high');

  // --- DATA ---
  const CATEGORIES = [
    { id: '1', title: 'New', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400' },
    { id: '2', title: 'Clothes', img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400' },
    { id: '3', title: 'Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
    { id: '4', title: 'Accessories', img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400' },
  ];

  const SUB_CATEGORIES = ['Tops', 'Shirts & Blouses', 'Cardigans', 'Knitwear', 'Blazers', 'Outerwear'];


  // --- NAVIGATION LOGIC ---
  const handleBack = () => {
    if (viewState === 'catalog') setViewState('sub');
    else if (viewState === 'sub') setViewState('main');
    else router.back(); // If at the very beginning
  };

  // --- RENDER 1: MAIN CATEGORIES ---
  const renderMainCategories = () => (
    <ScrollView style={styles.container}>
      <View style={styles.tabBar}>
        {['Women', 'Men', 'Kids'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tabItem, activeTab === tab && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.saleBanner}>
        <Text style={styles.saleTitle}>SUMMER SALES</Text>
        <Text style={styles.saleSub}>Up to 50% off</Text>
      </View>
      {CATEGORIES.map(item => (
        <TouchableOpacity key={item.id} style={styles.catCard} onPress={() => setViewState('sub')}>
          <Text style={styles.catCardText}>{item.title}</Text>
          <Image source={{ uri: item.img }} style={styles.catCardImg} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // --- RENDER 2: SUB CATEGORIES ---
  const renderSubCategories = () => (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.replace('/item')}>
        <Text style={styles.viewAllText}>VIEW ALL ITEMS</Text>
      </TouchableOpacity>
      <Text style={styles.chooseLabel}>Choose category</Text>
      {SUB_CATEGORIES.map((item, index) => (
        <TouchableOpacity key={index} style={styles.subItem} onPress={() => router.replace('/item')}>
          <Text style={styles.subText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={handleBack}><Ionicons name="chevron-back" size={28} /></TouchableOpacity>
        <Text style={styles.navTitle}>{viewState ===  'Categories'}</Text>
        <Ionicons name="search" size={24} />
      </View>

      {viewState === 'main' && renderMainCategories()}
      {viewState === 'sub' && renderSubCategories()}

      {/* SORT MODAL */}
      <Modal visible={isSortVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.sortSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.sortTitle}>Sort by</Text>
            {['Popular', 'Newest', 'Price: lowest to high'].map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.sortOption, selectedSort === option && {backgroundColor: COLORS.primary}]}
                onPress={() => { setSelectedSort(option); setIsSortVisible(false); }}
              >
                <Text style={[styles.sortText, selectedSort === option && {color: 'white'}]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Combined Styles
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, backgroundColor: COLORS.background },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 50 },
  navTitle: { fontSize: 18, fontWeight: '700' },
  
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.white },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: COLORS.primary },
  tabText: { fontSize: 16, color: COLORS.gray },
  activeTabText: { color: COLORS.black, fontWeight: '700' },

  saleBanner: { backgroundColor: COLORS.primary, margin: 16, padding: 25, borderRadius: 8, alignItems: 'center' },
  saleTitle: { color: 'white', fontSize: 24, fontWeight: '900' },
  saleSub: { color: 'white' },

  catCard: { flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 16, marginBottom: 16, borderRadius: 8, height: 100, elevation: 3, overflow: 'hidden', alignItems: 'center', justifyContent: 'space-between' },
  catCardText: { fontSize: 18, fontWeight: '600', paddingLeft: 20 },
  catCardImg: { width: width * 0.45, height: 100 },

  viewAllBtn: { backgroundColor: COLORS.primary, margin: 16, padding: 15, borderRadius: 30, alignItems: 'center' },
  viewAllText: { color: 'white', fontWeight: '700' },
  chooseLabel: { color: COLORS.gray, marginLeft: 16, marginBottom: 10 },
  subItem: { padding: 16, borderBottomWidth: 0.5, borderBottomColor: COLORS.border, marginLeft: 16 },
  subText: { fontSize: 16 },

  catalogHeaderContainer: { paddingHorizontal: 16, paddingTop: 10 },
  catalogLargeTitle: { fontSize: 34, fontWeight: '800', marginBottom: 15 },
  filterBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', padding: 12 },
  filterAction: { flexDirection: 'row', alignItems: 'center' },
  filterActionText: { fontSize: 12 },

  listCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, height: 104, marginBottom: 16, elevation: 3 },
  listImg: { width: 104, height: 104, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  listDetails: { flex: 1, padding: 12 },
  
  gridCard: { width: (width - 48) / 2, marginBottom: 24, marginRight: 16 },
  imageContainer: { height: 184, borderRadius: 8, position: 'relative' },
  gridImg: { width: '100%', height: '100%', borderRadius: 8 },
  gridFavBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', padding: 8, borderTopLeftRadius: 15 },
  
  prodName: { fontSize: 16, fontWeight: '700' },
  prodBrand: { fontSize: 11, color: COLORS.gray },
  prodPrice: { fontSize: 14, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sortSheet: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 40 },
  dragHandle: { width: 60, height: 6, backgroundColor: COLORS.gray, alignSelf: 'center', marginVertical: 12, borderRadius: 3 },
  sortTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  sortOption: { paddingVertical: 16, paddingHorizontal: 16 },
  sortText: { fontSize: 16 },
});