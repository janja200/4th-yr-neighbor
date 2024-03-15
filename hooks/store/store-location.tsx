"use client"

import { useEffect, useState } from "react";
import useUserLocation from "./use-location";
import { useParams } from "next/navigation";
import useGeocode from "./useGeocode";
import { StoreLocation } from "@/actions/store/storeLocation";

const StoreLatLng = () => {
  const { latitude, longitude} = useUserLocation();
  const [data,setData]=useState(null)
  const params =useParams()
  let storeId=''
  if (typeof params.storeId === 'string') {
    storeId=params.storeId;
  } else if (Array.isArray(params.storeId)) {
    storeId=params.storeId.join(','); 
  }
  
  useEffect(()=>{
    if(latitude !==null && longitude !==null  && storeId !==''){
      const response =StoreLocation({latitude,longitude,storeId})
      if(response &&response !==null){
        //const {geocodeData}=useGeocode(latitude,longitude)

      }
    }

  },[latitude,longitude])

  return null
}
 
export default StoreLatLng;