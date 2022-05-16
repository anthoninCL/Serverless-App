import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error while storing ${key}`);
    throw new Error('STORAGE_FAILED');
  }
};

export const storeObjectData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(`Error while storing ${key}`);
    throw new Error('STORAGE_FAILED');
  }
};

export const getStoredData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(`Error while getting ${key}`);
    throw new Error('READING_FAILED');
  }
};

export const getStoredObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(`Error while getting ${key}`);
    throw new Error('READING_FAILED');
  }
};

export const removeStoredData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error while removing ${key}`);
    throw new Error('DELETION_FAILED');
  }
};
