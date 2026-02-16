import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from './RatingStars';

const RecommendationCard = ({ recommendation, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.moduleName}>{recommendation.module_name}</Text>
        <RatingStars rating={recommendation.predicted_rating} />
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons 
            name={recommendation.type === 'stage' ? 'briefcase-outline' : 'book-outline'} 
            size={14} 
            color="#666" 
          />
          <Text style={styles.typeText}>
            {recommendation.type === 'stage' ? 'Stage' : 'Cours'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="trending-up-outline" size={14} color="#4CAF50" />
          <Text style={styles.confidenceText}>
            Confiance: {(recommendation.confidence * 100).toFixed(0)}%
          </Text>
        </View>
      </View>
      
      <Text style={styles.reason}>
        💫 {recommendation.match_reason}
      </Text>

      {recommendation.description && (
        <Text style={styles.description} numberOfLines={2}>
          {recommendation.description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  reason: {
    fontSize: 12,
    color: '#2196F3',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default RecommendationCard;