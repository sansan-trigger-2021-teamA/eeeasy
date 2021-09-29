import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import  AsyncStorage  from "@react-native-async-storage/async-storage"
import {sendGeoData} from  "./sendGeoData"




export const backgroundGeoLocations =  () => {
    const LOCATION_TASK_NAME = 'GPS';

    // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    //     if (error) {
    //         console.log("error",error);
    //         return
    //     }
    //     if (data) {
    //         sendGeoData(data)
    //     }
    // });

    // Location.startLocationUpdatesAsync(LOCATION_TASK_NAME,{
    // timeInterval:15000,
    // })

}