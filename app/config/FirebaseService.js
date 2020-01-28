// import app from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

export default class FirebaseService {
  auth = auth();
  firestore = firestore()
  storage = storage()

  postsRef = this.firestore.collection('posts');
  usersRef = this.firestore.collection('users');
  partyHallsRef = this.firestore.collection('partyHalls');

  // auth
  async loginWithEmail ({ email, password }) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async signupWithEmail ({ email, password }) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async signOut () {
    console.log('signout')

    // return this.auth.signOut()
  }

//   async checkUserAuth () {
//     try {
//         const response = await this.auth.onAuthStateChanged()
//         if(response){
//             return { user: response.user }
//         }else{
//             return false
//         }
        
//     } catch (error) {
//         return { error }
//     }
    
//  }

  

//   // not recommended
//   currentUser () {
//     return this.auth.currentUser;
//   }


  // firestore

  // Create User with specifed ID if existed id will update if not create new user 
  createNewUser (userData) {
    return this.usersRef
      .doc(`${userData.uid}`)
      .set(userData)
  }

  createPost (post) {
    return this.postsRef
      .add(`${post}`)
  }
 
  async fetchPosts () {
    const posts = await this.postsRef
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()
    return posts.docs
  }

}
