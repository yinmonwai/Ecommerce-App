import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PasswordChangeModal from './password-change';

export default function SettingsScreen() {
    const router = useRouter();
    const [salesNotify, setSalesNotify] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                  <TouchableOpacity onPress={() => router.replace('/profile')}><Ionicons name="chevron-back" size={28} /></TouchableOpacity>
                <Ionicons name="search" size={24} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={styles.pageTitle}>Settings</Text>

                <Text style={styles.sectionTitle}>Personal Information</Text>
                <TextInput style={styles.input} placeholder="Full name" defaultValue="Matilda Brown" />
                <TextInput style={styles.input} placeholder="Date of Birth" defaultValue="12/12/1989" />

                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Password</Text>
                    {/* <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity> */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                    <PasswordChangeModal
                        visible={isModalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                </View>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry value="********" />

                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.switchRow}>
                    <Text>Sales</Text>
                    <Switch value={salesNotify} onValueChange={setSalesNotify} trackColor={{ true: '#2AA952' }} />
                </View>
                <View style={styles.switchRow}>
                    <Text>New arrivals</Text>
                    <Switch value={false} />
                </View>
                <View style={styles.switchRow}>
                    <Text>Delivery status changes</Text>
                    <Switch value={false} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
    pageTitle: { fontSize: 34, fontWeight: 'bold', marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 12 },
    input: { backgroundColor: 'white', padding: 15, borderRadius: 4, marginBottom: 15, elevation: 1 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    changeText: { color: '#9B9B9B', fontSize: 14 },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }
});