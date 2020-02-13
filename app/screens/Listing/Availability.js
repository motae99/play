import React, { Component } from "react";

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

const dayImage = require("../../../images/day.png");
const nightImage = require("../../../images/night.png");

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
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'gray',
    flexDirection:'row',
    height:50,
    alignItems:'center',
  },
});

const available = [
  { day: "Monday", from: "14:30:00", to: "22:15:00", duration: 240 },
  { day: "Tuesday", from: "08:30:00", to: "22:15:00", duration: 30 },
  { day: "Wednesday", from: "10:30:00", to: "16:15:00", duration: 50 },
  { day: "Thursday", from: "08:30:00", to: "10:05:00", duration: 20 },
  { day: "Sunday", from: "08:30:00", to: "23:05:00", duration: 20 },
];

const unAvailable = [
  { date: "2020-02-03", all: true },
  { date: "2020-02-10", all: true },
  { date: "2020-02-20", times: ["08:30:00", "11:10:00", "18:30:00"] },
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



export default class AgendaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selected: null,
      date: null ,
      time: null ,
    };
  }

  loadItems(day) {
    const today = new Date(); // today date time
    const currentDay = this.timeToString(today); // current day in date only format
    const futureMonth = this.timeToString(
      today.setMonth(today.getMonth() + allowedFuture)
    );   

    setTimeout(() => {
      for (let i = 0; i < 90; i++) {
        const selectedDay = day;
        const time = selectedDay.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        const dateTime = new Date(strTime);
        const dayOfWeek = weekday[dateTime.getDay()];
        const availableTobook = available.some(item => dayOfWeek === item.day);
        const unAvailableTobook = unAvailable.some(item => ( (strTime === item.date) && item.all ) );

               if (
          strTime >= currentDay &&
          strTime <= futureMonth &&
          availableTobook &&
          !unAvailableTobook
        ) {

          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            

            const timesToSchedule = available.filter(item => dayOfWeek === item.day); 

            var date = strTime;
            const startTime = timesToSchedule[0].from; // beacause only one object is set per day 
            const endTime = timesToSchedule[0].to;
            const AddMins  =  timesToSchedule[0].duration * 60 * 1000; // because in millisecond

            var startDateTime = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf();
            var endDateTime =  moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf();

            var ReturnSchedule = []

            while (startDateTime <= endDateTime) //Run loop
            {
                const time = moment(startDateTime).format('HH:mm:ss');

              // check if currently generated time is unavailable
              const unAvailableTimesbook = unAvailable.filter(item => ( (date === item.date)) );
              if(unAvailableTimesbook && unAvailableTimesbook.length > 0){ 
                var notAllowed = unAvailableTimesbook[0].times;
                var cant = notAllowed.some(item => time === item);

              }

              if(!cant){
                ReturnSchedule.push(time) ;
              }
                startDateTime += AddMins; //Endtime check
            }

            this.state.items[strTime].push({
              date: strTime,
              schedule: ReturnSchedule
            });
            

            
          }
        }
      }
    }, 1000);
    
  }

  option(dateOption, timeOption) {
    console.log("touched on date", dateOption);
    console.log("touched on date", timeOption);
  }



  renderEmpty() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  renderItem(item){
    return (
      <CalenderItem />
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  callbackFunction = (date, time) => {
      // console.log(date, time)
      this.setState({ //the error happens here
        date: date, time: time
    });
      // this.setState({date: date, time: time})
      // this.setState({message: childData})
  }

  render() {
    const today = new Date(); 

    const futureMonth = this.timeToString(
      today.setMonth(today.getMonth() + allowedFuture)
    );
    return (
      <View style={{flex: 1}}>
        
      <Agenda
        minDate={this.timeToString(Date())}
        maxDate={futureMonth}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.timeToString(Date())}
        // renderItem={this.renderItem.bind(this)}
        renderItem={(item, firstItemInDay) => {return (<CalenderItem parentCallback={this.callbackFunction} data={item}/>);}}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyData={this.renderEmpty.bind(this)} // instead of having empty arrays everywhere
        pastScrollRange={1}
        futureScrollRange={allowedFuture+1}
        // Enable or disable scrolling of calendar list
        scrollEnabled={false}
      />

      <View style = {styles.footer}>
        {
          this.state.date && this.state.time ? 
          <View style= {styles.bottomButtons}>
            <Text>Selected Date: {this.state.date} at {this.state.time}</Text>
            <TouchableOpacity 
            onPress={ () => this.props.navigation.navigate('Details', {selected: {date: this.state.date, time: this.state.time} } )}
            >
              
            <Text> Confirm </Text>
          </TouchableOpacity>
          </View>
         :
         <Text> Plz select sthing</Text>
        }
         
        </View>
    </View>
    );
  }
}

