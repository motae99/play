import React, { memo , useState, useEffect } from "react";

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
import CalenderItem from "./CalenderItem";

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

export default memo(({ closeModal, onTimeSelected }) => {
  const [items, setItems] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedDay, selectDay] = useState(null);
  const [time, setTime] = useState(null);

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const today = new Date(); // today date time
    const currentDay = timeToString(today); // current day in date only format
    const futureMonth = timeToString(
      today.setMonth(today.getMonth() + allowedFuture)
    );
    let daysToAdd = [];

    function load() {
      setTimeout(() => {
        for (let i = 0; i < allowedFuture*30; i++) {
          // const selectedDay = day;
          const time = Date.now() + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          const dateTime = new Date(strTime);
          const dayOfWeek = weekday[dateTime.getDay()];
          const availableTobook = available.some(
            item => dayOfWeek === item.day
          );
          const unAvailableTobook = unAvailable.some(
            item => strTime === item.date && item.all
          );
          if (
            strTime >= currentDay &&
            strTime <= futureMonth &&
            availableTobook &&
            !unAvailableTobook
          ) {
            daysToAdd[strTime] = [];
            // daysToAdd.push(strTime)

            // console.log(daysToAdd);
            const timesToSchedule = available.filter(
              item => dayOfWeek === item.day
            );

            var date = strTime;
            const startTime = timesToSchedule[0].from; // beacause only one object is set per day
            const endTime = timesToSchedule[0].to;
            const AddMins = timesToSchedule[0].duration * 60 * 1000; // because in millisecond

            var startDateTime = moment(
              `${date} ${startTime}`,
              "YYYY-MM-DD HH:mm:ss"
            ).valueOf();
            var endDateTime = moment(
              `${date} ${endTime}`,
              "YYYY-MM-DD HH:mm:ss"
            ).valueOf();

            var ReturnSchedule = [];

            while (startDateTime <= endDateTime) {
              //Run loop
              const time = moment(startDateTime).format("HH:mm:ss");

              // check if currently generated time is unavailable
              const unAvailableTimesbook = unAvailable.filter(
                item => date === item.date
              );
              if (unAvailableTimesbook && unAvailableTimesbook.length > 0) {
                var notAllowed = unAvailableTimesbook[0].times;
                var cant = notAllowed.some(item => time === item);
              }

              if (!cant) {
                ReturnSchedule.push(time);
              }
              startDateTime += AddMins; //Endtime check
            }

            daysToAdd[strTime].push({
              date: strTime,
              schedule: ReturnSchedule
            });
          }
        }
        setItems(daysToAdd);
      }, 1000);
    }
    // console.log("effect", items);

    return load();
  }, []);

  // useEffect(() => {
  //   const today = new Date(); // today date time
  //   const currentDay = timeToString(today); // current day in date only format
  //   const futureMonth = timeToString(
  //     today.setMonth(today.getMonth() + allowedFuture)
  //   );
  //   let daysToAdd = [];

  //   function load(day) {
  //     setTimeout(() => {
  //       for (let i = 0; i < 10; i++) {
  //         const selectedDay = day;
  //         const time = selectedDay + i * 24 * 60 * 60 * 1000;
  //         const strTime = timeToString(time);
  //         const dateTime = new Date(strTime);
  //         const dayOfWeek = weekday[dateTime.getDay()];
  //         const availableTobook = available.some(
  //           item => dayOfWeek === item.day
  //         );
  //         const unAvailableTobook = unAvailable.some(
  //           item => strTime === item.date && item.all
  //         );
  //         if (
  //           strTime >= currentDay &&
  //           strTime <= futureMonth &&
  //           availableTobook &&
  //           !unAvailableTobook
  //         ) {
  //           daysToAdd[strTime] = [];
  //           // daysToAdd.push(strTime)

  //           console.log(daysToAdd);
  //           const timesToSchedule = available.filter(
  //             item => dayOfWeek === item.day
  //           );

  //           var date = strTime;
  //           const startTime = timesToSchedule[0].from; // beacause only one object is set per day
  //           const endTime = timesToSchedule[0].to;
  //           const AddMins = timesToSchedule[0].duration * 60 * 1000; // because in millisecond

  //           var startDateTime = moment(
  //             `${date} ${startTime}`,
  //             "YYYY-MM-DD HH:mm:ss"
  //           ).valueOf();
  //           var endDateTime = moment(
  //             `${date} ${endTime}`,
  //             "YYYY-MM-DD HH:mm:ss"
  //           ).valueOf();

  //           var ReturnSchedule = [];

  //           while (startDateTime <= endDateTime) {
  //             //Run loop
  //             const time = moment(startDateTime).format("HH:mm:ss");

  //             // check if currently generated time is unavailable
  //             const unAvailableTimesbook = unAvailable.filter(
  //               item => date === item.date
  //             );
  //             if (unAvailableTimesbook && unAvailableTimesbook.length > 0) {
  //               var notAllowed = unAvailableTimesbook[0].times;
  //               var cant = notAllowed.some(item => time === item);
  //             }

  //             if (!cant) {
  //               ReturnSchedule.push(time);
  //             }
  //             startDateTime += AddMins; //Endtime check
  //           }

  //           daysToAdd[strTime].push({
  //             date: strTime,
  //             schedule: ReturnSchedule
  //           });
  //         }
  //       }
  //       setItems(daysToAdd);
  //     }, 1000);
  //   }
  //   console.log("effect", items);

  //   return load(selectDay);
  // }, [selectDay]);



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

  const booking = () => {
    // selected({
    //   data: { date: date, time: time }
    // });
  };

  const handleSelection = () => {
    var data = { date: date, time: time };
    onTimeSelected(data);
    closeModal();
  };

  const today = new Date();

  const futureMonth = timeToString(
    today.setMonth(today.getMonth() + allowedFuture)
  );
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        minDate={timeToString(Date())}
        maxDate={futureMonth}
        items={items}
        // loadItemsForMonth={day => selectDay(day)} //loadItems}
        selected={timeToString(Date())}
        renderItem={(item, firstItemInDay) => {
          return (
            <CalenderItem parentCallback={callbackFunction} data={item} />
          );
        }}
        // renderItem={(item, firstItemInDay) => <View />}
        rowHasChanged={rowHasChanged}
        renderEmptyData={renderEmpty} // instead of having empty arrays everywhere
        pastScrollRange={1}
        futureScrollRange={allowedFuture + 1}
        // Enable or disable scrolling of calendar list
        scrollEnabled={false}
      />

      <View style={styles.footer}>
        {date && time ? (
          <View style={styles.bottomButtons}>
            <Text>
              Selected Date: {date} at {time}
            </Text>
            <TouchableOpacity
              onPress={handleSelection}
              // onPress={ () => navigation.navigate('EventDetail', {selected: {date: date, time: time} } )}
            >
              <Text> Confirm </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text> Plz select sthing</Text>
        )}
      </View>
    </View>
  );
})




