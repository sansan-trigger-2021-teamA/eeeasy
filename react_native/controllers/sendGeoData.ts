import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {getEmail} from "./getEmail"


export const sendGeoData = async(gpsObj: object) => {
    let jsons: object[] = []
    let storageInitJson = {items:jsons}
        
    try {
        let arr: object[] = []
        AsyncStorage.getItem("GPS").then(async(result) => {
            if(result){
               if(JSON.parse(result).items == undefined){
                storageInitJson.items = [gpsObj]
                await AsyncStorage.setItem("GPS",JSON.stringify(storageInitJson))
                return 
               }
                if(JSON.parse(result).items.length > 30){
                    
                    await getEmail().then(email =>{
                        axios.post("https://shugznedv3.execute-api.ap-northeast-1.amazonaws.com/api/set-gps",{
                            email:email,
                            value:JSON.parse(result)
                        }).then(e=>console.log("POSTED",e.data))
                    })
                    await AsyncStorage.removeItem("GPS")
                    storageInitJson.items = [gpsObj]
                    await AsyncStorage.setItem("GPS",JSON.stringify(storageInitJson))
                    return 
                }
                arr = JSON.parse(result).items
                arr.push(gpsObj)
                console.log(arr.length)
                storageInitJson.items = arr
                AsyncStorage.setItem("GPS", JSON.stringify(storageInitJson))
            }
        })
      } catch (e) {
        console.log(e)
      }

}