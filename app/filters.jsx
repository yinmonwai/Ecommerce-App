import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = { primary: '#DB3022', black: '#222222', gray: '#9B9B9B', white: '#FFFFFF', background: '#F9F9F9' };

export default function FiltersScreen() {
  const router = useRouter();
  const [selectedSizes, setSelectedSizes] = useState(['S', 'M']);
  const [category, setCategory] = useState('All');

  const SizeChip = ({ label }) => (
    <TouchableOpacity 
      style={[styles.chip, selectedSizes.includes(label) && styles.activeChip]}
      onPress={() => setSelectedSizes(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label])}
    >
      <Text style={[styles.chipText, selectedSizes.includes(label) && styles.activeChipText]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody}>
        <Text style={styles.sectionTitle}>Price range</Text>
        <View style={styles.pricePlaceholder}>
          <Text>$78 - $143</Text>
          <View style={styles.sliderBar}><View style={styles.sliderActive} /></View>
        </View>

        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.row}>
          {['#020202', '#FFFFFF', '#B82222', '#BEA9A9', '#E2BB8D', '#151867'].map(c => (
            <View key={c} style={[styles.colorCircle, { backgroundColor: c }, c === '#020202' && styles.activeColor]} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sizes</Text>
        <View style={styles.row}>
          {['XS', 'S', 'M', 'L', 'XL'].map(s => <SizeChip key={s} label={s} />)}
        </View>

        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryWrap}>
          {['All', 'Women', 'Men', 'Boys', 'Girls'].map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catBtn, category === cat && styles.activeCatBtn]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.catText, category === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.brandRow} onPress={() => router.push('/brand-list')}>
          <View>
            <Text style={styles.sectionTitle}>Brand</Text>
            <Text style={styles.brandSubtitle}>adidas Originals, Jack & Jones, s.Oliver</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.discardBtn} onPress={() => router.back()}><Text>Discard</Text></TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={() => router.back()}><Text style={styles.applyText}>Apply</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, elevation: 2, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollBody: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 12 },
  pricePlaceholder: { backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 1 },
  sliderBar: { height: 4, backgroundColor: COLORS.gray, marginTop: 15, borderRadius: 2 },
  sliderActive: { width: '60%', height: 4, backgroundColor: COLORS.primary, alignSelf: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  colorCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#eee' },
  activeColor: { borderColor: COLORS.primary, borderWidth: 2 },
  chip: { width: 40, height: 40, borderWeight: 1, borderColor: '#eee', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWeight: 1, borderWidth: 1 },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 14 },
  activeChipText: { color: 'white' },
  categoryWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  activeCatBtn: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 14 },
  activeCatText: { color: 'white' },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  brandSubtitle: { color: COLORS.gray, fontSize: 12 },
  footer: { flexDirection: 'row', padding: 16, gap: 16, backgroundColor: 'white', elevation: 10 },
  discardBtn: { flex: 1, height: 48, borderRadius: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  applyBtn: { flex: 1, height: 48, borderRadius: 25, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  applyText: { color: 'white', fontWeight: '600' }
});