export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return sum / ratings.length;
};

export const calculateSimilarityScore = (student1, student2) => {
  let score = 0;
  let totalWeights = 0;
  if (student1.specialite === student2.specialite) {
    score += 0.4;
  }
  totalWeights += 0.4;
  const levelDiff = Math.abs(student1.moyenne - student2.moyenne);
  const levelSimilarity = Math.max(0, 1 - levelDiff / 10); 
  score += levelSimilarity * 0.3;
  totalWeights += 0.3;
  if (student1.age && student2.age) {
    const ageDiff = Math.abs(student1.age - student2.age);
    const ageSimilarity = Math.max(0, 1 - ageDiff / 10); 
    score += ageSimilarity * 0.2;
    totalWeights += 0.2;
  }

  return totalWeights > 0 ? score / totalWeights : 0;
};
export const calculateConfidenceScore = (similarStudents, commonRatings) => {
  const baseConfidence = commonRatings / similarStudents.length;
    const adjustment = Math.min(1, similarStudents.length / 5);
  
  return baseConfidence * adjustment;
};