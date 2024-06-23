import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, getFirestore, QueryDocumentSnapshot, setDoc, UpdateData, updateDoc } from 'firebase/firestore'
import { isNil } from 'lodash'
import { Condition } from '../constants/enums'
import { PolotnoStateLog, UserActionLog } from '../types/log'
import { Participant } from '../types/participant'
import { app } from './firebaseApp'

const db = getFirestore(app)

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
})

const dataPoint = <T extends DocumentData>(collectionPath: string) => collection(db, collectionPath).withConverter(converter<T>())

const participants = dataPoint<Participant>('participants')
const polotnoStateLogs = (id: string) => dataPoint<PolotnoStateLog>(`participants/${id}/polotnoStateLogs`)
const userActionLogs = (id: string) => dataPoint<UserActionLog>(`participants/${id}/userActionLogs`)

function createParticipant(condition: Condition): Participant {
  return {
    condition,
    issues: [],
    polotnoState: '',
    completed: false,
  }
}

export const fireStore = {
  participants,
  participant: (id: string) => doc<Participant>(participants, `/${id}`),
  getNewId: async (condition: Condition, id?: string | null) => {
    const newParticipant = createParticipant(condition)
    if (isNil(id)) {
      return (await addDoc(participants, newParticipant)).id
    } else {
      const exists = (await getDoc(fireStore.participant(id))).exists()
      if (!exists) {
        await setDoc(fireStore.participant(id), newParticipant)
      }
      return id
    }
  },
  addNewPolotnoStateLog: async (id: string, log: PolotnoStateLog) => {
    const doc = await addDoc(polotnoStateLogs(id), log)
    return doc.id
  },
  userActionLogs,
  addNewUserActionLog: async (id: string, log: UserActionLog) => {
    const doc = await addDoc(userActionLogs(id), log)
    return doc.id
  },
}

export async function updateDocLog<T>(reference: DocumentReference<T>, data: UpdateData<T>) {
  console.log(reference, data)
  return updateDoc(reference, data)
}
