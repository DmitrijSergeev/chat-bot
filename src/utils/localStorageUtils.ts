type LocalStorageItem<T> = {
  value: T;
  expiry: Date;
};

/** фиксируем время работы токена и сам токен*/
export const setLocalStorageItemWithExpiry = <T>(key: string, value: T): void => {
  const now = new Date();
  const msSec = now.getTime() + 86400000;
  const timeDeleteToken = new Date(msSec);

  const item: LocalStorageItem<T> = {
    value,
    expiry: timeDeleteToken,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/** Удаление из localStorage */
export const deleteTokenInLocalStorage = <T>(key: string): T | null => {
  const itemString = localStorage.getItem(key);
  if (!itemString) return null;

  const item: LocalStorageItem<T> = JSON.parse(itemString);

  localStorage.removeItem(key);
  return item.value;
};

/** Получение токена из localStorage */
export const getTokenInLocalStorage = (key: string): string => {
  const itemString = localStorage.getItem(key);

  if (!itemString) return "";

  const item: LocalStorageItem<string> = JSON.parse(itemString);

  return item.value;
};
