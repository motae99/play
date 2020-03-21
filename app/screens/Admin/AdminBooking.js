import React, { memo, useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";

import { Agenda } from "react-native-calendars";
import moment from "moment";
import CalenderItem from "./components/CalenderItem";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

// const dayImage = require("../../../images/day.png");
// const nightImage = require("../../../images/night.png");

const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  item: {
    flex: 1,
    height: 80,
    paddingVertical: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 5
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  agenaView: {
    height: 250
  },
  itemImage: {
    height: 35
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "gray",
    flexDirection: "row",
    height: 50,
    alignItems: "center"
  }
});

const available = [
  { day: "Monday", from: "14:30:00", to: "22:15:00", duration: 240 },
  { day: "Tuesday", from: "08:30:00", to: "22:15:00", duration: 30 },
  { day: "Wednesday", from: "10:30:00", to: "16:15:00", duration: 50 },
  { day: "Thursday", from: "08:30:00", to: "10:05:00", duration: 20 },
  { day: "Sunday", from: "08:30:00", to: "23:05:00", duration: 20 }
];

const unAvailable = [
  { date: "2020-02-03", all: true },
  { date: "2020-02-10", all: true },
  { date: "2020-02-20", times: ["08:30:00", "11:10:00", "18:30:00"] }
];

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const allowedFuture = 3;

const requested = {key:'requested', color: 'gray', selectedDotColor: 'gray'};
const booked = {key:'booked', color: 'blue', selectedDotColor: 'blue'};
const confirmed = {key:'confirmed', color: 'green', selectedDotColor: 'green'};
const canceled = {key:'canceled', color: 'red', selectedDotColor: 'red'};

export default memo(() => {
  const [items, setItems] = useState({});
  const [markingDates, setMarkingDates] = useState({});
  const [date, setDate] = useState(null);
  const [selectedDay, selectDay] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Booking")
      // .where('eventProviderID', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const bookings = querySnapshot.docs.map(documentSnapshot => {
          // console.log(documentSnapshot.data())

          let date = documentSnapshot.data().date;
          let data = documentSnapshot.data();
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id // required for FlatList
          };
        });
        // console.log(bookings)
        bookings.forEach(booking => {
        

          if (!items[booking.date]) {
           
            items[booking.date] = [];
          }

          if(booking.status == 'booked'){
            var d = booked
            var selected = false
           }
           if(booking.status == 'confirmed'){
            var d = confirmed
            var selected = true
           }
           if(booking.status == 'requested'){
            var d = requested
            var selected = false

           }
           if(booking.status == 'canceled'){
            var d = canceled
            var selected = false

           }


          if(!markingDates[booking.date]){
           markingDates[booking.date] = {dots: [[booking.status]], marked: true};
          }
         

          items[booking.date].push({
            data: booking
          });

           if(! markingDates[booking.date].dots.some(item => d === item) ){
            markingDates[booking.date].dots.push(d)
          }

          

        });

        setMarkingDates(markingDates)
        // console.log(items);
        setItems(items);
    });


    return () => unsubscribe();
  }, []);


 const loadItems = (day) => {
   setTimeout(() => {
     for (let i = -10; i < 20; i++) {
       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
       const strTime = timeToString(time);
       if (!items[strTime]) {
         items[strTime] = [];
       }
     }
     const newItems = {};
     Object.keys(items).forEach(key => {newItems[key] = items[key];});
     setItems(newItems);
   }, 1000);
 }


  const option = (dateOption, timeOption) => {
    // console.log("touched on date", dateOption);
    // console.log("touched on date", timeOption);
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const renderItem = item => {
    return <View />;
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const callbackFunction = (date, time) => {
    setDate(date);
    setTime(time);
  };

  const filterDay = day => {
    // console.log(items)
    // var exists = items.some(date => day);
    // console.log(exists)
  };

  const handleSelection = () => {
    var data = { date: date, time: time };
    // onTimeSelected(data);
    // closeModal();
  };

  // const today = new Date();

  // const futureMonth = timeToString(
  //   today.setMonth(today.getMonth() + allowedFuture)
  // );

  // console.log(markingDates)
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        // minDate={timeToString(Date())}
        // maxDate={futureMonth}
        items={items}
        loadItemsForMonth={day => loadItems(day)} 
        selected={timeToString(Date())}
        renderItem={(item, firstItemInDay) => {
          
         // console.log(item)
          return <CalenderItem parentCallback={callbackFunction} item={item} />;
        }}
        // renderItem={(item, firstItemInDay) => <View />}
        // renderDay={(day, item) => {return (<View />);}}
        rowHasChanged={rowHasChanged}
        renderEmptyDate={renderEmpty} // instead of having empty arrays everywhere
        renderEmptyData={() => {
          return <View />;
        }}
         markedDates={markingDates}
         markingType={'multi-dot'}
        // pastScrollRange={1}
        // futureScrollRange={allowedFuture + 1}
        // Enable or disable scrolling of calendar list
        scrollEnabled={false}
      />
    </View>
  );
});

// import React, {Component} from 'react';
// import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import {Agenda} from 'react-native-calendars';

// export default class AgendaScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       items: {}
//     };
//   }

//   render() {
//     return (
//       <Agenda
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         selected={'2017-05-16'}
//         renderItem={this.renderItem.bind(this)}
//         renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}
//         // markingType={'period'}
//         // markedDates={{
//         //    '2017-05-08': {textColor: '#43515c'},
//         //    '2017-05-09': {textColor: '#43515c'},
//         //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//         //    '2017-05-21': {startingDay: true, color: 'blue'},
//         //    '2017-05-22': {endingDay: true, color: 'gray'},
//         //    '2017-05-24': {startingDay: true, color: 'gray'},
//         //    '2017-05-25': {color: 'gray'},
//         //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//         // monthFormat={'yyyy'}
//         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//         //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//         // hideExtraDays={false}
//       />
//     );
//   }

//   loadItems(day) {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!this.state.items[strTime]) {
//           this.state.items[strTime] = [];

//           const numItems = Math.floor(Math.random() * 5);
//           for (let j = 0; j < numItems; j++) {
//             this.state.items[strTime].push({
//               name: 'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150))
//             });
//           }
//         }
//       }
//       const newItems = {};
//       Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//   }

//   renderItem(item) {
//     return (
//       <TouchableOpacity
//         style={[styles.item, {height: item.height}]}
//         onPress={() => Alert.alert(item.name)}
//       >
//         <Text>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex:1,
//     paddingTop: 30
//   }
// });
