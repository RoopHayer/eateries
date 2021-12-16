 
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';

export default function App() {


  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    let latitude = location?.latitude;
    let longitude = location?.longitude;
    if (location) {
      getRestaurant(latitude,longitude);
    }
    console.log('hmm', location);
  }, [location]);

  async function getRestaurant(latitude,longitude) {
    try {
      let response = await fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${latitude}&longitude=${longitude}&limit=5&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": "43a582f11dmshf13bf4af7b9d295p15d26fjsn25df6629dd98"
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      setData(responseJson.data);
      setCity(responseJson.name);
    } catch (error) {
      console.error(error);
    }
  }

  console.log('data', data);
  if (location) {
    console.log('geo', location.latitude);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./4361002685_f669625756_b.jpeg')}
        resizeMode="cover"
      >
        <Text style={styles.city}>{city}</Text>
        {data.map((restaurant, idx) => (
          <Card style={styles.paragraph} key={idx}>
            <Card.Title
              titleStyle={{
                textAlign: 'center',
                color: 'white',
              }}
              title={restaurant.name}
            />
            <Text style={styles.restaurant}>
            </Text>
            <Text style={styles.restaurant}>{restaurant.address}</Text>
          </Card>
        ))}

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#000000c0',
    margin: '5%',
    color: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  city: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restaurant: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});










// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View ,ImageBackground, Dimensions} from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Callout, Circle, Marker } from "react-native-maps"

// export default function App() {


  
 
//   const [data, setData] = useState([]);
//   // const [ pin, setPin ] = useState({
// 	// 	latitude: 37.78825,
// 	// 	longitude: -122.4324
// 	// })
//   // const [location, setLocation] = useState(null);
//   // const [ region, setRegion ] = useState({})
//   // // const []
//   useEffect(() => {
//     (async () => {
//       // let { status } = await Location.requestForegroundPermissionsAsync();
//       // if (status !== 'granted') {
//       //   setErrorMsg('Permission to access location was denied');
//       //   return;
//       // }

//       // let location = await Location.getCurrentPositionAsync({});
//       // setLocation(location);
//       // setRegion({latitude: location.coords.latitude,
//       // longitude: location.coords.longitude,
//       // latitudeDelta: 0.0922,
//       // longitudeDelta: 0.0421,})
//       fetch("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US", {
//         "method": "GET",
//         "headers": {
//           "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//           "x-rapidapi-key": "43a582f11dmshf13bf4af7b9d295p15d26fjsn25df6629dd98"
//         }
//       })
//       .then(response => {
//         setData(response)
//         console.log(response,'------------>');
//       })
//       .catch(err => {
//         console.error(err);
//       });
//     });
//   });

//   // useEffect(()=>{
//   //   getResturantAPI();
//   // },[location])


//   // async function getResturantAPI() {
//   //   try {
//   //     let response = await fetch(
//   //       'https://pokeapi.co/api/v2/pokemon',
//   //     );
//   //     let responseJson = await response.json();
//   //     setData(responseJson.results)
//   //     return responseJson;
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }
//   console.log(data);
//   // console.log(location.coords.latitude,'latitedfsdfsdfsdf');
//   location
//   return (
//     <View style={styles.container}>
//       {/* <GooglePlacesAutocomplete
// 				placeholder="Search"
// 				fetchDetails={true}
// 				GooglePlacesSearchQuery={{
// 					rankby: "distance"
// 				}}
// 				onPress={(data, details = null) => {
// 					// 'details' is provided when fetchDetails = true
// 					console.log(data, details)
// 					setRegion({
// 						latitude: details.geometry.location.lat,
// 						longitude: details.geometry.location.lng,
// 						latitudeDelta: 0.0922,
// 						longitudeDelta: 0.0421
// 					})
// 				}}
// 				query={{
// 					key: "AIzaSyB9LoHsqFV0IwYDR8IHVi6CDQ-L4BLHBbo",
// 					language: "en",
// 					components: "country:us",
// 					types: "establishment",
// 					radius: 30000,
// 					location: `${region.latitude}, ${region.longitude}`
// 				}}
// 				styles={{
// 					container: { flex: 0, position: "fixed", width: "100%", zIndex: 1 },
// 					listView: { backgroundColor: "beige" }
// 				}}
// 			/> */}
//     <ImageBackground resizeMode="cover" source={require("./4361002685_f669625756_b.jpeg")} style={styles.image}>
//     {/* {location && <MapView style={styles.map}   initialRegion={{
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }} provider ='google'> */}
//       {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> */}
//       {/* <Marker 	coordinate={ { latitude: location.coords.latitude,
//       longitude: location.coords.longitude}}
// 					pinColor="black"
// 					draggable={true}
// 					onDragStart={(e) => {
// 						console.log("Drag start", e.nativeEvent.coordinates)
// 					}}
// 					onDragEnd={(e) => {
// 						setPin({
// 							latitude: e.nativeEvent.coordinate.latitude,
// 							longitude: e.nativeEvent.coordinate.longitude
// 						})
// 					}}
//       // coordinate={{
//       //    latitude: location?.coords.latitude,
//       //    longitude: location?.coords.latitude,

//       > 
//       <Callout>
//       <Text>RooP</Text>
//     </Callout>
//     {/* <Circle center={pin} radius={1000} /> */}

//     {/* </Marker>
//     </MapView>} */} 

//       {/* <Text>{data}</Text> */}
//       {/* {data.map((item)=>(
//         <Text style={styles.text}>{item.name}</Text>
//       ))} */}
//       <StatusBar style="auto" />
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 30,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   text: {
//     color: "white",
//     fontSize: 42,
//     lineHeight: 84,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#000000c0"
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });
