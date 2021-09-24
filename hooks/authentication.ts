// import { getApps } from "firebase/app"
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore' 

const userState = atom<User>({
  key: 'user',
  default: null,
})

async function createUserIfNotFound(user: User){
  const db = getFirestore()
  const usersCollection = collection(db, 'users')
  const userRef = doc(usersCollection, user.uid)
  const document = await getDoc(userRef)
  if(document.exists()){
    return 
  }

  await setDoc(userRef, {
    name: 'yuta' + new Date().getTime(),
  })


}

export function useAuthentication() {
  
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    const auth = getAuth()

    signInAnonymously(auth)
      .catch(function (error) {
        // Handle Errors here.
        console.error(error)
      })

    onAuthStateChanged(auth, user => {
      if(user){
        console.log('Set user')

        const loginUser: User = {
          uid: user.uid,
          isAnonymous: user.isAnonymous,
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)
        console.log(user.isAnonymous)
      }else{
        // User is signed out.
        setUser(null)
      }
    })
  }, [])

  return { user }
}

