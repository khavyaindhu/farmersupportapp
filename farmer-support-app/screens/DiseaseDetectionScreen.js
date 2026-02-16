import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// ── Simulated disease database ────────────────────────────────────────────────
const DISEASE_RESULTS = [
  {
    disease: 'Leaf Blight',
    crop: 'Wheat / Rice',
    severity: 'Moderate',
    severityColor: '#FF9800',
    description:
      'Leaf blight is caused by fungal pathogens. It appears as brown or yellow patches spreading across the leaf surface, eventually drying out the affected areas.',
    symptoms: [
      'Brown or yellow spots on leaves',
      'Wilting of leaf tips',
      'Premature leaf drop',
    ],
    treatment: [
      'Apply Mancozeb 75% WP @ 2g/litre of water',
      'Remove and destroy infected plant parts',
      'Ensure proper field drainage',
      'Avoid overhead irrigation',
    ],
    prevention: 'Use disease-resistant varieties. Maintain crop rotation.',
    helpline: '1800-180-1551',
  },
  {
    disease: 'Powdery Mildew',
    crop: 'Wheat / Vegetables',
    severity: 'Mild',
    severityColor: '#4CAF50',
    description:
      'Powdery mildew is a fungal disease that appears as white powdery spots on leaves and stems. It thrives in warm, dry climates with cool nights.',
    symptoms: [
      'White powdery coating on leaves',
      'Yellowing of leaves',
      'Stunted plant growth',
    ],
    treatment: [
      'Spray Sulfur 80% WP @ 3g/litre of water',
      'Apply Neem oil solution (5 ml/litre)',
      'Remove heavily infected leaves',
      'Improve air circulation around plants',
    ],
    prevention: 'Avoid overcrowding plants. Water at the base, not on leaves.',
    helpline: '1800-180-1551',
  },
  {
    disease: 'Root Rot',
    crop: 'Cotton / Soybean',
    severity: 'Severe',
    severityColor: '#F44336',
    description:
      'Root rot is caused by soil-borne fungi and leads to decay of the root system. It is most common in waterlogged or poorly drained soils.',
    symptoms: [
      'Wilting despite adequate water',
      'Dark brown or black roots',
      'Yellowing of lower leaves',
    ],
    treatment: [
      'Apply Trichoderma viride @ 4g/kg seed treatment',
      'Drench soil with Copper oxychloride 3g/litre',
      'Improve soil drainage immediately',
      'Reduce irrigation frequency',
    ],
    prevention: 'Avoid waterlogging. Use raised bed cultivation.',
    helpline: '1800-180-1551',
  },
  {
    disease: 'Bacterial Leaf Spot',
    crop: 'Tomato / Pepper',
    severity: 'Moderate',
    severityColor: '#FF9800',
    description:
      'Bacterial leaf spot causes small, water-soaked spots that later turn brown with yellow halos. It spreads rapidly in wet and humid conditions.',
    symptoms: [
      'Dark water-soaked spots on leaves',
      'Yellow halo around spots',
      'Premature fruit drop',
    ],
    treatment: [
      'Spray Copper-based bactericide @ 2g/litre',
      'Apply Streptomycin Sulphate 90% + Tetracycline 10% @ 0.5g/litre',
      'Remove and burn infected plant debris',
    ],
    prevention: 'Use certified disease-free seeds. Rotate crops annually.',
    helpline: '1800-180-1551',
  },
  {
    disease: 'No Disease Detected',
    crop: 'General',
    severity: 'Healthy',
    severityColor: '#2E7D32',
    description:
      'Your crop appears to be healthy! No visible signs of disease were detected in the uploaded image. Continue your current farming practices.',
    symptoms: ['No symptoms detected'],
    treatment: ['No treatment required at this time'],
    prevention:
      'Continue regular monitoring. Maintain balanced fertilization and proper irrigation.',
    helpline: '1800-180-1551',
  },
];

const getRandomResult = () =>
  DISEASE_RESULTS[Math.floor(Math.random() * DISEASE_RESULTS.length)];

// ─────────────────────────────────────────────────────────────────────────────

