import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModuleCard = ({ module, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{module.title}</Text>
        <Ionicons 
          name={module.type === 'stage' ? 'briefcase' : 'book'} 
          size={20} 
          color="#2196F3" 
        />
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="school-outline" size={14} color="#666" />
          <Text style={styles.detailText}>
            {module.specialisation || 'Général'}
          </Text>
        </View>
        
        {module.credits && (
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.detailText}>
              {module.credits} crédits
            </Text>
          </View>
        )}
        
        {module.difficulte && (
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={14} color="#666" />
            <Text style={styles.detailText}>
              Difficulté: {module.difficulte}/5
            </Text>
          </View>
        )}
      </View>

      {module.description && (
        <Text style={styles.description} numberOfLines={2}>
          {module.description}
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
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ModuleCard;