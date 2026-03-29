import { Preferences } from '@capacitor/preferences';

export async function setItem(key: string, value: string) {
  await Preferences.set({
    key,
    value,
  });
}

export async function getItem(key: string) {
  const { value } = await Preferences.get({ key });
  return value;
}