// import React, { Component } from "react";

// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView
// } from "react-native";


// import { Agenda } from "react-native-calendars";
// import moment from "moment";


// const dayImage = require("../../images/day.png");
// const nightImage = require("../../images/night.png");
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
//   itemText: {
//     // color: colors.primary,
//     // fontFamily: fonts.primary,
//   }
// });

// const available = [
//   { day: "Monday", from: "14:30:00", to: "22:15:00", duration: 120 },
//   { day: "Wednesday", from: "10:30:00", to: "16:15:00", duration: 50 },
//   { day: "Thursday", from: "08:30:00", to: "21:05:00", duration: 
//   20 }
// ];

// // function SplitTime($StartTime, $EndTime, $Duration="60"){
// //   $ReturnArray = array ();// Define output
// //   $StartTime    = strtotime ($StartTime); //Get Timestamp
// //   $EndTime      = strtotime ($EndTime); //Get Timestamp

// //   $AddMins  = $Duration * 60;

// //   while ($StartTime <= $EndTime) //Run loop
// //   {
// //       $ReturnArray[] = date ("G:i", $StartTime);
// //       $StartTime += $AddMins; //Endtime check
// //   }
// //   return $ReturnArray;
// // }

// //Calling the function
// // $Data = SplitTime("2018-05-12 12:15", "2018-05-12 15:30", "60");
// // echo "<pre>";
// // print_r($Data);
// // echo "<pre>";


// const unAvailable = [
//   { date: "2020-02-03", all: true },
//   { date: "2020-02-10", all: true },
//   { date: "2020-02-20", from: "08:30:00", to: "08:50:00" },
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



// export default class AgendaScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: {},
//       schedule: {},
//     };


//   }


//   //   handleCheck(val) {
//   //     available.some(item => val.name === item.name);
//   //  }

//   // function addMonths(date, months) {
//   //   date.setMonth(date.getMonth() + months);
//   //   return date;
//   // }

//   // addMonths(new Date(), -6); // six months before now
//   // // Thu Apr 30 2009 01:22:46 GMT-0600

//   // addMonths(new Date(), -12); // a year before now
//   // Thu Oct 30 2008 01:20:22 GMT-0600

//   // componentDidMount() {
//   //   console.log('componet did mount')
//   //   const today = new Date(); // today date time
//   //   const currentDay = this.timeToString(today); // current day in date only format
//   //   const futureMonth = this.timeToString(
//   //     today.setMonth(today.getMonth() + allowedFuture)
//   //   );    
    
//   //   setTimeout(() => {
//   //     for (let i = 0; i < 30; i++) {
//   //       const selectedDay = today;
//   //       const time = selectedDay.timestamp + i * 24 * 60 * 60 * 1000;
//   //       const strTime = this.timeToString(time);
//   //       const dateTime = new Date(strTime);
//   //       const dayOfWeek = weekday[dateTime.getDay()];
//   //       const availableTobook = available.some(item => dayOfWeek === item.day);
//   //       const unAvailableTobook = unAvailable.some(item => ( (strTime === item.date) && item.all ) );
       
//   //              if (
//   //         strTime >= currentDay &&
//   //         strTime <= futureMonth &&
//   //         availableTobook &&
//   //         !unAvailableTobook
//   //       ) {

//   //         if (!this.state.items[strTime]) {
//   //           this.state.items[strTime] = [];
//   //           this.state.items[strTime].push({
//   //             date: strTime,
//   //           });

//   //           const timesToSchedule = available.filter(item => dayOfWeek === item.day);

            