const DiseaseDetectionScreen = ({ navigation, route }) => {
  const { farmerName = 'Farmer', district = '' } = route?.params || {};

  const [imageUri, setImageUri]     = useState(null);
  const [analyzing, setAnalyzing]   = useState(false);
  const [result, setResult]         = useState(null);

  // ── Request camera / gallery permission and pick image ───────────────────
  const requestPermission = async (type) => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera permission is needed to take a photo of your crop.',
          [{ text: 'OK' }]
        );
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Gallery permission is needed to select a photo.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const openCamera = async () => {
    const granted = await requestPermission('camera');
    if (!granted) return;

    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
      setImageUri(pickerResult.assets[0].uri);
      setResult(null);
    }
  };

  const openGallery = async () => {
    const granted = await requestPermission('gallery');
    if (!granted) return;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
      setImageUri(pickerResult.assets[0].uri);
      setResult(null);
    }
  };

  // ── Simulate AI analysis with a loading delay ─────────────────────────────
  const analyzeImage = () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please take or upload a photo of your crop first.');
      return;
    }
    setAnalyzing(true);
    setResult(null);

    // Simulate 3-second AI processing time
    setTimeout(() => {
      setAnalyzing(false);
      setResult(getRandomResult());
    }, 3000);
  };

  const resetScreen = () => {
    setImageUri(null);
    setResult(null);
    setAnalyzing(false);
  };

  // ── Severity badge color ──────────────────────────────────────────────────
  const getSeverityBg = (color) => color + '22'; // 13% opacity hex

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🔬 Disease Detection</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Intro card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Hello, {farmerName} 👋</Text>
          <Text style={styles.infoText}>
            Take a clear photo of your crop leaf or plant to detect diseases instantly.
          </Text>
        </View>

        {/* Image preview / placeholder */}
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderIcon}>📷</Text>
              <Text style={styles.placeholderText}>No image selected</Text>
              <Text style={styles.placeholderSub}>
                Take or upload a photo of your crop
              </Text>
            </View>
          )}
        </View>

        {/* Camera / Gallery buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.captureBtn} onPress={openCamera}>
            <Text style={styles.captureBtnIcon}>📷</Text>
            <Text style={styles.captureBtnText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.captureBtn, styles.captureBtnSecondary]}
            onPress={openGallery}
          >
            <Text style={styles.captureBtnIcon}>🖼️</Text>
            <Text style={[styles.captureBtnText, styles.captureBtnTextSecondary]}>
              Upload Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Analyse button */}
        {imageUri && !analyzing && !result && (
          <TouchableOpacity style={styles.analyzeBtn} onPress={analyzeImage}>
            <Text style={styles.analyzeBtnText}>🔍 Analyse Crop</Text>
          </TouchableOpacity>
        )}

        {/* Loading state */}
        {analyzing && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#1F5C45" />
            <Text style={styles.loadingTitle}>Analysing your crop...</Text>
            <Text style={styles.loadingSubtitle}>
              Checking for diseases, fungal infections & pest damage
            </Text>
            <View style={styles.loadingSteps}>
              <Text style={styles.loadingStep}>✅ Image received</Text>
              <Text style={styles.loadingStep}>✅ Processing with AI model</Text>
              <Text style={styles.loadingStep}>⏳ Generating diagnosis...</Text>
            </View>
          </View>
        )}

        {/* ── Result Card ─────────────────────────────────────────────── */}
        {result && (
          <View style={styles.resultCard}>

            {/* Result header */}
            <View style={styles.resultHeader}>
              <Text style={styles.resultHeaderText}>🧪 Detection Result</Text>
            </View>

            {/* Disease name + severity */}
            <View style={styles.diseaseRow}>
              <View style={styles.diseaseInfo}>
                <Text style={styles.diseaseName}>{result.disease}</Text>
                <Text style={styles.cropName}>Commonly affects: {result.crop}</Text>
              </View>
              <View
                style={[
                  styles.severityBadge,
                  { backgroundColor: getSeverityBg(result.severityColor) },
                ]}
              >
                <Text style={[styles.severityText, { color: result.severityColor }]}>
                  {result.severity}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Description */}
            <Text style={styles.sectionLabel}>📋 Description</Text>
            <Text style={styles.sectionText}>{result.description}</Text>

            {/* Symptoms */}
            <Text style={styles.sectionLabel}>⚠️ Symptoms</Text>
            {result.symptoms.map((s, i) => (
              <Text key={i} style={styles.bulletItem}>• {s}</Text>
            ))}

            {/* Treatment */}
            <Text style={styles.sectionLabel}>💊 Recommended Treatment</Text>
            {result.treatment.map((t, i) => (
              <View key={i} style={styles.treatmentItem}>
                <Text style={styles.treatmentNumber}>{i + 1}</Text>
                <Text style={styles.treatmentText}>{t}</Text>
              </View>
            ))}

            {/* Prevention */}
            <Text style={styles.sectionLabel}>🛡️ Prevention</Text>
            <Text style={styles.sectionText}>{result.prevention}</Text>

            {/* Helpline */}
            <View style={styles.helplineCard}>
              <Text style={styles.helplineTitle}>📞 Need expert advice?</Text>
              <Text style={styles.helplineNumber}>
                Kisan Call Center: {result.helpline}
              </Text>
              <Text style={styles.helplineFree}>(Free, available 24/7)</Text>
            </View>

            {/* Retake button */}
            <TouchableOpacity style={styles.retakeBtn} onPress={resetScreen}>
              <Text style={styles.retakeBtnText}>🔄 Scan Another Crop</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tips card (shown before any image is taken) */}
        {!imageUri && !result && (
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>📌 Tips for best results</Text>
            <Text style={styles.tipItem}>• Take photo in good natural light</Text>
            <Text style={styles.tipItem}>• Focus clearly on the affected leaf or area</Text>
            <Text style={styles.tipItem}>• Avoid blurry or dark images</Text>
            <Text style={styles.tipItem}>• Include the full leaf in the frame</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
};

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F2',
  },
  header: {
    backgroundColor: '#1F5C45',
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    color: '#FFF',
    fontSize: 24,
    width: 32,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  // Intro
  infoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1F5C45',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#388E3C',
    lineHeight: 20,
  },

  // Image area
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  previewImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  placeholderSub: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  captureBtn: {
    flex: 1,
    backgroundColor: '#1F5C45',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
  },
  captureBtnSecondary: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#1F5C45',
  },
  captureBtnIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  captureBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
  captureBtnTextSecondary: {
    color: '#1F5C45',
  },
  analyzeBtn: {
    backgroundColor: '#FF8F00',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },
  analyzeBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Loading
  loadingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  loadingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F5C45',
    marginTop: 16,
    marginBottom: 6,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingSteps: {
    alignSelf: 'stretch',
    backgroundColor: '#F3F7F2',
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  loadingStep: {
    fontSize: 13,
    color: '#444',
    lineHeight: 22,
  },

  // Result
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
  },
  resultHeader: {
    backgroundColor: '#1F5C45',
    padding: 14,
  },
  resultHeaderText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  diseaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  diseaseInfo: {
    flex: 1,
    marginRight: 12,
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B5E20',
  },
  cropName: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  severityBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityText: {
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8F5E9',
    marginHorizontal: 16,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F6B4F',
    marginHorizontal: 16,
    marginBottom: 6,
    marginTop: 4,
  },
  sectionText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  bulletItem: {
    fontSize: 13,
    color: '#444',
    marginHorizontal: 20,
    marginBottom: 4,
    lineHeight: 20,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 10,
  },
  treatmentNumber: {
    backgroundColor: '#1F5C45',
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    flexShrink: 0,
  },
  treatmentText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
    flex: 1,
  },
  helplineCard: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  helplineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1565C0',
    marginBottom: 4,
  },
  helplineNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D47A1',
  },
  helplineFree: {
    fontSize: 11,
    color: '#1976D2',
    marginTop: 2,
  },
  retakeBtn: {
    backgroundColor: '#F3F7F2',
    margin: 16,
    marginTop: 4,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1F5C45',
  },
  retakeBtnText: {
    color: '#1F5C45',
    fontSize: 15,
    fontWeight: '700',
  },

  // Tips
  tipsCard: {
    backgroundColor: '#FFFDE7',
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F9A825',
    marginTop: 4,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F57F17',
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 13,
    color: '#555',
    lineHeight: 24,
  },
});

export default DiseaseDetectionScreen;