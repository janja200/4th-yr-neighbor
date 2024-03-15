"use client"
import { useState, useEffect } from 'react';

interface GeocodeData {
  formattedAddress: string;
  // Add more properties as needed based on the API response
}

const useGeocode = (latitude: number, longitude: number) => {
  const [geocodeData, setGeocodeData] = useState<GeocodeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const formattedAddress = data.results[0].formatted_address;
          // Extract more information from the API response if needed

          setGeocodeData({ formattedAddress });
        } else {
          setError('No results found');
        }
      } catch (error) {
        setError('Error fetching geocode data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return { geocodeData, loading, error };
};

export default useGeocode;
