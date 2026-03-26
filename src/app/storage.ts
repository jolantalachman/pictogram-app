import { Storage } from '@capacitor/storage';

export async function setItem(key: string, value: string) {
  await Storage.set({
    key: key,
    value: value,
  });
}

export async function getItem(key: string) {
  const { value } = await Storage.get({ key: key });
  return value;
}
