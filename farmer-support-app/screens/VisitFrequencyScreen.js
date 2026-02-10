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

const VisitFrequencyScreen = ({ navigation }) => {
  const barData = {
    labels: ['2/27', '2/28', '3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'],
    datasets: [
      {
        data: [30, 45, 35, 50, 40, 55, 48, 38, 42],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌾 Visit Frequency</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>⚙️</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTabs}>
              <TouchableOpacity style={[styles.chartTab, styles.chartTabActive]}>
                <Text style={[styles.chartTabText, styles.chartTabTextActive]}>Field Visits</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartTab}>
                <Text style={styles.chartTabText}>Last 1 Months</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Total Field Visits</Text>
            <Text style={styles.statsValue}>378</Text>
          </View>

<View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
  <Text>📊 Bar Chart Placeholder</Text>
  <Text style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
    Visit frequency data will appear here
  </Text>
</View>

          <View style={styles.chartFooter}>
            <Text style={styles.chartFooterTitle}>Taylor Visits: 201</Text>
            <Text style={styles.chartFooterSubtitle}>फील्ड विजिट दरें</Text>
            <Text style={styles.chartFooterDescription}>
              Your strategic visits make a big difference in farmer success and growth
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Text style={styles.summaryIconText}>📊</Text>
          </View>
          <Text style={styles.summaryText}>
            फील्ड विजिट दरें{'\n'}
            Your strategic visits
          </Text>
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
  chartHeader: {
    marginBottom: 15,
  },
  chartTabs: {
    flexDirection: 'row',
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
    fontSize: 12,
    color: '#666',
  },
  chartTabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  chartFooter: {
    marginTop: 10,
  },
  chartFooterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  chartFooterSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  chartFooterDescription: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: '#FFF9E6',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    marginRight: 15,
  },
  summaryIconText: {
    fontSize: 32,
  },
  summaryText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
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

export default VisitFrequencyScreen;
