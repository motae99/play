import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../context/UserContext";

function SocialComments({ data, closeModal }) {
  // console.log(" passed post", data)
  // {"index": 1, "item": {"autherID": "cp1OPNefmcY37eTJXBCbAK5en153", "isLiked": false, "key": "NnvK707KG5VKxeuVUkzk", "likes": 2, "post": "I do love you with all my 💓 ❤️💓", "timestamp": 1580930639097, "tite": "One more post", "type": "post"}, "separators": {"highlight": [Function highlight], "unhighlight": [Function unhighlight], "updateProps": [Function updateProps]}}

  //    goIndex = () => {
  //     this.refs.flatListRef.scrollToIndex({animated: true,index:5});
  // };

  const { postComment, User } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  const RenderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={closeModal}>
          <Text style={{ color: "#4080FF" }}>Cancel</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={this.handleonAdd}>
             <Text style={{ fontWeight: "500" }}>Post</Text>
         </TouchableOpacity> */}
      </View>
    );
  };

  const RenderFooter = () => {
    if (!loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const CommentItem = item => {
    return (
      <View style={styles.commentcontainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image style={styles.image} source={{ uri: item.avatar }} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{item.displayName}</Text>
            <Text style={styles.time}>
              {moment(item.timeStamp).format("hh:mm A MMM Do")}
            </Text>
          </View>
          <Text rkType="primary3 mediumLine">{item.comment}</Text>
        </View>
      </View>
    );
  };

  function postC() {
    if (comment) {
      postComment(data.item, comment);
      setComment(" ")
      /// add timeOut before you close model
      //closeModal()
    } else {
      console.log("throw Toaster");
    }
  }

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("posts")
      .doc(data.item.key)
      .collection("comments")
      .orderBy("timeStamp", "asc")
      .onSnapshot(querySnapshot => {
        const serverData = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            id: documentSnapshot.id
          };
        });

        setComments(serverData);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  // console.log(data)
  if (loading) {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={<RenderHeader />}
        ListFooterComponent={<RenderFooter />}
        renderItem={item => {
          return CommentItem(item.item);
        }}
        initialScrollIndex={comments.lenght}
        keyExtractor={item => {
          return item.id;
        }}
        // ref={ref => { this.scrollview_ref = ref}}
        // progressViewOffset = {80}
        //  getItemLayout={(data, index) => (
        //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
        // )}
        // ref={(ref) => { this.flatListRef = ref; }}
        //  then call this function
        //    goIndex = () => {
        //     this.refs.flatListRef.scrollToIndex({animated: true,index:5});
        // };
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onChangeText={text => setComment(text)}
          />
        </View>

        <TouchableOpacity style={styles.btnSend} onPress={() => postC()}>
          <Image
            source={{
              uri: "https://png.icons8.com/small/75/ffffff/filled-sent.png"
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginTop:10,
    // backgroundColor: "#7AFF5F49",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },

  root: {
    backgroundColor: "#000000",
    marginTop: 10
  },
  commentcontainer: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  }
});
export default SocialComments;