//   //           const date = strTime;
//   //           const startTime = timesToSchedule[0].from;
//   //           const endTime = timesToSchedule[0].to;
//   //           const AddMins  =  timesToSchedule[0].duration * 60 * 1000;

//   //           var startDateTime = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf();
//   //           var endDateTime =  moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf();

//   //           // var timeStamp = moment(startDateTime).valueOf();
//   //           // var back = moment(timeStamp).format()
//   //           // var timeOnly = moment(timeStamp).format('HH:mm a');

//   //           // console.log(startDateTime)
//   //           // console.log(timeStamp)
//   //           // console.log(back)
//   //           // console.log(timeOnly)
//   //           // console.log("===============")

            
            
//   //           var ReturnSchedule = []

//   //           while (startDateTime <= endDateTime) //Run loop
//   //           {
//   //               ReturnSchedule.push(moment(startDateTime).format('HH:mm a')) ;
//   //               startDateTime += AddMins; //Endtime check
//   //           }

//   //           this.state.items[strTime].push({
//   //             schedule: ReturnSchedule
//   //           });
            

            
//   //         }
//   //       }
//   //     }
//   //     console.log(this.state.items)

//   //   }, 1000);
    
//   //   console.log(this.state.items)
//   // }

//   loadItems(day) {
//     const today = new Date(); // today date time
//     const currentDay = this.timeToString(today); // current day in date only format
//     const futureMonth = this.timeToString(
//       today.setMonth(today.getMonth() + allowedFuture)
//     );   
    
    

//     setTimeout(() => {
//       for (let i = 0; i < 90; i++) {
//         const selectedDay = day;
//         const time = selectedDay.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         const dateTime = new Date(strTime);
//         const dayOfWeek = weekday[dateTime.getDay()];
//         const availableTobook = available.some(item => dayOfWeek === item.day);
//         const unAvailableTobook = unAvailable.some(item => ( (strTime === item.date) && item.all ) );
       
//         // if(availableTobook && unAvailableTobook ){
//         //   // this day is valid but its fully booked mark as fully booked
//         // }
        
       
     
//                if (
//           strTime >= currentDay &&
//           strTime <= futureMonth &&
//           availableTobook &&
//           !unAvailableTobook
//         ) {

//           if (!this.state.items[strTime]) {
//             this.state.items[strTime] = [];
//             this.state.items[strTime].push({
//               date: strTime,
//             });

//             const timesToSchedule = available.filter(item => dayOfWeek === item.day);

            

//             const date = strTime;
//             const startTime = timesToSchedule[0].from;
//             const endTime = timesToSchedule[0].to;
//             const AddMins  =  timesToSchedule[0].duration * 60 * 1000;

//             var startDateTime = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf();
//             var endDateTime =  moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf();

//             // var timeStamp = moment(startDateTime).valueOf();
//             // var back = moment(timeStamp).format()
//             // var timeOnly = moment(timeStamp).format('HH:mm a');

//             // console.log(startDateTime)
//             // console.log(timeStamp)
//             // console.log(back)
//             // console.log(timeOnly)
//             // console.log("===============")

            
            
//             var ReturnSchedule = []

//             while (startDateTime <= endDateTime) //Run loop
//             {
//                 ReturnSchedule.push(moment(startDateTime).format('HH:mm a')) ;
//                 startDateTime += AddMins; //Endtime check
//             }

//             this.state.items[strTime].push({
//               schedule: ReturnSchedule
//             });
            

            
//           }
//         }
//       }
//     }, 1000);
    
//     // console.log(this.state.items)
//   }

//   option(dateOption, timeOption) {
//     console.log("touched on date", dateOption);
//     console.log("touched on date", timeOption);
//   }


//   renderItem = (item) => {
//     // if(item.schedule){
//       // console.log(item)
//       // console.log(this.state.items)
//       // const check = item
//       // items = this.state.items
//       // 
//       // console.log("from state filter", schedule)
//       // var Vtime = item.schedule;
//       // return (
//       //   <ScrollView horizontal={true}>
//       //     {/* {
//       //       item.schedule.map((time) => { */}
//       //         <View>
//       //           <Text>
//       //             test
//       //           </Text>
//       //         </View>
//       //        {/* })
//       //     } */}
//       //   </ScrollView>
//       //   // <Text> {item.date}</Text>
//       // )
//     // }

