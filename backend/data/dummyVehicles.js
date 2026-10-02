import { v4 as uuidv4 } from 'uuid';
import { indiaLocationsData } from './indiaLocationsData.js';

// A small pool of car specs to rotate through, so vehicles aren't identical.
const carPool = [
  { company: 'maruthi', name: 'Alto 800', model: 'Alto 800', transmition: 'manual', seats: 5, price: 1200, car_type: 'hatchback', fuel_type: 'petrol' },
  { company: 'skoda', name: 'Skoda Kushaq', model: 'SKODA KUSHAQ Petrol MT', transmition: 'manual', seats: 5, price: 2500, car_type: 'suv', fuel_type: 'petrol' },
  { company: 'mg', name: 'MG Hector', model: 'MG HECTOR Petrol AT', transmition: 'automatic', seats: 5, price: 3200, car_type: 'suv', fuel_type: 'petrol' },
  { company: 'nissan', name: 'Nissan Kicks', model: 'NISSAN KICKS Petrol MT', transmition: 'manual', seats: 5, price: 2800, car_type: 'suv', fuel_type: 'petrol' },
  { company: 'volkswagen', name: 'VW Vento', model: 'VW VENTO Petrol MT', transmition: 'manual', seats: 5, price: 2200, car_type: 'sedan', fuel_type: 'petrol' },
  { company: 'hyundai', name: 'Hyundai Alcazar', model: 'HYUNDAI ALCAZAR Diesel AT', transmition: 'automatic', seats: 7, price: 3800, car_type: 'suv', fuel_type: 'diesel' },
  { company: 'maruthi', name: 'Maruti Dzire', model: 'MARUTI DZIRE Petrol MT', transmition: 'manual', seats: 5, price: 1800, car_type: 'sedan', fuel_type: 'petrol' },
  { company: 'nissan', name: 'Nissan Magnite', model: 'NISSAN MAGNITE Petrol MT', transmition: 'manual', seats: 5, price: 1900, car_type: 'suv', fuel_type: 'petrol' },
  { company: 'skoda', name: 'Skoda Slavia', model: 'SKODA SLAVIA PETROL AT', transmition: 'automatic', seats: 5, price: 2600, car_type: 'sedan', fuel_type: 'petrol' },
  { company: 'isuzu', name: 'Isuzu MUX', model: 'ISUZU MUX Diesel AT', transmition: 'automatic', seats: 7, price: 4200, car_type: 'suv', fuel_type: 'diesel' },
  { company: 'citroen', name: 'Citroen C3', model: 'CITROEN C3 Petrol MT', transmition: 'automatic', seats: 5, price: 1700, car_type: 'hatchback', fuel_type: 'petrol' },
  { company: 'volkswagen', name: 'VW Polo', model: 'VW POLO Petrol MT', transmition: 'manual', seats: 5, price: 1600, car_type: 'hatchback', fuel_type: 'petrol' },
];

// Pick one representative location per district, so every district is
// searchable. Uses whatever indiaLocationsData actually contains for that
// district, so location/district strings always match.
const firstLocationByDistrict = {};
indiaLocationsData.forEach((loc) => {
  const key = `${loc.state}|${loc.district}`;
  if (!firstLocationByDistrict[key]) {
    firstLocationByDistrict[key] = loc;
  }
});

export const dummyVehicles = Object.values(firstLocationByDistrict).map((loc, idx) => {
  const car = carPool[idx % carPool.length];
  return {
    registeration_number: `DV${uuidv4().slice(0, 8).toUpperCase()}`,
    car_title: car.name,
    title: car.name,
    company: car.company,
    name: car.name,
    model: car.model,
    year_made: 2021 + (idx % 4),
    fuel_type: car.fuel_type,
    transmition: car.transmition,
    seats: car.seats,
    image: [`https://placehold.co/600x400/png?text=${encodeURIComponent(car.name)}`],
    price: car.price,
    car_type: car.car_type,
    location: loc.location,
    district: loc.district,
    isDeleted: 'false',
  };
});
