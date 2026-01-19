import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
  background: '#F9F9F9',
};

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'My orders',
      subtitle: 'Already have 12 orders',
      route: '/my-orders',
    },
    {
      title: 'Shipping addresses',
      subtitle: '3 addresses',
      route: '/shipping',
    },
    {
      title: 'Payment methods',
      subtitle: 'Visa **34',
      route: '/payment',
    },
    {
      title: 'Promocodes',
      subtitle: 'You have special promocodes',
      route: '/promocodes',
    },
    {
      title: 'My reviews',
      subtitle: 'Reviews for 4 items',
      route: '/reviews',
    },
    {
      title: 'Settings',
      subtitle: 'Notifications, password',
      route: '/settings',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>My profile</Text>

        {/* Profile Info Section */}
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }}
            style={styles.avatar}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Matilda Brown</Text>
            <Text style={styles.emailText}>matildabrown@mail.com</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  nameContainer: { marginLeft: 16 },
  nameText: { fontSize: 18, fontWeight: '700', color: COLORS.black },
  emailText: { fontSize: 14, color: COLORS.gray },
  menuList: { marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '600', color: COLORS.black },
  menuSubtitle: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
});