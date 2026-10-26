import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VehicleCard from "../../components/VehicleCard";
import { setVariants } from "../../redux/user/listAllVehicleSlice";
import { setFilteredData } from "../../redux/user/sortfilterSlice";
import CarNotFound from "./CarNotFound";

const AvailableVehiclesAfterSearch = () => {
  const { availableCars } = useSelector((state) => state.selectRideSlice);
  const { pickup_district, pickup_location, pickupDate, dropoffDate } =
    useSelector((state) => state.bookingDataSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showVarients = async (model) => {
    try {
      const datas = {
        pickUpDistrict: pickup_district,
        pickUpLocation: pickup_location,
        pickupDate: pickupDate.humanReadable,
        dropOffDate: dropoffDate.humanReadable,
        model,
      };
      const res = await fetch("/api/user/getVehiclesWithoutBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setVariants(data));
        dispatch(setFilteredData(data));
        navigate("/allVariants");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const visibleCars = (availableCars || []).filter(
    (vehicle) => vehicle.isDeleted === "false"
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      {visibleCars.length > 0 && (
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Available now
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 lg:text-3xl">
            Choose your ride
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Pick a model that fits your trip. You can view matching variants on
            the next step.
          </p>
        </header>
      )}

      {visibleCars.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCars.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              primaryLabel="Select"
              showSecondary={false}
              onPrimary={() => showVarients(vehicle.model)}
            />
          ))}
        </div>
      ) : (
        <CarNotFound />
      )}
    </main>
  );
};

export default AvailableVehiclesAfterSearch;
