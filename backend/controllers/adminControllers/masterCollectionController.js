import mongoose, { disconnect } from "mongoose";
import MasterData from '../../models/masterDataModel.js'
import { v4 as uuidv4 } from 'uuid';
import { errorHandler } from "../../utils/error.js";

const dummyData = [

    //kochi
    { id: uuidv4(),  state: 'Kerala', district: 'Kochi', location: 'kalamassery : skoda service', type: 'location' },
    { id: uuidv4(), district: 'Kochi', location: 'kalamassery : volkswagen', type: 'location' },
    { id: uuidv4(), district: 'Kochi', location: 'cheranallur : volkswagen', type: 'location' },

    //kottayam

    { id: uuidv4(),  state: 'Kerala', district: 'Kottayam', location: 'ettumanoor : skoda service', type: 'location' },
    { id: uuidv4(), district: 'Kottayam', location: 'kottayam : railway station', type: 'location' },
    { id: uuidv4(), district: 'Kottayam', location: 'thellakom : volkswagen', type: 'location' },

    //trivandrum

    { id: uuidv4(), district: 'Trivandrum', location: 'Nh 66 bybass : kochuveli railway station', type: 'location' },
    { id: uuidv4(), district: 'Trivandrum', location: 'tampanur : central railway station', type: 'location' },
    { id: uuidv4(), district: 'Trivandrum', location: 'kazhakootam : railway station', type: 'location' },

    //thrissur
    { id: uuidv4(), district: 'Thrissur', location: 'thrissur : railway station', type: 'location' },
    { id: uuidv4(), district: 'Thrissur', location: 'valarkavu : near ganam theater', type: 'location' },
    { id: uuidv4(), district: 'Thrissur', location: 'paliyekara : evm mg', type: 'location' },
    

    //calicut
    { id:uuidv4() , district: 'Calicut', location: 'calicut : railway', type: 'location' },
    { id: uuidv4(), district: 'Calicut', location: 'calicut : airport', type: 'location' },
    { id: uuidv4(), district: 'Calicut', location: 'pavangad : evm nissan', type: 'location' },

    //bangalore
    { id: uuidv4(), state: 'Karnataka', district: 'Bangalore', location: 'majestic : railway station', type: 'location' },
    { id: uuidv4(), district: 'Bangalore', location: 'kempegowda : airport', type: 'location' },
    { id: uuidv4(), district: 'Bangalore', location: 'whitefield : evm service', type: 'location' },

    //mysore
    { id: uuidv4(), district: 'Mysore', location: 'mysore : railway station', type: 'location' },
    { id: uuidv4(), district: 'Mysore', location: 'hebbal : bus stand', type: 'location' },

    //chennai
    { id: uuidv4(), state: 'Tamil Nadu', district: 'Chennai', location: 'chennai central : railway station', type: 'location' },
    { id: uuidv4(), district: 'Chennai', location: 'chennai : airport', type: 'location' },
    { id: uuidv4(), district: 'Chennai', location: 'guindy : evm service', type: 'location' },

    //coimbatore
    { id: uuidv4(), district: 'Coimbatore', location: 'coimbatore : railway station', type: 'location' },
    { id: uuidv4(), district: 'Coimbatore', location: 'coimbatore : airport', type: 'location' },

    //mumbai
    { id: uuidv4(), state: 'Maharashtra', district: 'Mumbai', location: 'chhatrapati shivaji : railway station', type: 'location' },
    { id: uuidv4(), district: 'Mumbai', location: 'chhatrapati shivaji : airport', type: 'location' },
    { id: uuidv4(), district: 'Mumbai', location: 'andheri : evm service', type: 'location' },

    //pune
    { id: uuidv4(), district: 'Pune', location: 'pune : railway station', type: 'location' },
    { id: uuidv4(), district: 'Pune', location: 'pune : airport', type: 'location' },

    //delhi
    { id: uuidv4(), state: 'Delhi', district: 'New Delhi', location: 'new delhi : railway station', type: 'location' },
    { id: uuidv4(), district: 'New Delhi', location: 'indira gandhi : airport', type: 'location' },
    { id: uuidv4(), district: 'New Delhi', location: 'connaught place : evm service', type: 'location' },


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
  
  // Function to insert dummy data into the database
 export  async function insertDummyData() {
    try {
        // Insert the dummy data into the collection
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
  

  


