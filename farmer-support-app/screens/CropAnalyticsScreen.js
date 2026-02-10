import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

const CropAnalyticsScreen = ({ navigation }) => {
  const pieData = [
    {
      name: 'Grapes',
      population: 35,
      color: '#FF6384',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Tomato',
      population: 25,
      color: '#36A2EB',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Onion',
      population: 20,
      color: '#FFCE56',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Wheat',
      population: 15,
      color: '#4BC0C0',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Onana',
      population: 5,
      color: '#9966FF',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Crop Analytics</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>⚙️</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.chartCard}>
          <View style={styles.chartTabs}>
            <TouchableOpacity style={[styles.chartTab, styles.chartTabActive]}>
              <Text style={[styles.chartTabText, styles.chartTabTextActive]}>Distribution</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chartTab}>
              <Text style={styles.chartTabText}>Territory</Text>
            </TouchableOpacity>
          </View>

        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Text>📊 Pie Chart Placeholder</Text>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
            Chart data will appear here
          </Text>
        </View>

          <View style={styles.legend}>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF6384' }]} />
                <Text style={styles.legendText}>Grapes - 35%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#36A2EB' }]} />
                <Text style={styles.legendText}>Tomato - 25%</Text>
              </View>
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FFCE56' }]} />
                <Text style={styles.legendText}>Onion - 20%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4BC0C0' }]} />
                <Text style={styles.legendText}>Wheat - 15%</Text>
              </View>
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#9966FF' }]} />
                <Text style={styles.legendText}>Onana - 5%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Visit History</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📋</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Govt, Schemes</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.fieldBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
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
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  chartCard: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  legend: {
    marginTop: 10,
  },
  legendRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  chevron: {
    fontSize: 24,
    color: '#999',
  },
  fieldBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#C4B896',
    opacity: 0.3,
    zIndex: -1,
  },
});

export default CropAnalyticsScreen;
