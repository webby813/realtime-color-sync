import { getDatabase, ref, get, set } from "firebase/database";

const CONFIG_PATH = "/backgroundConfig";

export type BgType = "gradient" | "color" | "image";

export interface BgConfig {
  bgType: BgType;
  colors: {
    color: string;
    midTier: string;
    endTier: string;
    image: string | null;
  };
  animationEffect: boolean;
}

// Read config from Firebase Realtime Database
export async function readBgConfig(): Promise<BgConfig | null> {
  const db = getDatabase();
  const configRef = ref(db, CONFIG_PATH);
  const snapshot = await get(configRef);
  if (snapshot.exists()) {
    return snapshot.val() as BgConfig;
  }
  return null;
}

// Write config to Firebase Realtime Database
export async function updateBgConfig(config: BgConfig): Promise<void> {
  const db = getDatabase();
  const configRef = ref(db, CONFIG_PATH);
  await set(configRef, config);
}
