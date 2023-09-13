import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseApp";

type Props = {
  file: File;
  path: string;
};

export async function uploadAsset({ file, path }: Props) {
  const storageRef = ref(storage, path);
  const uploaded = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(uploaded.ref);

  return url;
}
