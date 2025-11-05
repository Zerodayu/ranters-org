export const preventSpaces = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.includes(' ')) {
    e.target.value = e.target.value.replace(/\s/g, '');
  }
};