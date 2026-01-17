export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return /^\d{16}$/.test(cleaned);
};

export const validateExpiryDate = (expiry: string): boolean => {
  const [month, year] = expiry.split("/");
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const monthNum = parseInt(month);
  const yearNum = parseInt(`20${year}`);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (monthNum < 1 || monthNum > 12) return false;
  if (yearNum < currentYear) return false;
  if (yearNum === currentYear && monthNum < currentMonth) return false;

  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3}$/.test(cvv);
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(" ").substr(0, 19);
};

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.substr(0, 2)}/${cleaned.substr(2, 2)}`;
  }
  return cleaned;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username) && username.length >= 3;
};
