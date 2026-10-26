import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import Footers from "../../components/Footer";
import Sort from "../../components/Sort";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import VehicleCard from "../../components/VehicleCard";

import {
  setVariants,
  setVehicleDetail,
  showVehicles,
} from "../../redux/user/listAllVehicleSlice";

import { signOut } from "../../redux/user/userSlice";

export const onVehicleDetail = async (id, dispatch, navigate) => {
  try {
    const res = await fetch("/api/user/showVehicleDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.statusCode === 401 || data.statusCode === 403) {
      dispatch(signOut());
      return;
    }

    dispatch(setVehicleDetail(data));
    navigate("/vehicleDetails");
  } catch (error) {
    console.log(error);
  }
};

const Vehicles = () => {
  const { userAllVehicles } = useSelector(
    (state) => state.userListVehicles
  );

  const { data, filterdData } = useSelector(
    (state) => state.sortfilterSlice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL =
    import.meta.env.VITE_PRODUCTION_BACKEND_URL || "";

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(setVariants(null));

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/user/listAllVehicles`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken},${accessToken}`,
            },
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          dispatch(showVehicles(data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    BASE_URL,
    accessToken,
    data,
    dispatch,
    refreshToken,
  ]);

  const vehicles = useMemo(() => {
    const source =
      filterdData && filterdData.length > 0
        ? filterdData
        : userAllVehicles;

    return (source || []).filter(
      (vehicle) =>
        vehicle.isDeleted === "false" &&
        vehicle.isAdminApproved
    );
  }, [filterdData, userAllVehicles]);

  return (
    <>
      <main
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-6
          px-4
          py-8
          lg:grid-cols-12
          lg:px-8

          bg-white
          dark:bg-gray-950

          text-black
          dark:text-white

          transition-colors
          duration-300
        "
      >
        {/* Filter */}
        <aside className="lg:col-span-3">
          <div
            className="
              sticky
              top-6
              rounded-lg
              border
              border-slate-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-900
              shadow-sm
              transition-colors
              duration-300
            "
          >
            <Filter />
          </div>
        </aside>

        {/* Vehicles */}
        <section className="lg:col-span-9">
          {/* Sort */}
          <div
            className="
              rounded-lg
              border
              border-slate-200
              dark:border-gray-700
              bg-white/90
              dark:bg-gray-900/90
              shadow-sm
              backdrop-blur
              transition-colors
              duration-300
            "
          >
            <Sort />
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="mt-6">
              <SkeletonLoader />
            </div>
          ) : vehicles.length > 0 ? (
            /* Vehicle Cards */
            <div
              className="
                mt-6
                grid
                grid-cols-1
                justify-items-center
                gap-5
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onPrimary={() =>
                    onVehicleDetail(
                      vehicle._id,
                      dispatch,
                      navigate
                    )
                  }
                  onSecondary={() =>
                    onVehicleDetail(
                      vehicle._id,
                      dispatch,
                      navigate
                    )
                  }
                />
              ))}
            </div>
          ) : (
            /* No Vehicles */
            <div
              className="
                mt-10
                rounded-lg
                border
                border-dashed
                border-slate-300
                dark:border-gray-700
                bg-slate-50
                dark:bg-gray-900
                px-6
                py-12
                text-center
                transition-colors
                duration-300
              "
            >
              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-950
                  dark:text-white
                "
              >
                No vehicles found
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                  dark:text-gray-400
                "
              >
                Try changing your filters or search for another
                location.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footers />
    </>
  );
};

export default Vehicles;