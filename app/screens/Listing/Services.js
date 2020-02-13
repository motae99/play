import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  SectionList,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";

import firestore from "@react-native-firebase/firestore";
import { NavigationContext } from 'react-navigation';
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function Services({ providerData }) {
  const data = providerData;
  const navigation = useContext(NavigationContext);
  // console.log('Im logging', navigation.props)
  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("partyHalls")
      .doc("9Cg4qvaHKvaWNolba8F9XrU3Wxx1") //Automate this from data
      .collection("services")
      .onSnapshot(querySnapshot => {
        const serverData = querySnapshot.docs.map(documentSnapshot => {
        var data = documentSnapshot.data()
        var key = documentSnapshot.id;
        var DATA = data[key].map(service => {
          return {
            name: key,
            data: service,
            selected: false
          }
        })
        // 
        // console.log("singL docoment : ",data)

        // console.log("key docoment : ",key)
        // console.log("formated data : ",DATA)

        // console.log("=========")
          return {
            // ...documentSnapshot.data(),
            key: documentSnapshot.id, // required for FlatList
            data: DATA

          };
        });
        setServices(serverData);
        // console.log(serverData);
        // console.log("=========")


        if (serviceLoading) {
          setServiceLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);


  function Item({ item }) {
    var name = item.key
      var data = item.data
      var length = data.length
  
      return(
        <View>
          <Text style={styles.header}>header {item.key}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              data.map(service => {
                return (
                  <TouchableOpacity onPress={ () => console.log("select :",name,"service :",service) }> 
                  <View style={[styles.item, styles.selected]}>
                    <Text>{service.data.price}</Text>
                    <Text>{service.data.desc}</Text>
                    <Text>{service.data.icon}</Text>
                  </View>
                  </TouchableOpacity>
                )
              })
            } 
          </ScrollView>
          <Text style={styles.footer}> footer {item.key}</Text>
        </View>
      )
  }

  if(serviceLoading){
    return(<Text>Show loading Indicator here</Text>)
  }

  return (
    <View>
    
    { services.map( (item) => { return(<Item item={item}/> ); } ) }
    
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});


  // cateringChecked = index => {
  //   this.setState({ checked: index });
  //   var meal = this.state.catering[index];
  //   // console.log(meal)
  //   let choice = [...this.state.choice];
  //   choice["catering"] = meal;
  //   console.log(choice);
  // };

  // renderCatering = () => {
  //   const items = this.state.catering;
  //   const length = items.length;
  //   if (length === 1) {
  //     var wi = DEFAULT - 20;
  //   }
  //   if (length === 2) {
  //     var wi = DEFAULT / length - 10;
  //   }
  //   if (length > 2) {
  //     var wi = DEFAULT / 3 - 10;
  //   }
  //   return (
  //     <View>
  //       <Text> header of catering </Text>
  //       <ScrollView
  //         key={"catering"}
  //         horizontal={true}
  //         style={styles.serviceScroll}
  //       >
  //         {items.map((item, i) => {
  //           return (
  //             <View key={i}>
  //               {this.state.checked == i ? (
  //                 <TouchableOpacity style={[styles.checked, { width: wi }]}>
  //                   <Text>{item.price}</Text>
  //                   <Text>{item.desc}</Text>
  //                   <Text>{item.icon}</Text>
  //                 </TouchableOpacity>
  //               ) : (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     this.cateringChecked(i);
  //                   }}
  //                   style={[styles.unchecked, , { width: wi }]}
  //                 >
  //                   <Text>{item.price}</Text>
  //                   <Text>{item.desc}</Text>
  //                   <Text>{item.icon}</Text>
  //                 </TouchableOpacity>
  //               )}
  //             </View>
  //           );
  //         })}
  //       </ScrollView>
  //       <Text> footer of catering </Text>
  //     </View>
  //   );
  // };

  // renderweddingStage = () => {
  //   const items = this.state.weddingStage;
  //   const length = items.length;
  //   if (length === 1) {
  //     var wi = DEFAULT - 20;
  //   }
  //   if (length === 2) {
  //     var wi = DEFAULT / length - 10;
  //   }
  //   if (length > 2) {
  //     var wi = DEFAULT / 3 - 10;
  //   }

  //   return (
  //     <View>
  //       <Text> header of weddingStage </Text>
  //       <ScrollView
  //         key={"weddingStage"}
  //         horizontal={true}
  //         style={styles.serviceScroll}
  //       >
  //         {items.map((item, i) => {
  //           return (
  //             <View key={i}>
  //               {this.state.wChecked == i ? (
  //                 <TouchableOpacity style={[styles.checked, { width: wi }]}>
  //                   <Text>{item.price}</Text>
  //                   <Text>{item.desc}</Text>
  //                   <Text>{item.icon}</Text>
  //                 </TouchableOpacity>
  //               ) : (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     this.setState({ wChecked: i });
  //                   }}
  //                   style={[styles.unchecked, , { width: wi }]}
  //                 >
  //                   <Text>{item.price}</Text>
  //                   <Text>{item.desc}</Text>
  //                   <Text>{item.icon}</Text>
  //                 </TouchableOpacity>
  //               )}
  //             </View>
  //           );
  //         })}
  //       </ScrollView>
  //       <Text> footer of weddingStage </Text>
  //     </View>
  //   );
  // };

  // rendervideoShooting = () => {
  //   const items = this.state.videoShooting;
  //   const length = items.length;
  //   if (length === 1) {
  //     var wi = DEFAULT - 20;
  //   }
  //   if (length === 2) {
  //     var wi = DEFAULT / length - 10;
  //   }
  //   if (length > 2) {
  //     var wi = DEFAULT / 3 - 10;
  //   }
  //   return (
  //     <View>
  //       <Text> header of videoShooting </Text>
  //       <ScrollView
  //         key={"videoShooting"}
  //         horizontal={true}
  //         style={styles.serviceScroll}
  //       >
  //         {items.map((item, i) => {
  //           return (
  //             <View key={i}>
  //               {this.state.vChecked == i ? (
  //                 <TouchableOpacity style={[styles.checked, { width: wi }]}>
  //                   <Text>{item.price}</Text>
  //                   <Text>{item.desc}</Text>
  //                   <Text>{item.icon}</Text>
  //                 </TouchableOpacity>
  //               ) : (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     this.setState({ vChecked: i });
  //                   }}
  //                   style={[styles.unchecked, , { width: wi }]}
  //                 >
  //                   <Text>{item.price}</Text>
  //                   <Text>{item.desc}</Text>
  //                   <Text>{item.icon}</Text>
  //                 </TouchableOpacity>
  //               )}
  //             </View>
  //           );
  //         })}
  //       </ScrollView>
  //       <Text> footer of catering </Text>
  //     </View>
  //   );
  // };

  // renderchoice = () => {
  //   if (this.state.checked) {
  //   }
  //   return <Text>user has selected some data</Text>;
  // };

  // selectCatering = (item, index) => {
  //   item.isSelected = !item.isSelected;
  //   item.selectedClass = item.isSelected ? styles.selected : styles.list;

  //   let filteredArray = this.state.catering.filter(x => x.isSelected);
  //   var i = this.state.catering.indexOf(filteredArray);
  //   filteredArray.isSelected = !filteredArray.isSelected;
  //   filteredArray.selectedClass = styles.list;

  //   this.state.catering[index] = item;
  //   this.state.catering[i] = filteredArray;

  //   this.setState({
  //     catering: this.state.catering
  //   });

  //   console.log(this.state.catering);

  //   if (item.isSelected) {
  //     this.setState(prevState => ({
  //       choice: [...prevState.choice, item]
  //       // choice: [...prevState.choice, { catering: item }]
  //     }));
  //   }
  // };

  // selectWeddingStage = (item, index) => {
  //   item.isSelected = !item.isSelected;
  //   item.selectedClass = item.isSelected ? styles.selected : styles.list;
  //   this.state.weddingStage[index] = item;
  //   this.setState({
  //     weddingStage: this.state.weddingStage
  //   });
  // };

  // selectvideoShooting = (item, index) => {
  //   item.isSelected = !item.isSelected;
  //   item.selectedClass = item.isSelected ? styles.selected : styles.list;
  //   this.state.videoShooting[index] = item;
  //   this.setState({
  //     videoShooting: this.state.videoShooting
  //   });
  // };


// // // // import React, { Component } from 'react';
// // // // import {Text, ScrollView, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
// // // // import LottieView from 'lottie-react-native';

// // // // const { width, height } = Dimensions.get('window');

// // // // const DEFAULT = width

// // // // export default class Services extends Component {

// // // //     state = {
// // // //         color: '#00D9DB',
// // // //         // data: data
// // // //         selected: []
// // // //     };

// // // //     renderHeader(data){
// // // //         return(
// // // //             <View>
// // // //             <ScrollView horizontal={true} >
// // // //                 {
// // // //                     data.map((service, key) => {
// // // //                         return (
// // // //                             <View style={styles.serviceHeader}>
// // // //                                 <Text>{service.key}</Text>
// // // //                             </View>
// // // //                         )

// // // //                     })
// // // //                 }
// // // //             </ScrollView>
// // // //             </View>
// // // //         )
// // // //     }

// // // //     renderItems(items, service){
// // // //         var lenght = items.length
// // // //         // console.log(lenght)
// // // //         if(lenght == 1){
// // // //             var wi = DEFAULT-20;
// // // //         }
// // // //         if(lenght == 2){
// // // //             var wi = DEFAULT/items.length-10;
// // // //         }
// // // //         if(lenght > 2 ){
// // // //             var wi = DEFAULT/3-10;
// // // //         }
// // // //         // console.log(DEFAULT)
// // // //         // console.log(wi)
// // // //         return items.map((item, i) =>{
// // // //             return(
// // // //                 <TouchableOpacity onPress={ () => this.selected(service, i) }>
// // // //                     <View key={i+service} style={{  height: 100, width: wi, backgroundColor: this.state.color, margin: 5,}}>
// // // //                         <Text>{item.price}</Text>
// // // //                         <Text>{item.desc}</Text>
// // // //                         <Text>{item.icon}</Text>
// // // //                     </View>
// // // //                 </TouchableOpacity>
// // // //             )
// // // //         })
// // // //     }

// // // //     render() {
// // // //         //   console.log('from services View',this.props.data);
// // // //         const { data } = this.props;

// // // //         const modified = data.map(item => {

// // // //             // return item.map(i => {
// // // //                 item.isSelect = false;
// // // //                 item.selectedClass = styles.list;
// // // //                 return item;
// // // //             // })

// // // //           });

// // // //         console.log(modified)
// // // //         // this.setState()

// // // //         return (
// // // //             <View>
// // // //                 {this.renderHeader(data)}
// // // //                 {
// // // //                     data.map((service, key) => {

// // // //                         if(service.key == 'catering'){
// // // //                             var items = service.catering
// // // //                             // console.log(service.key)
// // // //                             return(
// // // //                                 <View>
// // // //                                     <Text> header of {service.key}</Text>
// // // //                                     <ScrollView key={service.key} horizontal={true} style={styles.serviceScroll}>
// // // //                                         { this.renderItems(items, service.key) }
// // // //                                     </ScrollView>
// // // //                                     <Text> footer of {service.key}</Text>
// // // //                                 </View>

// // // //                             )

// // // //                         }
// // // //                         if(service.key == 'videoShooting'){
// // // //                             var items = service.videoShooting
// // // //                             return(
// // // //                                 <View>
// // // //                                     <Text> header of {service.key}</Text>
// // // //                                     <ScrollView key={service.key}horizontal={true} style={styles.serviceScroll}>
// // // //                                         { this.renderItems(items, service.key) }
// // // //                                     </ScrollView>
// // // //                                     <Text> footer of {service.key}</Text>
// // // //                                 </View>

// // // //                             )

// // // //                         }
// // // //                         if(service.key == 'weddingStage'){
// // // //                             var items = service.weddingStage
// // // //                             return(
// // // //                                 <View>
// // // //                                     <Text> header of {service.key}</Text>
// // // //                                     <ScrollView key={service.key}horizontal={true} style={styles.serviceScroll}>
// // // //                                         { this.renderItems(items, service.key) }
// // // //                                     </ScrollView>
// // // //                                     <Text> footer of {service.key}</Text>
// // // //                                 </View>

// // // //                             )

// // // //                         }
// // // //                     })
// // // //                 }
// // // //             </View>
// // // //         )

// // // //     }

// // // // }
// // // // const styles = StyleSheet.create({
// // // //     container: {
// // // //         flex: 1,
// // // //     },
// // // //     serviceNames: {
// // // //         // // flex: 1,
// // // //         // width: 60,
// // // //         // height: 30,
// // // //         // backgroundColor: '#D8D9DB',
// // // //         // flexDirection: "row",
// // // //     },
// // // //     serviceContainer: {
// // // //         backgroundColor: '#DDD9DB',
// // // //         height: 150,
// // // //         // width: DEFAULT/2,
// // // //         marginLeft: 5
// // // //     },
// // // //     serviceHeader: {
// // // //         height: 100,
// // // //         width: 100,
// // // //         backgroundColor: '#00D9DB',
// // // //         margin: 5,

// // // //         // width: 100,
// // // //     },
// // // //     serviceScroll: {
// // // //         marginVertical: 20,
// // // //     }

// // // // });

// // // import React, { Component } from 'react';
// // // import {Text, ScrollView, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
// // // import LottieView from 'lottie-react-native';

// // // const { width, height } = Dimensions.get('window');

// // // const DEFAULT = width

// // // export default class Services extends Component {

// // //     state = {
// // //         color: '#00D9DB',
// // //         data: [],
// // //         // selected: []
// // //     };

// // //     UNSAFE_componentWillMount(){
// // //         const { data } = this.props;

// // //         const serverData = data.map((item )=> {

// // //             var serviceName = item.key
// // //             var serviceValue = item[serviceName]
// // //             var modified = serviceValue.map( service => {
// // //                 service.isSelected = false;
// // //                 // console.log(service)
// // //                 return service

// // //             });

// // //             // this.setState({ [serviceName]: modified })

// // //             this.setState(prevState => ({
// // //                 data: [...prevState.data, item]
// // //               }))

// // //             return item;

// // //           });

// // //         //   console.log(this.state.data)

// // //         // console.log(serverData)

// // //         // this.setState({"data": serverData})

// // //             // this.setState(prevState => ({
// // //             //     data: [...prevState.data, serverData]
// // //             //   }))
// // //     }

// // //     renderHeader(data){
// // //         return(
// // //             <View>
// // //             <ScrollView horizontal={true} >
// // //                 {
// // //                     data.map((service, key) => {
// // //                         return (
// // //                             <View style={styles.serviceHeader}>
// // //                                 <Text>{service.key}</Text>
// // //                             </View>
// // //                         )

// // //                     })
// // //                 }
// // //             </ScrollView>
// // //             </View>
// // //         )
// // //     }

// // //     selected(item, service){
// // //         // console.log(item)
// // //         item.isSelected = !item.isSelected
// // //         //
// // //         console.log(" this is the item :",item)
// // //         console.log(" this is the service :",service)

// // //         const test = this.state.data.findIndex(

// // //         )

// // //         const index = this.state.data.findIndex(
// // //             item => item.key === item.key
// // //         )
// // //         console.log(test)
// // //     }

// // //     // selectItem = data => {
// // //     //     data.item.isSelect = !data.item.isSelect;
// // //     //     data.item.selectedClass = data.item.isSelect
// // //     //       ? styles.selected
// // //     //       : styles.list;
// // //     //     const index = this.state.dataSource.findIndex(
// // //     //       item => data.item.id === item.id
// // //     //     );
// // //     //     this.state.dataSource[index] = data.item;
// // //     //     this.setState({
// // //     //       dataSource: this.state.dataSource
// // //     //     });
// // //     //   };

// // //     renderItems(items, service){
// // //         var lenght = items.length
// // //         // console.log(lenght)
// // //         if(lenght == 1){
// // //             var wi = DEFAULT-20;
// // //         }
// // //         if(lenght == 2){
// // //             var wi = DEFAULT/items.length-10;
// // //         }
// // //         if(lenght > 2 ){
// // //             var wi = DEFAULT/3-10;
// // //         }
// // //         return items.map((item, i) =>{
// // //             return(
// // //                 <TouchableOpacity onPress={ () => this.selected(item, items) }>
// // //                     <View key={i+service} style={{  height: 100, width: wi, backgroundColor: "green", margin: 5,}}>
// // //                         <Text>{item.price}</Text>
// // //                         <Text>{item.desc}</Text>
// // //                         <Text>{item.icon}</Text>
// // //                     </View>
// // //                 </TouchableOpacity>
// // //             )

// // //         })
// // //     }

// // //     render() {

// // //         const { data } = this.state;

// // //         return (
// // //             <View>
// // //                 {this.renderHeader(data)}
// // //                 {
// // //                     data.map((service, key) => {

// // //                         if(service.key == 'catering'){
// // //                             var items = service.catering
// // //                             // console.log(service.key)
// // //                             return(
// // //                                 <View>
// // //                                     <Text> header of {service.key}</Text>
// // //                                     <ScrollView key={service.key} horizontal={true} style={styles.serviceScroll}>
// // //                                         { this.renderItems(items, "catering") }
// // //                                     </ScrollView>
// // //                                     <Text> footer of {service.key}</Text>
// // //                                 </View>

// // //                             )

// // //                         }
// // //                         if(service.key == 'videoShooting'){
// // //                             var items = service.videoShooting
// // //                             return(
// // //                                 <View>
// // //                                     <Text> header of {service.key}</Text>
// // //                                     <ScrollView key={service.key}horizontal={true} style={styles.serviceScroll}>
// // //                                         { this.renderItems(items, service.key) }
// // //                                     </ScrollView>
// // //                                     <Text> footer of {service.key}</Text>
// // //                                 </View>

// // //                             )

// // //                         }
// // //                         if(service.key == 'weddingStage'){
// // //                             var items = service.weddingStage
// // //                             return(
// // //                                 <View>
// // //                                     <Text> header of {service.key}</Text>
// // //                                     <ScrollView key={service.key}horizontal={true} style={styles.serviceScroll}>
// // //                                         { this.renderItems(items, service.key) }
// // //                                     </ScrollView>
// // //                                     <Text> footer of {service.key}</Text>
// // //                                 </View>

// // //                             )

// // //                         }
// // //                     })
// // //                 }
// // //             </View>
// // //         )

// // //     }

// // // }
// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //     },
// // //     serviceNames: {
// // //         // // flex: 1,
// // //         // width: 60,
// // //         // height: 30,
// // //         // backgroundColor: '#D8D9DB',
// // //         // flexDirection: "row",
// // //     },
// // //     serviceContainer: {
// // //         backgroundColor: '#DDD9DB',
// // //         height: 150,
// // //         // width: DEFAULT/2,
// // //         marginLeft: 5
// // //     },
// // //     serviceHeader: {
// // //         height: 100,
// // //         width: 100,
// // //         backgroundColor: '#00D9DB',
// // //         margin: 5,

// // //         // width: 100,
// // //     },
// // //     serviceScroll: {
// // //         marginVertical: 20,
// // //     }

// // // });

// // import React, { Component } from "react";
// // import {
// //   Text,
// //   ScrollView,
// //   View,
// //   StyleSheet,
// //   Dimensions,
// //   TouchableOpacity
// // } from "react-native";

// // import LottieView from "lottie-react-native";

// // const { width, height } = Dimensions.get("window");

// // const DEFAULT = width;

// // export default class Services extends Component {
// //   state = {
// //     services: [],
// //     choice: []
// //     // data: [],
// //     // selected: []
// //   };

// //   UNSAFE_componentWillMount() {
// //     const { data } = this.props;

// //     const serverData = data.map(item => {
// //       var serviceName = item.key;
// //       var serviceValue = item[serviceName];
// //       var modified = serviceValue.map(service => {
// //         service.isSelected = false;
// //         service.selectedClass = styles.list;
// //         return service;
// //       });

// //       this.setState(prevState => ({
// //         services: [...prevState.services, serviceName]
// //       }));

// //       this.setState({ [serviceName]: modified });
// //       return item;
// //     });
// //   }

// //   renderHeader() {
// //     return (
// //       <View>
// //         <ScrollView horizontal={true} key={"header"}>
// //           {this.state.services.map((name, key) => {
// //             return (
// //               <View key={key} style={styles.serviceHeader}>
// //                 <Text>{name}</Text>
// //               </View>
// //             );
// //           })}
// //         </ScrollView>
// //       </View>
// //     );
// //   }

// //   renderCatering() {
// //     const items = this.state.catering;
// //     const length = items.length;
// //     if (length === 1) {
// //       var wi = DEFAULT - 20;
// //     }
// //     if (length === 2) {
// //       var wi = DEFAULT / length - 10;
// //     }
// //     if (length > 2) {
// //       var wi = DEFAULT / 3 - 10;
// //     }
// //     return (
// //       <View>
// //         <Text> header of catering </Text>
// //         <ScrollView
// //           key={"catering"}
// //           horizontal={true}
// //           style={styles.serviceScroll}
// //         >
// //           {items.map((item, i) => {
// //             return (
// //               <TouchableOpacity onPress={() => this.selectCatering(item, i)}>
// //                 <View
// //                   key={i}
// //                   style={[styles.list, item.selectedClass, { width: wi }]}
// //                 >
// //                   <Text>{item.price}</Text>
// //                   <Text>{item.desc}</Text>
// //                   <Text>{item.icon}</Text>
// //                 </View>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </ScrollView>
// //         <Text> footer of catering </Text>
// //       </View>
// //     );
// //   }

// //   renderweddingStage() {
// //     const items = this.state.weddingStage;
// //     const length = items.length;
// //     if (length === 1) {
// //       var wi = DEFAULT - 20;
// //     }
// //     if (length === 2) {
// //       var wi = DEFAULT / length - 10;
// //     }
// //     if (length > 2) {
// //       var wi = DEFAULT / 3 - 10;
// //     }

// //     return (
// //       <View>
// //         <Text> header of weddingStage </Text>
// //         <ScrollView
// //           key={"weddingStage"}
// //           horizontal={true}
// //           style={styles.serviceScroll}
// //         >
// //           {items.map((item, i) => {
// //             return (
// //               <TouchableOpacity
// //                 onPress={() => this.selectWeddingStage(item, i)}
// //               >
// //                 <View
// //                   key={i}
// //                   style={[styles.list, item.selectedClass, { width: wi }]}
// //                 >
// //                   <Text>{item.price}</Text>
// //                   <Text>{item.desc}</Text>
// //                   <Text>{item.icon}</Text>
// //                 </View>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </ScrollView>
// //         <Text> footer of weddingStage </Text>
// //       </View>
// //     );
// //   }

// //   rendervideoShooting() {
// //     const items = this.state.videoShooting;
// //     const length = items.length;
// //     if (length === 1) {
// //       var wi = DEFAULT - 20;
// //     }
// //     if (length === 2) {
// //       var wi = DEFAULT / length - 10;
// //     }
// //     if (length > 2) {
// //       var wi = DEFAULT / 3 - 10;
// //     }
// //     return (
// //       <View>
// //         <Text> header of videoShooting </Text>
// //         <ScrollView
// //           key={"videoShooting"}
// //           horizontal={true}
// //           style={styles.serviceScroll}
// //         >
// //           {items.map((item, i) => {
// //             return (
// //               <TouchableOpacity
// //                 onPress={() => this.selectvideoShooting(item, i)}
// //               >
// //                 <View
// //                   key={i}
// //                   style={[styles.list, item.selectedClass, { width: wi }]}
// //                 >
// //                   <Text>{item.price}</Text>
// //                   <Text>{item.desc}</Text>
// //                   <Text>{item.icon}</Text>
// //                 </View>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </ScrollView>
// //         <Text> footer of catering </Text>
// //       </View>
// //     );
// //   }

// //   renderchoice() {
// //     return <Text>user has selected some data</Text>;
// //   }

// //   selectCatering(item, index) {
// //     item.isSelected = !item.isSelected;
// //     item.selectedClass = item.isSelected ? styles.selected : styles.list;

// //     let filteredArray = this.state.catering.filter(x => x.isSelected);
// //     var i = this.state.catering.indexOf(filteredArray)
// //     filteredArray.isSelected = !filteredArray.isSelected
// //     filteredArray.selectedClass = styles.list;

// //     this.state.catering[index] = item;
// //     this.state.catering[i] = filteredArray;

// //     this.setState({
// //       catering: this.state.catering
// //     });

// //     console.log(this.state.catering)

// //     if (item.isSelected) {
// //       this.setState(prevState => ({
// //         choice: [...prevState.choice,  item ]
// //         // choice: [...prevState.choice, { catering: item }]
// //       }));
// //     }
// //   }

// //   selectWeddingStage(item, index) {
// //     item.isSelected = !item.isSelected;
// //     item.selectedClass = item.isSelected ? styles.selected : styles.list;
// //     this.state.weddingStage[index] = item;
// //     this.setState({
// //       weddingStage: this.state.weddingStage
// //     });
// //   }

// //   selectvideoShooting(item, index) {
// //     item.isSelected = !item.isSelected;
// //     item.selectedClass = item.isSelected ? styles.selected : styles.list;
// //     this.state.videoShooting[index] = item;
// //     this.setState({
// //       videoShooting: this.state.videoShooting
// //     });
// //   }

// //   render() {
// //     // console.log(this.state);
// //     return (
// //       <View>
// //         {this.state.services ? this.renderHeader() : null}
// //         {this.state.catering ? this.renderCatering() : null}
// //         {this.state.weddingStage ? this.renderweddingStage() : null}
// //         {this.state.videoShooting ? this.rendervideoShooting() : null}
// //         {this.state.choice ? this.renderchoice() : null}
// //       </View>
// //     );
// //   }
// // }
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1
// //   },
// //   serviceNames: {
// //     // // flex: 1,
// //     // width: 60,
// //     // height: 30,
// //     // backgroundColor: '#D8D9DB',
// //     // flexDirection: "row",
// //   },
// //   serviceContainer: {
// //     backgroundColor: "#DDD9DB",
// //     height: 150,
// //     // width: DEFAULT/2,
// //     marginLeft: 5
// //   },
// //   serviceHeader: {
// //     height: 100,
// //     width: 100,
// //     backgroundColor: "#00D9DB",
// //     margin: 5

// //     // width: 100,
// //   },
// //   serviceScroll: {
// //     marginVertical: 20
// //   },
// //   list: {
// //     height: 100,
// //     width: 150,
// //     backgroundColor: "#FA7B5F",
// //     margin: 5
// //   },
// //   selected: {
// //     backgroundColor: "#00D9DB"
// //   }
// // });

// import React, { Component } from "react";

// import {
//   Text,
//   ScrollView,
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   TouchableWithoutFeedback
// } from "react-native";

// import LottieView from "lottie-react-native";
// import * as Animatable from 'react-native-animatable';

// const { width, height } = Dimensions.get("window");

// const DEFAULT = width;

// export default class Services extends Component {
//   state = {
//     services: [],
//     choice: [],
//     checked: null,
//     vChecked: null,
//     wChecked: null,
//     // data: [],
//     // selected: []
//   };

//   UNSAFE_componentWillMount() {
//     const { data } = this.props;

//     const serverData = data.map(item => {
//       var serviceName = item.key;
//       var serviceValue = item[serviceName];
//       var modified = serviceValue.map(service => {
//         // service.isSelected = false;
//         // service.selectedClass = styles.list;
//         return service;
//       });

//       this.setState(prevState => ({
//         services: [...prevState.services, serviceName]
//       }));

//       this.setState({ [serviceName]: modified });
//       return item;
//     });
//   }

//   renderHeader() {
//     return (
//       <View>
//         <ScrollView horizontal={true} key={"header"}>
//           {this.state.services.map((name, key) => {
//             return (
//               <View key={key} style={styles.serviceHeader}>
//                 <Text>{name}</Text>
//               </View>
//             );
//           })}
//         </ScrollView>
//       </View>
//     );
//   }

//   cateringChecked(index){
//     this.setState({ checked: index });
//     var meal = this.state.catering[index];
//     // console.log(meal)
//     let choice = [...this.state.choice]
//     choice['catering'] = meal;
//     console.log(choice)

//     // this.setState[{choice}]

//     // this.setState(prevState => ({
//     //   choice: [...prevState.choice, {"catering": meal} ]
//     // }));

//     // console.log(this.state.choice)
//     // var cat = this.state.choice[catering];
//     // if(!cat){

//     // }
//   }

//   renderCatering() {
//     const items = this.state.catering;
//     const length = items.length;
//     if (length === 1) {
//       var wi = DEFAULT - 20;
//     }
//     if (length === 2) {
//       var wi = DEFAULT / length - 10;
//     }
//     if (length > 2) {
//       var wi = DEFAULT / 3 - 10;
//     }
//     return (
//       <View>
//         <Text> header of catering </Text>
//         <ScrollView
//           key={"catering"}
//           horizontal={true}
//           style={styles.serviceScroll}
//         >
//           {items.map((item, i) => {
//             return (
//               <View key={i}>
//                 {this.state.checked == i ? (
//                   <TouchableOpacity style={[styles.checked, {width: wi}]}>
//                     <Text>{item.price}</Text>
//                     <Text>{item.desc}</Text>
//                     <Text>{item.icon}</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.cateringChecked(i)
                      
//                     }}
//                     style={[styles.unchecked, , {width: wi}]}
//                   >
//                     <Text>{item.price}</Text>
//                     <Text>{item.desc}</Text>
//                     <Text>{item.icon}</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             );
//           })}
//         </ScrollView>
//         <Text> footer of catering </Text>
//       </View>
//     );
//   }

//   renderweddingStage() {
//     const items = this.state.weddingStage;
//     const length = items.length;
//     if (length === 1) {
//       var wi = DEFAULT - 20;
//     }
//     if (length === 2) {
//       var wi = DEFAULT / length - 10;
//     }
//     if (length > 2) {
//       var wi = DEFAULT / 3 - 10;
//     }

//     return (
//       <View>
//         <Text> header of weddingStage </Text>
//         <ScrollView
//           key={"weddingStage"}
//           horizontal={true}
//           style={styles.serviceScroll}
//         >
//           {items.map((item, i) => {
//             return (
//               <View key={i}>
//                 {this.state.wChecked == i ? (
//                   <TouchableOpacity style={[styles.checked, {width: wi}]}>
//                     <Text>{item.price}</Text>
//                     <Text>{item.desc}</Text>
//                     <Text>{item.icon}</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.setState({ wChecked: i });
//                     }}
//                     style={[styles.unchecked, , {width: wi}]}
//                   >
//                     <Text>{item.price}</Text>
//                     <Text>{item.desc}</Text>
//                     <Text>{item.icon}</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             );
//           })}
//         </ScrollView>
//         <Text> footer of weddingStage </Text>
//       </View>
//     );
//   }

//   rendervideoShooting() {
//     const items = this.state.videoShooting;
//     const length = items.length;
//     if (length === 1) {
//       var wi = DEFAULT - 20;
//     }
//     if (length === 2) {
//       var wi = DEFAULT / length - 10;
//     }
//     if (length > 2) {
//       var wi = DEFAULT / 3 - 10;
//     }
//     return (
//       <View>
//         <Text> header of videoShooting </Text>
//         <ScrollView
//           key={"videoShooting"}
//           horizontal={true}
//           style={styles.serviceScroll}
//         >
//           {items.map((item, i) => {
//             return (
//               <View key={i}>
//                 {this.state.vChecked == i ? (
//                   <TouchableOpacity style={[styles.checked, {width: wi}]}>
//                     <Text>{item.price}</Text>
//                     <Text>{item.desc}</Text>
//                     <Text>{item.icon}</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.setState({ vChecked: i });
//                     }}
//                     style={[styles.unchecked, , {width: wi}]}
//                   >
//                     <Text>{item.price}</Text>
//                     <Text>{item.desc}</Text>
//                     <Text>{item.icon}</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             );
//           })}
//         </ScrollView>
//         <Text> footer of catering </Text>
//       </View>
//     );
//   }

//   renderchoice() {
//       if(this.state.checked){

//       }
//     return <Text>user has selected some data</Text>;
//   }

//   selectCatering(item, index) {
//     item.isSelected = !item.isSelected;
//     item.selectedClass = item.isSelected ? styles.selected : styles.list;

//     let filteredArray = this.state.catering.filter(x => x.isSelected);
//     var i = this.state.catering.indexOf(filteredArray);
//     filteredArray.isSelected = !filteredArray.isSelected;
//     filteredArray.selectedClass = styles.list;

//     this.state.catering[index] = item;
//     this.state.catering[i] = filteredArray;

//     this.setState({
//       catering: this.state.catering
//     });

//     console.log(this.state.catering);

//     if (item.isSelected) {
//       this.setState(prevState => ({
//         choice: [...prevState.choice, item]
//         // choice: [...prevState.choice, { catering: item }]
//       }));
//     }
//   }

//   selectWeddingStage(item, index) {
//     item.isSelected = !item.isSelected;
//     item.selectedClass = item.isSelected ? styles.selected : styles.list;
//     this.state.weddingStage[index] = item;
//     this.setState({
//       weddingStage: this.state.weddingStage
//     });
//   }

//   selectvideoShooting(item, index) {
//     item.isSelected = !item.isSelected;
//     item.selectedClass = item.isSelected ? styles.selected : styles.list;
//     this.state.videoShooting[index] = item;
//     this.setState({
//       videoShooting: this.state.videoShooting
//     });
//   }

//   handleViewRef = ref => this.view = ref;

//   bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

//   render() {
//     // console.log(this.state);
//     return (
//       <View>
        
//         {this.state.services ? this.renderHeader() : null}
//         {this.state.catering ? this.renderCatering() : null}
//         {this.state.weddingStage ? this.renderweddingStage() : null}
//         {this.state.videoShooting ? this.rendervideoShooting() : null}
//         {this.state.choice ? this.renderchoice() : null}
//         <TouchableWithoutFeedback onPress={this.bounce} >
//           <Animatable.View ref={this.handleViewRef} style={styles.bounce} animation="bounce">
//             <Text>Bounce me!</Text>
//           </Animatable.View>
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   serviceNames: {
//     // // flex: 1,
//     // width: 60,
//     // height: 30,
//     // backgroundColor: '#D8D9DB',
//     // flexDirection: "row",
//   },
//   serviceContainer: {
//     backgroundColor: "#DDD9DB",
//     height: 150,
//     // width: DEFAULT/2,
//     marginLeft: 5
//   },
//   serviceHeader: {
//     height: 100,
//     width: 100,
//     backgroundColor: "#00D9DB",
//     margin: 5

//     // width: 100,
//   },
//   serviceScroll: {
//     marginVertical: 20
//   },
//   list: {
//     height: 100,
//     width: 150,
//     backgroundColor: "#FA7B5F",
//     margin: 5
//   },
//   checked: {
//     height: 100,
//     width: 150,
//     backgroundColor: "#00D9DB",
//     margin: 5
//   },
//   unchecked: {
//     height: 100,
//     width: 150,
//     backgroundColor: "#FA7B5F",
//     margin: 5
//   },
//   selected: {
//     backgroundColor: "#00D9DB"
//   },
//   bounce: {
//     width: width,
//     height: 50,
//     backgroundColor: 'blue',
//     alignItems: "center",
//     alignSelf: "center",
//     // alignContent: "center"
//     // textAlign: 'center'
//   }
// });
