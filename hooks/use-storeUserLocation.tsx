"use client"
import { useEffect, useState } from "react";
import useUserLocation from "./store/use-location";
import { storeUserLocation } from "@/actions/storeUserLocation";

const StoreUserLatLng = () => {
  const { latitude, longitude} = useUserLocation();

  useEffect(()=>{
    if(latitude !==null && longitude !==null ){
      const response =storeUserLocation({latitude,longitude})
      if(response &&response !==null){
        //const {geocodeData}=useGeocode(latitude,longitude)

      }
    }

  },[latitude,longitude])

  return null
}
 
export default StoreUserLatLng;