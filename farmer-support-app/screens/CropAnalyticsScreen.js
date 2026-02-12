import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CROPS_STORAGE_KEY = '@farmer_crops';

const CropAnalyticsScreen = ({ navigation }) => {
  const [crops, setCrops] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [totalArea, setTotalArea] = useState(0);

  useEffect(() => {
    loadCropsData();
  }, []);

  const loadCropsData = async () => {
    try {
      const cropsData = await AsyncStorage.getItem(CROPS_STORAGE_KEY);
      if (cropsData) {
        const parsedCrops = JSON.parse(cropsData);
        setCrops(parsedCrops);
        calculateAnalytics(parsedCrops);
      }
    } catch (error) {
      console.error('Error loading crops:', error);
    }
  };

  const calculateAnalytics = (cropsData) => {
    const total = cropsData.reduce((sum, crop) => sum + parseFloat(crop.area || 0), 0);
    setTotalArea(total);

    const analyticsData = cropsData.map((crop) => {
      const area = parseFloat(crop.area || 0);
      const percentage = total > 0 ? ((area / total) * 100).toFixed(1) : 0;
      return {
        name: crop.name,
        icon: crop.icon,
        area: area,
        percentage: percentage,
        color: getColorForCrop(crop.name),
      };
    }).sort((a, b) => b.area - a.area);

    setAnalytics(analyticsData);
  };

  const getColorForCrop = (cropName) => {
    const colors = {
      grapes: '#FF6384',
      tomato: '#36A2EB',
      onion: '#FFCE56',
      wheat: '#4BC0C0',
      sugarcane: '#9966FF',
      rice: '#FF9F40',
      potato: '#C9CBCF',
      carrot: '#4BC0C0',
    };
    return colors[cropName.toLowerCase()] || '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Crop Analytics</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ManageCrops')}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Crops</Text>
              <Text style={styles.summaryValue}>{crops.length}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Area</Text>
              <Text style={styles.summaryValue}>{totalArea.toFixed(1)} ac</Text>
            </View>
          </View>
        </View>

        {/* Analytics Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartTabs}>
            <TouchableOpacity style={[styles.chartTab, styles.chartTabActive]}>
              <Text style={[styles.chartTabText, styles.chartTabTextActive]}>
                Distribution
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chartTab}>
              <Text style={styles.chartTabText}>Territory</Text>
            </TouchableOpacity>
          </View>

          {/* Pie Chart Visualization (Text-based) */}
          <View style={styles.chartVisualization}>
            {analytics.length > 0 ? (
              <View style={styles.pieChartContainer}>
                {analytics.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.pieSegment,
                      {
                        backgroundColor: item.color,
                        flex: parseFloat(item.percentage),
                      },
                    ]}
                  >
                    <Text style={styles.pieSegmentText}>
                      {item.percentage}%
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyChart}>
                <Text style={styles.emptyChartIcon}>📊</Text>
                <Text style={styles.emptyChartText}>No crop data available</Text>
                <Text style={styles.emptyChartSubtext}>
                  Add crops to see analytics
                </Text>
              </View>
            )}
          </View>

          {/* Legend */}
          {analytics.length > 0 && (
            <View style={styles.legend}>
              {analytics.map((item, index) => (
                <View key={index} style={styles.legendRow}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>
                      {item.icon} {item.name}
                    </Text>
                  </View>
                  <Text style={styles.legendValue}>
                    {item.area} ac ({item.percentage}%)
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Top Crops */}
        {analytics.length > 0 && (
          <View style={styles.topCropsCard}>
            <Text style={styles.topCropsTitle}>Top Crops by Area</Text>
            {analytics.slice(0, 3).map((crop, index) => (
              <View key={index} style={styles.topCropItem}>
                <View style={styles.topCropRank}>
                  <Text style={styles.topCropRankText}>{index + 1}</Text>
                </View>
                <Text style={styles.topCropIcon}>{crop.icon}</Text>
                <View style={styles.topCropInfo}>
                  <Text style={styles.topCropName}>{crop.name}</Text>
                  <View style={styles.topCropBar}>
                    <View
                      style={[
                        styles.topCropBarFill,
                        {
                          width: `${crop.percentage}%`,
                          backgroundColor: crop.color,
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.topCropArea}>{crop.area} ac</Text>
              </View>
            ))}
          </View>
        )}

        {/* Menu Links */}
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ManageCrops')}
          >
            <Text style={styles.menuIcon}>🌾</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Manage Crops</Text>
              <Text style={styles.menuSubtitle}>Add, edit, or delete crops</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('VisitFrequency')}
          >
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Visit History</Text>
              <Text style={styles.menuSubtitle}>Track field visits</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🏛️</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Govt. Schemes</Text>
              <Text style={styles.menuSubtitle}>Available subsidies</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F2',
  },
  header: {
    backgroundColor: '#2D5F3F',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
  },
  content: {
    flex: 1,
  },

  /* Summary Card */
  summaryCard: {
    backgroundColor: '#FFF',
    margin: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },

  /* Chart Card */
  chartCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  chartTabs: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  chartTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  chartTabActive: {
    backgroundColor: '#4CAF50',
  },
  chartTabText: {
    fontSize: 14,
    color: '#666',
  },
  chartTabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },

  /* Pie Chart */
  chartVisualization: {
    marginBottom: 20,
  },
  pieChartContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pieSegment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieSegmentText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyChart: {
    alignItems: 'center',
    padding: 40,
  },
  emptyChartIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyChartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  emptyChartSubtext: {
    fontSize: 14,
    color: '#666',
  },

  /* Legend */
  legend: {
    marginTop: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },

  /* Top Crops */
  topCropsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  topCropsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  topCropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  topCropRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  topCropRankText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topCropIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  topCropInfo: {
    flex: 1,
  },
  topCropName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  topCropBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  topCropBarFill: {
    height: '100%',
  },
  topCropArea: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    marginLeft: 10,
  },

  /* Menu List */
  menuList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#999',
  },
});

export default CropAnalyticsScreen;