//     return (
//       <View style={[styles.row]}>
//         <TouchableOpacity
//           onPress={() => this.option(item.date, "day")}
//           style={[styles.item]}
//         >
//           <Image
//             resizeMode="contain"
//             source={dayImage}
//             style={[styles.itemImage]}
//           />
//           <Text style={[styles.itemText]}>Day Time</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => this.option(item.date, "night")}
//           style={[styles.item]}
//         >
//           <Image
//             resizeMode="contain"
//             source={nightImage}
//             style={[styles.itemImage]}
//           />
//           <Text style={[styles.itemText]}>Night Time</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   renderEmpty() {
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
//     return date.toISOString().split("T")[0];
//   }

//   render() {
//     const today = new Date(); // today date time

//     const futureMonth = this.timeToString(
//       today.setMonth(today.getMonth() + allowedFuture)
//     );
//     return (
//       <Agenda
//         minDate={this.timeToString(Date())}
//         maxDate={futureMonth}
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         selected={this.timeToString(Date())}


//         renderItem={ (item) => {
//           console.log(item)
//           if(item.schedule){
//             // console.log(item.schedule[0]); 

//               return(
//                 <ScrollView key={item.key}>
//                   {
//                     item.schedule.map((time, i) => {
//                       return (
//                       <Text key={i}>{time}</Text>
//                       )
//                     })
//                   }
//                 </ScrollView>
//               )

//             }
//           }
          
//         }

//         // renderItem={ (item) => { this.renderItem(item)}  }
//         // renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}

//         renderEmptyData={this.renderEmpty.bind(this)} // instead of having empty arrays everywhere
//         // onDayPress={(day) => {console.log('selected day', day)}}
//         // Handler which gets executed on day long press. Default = undefined
//         // onDayLongPress={(day) => {console.log('long pressselected day', day)}}
//         // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting

//         // Max amount of months allowed to scroll to the past. Default = 50
//         pastScrollRange={1}
//         // disabledByDefault={true}
//         // Max amount of months allowed to scroll to the future. Default = 50
//         // futureScrollRange={allowedFuture+1}
//         // Enable or disable scrolling of calendar list
//         scrollEnabled={true}
//         // Enable or disable vertical scroll indicator. Default = false
//         // showScrollIndicator={true}

//         // markingType={'period'}
//       //   markedDates={{
//       //      '2020-01-31': {disabled: true},
//       //   //    '2020-02-05': {textColor: '#666'},
//       //   //    '2020-02-06': {startingDay: true, endingDay: true, color: 'blue'},
//       //   //    '2020-03-05': {startingDay: true, color: 'blue'},
//       //   //    '2020-03-06': {endingDay: true, color: 'gray'},
//       //   //    '2020-03-12': {startingDay: true, color: 'gray'},
//       //   //    '2020-03-13': {color: 'gray'},
//       //   //    '2020-03-27': {endingDay: true, color: 'gray'}
//       // }
//       // }
//         // monthFormat={'yyyy'}
//         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//         // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//       />
//     );
//   }
// }

// // import React, { Component } from 'react';

// // import {
// //   Text,
// //   View,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView
// // } from 'react-native';

// // import {Agenda} from 'react-native-calendars';

// // const dayImage = require('../../images/day.png');
// // const nightImage = require('../../images/night.png');
// // const styles = StyleSheet.create({
// //   row: {
// //     backgroundColor: 'white',
// //     flexDirection: 'row',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginRight: 10,
// //     marginTop: 17
// //   },
// //   item: {
// //     flex: 1,
// //     height: 80,
// //     paddingVertical: 20,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     marginHorizontal: 5,
// //   },
// //   emptyDate: {
// //     height: 15,
// //     flex:1,
// //     paddingTop: 30
// //   },
// //   agenaView: {
// //     height: 250,
// //   },
// //   itemImage: {
// //     height: 35,
// //   },
// //   itemText: {
// //     // color: colors.primary,
// //     // fontFamily: fonts.primary,
// //   },
// // });

