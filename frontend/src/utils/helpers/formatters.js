export const formatDate = (dateString, locale = 'fr-FR') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
export const formatRating = (rating, maxRating = 5) => {
  return `${rating.toFixed(1)}/${maxRating}`;
};
export const formatPercentage = (value, decimals = 0) => {
  return `${(value * 100).toFixed(decimals)}%`;
};
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
export const formatSpecialization = (specialization) => {
  const specializations = {
    'informatique': 'Informatique',
    'mathematiques': 'Mathématiques',
    'physique': 'Physique',
    'genie_civil': 'Génie Civil',
    'sciences_donnees': 'Sciences des Données',
  };
  
  return specializations[specialization.toLowerCase()] || specialization;
};