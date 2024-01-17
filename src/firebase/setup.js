import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyAqwgznDz91mKVmJlpns2AhxpRyUG1Igmw',
  authDomain: 'netflix-clone-3a1a2.firebaseapp.com',
  projectId: 'netflix-clone-3a1a2',
  storageBucket: 'netflix-clone-3a1a2.appspot.com',
  messagingSenderId: '881711089840',
  appId: '1:881711089840:web:59d519c7d486ee3d1d9375'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()

export const database = getFirestore(app)