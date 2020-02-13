import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

export const UserContext = createContext();

const UserContextProvider = (props) => {
  
 const [books, setBooks] = useState([
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);

  // const [userPosts, getUserPosts] = useState([])
  // const [userLikes, getUserLikes] = useState([])
  // const [userFavour, getUserFavour] = useState([])
  // const [userBooking, getUserBooking] = useState([])

  const [User, setUser] = useState('')
  // const [loading, setLoading] = useState(''); 
  // const [profilePhoto, setprofilePhoto] = useState(''); 

  // get all user regarded data on launch
  // posts user had liked 
  // favour user had hearted 
  // contacts of user may know 
  // followers 
  // fans 
  // reservations
  //  
  
  useEffect( () => { 
    
      const unsubscribe = auth().onAuthStateChanged( user => {
        setUser(user)
      });

      

      return () => unsubscribe();
  }, []); 


  const addBook = (title, author) => {
    setBooks([...books, {title, author, id: uuid()}]);
  };



  const updatePassword = async (password) => {
   try{
    await auth().currentUser.updatePassword(password);
   }
   catch (error) {
    console.log(error);
    }
 };
  

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <UserContext.Provider value={{ User, addBook, updatePassword }}>
      {props.children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;

// useEffect(() => {
//  const unsubscribe = intialQuery
//    .onSnapshot((querySnapshot) => {
//      // Add users into an array
//      const Data = querySnapshot.docs.map((documentSnapshot) => {
//        return {
//          ...documentSnapshot.data(),
//          id: documentSnapshot.id, // required for FlatList
//          isHearted: false,
//          // selectedClass = styles.list,
//        };
//      });
     
//      let last = Data[Data.length - 1];
//      let lastId = last.id;
//      // console.log('last',last)
//      console.log('lastId',lastId)
//      setLastVisible(lastId)
//      console.log('before  ',serverData)
//      if(serverData.length > 0){
//        setData(...Data);
//      }
//      else{
//        setData(Data)
//      }
//      // setData(Data);
//      console.log('server data after speread', serverData)

//      // As this can trigger multiple times, only update loading after the first update
//      if (loading) {
//        setLoading(false);
//      }
//      if (refreshing) {
//        setRefreshing(false);
//      }
//    });

//    return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
// }, []);


// loginWithEmail = (email, password) => {
//  return auth().signInWithEmailAndPassword(email, password)
// }

// signupWithEmail = (email, password) => {
//  return auth().createUserWithEmailAndPassword(email, password)
// }

// signOut = () => {
//  return auth().signOut()
// }

// checkUserAuth = user => {
//  return auth().onAuthStateChanged(user)
// }


// createNewUser = userData => {
// return firebase
//   .firestore()
//   .collection('users')
//   .doc(`${userData.uid}`)
//   .set(userData)
// }