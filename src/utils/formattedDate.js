export const formatDate = (isoString) => {
  const date = new Date(isoString);

  // Extract day, month, and year
  const day = date.getDate(); // 1-31
  const month = date.toLocaleString('default', { month: 'short' }); 
  const year = date.getFullYear(); 

  return `${day} ${month} ${year}`;
};