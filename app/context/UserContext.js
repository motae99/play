import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from 'react-native'; // had been removed replace with community async Storage
// import AsyncStorage from '@react-native-community/async-storage';

// // import notifee from '@notifee/react-native';

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [User, setUser] = useState("");
  const [userLoading, setLoading] = useState(false);
  const [postsLiked, setpostsLiked] = useState([]);

  async function getLikes(user) {
    let userLikes = await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("postsLike")
      .get();

    let all = userLikes.docs.map(document => {
      // console.log(document.id)
      return {
        key: document.id
      };
    });

    setpostsLiked(all);
  }

  async function onSignIn(user) {
    await Promise.all([
      analytics().setUserId(user.uid),
      analytics().setUserProperty('account_balance', user.balance),
    ]);
  }

  async function checkPermission() {
    const enabled = await messaging().hasPermission();
    const isRegisteredForRemoteNotifications = messaging().isRegisteredForRemoteNotifications;
    if (enabled && isRegisteredForRemoteNotifications) {
      getFcmToken();
    } else {
      requestPermission();
    }
   }

  async function getFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log('fcmToken from storage', fcmToken)
    if (!fcmToken) {
      const fcmToken = await messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
            let uid = auth().currentUser.uid;
            await firestore().doc(`users/${uid}`)
              .update({
                fcmToken: fcmToken,
                // firestore.FieldValues.arrayUnion(fcmToken)
              });

        }
    }
   }

 
   async function requestPermission(){
    try {
      await messaging().registerForRemoteNotifications();

    //  await messaging().requestPermission(); // only on ios
     // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log(error)
    }
   }

  


  


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged( user => {
      setUser(user);
      onSignIn(user)
      // getLikes(user);
      // checkPermission();
    });

    return () => unsubscribe();
  }, []);

  const postLike = async post => {
    const userLike = { timeStamp: Date.now(), ID: post.key };
    if (!post.likes) {
      post.likes = 1;
    } else {
      post.likes = post.likes + 1;
    }

    // delete post.isLiked;


    await firestore()
      .collection("users")
      .doc(User.uid)
      .collection("postsLike")
      .doc(post.key)
      .set(userLike);

    await firestore()
      .collection("posts")
      .doc(post.key)
      .update({
        likes: post.likes,
      });

      // await firestore().sendMessage({
      //   data: {
      //     loggedIn: Date.now(),
      //     uid: firebase.auth().currentUser.uid,
      //   }
      // });
      
  };

  const postDislike = async post => {
    post.likes = post.likes - 1;
    // delete post.isLiked;

    await firestore()
      .collection("users")
      .doc(User.uid)
      .collection("postsLike")
      .doc(post.key)
      .delete();

    await firestore()
      .collection("posts")
      .doc(post.key)
      .update({
        likes: post.likes,
      });
  };

  const postComment = async (post, comment) => {
    const userComment = { timeStamp: Date.now(), displayName: User.displayName, avatar: User.photoURL, comment: comment };
    if (!post.comments) {
      post.comments = 1;
    } else {
      post.comments = post.comments + 1;
    }

    // delete post.isLiked;

    await firestore()
      .collection("posts")
      .doc(post.key)
      .collection("comments")
      .add(userComment);

    await firestore()
      .collection("posts")
      .doc(post.key)
      .update({
        comments: post.comments,
      });
  };

  const updatePassword = async password => {
    try {
      
      await auth().currentUser.updatePassword(password);
    } catch (error) {
      console.log(error);
    }
  };

  const BookEvent = async ({event, time}) => {
    
    console.log(event)
    console.log(time)
    // console.log(services)

    // await firestore()
    //   .collection("users")
    //   .doc(User.uid)
    //   .collection("postsLike")
    //   .doc(post.key)
    //   .delete();

    // await firestore()
    //   .collection("posts")
    //   .doc(post.key)
    //   .update({
    //     likes: post.likes,
    //   });
  };

  return (
    <UserContext.Provider
      value={{
        User,
        updatePassword,
        postLike,
        postDislike,
        postsLiked,
        postComment,
        BookEvent
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

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
