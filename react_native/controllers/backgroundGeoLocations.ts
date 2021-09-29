import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import  AsyncStorage  from "@react-native-async-storage/async-storage"
import {sendGeoData} from  "./sendGeoData"




export const backgroundGeoLocations =  () => {
    const LOCATION_TASK_NAME = 'background';

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
            console.log("error",error);
            return
        }
        if (data.locations) {
            sendGeoData(data.locations[0])
        }
    });

    Location.startLocationUpdatesAsync(LOCATION_TASK_NAME,{
    timeInterval:100000,
    })

}