// import React, { Component, useState, useEffect } from "react";

// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert
// } from "react-native";

// import { Agenda } from "react-native-calendars";
// import moment from "moment";
// import CalenderItem from "./CalenderItem";

// // const dayImage = require("../../../images/day.png");
// // const nightImage = require("../../../images/night.png");

// const styles = StyleSheet.create({
//   row: {
//     backgroundColor: "white",
//     flexDirection: "row",
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   item: {
//     flex: 1,
//     height: 80,
//     paddingVertical: 20,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "space-around",
//     marginHorizontal: 5
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   },
//   agenaView: {
//     height: 250
//   },
//   itemImage: {
//     height: 35
//   },
//   footer: {
//     position: "absolute",
//     flex: 0.1,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "gray",
//     flexDirection: "row",
//     height: 50,
//     alignItems: "center"
//   }
// });

// const available = [
//   { day: "Monday", from: "14:30:00", to: "22:15:00", duration: 240 },
//   { day: "Tuesday", from: "08:30:00", to: "22:15:00", duration: 30 },
//   { day: "Wednesday", from: "10:30:00", to: "16:15:00", duration: 50 },
//   { day: "Thursday", from: "08:30:00", to: "10:05:00", duration: 20 },
//   { day: "Sunday", from: "08:30:00", to: "23:05:00", duration: 20 }
// ];

