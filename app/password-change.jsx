import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const COLORS = {
  primary: '#DB3022',
  black: '#222222',
  gray: '#9B9B9B',
  white: '#FFFFFF',
};

export default function PasswordChangeModal({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.content}>
            {/* Top Grab Handle */}
            <View style={styles.handle} />

            <Text style={styles.title}>Password Change</Text>

            <View style={styles.inputGroup}>
              <TextInput 
                style={styles.input} 
                placeholder="Old Password" 
                secureTextEntry 
              />
              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="New Password" 
              secureTextEntry 
            />

            <TextInput 
              style={styles.input} 
              placeholder="Repeat New Password" 
              secureTextEntry 
            />

            <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
              <Text style={styles.saveBtnText}>SAVE PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim background
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  content: {
    paddingTop: 14,
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    borderRadius: 3,
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 0,
  },
  input: {
    backgroundColor: 'white',
    height: 64,
    borderRadius: 4,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 14,
    elevation: 4, // Shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 20,
  },
  forgotText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});