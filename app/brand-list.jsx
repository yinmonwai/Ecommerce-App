// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// export default function BrandListScreen() {
//   const router = useRouter();
//   const [selectedBrands, setSelectedBrands] = useState(['adidas Originals', 'Jack & Jones', 's.Oliver']);
//   const brands = ['adidas', 'adidas Originals', 'Blend', 'Boutique Moschino', 'Champion', 'Diesel', 'Jack & Jones', 'Naf Naf', 'Red Valentino', 's.Oliver'];

//   const toggleBrand = (brand) => {
//     setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} /></TouchableOpacity>
//         <Text style={styles.headerTitle}>Brand</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#9B9B9B" />
//         <TextInput style={styles.searchInput} placeholder="Search" />
//       </View>

//       <FlatList
//         data={brands}
//         keyExtractor={item => item}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.item} onPress={() => toggleBrand(item)}>
//             <Text style={[styles.itemText, selectedBrands.includes(item) && styles.activeItemText]}>{item}</Text>
//             <View style={[styles.checkbox, selectedBrands.includes(item) && styles.activeCheckbox]}>
//               {selectedBrands.includes(item) && <Ionicons name="checkmark" size={16} color="white" />}
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.discardBtn} onPress={() => router.back()}><Text>Discard</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.applyBtn} onPress={() => router.back()}><Text style={styles.applyText}>Apply</Text></TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
//   headerTitle: { fontSize: 18, fontWeight: '700' },
//   searchContainer: { flexDirection: 'row', backgroundColor: '#F9F9F9', margin: 16, padding: 12, borderRadius: 25, alignItems: 'center' },
//   searchInput: { marginLeft: 10, flex: 1 },
//   item: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
//   itemText: { fontSize: 16, color: '#222' },
//   activeItemText: { color: '#DB3022', fontWeight: '600' },
//   checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#9B9B9B' },
//   activeCheckbox: { backgroundColor: '#DB3022', borderColor: '#DB3022' },
//   footer: { flexDirection: 'row', padding: 16, gap: 16, borderTopWidth: 1, borderTopColor: '#eee' },
//   discardBtn: { flex: 1, height: 48, borderRadius: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
//   applyBtn: { flex: 1, height: 48, borderRadius: 25, backgroundColor: '#DB3022', justifyContent: 'center', alignItems: 'center' },
//   applyText: { color: 'white', fontWeight: '600' }
// });


import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
};

export default function BrandListScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState(['adidas Originals', 'Jack & Jones', 's.Oliver']);
  
  const brands = [
    'adidas', 'adidas Originals', 'Blend', 'Boutique Moschino', 
    'Champion', 'Diesel', 'Jack & Jones', 'Naf Naf', 
    'Red Valentino', 's.Oliver'
  ];

  // Filter brands based on search input
  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Brand</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search" 
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Brand List */}
      <FlatList
        data={filteredBrands}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = selectedBrands.includes(item);
          return (
            <TouchableOpacity style={styles.item} onPress={() => toggleBrand(item)}>
              <Text style={[
                styles.itemText, 
                isSelected && styles.activeItemText
              ]}>
                {item}
              </Text>
              <View style={[
                styles.checkbox, 
                isSelected && styles.activeCheckbox
              ]}>
                {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.discardBtn} 
          onPress={() => router.back()}
        >
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.applyBtn} 
          onPress={() => {
            // Logic to pass selectedBrands back to the Filter screen goes here
            router.back();
          }}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    alignItems: 'center',
    backgroundColor: COLORS.white,
    // Add shadow/elevation for header as seen in mockup
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700',
    color: COLORS.black 
  },
  searchWrapper: {
    padding: 16,
  },
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.white, 
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20, 
    alignItems: 'center',
    // Search bar shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: { 
    marginLeft: 10, 
    flex: 1,
    fontSize: 16,
    color: COLORS.black
  },
  listContent: {
    paddingBottom: 20
  },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 18,
    alignItems: 'center' 
  },
  itemText: { 
    fontSize: 16, 
    color: COLORS.black 
  },
  activeItemText: { 
    color: COLORS.primary, 
    fontWeight: '600' 
  },
  checkbox: { 
    width: 20, 
    height: 20, 
    borderRadius: 4, 
    borderWidth: 2, 
    borderColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeCheckbox: { 
    backgroundColor: COLORS.primary, 
    borderColor: COLORS.primary 
  },
  footer: { 
    flexDirection: 'row', 
    padding: 16, 
    gap: 16, 
    backgroundColor: COLORS.white,
    // Bottom shadow/elevation
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  discardBtn: { 
    flex: 1, 
    height: 48, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: COLORS.black,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  discardText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black
  },
  applyBtn: { 
    flex: 1, 
    height: 48, 
    borderRadius: 25, 
    backgroundColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2
  },
  applyText: { 
    color: 'white', 
    fontWeight: '600',
    fontSize: 14 
  }
});