import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={[1, 2, 3, 4]}
        numColumns={2}
        renderItem={() => (
          <View style={styles.card}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3' }} style={styles.img} />
            <Text style={styles.brand}>LIME</Text>
            <Text style={styles.name}>Shirt</Text>
            <Text style={styles.price}>32$</Text>
            <View style={styles.heartBtn}>
              <Ionicons name="heart" size={16} color="white" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 15 },
  title: { fontSize: 34, fontWeight: 'bold', marginTop: 50, marginBottom: 20 },
  card: { flex: 0.5, margin: 5, backgroundColor: 'white', borderRadius: 8, padding: 10 },
  img: { width: '100%', height: 180, borderRadius: 8 },
  brand: { color: Colors.gray, fontSize: 11, marginTop: 5 },
  name: { fontWeight: 'bold' },
  price: { color: Colors.primary },
  heartBtn: { position: 'absolute', right: 5, bottom: 40, backgroundColor: Colors.primary, padding: 5, borderRadius: 15 }
});