"use client"
import { useState, useEffect } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useUserLocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setLocation({
              latitude: null,
              longitude: null,
              error: `Geolocation error: ${error.message}`,
            });
          }
        );
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          error: 'Geolocation is not supported by your browser',
        });
      }
    };

    getLocation();
  }, []);

  return location;
};

export default useUserLocation;

  