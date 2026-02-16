export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const isValidPassword = (password) => {
  return password.length >= 6;
};
export const isValidStudentId = (id) => {
  return !isNaN(id) && id > 0;
};
export const isValidRating = (rating, maxRating = 5) => {
  return !isNaN(rating) && rating >= 0 && rating <= maxRating;
};
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!password) {
    errors.password = 'Le mot de passe est requis';
  } else if (!isValidPassword(password)) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};