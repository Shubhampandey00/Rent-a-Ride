import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import Header from "../../components/Header";
import Sort from "../../components/Sort";
import VehicleCard from "../../components/VehicleCard";
import { setVariantModeOrNot } from "../../redux/user/sortfilterSlice";
import CarNotFound from "./CarNotFound";
import { onVehicleDetail } from "./Vehicles";

const AllVehiclesofSameModel = () => {
  const { allVariants } = useSelector((state) => state.userListVehicles);
  const { filterdData } = useSelector((state) => state.sortfilterSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (allVariants) {
      dispatch(setVariantModeOrNot(true));
    }
  }, [allVariants, dispatch]);

  const vehicles = useMemo(() => {
    const source =
      filterdData && filterdData.length > 0 ? filterdData : allVariants || [];
    return source.filter((vehicle) => vehicle.isDeleted === "false");
  }, [allVariants, filterdData]);

  return (
    <>
      <Header />
      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-12 lg:px-8">
        <aside className="lg:col-span-3">
          <div className="sticky top-6 rounded-lg border border-slate-200 bg-white shadow-sm">
            <Filter />
          </div>
        </aside>

        <section className="lg:col-span-9">
          <div className="rounded-lg border border-slate-200 bg-white/90 shadow-sm backdrop-blur">
            <Sort />
          </div>

          {vehicles.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onPrimary={() =>
                    onVehicleDetail(vehicle._id, dispatch, navigate)
                  }
                  onSecondary={() =>
                    onVehicleDetail(vehicle._id, dispatch, navigate)
                  }
                />
              ))}
            </div>
          ) : allVariants && allVariants.length > 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h2 className="text-lg font-bold text-slate-950">
                No matching variants
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Try changing the filters to see more available cars.
              </p>
            </div>
          ) : (
            <CarNotFound />
          )}
        </section>
      </main>
    </>
  );
};

export default AllVehiclesofSameModel;