// // const available = [
// //                     { day: "Monday", from: "14:30:00", to: "22:15:00",  duration: "120" },
// //                     { day: "Wednesday", from: "10:30:00", to: "16:15:00",  duration: "50" },
// //                     { day: "Thursday", from: "08:30:00", to: "21:05:00",  duration: "20" },
// //                   ];
// // const weekday=new Array(7);
// //   weekday[0]="Sunday";
// //   weekday[1]="Monday";
// //   weekday[2]="Tuesday";
// //   weekday[3]="Wednesday";
// //   weekday[4]="Thursday";
// //   weekday[5]="Friday";
// //   weekday[6]="Saturday";

// // const allowedFuture = 3;

// // export default class AgendaScreen extends Component{
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       items: {}
// //     };

// //   }

// // //   handleCheck(val) {
// // //     available.some(item => val.name === item.name);
// // //  }

// // // function addMonths(date, months) {
// // //   date.setMonth(date.getMonth() + months);
// // //   return date;
// // // }

// // // addMonths(new Date(), -6); // six months before now
// // // // Thu Apr 30 2009 01:22:46 GMT-0600

// // // addMonths(new Date(), -12); // a year before now
// // // Thu Oct 30 2008 01:20:22 GMT-0600

// //   componentDidMount(){
// //           const strD = this.timeToString(Date());
// //           const tim = strD.timestamp * 24 * 60 * 60 * 1000;
// //           const strTim = this.timeToString(strD);

// //           // getDay()  to get day of week

// //           // check if day exists in server days

// //           // weekday[current_date.getDay()]

// //           // this is the object passed by calender
// //           // {"dateString": "2020-01-27", "day": 27, "month": 1, "timestamp": 1580083200000, "year": 2020}

// //           var current_date = new Date()

// //           var onlyDate = this.timeToString(current_date);

// //           var sixMonths = current_date.setMonth(current_date.getMonth() + 6); //timestamp
// //           var sixMonthsFormated = this.timeToString(sixMonths);
// //           var avail = weekday[current_date.getDay()];
// //           var check = available.some(item => 'sunday' === item.day);

// //           // console.log("current day === ", current_date)
// //           // console.log("onlyDate day === ", onlyDate)
// //           // console.log("day() of current day  === ",  avail)
// //           // console.log("check availablity === ", check)
// //           // console.log("strD       === ", strD)
// //           // console.log("tim       === ", tim)
// //           // console.log("strTim       === ", strTim)
// //           // console.log("Six months from now       === ", sixMonths)
// //           // console.log("sixMonthsFormated from now       === ", sixMonthsFormated )
// //           // console.log("available === ", available)

// //       // setTimeout( () => {
// //       //   for (let i = 0; i < 10; i++) {
// //       //     const strDate = this.timeToString(Date());
// //       //     const time = strDate.timestamp + i * 24 * 60 * 60 * 1000;
// //       //     const strTime = this.timeToString(time);

// //       //     // getDay()  to get day of week

// //       //     // check if day exists in server days

// //       //     // handleCheck(val) {
// //       //     //   return this.state.data.some(item => val.name === item.name);
// //       //     // }

// //       //     console.log("strTime === ", strTime)
// //       //     console.log("strDate === ", strDate)
// //       //     console.log("available === ", available)

// //       //     if(strTime >= strDate){

// //       //       // if (!this.state.items[strTime] ) {
// //       //       //   this.state.items[strTime] = [];
// //       //       //   this.state.items[strTime].push({
// //       //       //     date: strTime
// //       //       //   });
// //       //       //   // const numItems = Math.floor(Math.random() * 5);
// //       //       //   // for (let j = 0; j < numItems; j++) {

// //       //       //   //   this.state.items[strTime].push({
// //       //       //   //     name: 'Item for ' + strTime,
// //       //       //   //     height: Math.max(50, Math.floor(Math.random() * 150)),
// //       //       //   //   });
// //       //       //   // }

