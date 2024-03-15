import { CertificateInfo } from "../Types/CertificateInfo";

// Додає дані до локального сховища
export const addToLocalStorage = (key: string, data: CertificateInfo): void => {
  try {
    // Отримуємо дані з локального сховища
    const existingDataString = localStorage.getItem(key);
    const existingData: CertificateInfo[] = existingDataString ? JSON.parse(existingDataString) : [];

    // Додаємо новий сертифікат до списку
    const updatedData = [...existingData, data];

    // Зберігаємо оновлений список сертифікатів у локальному сховищі
    localStorage.setItem(key, JSON.stringify(updatedData));

    console.log('Дані успішно додано до локального сховища.');
  } catch (error) {
    console.error('Помилка при додаванні даних до локального сховища:', error);
  }
};

export const readFromLocalStorage = (key: string): CertificateInfo[] | undefined => {
  try {
    const data = localStorage.getItem(key); // Зчитуємо дані з локального сховища
    return data ? JSON.parse(data) : null; // Парсимо дані та повертаємо їх, якщо вони є
  } catch (error) {
    console.error('Помилка при зчитуванні даних з локального сховища:', error);
  }
};

// Приклад використання:
// const data = { name: 'John', age: 30 };
// addToLocalStorage('userData', data);

// const retrievedData = readFromLocalStorage('userData');
// console.log('Отримані дані:', retrievedData);
