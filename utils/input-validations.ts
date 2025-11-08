export const preventSpaces = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.includes(' ')) {
    e.target.value = e.target.value.replace(/\s/g, '');
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
