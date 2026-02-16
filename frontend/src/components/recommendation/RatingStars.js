import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RatingStars = ({ rating, maxRating = 5, size = 16, showNumber = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[...Array(maxRating)].map((_, index) => {
          if (index < fullStars) {
            return (
              <Ionicons
                key={index}
                name="star"
                size={size}
                color="#FFC107"
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <Ionicons
                key={index}
                name="star-half"
                size={size}
                color="#FFC107"
              />
            );
          } else {
            return (
              <Ionicons
                key={index}
                name="star-outline"
                size={size}
                color="#FFC107"
              />
            );
          }
        })}
      </View>
      {showNumber && (
        <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});

export default RatingStars;