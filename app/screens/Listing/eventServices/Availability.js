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

  booking(){
    this.props.selected({data: {date: this.state.date, time: this.state.time}});
  }
  handleSelection = () => {
    var data = {date: this.state.date, time: this.state.time};
    this.props.onTimeSelected(data); 
    this.props.closeModal();           
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
            onPress={this.handleSelection}
            // onPress={ () => this.props.navigation.navigate('EventDetail', {selected: {date: this.state.date, time: this.state.time} } )}
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
