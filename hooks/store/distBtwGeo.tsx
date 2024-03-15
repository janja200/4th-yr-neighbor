interface GeoLocation {
    latitude: number;
    longitude: number;
  }
  
  function calculateDistance(
    point1: GeoLocation,
    point2: GeoLocation,
    unit: 'km' | 'mi' = 'km'
  ): number {
    const earthRadius = unit === 'km' ? 6371 : 3959; // Radius of the Earth in either kilometers or miles
  
    const lat1 = toRadians(point1.latitude);
    const lon1 = toRadians(point1.longitude);
    const lat2 = toRadians(point2.latitude);
    const lon2 = toRadians(point2.longitude);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    return distance;
  }
  
  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  // Example usage with objects:
  const pointA: GeoLocation = { latitude: 37.7749, longitude: -122.4194 }; // San Francisco, CA
  const pointB: GeoLocation = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles, CA
  
  const distanceInKm = calculateDistance(pointA, pointB, 'km');
  const distanceInMi = calculateDistance(pointA, pointB, 'mi');
  
  console.log(`Distance in kilometers: ${distanceInKm.toFixed(2)} km`);
  console.log(`Distance in miles: ${distanceInMi.toFixed(2)} mi`);
  