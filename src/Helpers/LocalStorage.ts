import { Certificate } from "../Types/Certificate";

export const addToLocalStorage = (key: string, data: Certificate): void => {
  try {
    const existingDataString = localStorage.getItem(key);
    const existingData: Certificate[] = existingDataString ? JSON.parse(existingDataString) : [];
    const updatedData = [...existingData, data];

    localStorage.setItem(key, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error adding data to local storage:', error);
  }
};

export const readFromLocalStorage = (key: string): Certificate[] | undefined => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading data from local storage:', error);
  }
};
