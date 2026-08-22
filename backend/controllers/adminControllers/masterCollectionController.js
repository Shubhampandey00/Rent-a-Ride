import mongoose, { disconnect } from "mongoose";
import MasterData from '../../models/masterDataModel.js'
import { v4 as uuidv4 } from 'uuid';
import { errorHandler } from "../../utils/error.js";
import { indiaLocationsData } from '../../data/indiaLocationsData.js';

const carData = [

    //cars


    //alto
    { id: uuidv4(), model: 'Alto 800', variant: 'manual', type: 'car' , brand:'maruthi' },
    { id: uuidv4(), model: 'Alto 800', variant: 'automatic', type: 'car' , brand:'maruthi' },
    { id: uuidv4(), model: 'SKODA SLAVIA PETROL AT', variant: 'automatic', type: 'car' , brand:'maruthi' },
    { id: uuidv4(), model: 'NISSAN MAGNITE PETROL MT', variant: 'manual', type: 'car' , brand:'nissan' },
    { id: uuidv4(), model: 'SKODA KUSHAQ Petrol MT', variant: 'manual', type: 'car' , brand:'skoda' },
    { id: uuidv4(), model: 'SKODA KUSHAQ Petrol AT', variant: 'automatic', type: 'car' , brand:'skoda' },
    { id: uuidv4(), model: 'MG HECTOR Petrol MT', variant: 'manual', type: 'car' , brand:'mg' },
    { id: uuidv4(), model: 'MG HECTOR Petrol AT', variant: 'automatic', type: 'car' , brand:'mg' },
    { id: uuidv4(), model: 'MG HECTOR Diesel MT', variant: 'manual', type: 'car' , brand:'mg' },
    { id: uuidv4(), model: 'NISSAN TERRANO Diesel MT', variant: 'manual', type: 'car' , brand:'nissan' },
    { id: uuidv4(), model: 'NISSAN KICKS Petrol MT', variant: 'manual', type: 'car' , brand:'nissan' },
    { id: uuidv4(), model: 'NISSAN KICKS Petrol AT', variant: 'manual', type: 'car' , brand:'nissan' },
    { id: uuidv4(), model: 'VW TAIGUN Petrol MT', variant: 'manual', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'NISSAN MAGNITE Petrol MT', variant: 'manual', type: 'car' , brand:'nissan' },
    { id: uuidv4(), model: 'HYUNDAI ALCAZAR Diesel AT', variant: 'automatic', type: 'car' , brand:'hyundai' },
    { id: uuidv4(), model: 'CITROEN C3 Petrol MT', variant: 'automatic', type: 'car' , brand:'citroen' },
    { id: uuidv4(), model: 'ISUZU MUX Diesel AT', variant: 'automatic', type: 'car' , brand:'isuzu' },
    { id: uuidv4(), model: 'MG HECTOR PLUS Petrol MT', variant: 'manual', type: 'car' , brand:'mg' },
    { id: uuidv4(), model: 'MG HECTOR PLUS Petrol AT', variant: 'automatic', type: 'car' , brand:'mg' },
    { id: uuidv4(), model: 'MG HECTOR PLUS Diesel MT', variant: 'manual', type: 'car' , brand:'mg' },


    { id: uuidv4(), model: 'MARUTI SWIFT Petrol AT', variant: 'automatic', type: 'car' , brand:'maruthi' },
    { id: uuidv4(), model: 'DATSUN REDI GO Petrol MT', variant: 'manual', type: 'car' , brand:'DATSUN' },
    { id: uuidv4(), model: 'DATSUN REDI GO Petrol AT', variant: 'automatic', type: 'car' , brand:'DATSUN' },
    { id: uuidv4(), model: 'NISSAN MICRA Petrol MT', variant: 'automatic', type: 'car' , brand:'NISSAN' },
    { id: uuidv4(), model: 'VW AMEO Diesel MT', variant: 'manual', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'SKODA RAPID Petrol MT', variant: 'manual', type: 'car' , brand:'skoda' },
    { id: uuidv4(), model: 'MARUTI DZIRE Petrol MT', variant: 'manual', type: 'car' , brand:'maruthi' },
    { id: uuidv4(), model: 'VW VENTO Petrol MT', variant: 'manual', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'VW VENTO Petrol AT', variant: 'automatic', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'VW VENTO Diesel AT', variant: 'automatic', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'VW POLO Petrol MT', variant: 'manual', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'VW POLO Petrol AT', variant: 'automatic', type: 'car' , brand:'volkswagen' },
    { id: uuidv4(), model: 'VW POLO Diesel MT', variant: 'manual', type: 'car' , brand:'volkswagen' },

  ];

  const dummyData = [...indiaLocationsData, ...carData];

  // Function to insert dummy data into the database
 export  async function insertDummyData() {
    try {
        // Clear existing dummy data first so re-running this doesn't create duplicates
        await MasterData.deleteMany({});
        await MasterData.insertMany(dummyData);
        console.log('Dummy data inserted successfully.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
    finally{
        mongoose.disconnect();
    }
  }

//app product modal data fetching from db
  export const getCarModelData = async (req,res,next)=> {
    try{
            const availableVehicleModels  = await MasterData.find()
            console.log("MasterData:", availableVehicleModels);
            if(!availableVehicleModels){
                return next(errorHandler(404,"no model found"))
            }
            res.status(201).json(availableVehicleModels)
    }
    catch(error){
        next(errorHandler(500,{'could not get model Data':error}))
    }
  }
  

  


