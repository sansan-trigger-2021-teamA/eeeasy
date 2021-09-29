import AsyncStorage from "@react-native-async-storage/async-storage"

let arr :[any] 
export const sendGeoData = async(gpsObj: object) => {
    try {
        const todoString = JSON.stringify(gpsObj);
        console.log(todoString)
        // AsyncStorage.mergeItem("GPS", JSON.stringify(gpsObj))
        // AsyncStorage.getItem("GPS").then(result => console.log(result))
        //AsyncStorage.setItem("GPS", JSON.stringify(storeArray));
      } catch (e) {
        console.log(e)
      }

}