// //       //       // }
// //       //     }
// //       //   }
// //       // //   console.log(this.state.items);
// //       //   const newItems = {};
// //       //   Object.keys(this.state.items).forEach(
// //       //     key => {newItems[key] = this.state.items[key];});
// //       //   this.setState({
// //       //     items: newItems
// //       //   });
// //       // }, 1000);
// //       // // console.log(`Load Items for ${day.year}-${day.month}`);
// //   }

// //   loadItems(day) {
// //     // console.log("day passed by calender to load funcion :", day)
// //     // this is the object passed by calender
// //     // {"dateString": "2020-01-27", "day": 27, "month": 1, "timestamp": 1580083200000, "year": 2020}

// //     const today = new Date() // today date time
// //     const currentDay = this.timeToString(today); // current day in date only format
// //     const futureMonth = this.timeToString(today.setMonth(today.getMonth() + allowedFuture)) ;

// //     setTimeout(() => {
// //       for (let i = 0; i < 30; i++) {
// //         const selectedDay = day ; // date object passed by calender
// //         // const dateString = selectedDay.dateString;
// //         const time = selectedDay.timestamp + i * 24 * 60 * 60 * 1000;
// //         const strTime = this.timeToString(time);
// //         const dateTime = new Date(strTime)
// //         const dayOfWeek = weekday[dateTime.getDay()];
// //         const availableTobook = available.some(item => dayOfWeek === item.day); // day in the object

// //         if((strTime >= currentDay) && (strTime <= futureMonth) && availableTobook){
// //           // console.log(strTime, "greater tthen procceed", strDate);
// //           if (!this.state.items[strTime] ) {
// //             this.state.items[strTime] = [];
// //             this.state.items[strTime].push({
// //               date: strTime
// //             });
// //             // const numItems = Math.floor(Math.random() * 5);
// //             // for (let j = 0; j < numItems; j++) {

// //             //   this.state.items[strTime].push({
// //             //     name: 'Item for ' + strTime,
// //             //     height: Math.max(50, Math.floor(Math.random() * 150)),
// //             //   });
// //             // }

// //           }
// //         }
// //       }
// //     //   console.log(this.state.items);
// //       // const newItems = {};
// //       // Object.keys(this.state.items).forEach(
// //       //   key => {newItems[key] = this.state.items[key];});
// //       // this.setState({
// //       //   items: newItems
// //       // });

// //     }, 1000);
// //     // console.log(`Load Items for ${day.year}-${day.month}`);
// //   }

// //   option(dateOption, timeOption){
// //     console.log('touched on date', dateOption)
// //     console.log('touched on date', timeOption)

// //   }

// //   renderItem(item){
// //     return (
// //       <View style={[styles.row]}>
// //         <TouchableOpacity
// //           onPress={() => this.option(item.date, 'day') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={dayImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Day Time</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           onPress={() => this.option(item.date, 'night') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={nightImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Night Time</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   renderEmptyDate(){
// //     return (
// //       <View style={styles.emptyDate}>
// //         <Text>This is empty date!</Text>
// //       </View>
// //     );
// //   }

// //   rowHasChanged(r1, r2){
// //     return r1.name !== r2.name;
// //   }

// //   timeToString(time){
// //     const date = new Date(time);
// //     return date.toISOString().split('T')[0];
// //   }

// // render() {
// //   return (

// //     <Agenda
// //       // Initially visible month. Default = Date()
// //       // current={'2020-01-05'}
// //       // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
// //       minDate={this.timeToString(Date())}
// //       // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
// //       // maxDate={'2020-10-30'}
// //       items={this.state.items}
// //       loadItemsForMonth={this.loadItems.bind(this)}

// //       // loadItemsForMonth={ (month) => {console.log('trigger items loading')}}

// //       selected={this.timeToString(Date())}
// //       renderItem={this.renderItem.bind(this)}
// //       renderEmptyDate={this.renderEmptyDate.bind(this)}
// //       rowHasChanged={this.rowHasChanged.bind(this)}
// //       renderEmptyData={() => { return null }}  // instead of having empty arrays everywhere
// //       // onDayPress={(day) => {console.log('selected day', day)}}
// //       // Handler which gets executed on day long press. Default = undefined
// //       // onDayLongPress={(day) => {console.log('long pressselected day', day)}}
// //       // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting

// //       // Max amount of months allowed to scroll to the past. Default = 50
// //       pastScrollRange={1}
// //       // Max amount of months allowed to scroll to the future. Default = 50
// //       futureScrollRange={3}
// //       // Enable or disable scrolling of calendar list
// //       scrollEnabled={true}
// //       // Enable or disable vertical scroll indicator. Default = false
// //       // showScrollIndicator={true}

// //       // markingType={'period'}
// //       // markedDates={{
// //       //    '2017-05-08': {textColor: '#666'},
// //       //    '2017-05-09': {textColor: '#666'},
// //       //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
// //       //    '2017-05-21': {startingDay: true, color: 'blue'},
// //       //    '2017-05-22': {endingDay: true, color: 'gray'},
// //       //    '2017-05-24': {startingDay: true, color: 'gray'},
// //       //    '2017-05-25': {color: 'gray'},
// //       //    '2017-05-26': {endingDay: true, color: 'gray'}}}
// //       // monthFormat={'yyyy'}
// //       // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
// //       // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
// //     />
// //     )
// //   }
// // }

// /// functional component
// // import React, { useState, useEffect } from 'react';

// // import {
// //   Text,
// //   View,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView
// // } from 'react-native';

// // import {Agenda} from 'react-native-calendars';

// // const dayImage = require('../../images/day.png');
// // const nightImage = require('../../images/night.png');
// // const styles = StyleSheet.create({
// //   row: {
// //     backgroundColor: 'white',
// //     flexDirection: 'row',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginRight: 10,
// //     marginTop: 17
// //   },
// //   item: {
// //     flex: 1,
// //     height: 80,
// //     paddingVertical: 20,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     marginHorizontal: 5,
// //   },
// //   emptyDate: {
// //     height: 15,
// //     flex:1,
// //     paddingTop: 30
// //   },
// //   agenaView: {
// //     height: 250,
// //   },
// //   itemImage: {
// //     height: 35,
// //   },
// //   itemText: {
// //     // color: colors.primary,
// //     // fontFamily: fonts.primary,
// //   },
// // });
// // export default function AgendaScreen() {
// //   // constructor(props) {
// //   //   super(props);
// //   //   this.state = {
// //   //     items: {}
// //   //   };
// //   // }

// //   const [ items, setItems] = useState({});

// //   const loadItems = (day) => {
// //     setTimeout(() => {
// //       for (let i = 0; i < 10; i++) {
// //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
// //         const strTime = timeToString(time);
// //         const strDate = timeToString(Date());
// //         if(strTime >= strDate){
// //           if (!items[strTime] ) {
// //             items[strTime] = [];
// //             items[strTime].push({
// //               date: strTime
// //             });
// //           }
// //         }
// //       }
// //     //   console.log(items);
// //       const newItems = {};
// //       Object.keys(items).forEach(
// //         key => {newItems[key] = items[key];});
// //       // this.setState({ items: newItems });
// //       setItems(newItems)
// //     }, 1000);
// //     // console.log(`Load Items for ${day.year}-${day.month}`);
// //   }

// //   const option = (dateOption, timeOption) => {
// //     console.log('touched on date', dateOption)
// //     console.log('touched on date', timeOption)

// //   }

// //   const renderItem = (item) => {
// //     return (
// //       <View style={[styles.row]}>
// //         <TouchableOpacity
// //           onPress={() =>  option(item.date, 'day') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={dayImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Day Time</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           onPress={() =>  option(item.date, 'night') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={nightImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Night Time</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   const renderEmptyDate = () => {
// //     return (
// //       <View style={styles.emptyDate}>
// //         <Text>This is empty date!</Text>
// //       </View>
// //     );
// //   }

// //   const rowHasChanged = (r1, r2) => {
// //     return false //r1.name !== r2.name;
// //   }

// //   const timeToString = (time) => {
// //     const date = new Date(time);
// //     return date.toISOString().split('T')[0];
// //   }

// //   return (

