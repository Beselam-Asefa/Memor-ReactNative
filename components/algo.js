// in this component time  calculation is done


import React from "react";
import { useState, useContext, Alert, useEffect } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const Algo = param => {

  const medInput = param;
  //const [medicine, setMedicine] = useContext(MedicContext);

  const barSection = 1 / parseInt(medInput.howmanyTimes);
  medInput.barSection = barSection;
  medInput.counter = 0;
  medInput.left = parseInt(medInput.howmanyTimes);
  medInput.barWidth = 0;

  const converTimeToMiliSec = time => {
    const ms = time * 3600000;
    return ms;
  };

  const converMinToMiliSec = minute => {
    const ms = minute * 60000;
    return ms;
  };

  const getHour = () => {
    const today = new Date();
    const hour = today.getHours();

    return hour;
  };

  const getMinute = () => {
    const today = new Date();
    const minute = today.getMinutes();
    return minute;
  };

  const nowInMiliSec = () => {
    let hour = getHour();
    hour = converTimeToMiliSec(hour);
    let min = getMinute();
    min = converMinToMiliSec(min);

    const now = min + hour;
    return now;
  };


  const notify = () => {
    const localNotification = {
      title: "mamo",
      body: "killo", // (string) — body text of the notification.
      ios: {
        // (optional) (object) — notification configuration specific to iOS.
        sound: true // (optional) (boolean) — if true, play a sound. Default: false.
      },
      // (optional) (object) — notification configuration specific to Android.
      android: {
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        //color (optional) (string) — color of the notification icon in notification drawer.
        priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
      }
    };

    let t = new Date();

    t.setSeconds(t.getSeconds + 10);
    const schedulingOptions = {
      time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };

  const setAlert = () => {
    notify();

    Alert.alert(
      "Time to take Medicine",
      medInput.medicineName,
      [
        { text: "Ok", onPress: () => console.log("Ask me later pressed") },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  
// this set the notification for the first medication
  const firstMedicineTime = () => {
    let userTime = parseFloat(medInput.startingTime);
    userTime = converTimeToMiliSec(userTime);
    const now = nowInMiliSec();
    const timeDiff = userTime - now;
    console.log('this is now ',now);
    console.log('this is user time',userTime);

    console.log('this is time diff',timeDiff);

  //  setTimeout(setAlert, timeDiff);
  };
  //firstMedicineTime();

  return medInput;
};

export default Algo;
