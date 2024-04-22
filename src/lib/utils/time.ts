// Suma un año a la fecha actual para obtener la fecha de expiración de cookie
const currentDate = new Date();
export const expirationDate = new Date(
  currentDate.getFullYear() + 1,
  currentDate.getMonth(),
  currentDate.getDate()
);