// const unAvailable = [
//   { date: "2020-02-03", all: true },
//   { date: "2020-02-10", all: true },
//   { date: "2020-02-20", times: ["08:30:00", "11:10:00", "18:30:00"] }
// ];

// const weekday = new Array(7);
// weekday[0] = "Sunday";
// weekday[1] = "Monday";
// weekday[2] = "Tuesday";
// weekday[3] = "Wednesday";
// weekday[4] = "Thursday";
// weekday[5] = "Friday";
// weekday[6] = "Saturday";

// const allowedFuture = 3;

// const AgendaScreen = ({closeModal, onTimeSelected}) => {
//   const [items, setItems] = useState([]);
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState(null);

//   const timeToString = time => {
//     const date = new Date(time);
//     return date.toISOString().split("T")[0];
//   }; 


//   const loadItems = day => {
//     console.log(day)
//     const today = new Date(); // today date time
//     console.log(today)

//     const currentDay = timeToString(today); // current day in date only format
//     console.log('current ', currentDay)
//     const futureMonth = timeToString(
//       today.setMonth(today.getMonth() + allowedFuture)
      
//     );

//     setTimeout(() => {
//       for (let i = 0; i < 10; i++) {
//         const selectedDay = day;
//         const time = selectedDay.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         // console.log('string formated', strTime)
//         // console.log('date from day ', selectedDay.dateString)
//         const dateTime = new Date(strTime);
//         const dayOfWeek = weekday[dateTime.getDay()];
//         const availableTobook = available.some(item => dayOfWeek === item.day);
//         const unAvailableTobook = unAvailable.some(
//           item => strTime === item.date && item.all
//         );

//         if (
//           strTime >= currentDay &&
//           strTime <= futureMonth &&
//           availableTobook &&
//           !unAvailableTobook
//         ) {
//           if (!items[strTime]) {
//             setItems(items[strTime] = [])
//             // items[strTime] = [];

//             const timesToSchedule = available.filter(
//               item => dayOfWeek === item.day
//             );

//             var date = strTime;
//             const startTime = timesToSchedule[0].from; // beacause only one object is set per day
//             const endTime = timesToSchedule[0].to;
//             const AddMins = timesToSchedule[0].duration * 60 * 1000; // because in millisecond

//             var startDateTime = moment(
//               `${date} ${startTime}`,
//               "YYYY-MM-DD HH:mm:ss"
//             ).valueOf();
//             var endDateTime = moment(
//               `${date} ${endTime}`,
//               "YYYY-MM-DD HH:mm:ss"
//             ).valueOf();

//             var ReturnSchedule = [];

//             while (startDateTime <= endDateTime) {
//               //Run loop
//               const time = moment(startDateTime).format("HH:mm:ss");

//               // check if currently generated time is unavailable
//               const unAvailableTimesbook = unAvailable.filter(
//                 item => date === item.date
//               );
//               if (unAvailableTimesbook && unAvailableTimesbook.length > 0) {
//                 var notAllowed = unAvailableTimesbook[0].times;
//                 var cant = notAllowed.some(item => time === item);
//               }

//               if (!cant) {
//                 ReturnSchedule.push(time);
//               }
//               startDateTime += AddMins; //Endtime check
//             }

//             items[strTime].push({
//               date: strTime,
//               schedule: ReturnSchedule
//             });
//           }
//         }
//       }
//     }, 1000);
//   };

//   // useEffect(() => {
//   //   const today = new Date(); // today date time
//   //   const currentDay = timeToString(today); // current day in date only format
//   //   const futureMonth = timeToString(
//   //     today.setMonth(today.getMonth() + allowedFuture)
//   //   );

//   //   setTimeout(() => {
//   //     for (let i = 0; i < 90; i++) {
//   //       const selectedDay = today;
//   //       const time = selectedDay.timestamp + i * 24 * 60 * 60 * 1000;
//   //       const strTime = timeToString(time);
//   //       const dateTime = new Date(strTime);
//   //       const dayOfWeek = weekday[dateTime.getDay()];
//   //       const availableTobook = available.some(item => dayOfWeek === item.day);
//   //       const unAvailableTobook = unAvailable.some(
//   //         item => strTime === item.date && item.all
//   //       );

