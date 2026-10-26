import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiGearStickPattern } from "react-icons/gi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import fallbackCarOne from "../Assets/vehicleModel1.png";
import fallbackCarTwo from "../Assets/vehicleModel3.png";
import fallbackCarThree from "../Assets/vehicleModel5.png";

const fallbackImages = [fallbackCarOne, fallbackCarTwo, fallbackCarThree];

const getFallbackImage = (vehicle) => {
  const vehicleName = `${vehicle.name || ""} ${vehicle.model || ""} ${vehicle.company || ""}`.toLowerCase();

  if (vehicleName.includes("alto") || vehicleName.includes("maruti")) {
    return fallbackCarOne;
  }

  if (vehicleName.includes("skoda") || vehicleName.includes("kushaq")) {
    return fallbackCarTwo;
  }

  if (vehicleName.includes("mg") || vehicleName.includes("hector")) {
    return fallbackCarThree;
  }

  if (vehicle.car_type?.toLowerCase() === "sedan") {
    return fallbackCarOne;
  }

  if (vehicle.car_type?.toLowerCase() === "suv") {
    return fallbackCarTwo;
  }

  return fallbackImages[0];
};

const formatText = (value, fallback = "N/A") => {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
};

const VehicleCard = ({
  vehicle,
  primaryLabel = "Book Ride",
  secondaryLabel = "Details",
  onPrimary,
  onSecondary,
  showSecondary = true,
}) => {
  if (!vehicle) return null;

  const title = vehicle.name || vehicle.model || "Vehicle";
  const subtitle = [vehicle.company, vehicle.model].filter(Boolean).join(" ");
  const imageUrl = vehicle.image?.[0];
  const hasUsableImage = imageUrl && !imageUrl.includes("placehold.co");
  const image = hasUsableImage ? imageUrl : getFallbackImage(vehicle);

  return (
    <article className="group flex h-full w-full max-w-[340px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center bg-slate-50 p-4">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
        {vehicle.car_type && (
          <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm">
            {vehicle.car_type}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold capitalize text-slate-950">
              {title}
            </h2>
            <p className="mt-1 line-clamp-1 text-sm capitalize text-slate-500">
              {subtitle || vehicle.car_title || "Ready to ride"}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="flex items-center justify-end text-lg font-bold text-slate-950">
              <FaIndianRupeeSign className="h-3.5 w-3.5" />
              {formatText(vehicle.price, "--")}
            </p>
            <p className="text-xs text-slate-500">per day</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 capitalize">
            <MdAirlineSeatReclineNormal className="text-slate-900" />
            {formatText(vehicle.seats)} seats
          </span>
          <span className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 capitalize">
            <BsFillFuelPumpFill className="text-slate-900" />
            {formatText(vehicle.fuel_type)}
          </span>
          <span className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 capitalize">
            <GiGearStickPattern className="text-slate-900" />
            {formatText(vehicle.transmition)}
          </span>
          <span className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 capitalize">
            <FaCarSide className="text-slate-900" />
            {formatText(vehicle.company)}
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-5">
          <button
            type="button"
            onClick={onPrimary}
            className="flex min-h-10 flex-1 items-center justify-center rounded-md bg-emerald-500 px-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            {primaryLabel}
          </button>
          {showSecondary && (
            <button
              type="button"
              onClick={onSecondary || onPrimary}
              className="flex min-h-10 flex-1 items-center justify-center rounded-md bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default VehicleCard;
