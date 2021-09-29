import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"



export const registerTask = () => {
    const TASK_NAME = "BACKGROUND_TASK"

    TaskManager.defineTask(TASK_NAME, () => {
    try {
        // fetch data here...
        const receivedNewData = "Simulated fetch " + Math.random()
        console.log("My task ", receivedNewData)
        return receivedNewData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData
    } catch (err) {
        return BackgroundFetch.Result.Failed
    }
    })
}

// const registerTask = () => {

//     TaskManager.defineTask(TASK_NAME, () => {
//     try {
//         // fetch data here...
//         const receivedNewData = "Simulated fetch " 
//         console.log("My task ", receivedNewData)
//         return receivedNewData
//         ? BackgroundFetch.Result.NewData
//         : BackgroundFetch.Result.NoData
//     } catch (err) {
//         return BackgroundFetch.Result.Failed
//     }
//     })
//   }