//   //       if (
//   //         strTime >= currentDay &&
//   //         strTime <= futureMonth &&
//   //         availableTobook &&
//   //         !unAvailableTobook
//   //       ) {
//   //         if (!items[strTime]) {
//   //           setItems(items[strTime] = [])
//   //           // items[strTime] = [];

//   //           const timesToSchedule = available.filter(
//   //             item => dayOfWeek === item.day
//   //           );

//   //           var date = strTime;
//   //           const startTime = timesToSchedule[0].from; // beacause only one object is set per day
//   //           const endTime = timesToSchedule[0].to;
//   //           const AddMins = timesToSchedule[0].duration * 60 * 1000; // because in millisecond

//   //           var startDateTime = moment(
//   //             `${date} ${startTime}`,
//   //             "YYYY-MM-DD HH:mm:ss"
//   //           ).valueOf();
//   //           var endDateTime = moment(
//   //             `${date} ${endTime}`,
//   //             "YYYY-MM-DD HH:mm:ss"
//   //           ).valueOf();

//   //           var ReturnSchedule = [];

//   //           while (startDateTime <= endDateTime) {
//   //             //Run loop
//   //             const time = moment(startDateTime).format("HH:mm:ss");

//   //             // check if currently generated time is unavailable
//   //             const unAvailableTimesbook = unAvailable.filter(
//   //               item => date === item.date
//   //             );
//   //             if (unAvailableTimesbook && unAvailableTimesbook.length > 0) {
//   //               var notAllowed = unAvailableTimesbook[0].times;
//   //               var cant = notAllowed.some(item => time === item);
//   //             }

//   //             if (!cant) {
//   //               ReturnSchedule.push(time);
//   //             }
//   //             startDateTime += AddMins; //Endtime check
//   //           }

//   //           items[strTime].push({
//   //             date: strTime,
//   //             schedule: ReturnSchedule
//   //           });
//   //         }
//   //       }
//   //     }
//   //   }, 1000);

//   //  }, []);

//   const option = (dateOption, timeOption) => {
//     console.log("touched on date", dateOption);
//     console.log("touched on date", timeOption);
//   };

//   const renderEmpty = () => {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   };

//   const renderItem = item => {
//     return <CalenderItem />;
//   };

//   const rowHasChanged = (r1, r2) => {
//     return r1.name !== r2.name;
//   };

  

//   const callbackFunction = (date, time) => {
//     setDate(date)
//     setTime(time)
//   };

//   const booking = () => {
//     // selected({
//     //   data: { date: date, time: time }
//     // });
//   };

//   const handleSelection = () => {
//     var data = { date: date, time: time };
//     onTimeSelected(data);
//     closeModal();
//   };

//   const today = new Date();

//   const futureMonth = timeToString(
//     today.setMonth(today.getMonth() + allowedFuture)
//   );
//   return (
//     <View style={{ flex: 1 }}>
//       <Agenda
//         minDate={timeToString(Date())}
//         maxDate={futureMonth}
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={timeToString(Date())}
//         // renderItem={renderItem}
//         renderItem={(item, firstItemInDay) => <CalenderItem parentCallback={callbackFunction} data={item} />}
//         rowHasChanged={rowHasChanged}
//         renderEmptyData={renderEmpty} // instead of having empty arrays everywhere
//         pastScrollRange={1}
//         futureScrollRange={allowedFuture + 1}
//         // Enable or disable scrolling of calendar list
//         scrollEnabled={false}
//       />

//       <View style={styles.footer}>
//         {date && time ? (
//           <View style={styles.bottomButtons}>
//             <Text>
//               Selected Date: {date} at {time}
//             </Text>
//             <TouchableOpacity
//               onPress={handleSelection}
//               // onPress={ () => navigation.navigate('EventDetail', {selected: {date: date, time: time} } )}
//             >
//               <Text> Confirm </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <Text> Plz select sthing</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// export default AgendaScreen;
