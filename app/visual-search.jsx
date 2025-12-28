import { ChevronLeft, RotateCw, Search, Zap } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function VisualSearchDesign() {
  // States: 'landing', 'camera', 'crop', 'loading'
  const [step, setStep] = useState('landing');

  // --- SCREEN 1: LANDING ---
  if (step === 'landing') {
    return (
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000' }} 
        style={styles.fullScreen}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => {}}><ChevronLeft color="white" size={30} /></TouchableOpacity>
          <Text style={styles.topBarTitle}>Visual search</Text>
          <View style={{ width: 30 }} />
        </View>
        <View style={styles.overlayBottom}>
          <Text style={styles.heroText}>Search for an outfit by taking a photo or uploading an image</Text>
          <TouchableOpacity style={styles.btnSolid} onPress={() => setStep('camera')}>
            <Text style={styles.btnText}>TAKE A PHOTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline}>
            <Text style={styles.btnText}>UPLOAD AN IMAGE</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // --- SCREEN 2: CAMERA VIEW ---
  if (step === 'camera') {
    return (
      <View style={styles.cameraContainer}>
        <View style={styles.topBarWhite}>
          <TouchableOpacity onPress={() => setStep('landing')}><ChevronLeft color="black" size={30} /></TouchableOpacity>
          <Text style={styles.topBarTitleBlack}>Search by taking a photo</Text>
          <View style={{ width: 30 }} />
        </View>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000' }} 
          style={styles.cameraPreview} 
        />
        <View style={styles.cameraControls}>
          <Zap color="black" size={24} />
          <TouchableOpacity style={styles.shutterBtn} onPress={() => setStep('crop')}>
             <View style={styles.shutterInner} />
          </TouchableOpacity>
          <RotateCw color="black" size={24} />
        </View>
      </View>
    );
  }

  // --- SCREEN 3: CROP VIEW ---
  if (step === 'crop') {
    return (
      <View style={styles.cameraContainer}>
        <View style={styles.topBarWhite}>
          <TouchableOpacity onPress={() => setStep('camera')}><ChevronLeft color="black" size={30} /></TouchableOpacity>
          <Text style={styles.topBarTitleBlack}>Crop the item</Text>
          <View style={{ width: 30 }} />
        </View>
        <View style={styles.cropWrapper}>
           <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000' }} 
            style={[styles.cameraPreview, { opacity: 0.6 }]} 
          />
          {/* Dummy Crop Box */}
          <View style={styles.cropBox}>
             <View style={[styles.corner, { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 }]} />
             <View style={[styles.corner, { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 }]} />
             <View style={[styles.corner, { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
             <View style={[styles.corner, { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 }]} />
          </View>
        </View>
        <View style={styles.bottomSearchAction}>
          <TouchableOpacity style={styles.searchFab} onPress={() => setStep('loading')}>
            <Search color="white" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- SCREEN 4: LOADING ---
  if (step === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <TouchableOpacity style={styles.backLoading} onPress={() => setStep('crop')}>
           <ChevronLeft color="black" size={30} />
        </TouchableOpacity>
        <Search color="#DB3022" size={60} strokeWidth={1.5} />
        <Text style={styles.findingText}>Finding similar results...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  cameraContainer: { flex: 1, backgroundColor: 'white' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingHorizontal: 15 },
  topBarWhite: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingBottom: 15, paddingHorizontal: 15, backgroundColor: 'white' },
  topBarTitle: { color: 'white', fontSize: 18, fontWeight: '600' },
  topBarTitleBlack: { color: 'black', fontSize: 18, fontWeight: '600' },
  overlayBottom: { flex: 1, justifyContent: 'flex-end', padding: 20, paddingBottom: 40, backgroundColor: 'rgba(0,0,0,0.2)' },
  heroText: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 30, lineHeight: 32 },
  btnSolid: { backgroundColor: '#DB3022', padding: 16, borderRadius: 30, alignItems: 'center', marginBottom: 15 },
  btnOutline: { borderWidth: 1.5, borderColor: 'white', padding: 16, borderRadius: 30, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  cameraPreview: { width: width, height: height * 0.7, resizeMode: 'cover' },
  cameraControls: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 20 },
  shutterBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', borderWidth: 4, borderColor: '#DB3022', justifyContent: 'center', alignItems: 'center' },
  shutterInner: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#DB3022' },
  cropWrapper: { position: 'relative' },
  cropBox: { position: 'absolute', top: 40, left: 40, width: 200, height: 220, borderColor: 'transparent' },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: 'white' },
  bottomSearchAction: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchFab: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#DB3022', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  backLoading: { position: 'absolute', top: 50, left: 15 },
  findingText: { marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#222', width: '60%', textAlign: 'center' }
});