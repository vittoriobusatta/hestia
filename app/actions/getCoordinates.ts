import cities from "../data/cities.json";

export interface City {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    code: string;
    name: string;
    flag: string;
    commune?: string | undefined;
  };
}

const citiesData: City[] = cities.features;

export function getCoordinates(locationValue: string) {
  const city = citiesData.find(
    (city: City) => city.properties.name === locationValue
  );

  if (!city) {
    throw new Error("City not found");
  }

  return [city.geometry.coordinates[0], city.geometry.coordinates[1]];
}