// //       <Agenda
// //         minDate={ timeToString(Date())}
// //         items={items}
// //         loadItemsForMonth={ (month) => {loadItems(month)}}
// //         selected={ timeToString(Date())}
// //         renderItem={ renderItem()}
// //         renderEmptyDate={ renderEmptyDate()}
// //         rowHasChanged={  rowHasChanged()}
// //         renderEmptyData={() => { return null }}  // instead of having empty arrays everywhere
// //         pastScrollRange={1}
// //         futureScrollRange={2}
// //         scrollEnabled={true}
// //         theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
// //       />
// //   );

// // }

// // //wix////////////////
// // /////

// // // import React, { Component } from 'react';
// // // import {
// // //   StyleSheet,
// // //   Text,
// // //   View,
// // //   TextInput,
// // //   Button,
// // //   TouchableHighlight,
// // //   Alert,
// // //   Image,
// // //   ListView,
// // //   TouchableOpacity
// // // } from 'react-native';

// // // export default class EventsView extends Component {

// // //   constructor(props) {
// // //     super(props);
// // //     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// // //     this.state = {
// // //       dataSource: ds.cloneWithRows([
// // //         {day:1, month: 'Sep'},
// // //         {day:2, month: 'Jan'},
// // //         {day:3, month: 'Aug'},
// // //         {day:4, month: 'Dec'},
// // //         {day:5, month: 'Jul'},
// // //         {day:6, month: 'Oct'},
// // //         {day:7, month: 'Sep'},
// // //         {day:8, month: 'Jan'},
// // //         {day:9, month: 'May'},
// // //       ]),
// // //     };
// // //   }

// // //   eventClickListener = (viewId) => {
// // //     Alert.alert("alert", "event clicked");
// // //   }

// // //   render() {
// // //     return (
// // //       <View style={styles.container}>
// // //         <ListView enableEmptySections={true}
// // //           style={styles.eventList}
// // //           dataSource={this.state.dataSource}
// // //           renderRow={(event) => {
// // //             return (
// // //               <TouchableOpacity onPress={() => this.eventClickListener("row")}>
// // //                 <View style={styles.eventBox}>
// // //                   <View style={styles.eventDate}>
// // //                      <Text  style={styles.eventDay}>{event.day}</Text>
// // //                      <Text  style={styles.eventMonth}>{event.month}</Text>
// // //                   </View>
// // //                   <View style={styles.eventContent}>
// // //                     <Text  style={styles.eventTime}>10:00 am - 10:45 am</Text>
// // //                     <Text  style={styles.userName}>John Doe</Text>
// // //                     <Text  style={styles.description}>Lorem ipsum dolor sit amet, elit consectetur</Text>
// // //                   </View>
// // //                 </View>
// // //               </TouchableOpacity>
// // //             )
// // //           }}/>
// // //       </View>
// // //     );
// // //   }
// // // }

// // // const styles = StyleSheet.create({
// // //   container:{
// // //     backgroundColor: "#DCDCDC",
// // //   },
// // //   eventList:{
// // //     marginTop:20,
// // //   },
// // //   eventBox: {
// // //     padding:10,
// // //     marginTop:5,
// // //     marginBottom:5,
// // //     flexDirection: 'row',
// // //   },
// // //   eventDate:{
// // //     flexDirection: 'column',
// // //   },
// // //   eventDay:{
// // //     fontSize:50,
// // //     color: "#0099FF",
// // //     fontWeight: "600",
// // //   },
// // //   eventMonth:{
// // //     fontSize:16,
// // //     color: "#0099FF",
// // //     fontWeight: "600",
// // //   },
// // //   eventContent: {
// // //     flex:1,
// // //     flexDirection: 'column',
// // //     alignItems: 'flex-start',
// // //     marginLeft:10,
// // //     backgroundColor: '#FFFFFF',
// // //     padding:10,
// // //     borderRadius:10
// // //   },
// // //   description:{
// // //     fontSize:15,
// // //     color: "#646464",
// // //   },
// // //   eventTime:{
// // //     fontSize:18,
// // //     color:"#151515",
// // //   },
// // //   userName:{
// // //     fontSize:16,
// // //     color:"#151515",
// // //   },
// // // });
