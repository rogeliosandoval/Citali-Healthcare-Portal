import { Injectable, inject, signal } from '@angular/core'
import { Auth, UserCredential, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth'
import { doc, Firestore, getDoc } from '@angular/fire/firestore'
import { Observable, from } from 'rxjs'
import { UserData } from '../interfaces/user.interface'
import { Storage, ref, deleteObject } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  storage = inject(Storage)
  firestore = inject(Firestore)
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUserSignal = signal<any>(undefined)
  coreUserData = signal<UserData | null>(null)

  register(email: string, username: string, password: string): Observable<UserCredential> {
    const promise = this.firebaseAuth.setPersistence(browserSessionPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      })
      .then(async(response: UserCredential) => {
        await updateProfile(response.user, { displayName: username })
        return response
      })

    return from(promise)
  }

  loginWithSessionPersistence(email: string, password: string): Observable<void> {
    const promise = this.firebaseAuth.setPersistence(browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.firebaseAuth, email, password)
      })
      .then(() => {})
    
    return from(promise)
  }

  loginWithLocalPersistence(email: string, password: string): Observable<void> {
    const promise = this.firebaseAuth.setPersistence(browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.firebaseAuth, email, password)
      })
      .then(() => {})
    
    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth)
    return from(promise)
  }

  async fetchCoreUserData(): Promise<void> {
    const auth = this.firebaseAuth.currentUser

    if (auth) {
      const uid = auth.uid
      const userRef = doc(this.firestore, `users/${uid}`)
      const userDocSnap = await getDoc(userRef)

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as UserData
        this.coreUserData.set(userData)
      } else {
        this.coreUserData.set(null)
      }
    } else {
      this.coreUserData.set(null)
    }
  }

  async deleteProfileAvatar(): Promise<void> {
    const avatarPath = `users/${this.coreUserData()?.uid}/avatar`
    const avatarRef = ref(this.storage, avatarPath)

    try {
      await deleteObject(avatarRef)
      await this.fetchCoreUserData()
    } catch (error) {
      console.warn('Avatar not found or already deleted:', error)
    }
  }
}