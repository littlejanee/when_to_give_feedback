import { getDownloadURL, getStorage, listAll, ref, StorageReference, StringFormat, uploadString } from 'firebase/storage'
import { app } from './firebaseApp'

class FireStorage {
  storage = getStorage(app)

  async list(path: string): Promise<StorageReference[]> {
    try {
      const res = await listAll(ref(this.storage, path))
      return res.items
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async getDownloadUrl(path: string) {
    try {
      const url = await getDownloadURL(ref(this.storage, path))
      return url
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  async upload(path: string, bas64String: string) {
    try {
      const {
        ref: { fullPath },
      } = await uploadString(ref(this.storage, path), bas64String, StringFormat.BASE64)
      return fullPath
    } catch (e) {
      console.error(e)
      return ''
    }
  }
}

export const fireStorage = new FireStorage()
