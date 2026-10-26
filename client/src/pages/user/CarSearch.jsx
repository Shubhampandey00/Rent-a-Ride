import {
  IconCalendarEvent,
  IconMapPinFilled,
  IconX,
} from "@tabler/icons-react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

import {
  setAvailableCars,
  setDistrictsOfState,
  setLocationsOfDistrict,
  setSelectedDistrict,
  setSelectedState,
} from "../../redux/user/selectRideSlice";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { setSelectedData } from "../../redux/user/BookingDataSlice";

import dayjs from "dayjs";
import useFetchLocationsLov from "../../hooks/useFetchLocationsLov";


/* =========================================================
   FORM VALIDATION
   ========================================================= */

const schema = z.object({
  dropoff_location: z
    .string()
    .min(1, { message: "Dropoff location needed" }),

  pickup_state: z
    .string()
    .min(1, { message: "Pickup State needed" }),

  pickup_district: z
    .string()
    .min(1, { message: "Pickup District needed" }),

  pickup_location: z
    .string()
    .min(1, { message: "Pickup Location needed" }),

  pickuptime: z.object({
    $d: z.instanceof(Date).refine(
      (date) => date !== null && date !== undefined,
      {
        message: "Date is not selected",
      }
    ),
  }),

  dropofftime: z.object(
    {
      $L: z.string(),
      $d: z.date(),
      $y: z.number(),
      $M: z.number(),
      $D: z.number(),
      $W: z.number(),
      $H: z.number(),
      $m: z.number(),
      $s: z.number(),
      $ms: z.number(),
      $isDayjsObject: z.boolean(),
    },
    {
      message: "drop-off time is required",
    }
  ),
});


/* =========================================================
   COMPONENT
   ========================================================= */

const CarSearch = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      pickup_state: "",
      pickup_district: "",
      pickup_location: "",
      dropoff_location: "",
      pickuptime: null,
      dropofftime: null,
    },
  });

  const navigate = useNavigate();

  /* =========================================================
     LOCATION DATA
     ========================================================= */

  const { stateData } = useSelector(
    (state) => state.modelDataSlice
  );

  const { fetchLov, isLoading } = useFetchLocationsLov();

  useEffect(() => {
    fetchLov();
  }, []);

  const uniqueState = [...new Set(
    (stateData || [])
      .filter((state) => typeof state === "string")
      .map((state) => state.trim())
      .filter(Boolean)
  )];


  const {
    selectedState,
    districtsOfState,
    selectedDistrict,
    wholeData,
    locationsOfDistrict,
  } = useSelector((state) => state.selectRideSlice);


  const [pickup, setPickup] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();


  /* =========================================================
     DISTRICTS BASED ON STATE
     ========================================================= */

  useEffect(() => {
    if (selectedState !== null && wholeData) {
      const filteredDistricts = wholeData
        .filter((cur) => cur.state === selectedState)
        .map((cur) => cur.district);

      const uniqueDistrictsOfState =
        filteredDistricts.filter((cur, idx) => {
          return filteredDistricts.indexOf(cur) === idx;
        });

      dispatch(
        setDistrictsOfState(uniqueDistrictsOfState)
      );
    }
  }, [selectedState, wholeData, dispatch]);


  /* =========================================================
     LOCATIONS BASED ON DISTRICT
     ========================================================= */

  useEffect(() => {
    if (selectedDistrict !== null && wholeData) {
      const filtered = wholeData.filter(
        (cur) => cur.district === selectedDistrict
      );

      const showLocationInDistrict = filtered.map(
        (cur) => cur.location
      );

      dispatch(
        setLocationsOfDistrict(showLocationInDistrict)
      );
    }
  }, [selectedDistrict, wholeData, dispatch]);


  /* =========================================================
     SEARCH CARS
     ========================================================= */

  const hanldeData = async (data) => {
    try {
      if (data) {
        dispatch(setSelectedData(data));

        const pickupDate = data.pickuptime.$d;
        const dropOffDate = data.dropofftime.$d;

        const datas = {
          pickupDate,
          dropOffDate,
          pickUpDistrict: data.pickup_district,
          pickUpLocation: data.pickup_location,
        };

        const res = await fetch(
          "api/user/showSingleofSameModel",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(datas),
          }
        );

        if (!res.ok) {
          const data = await res.json();

          setError(data.message);

          return;
        }

        if (res.ok) {
          const result = await res.json();

          dispatch(setAvailableCars(result));

          navigate("/availableVehicles");
        }

        if (res.ok) {
          reset({
            pickuptime: null,
            dropofftime: null,
          });

          const pickupDistrictElement =
            document.getElementById("pickup_district");

          const pickupLocationElement =
            document.getElementById("pickup_location");

          const dropoffLocationElement =
            document.getElementById("dropoff_location");

          if (pickupDistrictElement) {
            pickupDistrictElement.innerHTML = "";
          }

          if (pickupLocationElement) {
            pickupLocationElement.innerHTML = "";
          }

          if (dropoffLocationElement) {
            dropoffLocationElement.innerHTML = "";
          }
        }
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };


  const oneDayGap =
    pickup && pickup.add(1, "day");


  /* =========================================================
     MUI TEXT FIELD DARK MODE
     ========================================================= */

  const textFieldSx = {
    width: "100%",

    "& .MuiInputBase-root": {
      color: "inherit",
    },

    "& .MuiInputBase-input": {
      color: "inherit",
    },

    "& .MuiInputLabel-root": {
      color: "inherit",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#22c55e",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "currentColor",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#22c55e",
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#22c55e",
      },

    "& .MuiSvgIcon-root": {
      color: "inherit",
    },
  };


  /* =========================================================
     MENU PROPS
     ========================================================= */

  const menuProps = {
    PaperProps: {
      className:
        "bg-white text-black dark:bg-gray-800 dark:text-white",
    },
  };


  return (
    <>
      <section
        id="booking-section"
        className="
          book-section
          relative
          z-10
          mt-[50px]
          mx-auto
          max-w-[1500px]

          bg-white
          dark:bg-gray-950

          text-black
          dark:text-white

          transition-colors
          duration-300
        "
      >

        <div
          className="
            container

            bg-white
            dark:bg-gray-900

            text-black
            dark:text-white

            transition-colors
            duration-300
          "
        >

          <div className="book-content">

            <div className="book-content__box">

              {/* HEADING */}

              <h2 className="text-black dark:text-white">
                Book a car
              </h2>


              {/* ERROR MESSAGE */}

              <p className="error-message">
                All fields required!

                <IconX
                  width={20}
                  height={20}
                />
              </p>


              {/* BOOKING DONE */}

              <p className="booking-done">
                Check your email to confirm an order.

                <IconX
                  width={20}
                  height={20}
                />
              </p>


              <form
                onSubmit={handleSubmit(hanldeData)}
              >

                <div className="box-form">


                  {/* =================================================
                      PICKUP STATE
                  ================================================= */}

                  <div className="box-form__car-type">

                    <label
                      htmlFor="pickup_state"
                      className="
                        text-black
                        dark:text-white
                      "
                    >
                      <IconMapPinFilled className="input-icon" />

                      &nbsp; Pick-up State

                      <p className="text-red-500">
                        *
                      </p>
                    </label>


                    <Controller
                      name="pickup_state"
                      control={control}

                      render={({ field }) => (

                        <TextField
                          {...field}

                          id="pickup_state"

                          select

                          error={Boolean(
                            errors.pickup_state
                          )}

                          onChange={(e) => {

                            field.onChange(
                              e.target.value
                            );

                            dispatch(
                              setSelectedState(
                                e.target.value
                              )
                            );

                            setValue(
                              "pickup_district",
                              ""
                            );

                            setValue(
                              "pickup_location",
                              ""
                            );

                            dispatch(
                              setSelectedDistrict(
                                null
                              )
                            );

                            dispatch(
                              setLocationsOfDistrict(
                                null
                              )
                            );
                          }}

                          sx={textFieldSx}

                          slotProps={{
                            select: {
                              MenuProps: menuProps,
                            },
                          }}
                        >

                          {isLoading && (
                            <MenuItem value="">
                              Loading...
                            </MenuItem>
                          )}

                          {!isLoading && (
                            <MenuItem value="">
                              Select a State
                            </MenuItem>
                          )}

                          {uniqueState?.map(
                            (cur, idx) => (

                              <MenuItem
                                value={cur}
                                key={idx}
                              >
                                {cur}
                              </MenuItem>

                            )
                          )}

                        </TextField>

                      )}
                    />


                    {errors.pickup_state && (
                      <p className="text-red-500">
                        {errors.pickup_state.message}
                      </p>
                    )}

                  </div>


                  {/* =================================================
                      PICKUP DISTRICT
                  ================================================= */}

                  <div className="box-form__car-type">

                    <label
                      htmlFor="pickup_district"
                      className="
                        text-black
                        dark:text-white
                      "
                    >

                      <IconMapPinFilled className="input-icon" />

                      &nbsp; Pick-up District

                      <p className="text-red-500">
                        *
                      </p>

                    </label>


                    <Controller
                      name="pickup_district"
                      control={control}

                      render={({ field }) => (

                        <TextField
                          {...field}

                          id="pickup_district"

                          select

                          disabled={!selectedState}

                          error={Boolean(
                            errors.pickup_district
                          )}

                          onChange={(e) => {

                            field.onChange(
                              e.target.value
                            );

                            dispatch(
                              setSelectedDistrict(
                                e.target.value
                              )
                            );
                          }}

                          sx={textFieldSx}

                          slotProps={{
                            select: {
                              MenuProps: menuProps,
                            },
                          }}
                        >

                          {!isLoading && (
                            <MenuItem value="">
                              Select a District
                            </MenuItem>
                          )}

                          {districtsOfState?.map(
                            (cur, idx) => (

                              <MenuItem
                                value={cur}
                                key={idx}
                              >
                                {cur}
                              </MenuItem>

                            )
                          )}

                        </TextField>

                      )}
                    />


                    {errors.pickup_district && (
                      <p className="text-red-500">
                        {
                          errors
                            .pickup_district
                            .message
                        }
                      </p>
                    )}

                  </div>


                  {/* =================================================
                      PICKUP LOCATION
                  ================================================= */}

                  <div className="box-form__car-type">

                    <label
                      htmlFor="pickup_location"
                      className="
                        text-black
                        dark:text-white
                      "
                    >

                      <IconMapPinFilled className="input-icon" />

                      &nbsp; Pick-up Location

                      <p className="text-red-500">
                        *
                      </p>

                    </label>


                    <Controller
                      name="pickup_location"
                      control={control}

                      render={({ field }) => (

                        <TextField
                          {...field}

                          id="pickup_location"

                          select

                          disabled={!selectedDistrict}

                          error={Boolean(
                            errors.pickup_location
                          )}

                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                            )
                          }

                          sx={textFieldSx}

                          slotProps={{
                            select: {
                              MenuProps: menuProps,
                            },
                          }}
                        >

                          {!isLoading && (
                            <MenuItem value="">
                              Select a specific location
                            </MenuItem>
                          )}

                          {locationsOfDistrict &&
                            locationsOfDistrict.map(
                              (
                                availableLocations,
                                idx
                              ) => (

                                <MenuItem
                                  value={
                                    availableLocations
                                  }
                                  key={idx}
                                >
                                  {
                                    availableLocations
                                  }
                                </MenuItem>

                              )
                            )}

                        </TextField>

                      )}
                    />


                    {errors.pickup_location && (
                      <p className="text-red-500">
                        {
                          errors
                            .pickup_location
                            .message
                        }
                      </p>
                    )}

                  </div>


                  {/* =================================================
                      DROPOFF LOCATION
                  ================================================= */}

                  <div className="box-form__car-type">

                    <label
                      htmlFor="dropoff_location"
                      className="
                        text-black
                        dark:text-white
                      "
                    >

                      <IconMapPinFilled className="input-icon" />

                      &nbsp; Drop-off Location

                      <p className="text-red-500">
                        *
                      </p>

                    </label>


                    <Controller
                      name="dropoff_location"
                      control={control}

                      render={({ field }) => (

                        <TextField
                          {...field}

                          select

                          id="dropoff_location"

                          error={Boolean(
                            errors.dropoff_location
                          )}

                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                            )
                          }

                          sx={textFieldSx}

                          slotProps={{
                            select: {
                              MenuProps: menuProps,
                            },
                          }}
                        >

                          {!isLoading && (
                            <MenuItem value="">
                              Select a specific location
                            </MenuItem>
                          )}

                          {locationsOfDistrict &&
                            locationsOfDistrict.map(
                              (
                                availableLocations,
                                idx
                              ) => (

                                <MenuItem
                                  value={
                                    availableLocations
                                  }
                                  key={idx}
                                >
                                  {
                                    availableLocations
                                  }
                                </MenuItem>

                              )
                            )}

                        </TextField>

                      )}
                    />


                    {errors.dropoff_location && (
                      <p className="text-red-500">
                        {
                          errors
                            .dropoff_location
                            .message
                        }
                      </p>
                    )}

                  </div>


                  {/* =================================================
                      PICKUP DATE
                  ================================================= */}

                  <div className="box-form__car-time">

                    <label
                      htmlFor="picktime"
                      className="
                        flex
                        items-center
                        text-black
                        dark:text-white
                      "
                    >

                      <IconCalendarEvent className="input-icon" />

                      &nbsp; Pick-up Date

                      <p className="text-red-500">
                        *
                      </p>

                    </label>


                    <Controller
                      name="pickuptime"
                      control={control}

                      render={({ field }) => (

                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                        >

                          <DemoContainer
                            components={[
                              "DateTimePicker",
                            ]}
                          >

                            <DateTimePicker
                              label="Pickup time"

                              {...field}

                              value={field.value}

                              minDate={dayjs()}

                              onChange={(newValue) => {

                                field.onChange(
                                  newValue
                                );

                                setPickup(
                                  newValue
                                );
                              }}

                              slotProps={{
                                textField: {
                                  sx: textFieldSx,
                                },

                                popper: {
                                  className:
                                    "dark-mode-picker",
                                },
                              }}
                            />

                          </DemoContainer>

                        </LocalizationProvider>

                      )}
                    />


                    {errors.pickuptime && (
                      <p className="text-red-500">
                        {
                          errors
                            .pickuptime
                            .message
                        }
                      </p>
                    )}

                  </div>


                  {/* =================================================
                      DROPOFF DATE
                  ================================================= */}

                  <div className="box-form__car-time">

                    <label
                      htmlFor="droptime"
                      className="
                        flex
                        items-center
                        text-black
                        dark:text-white
                      "
                    >

                      <IconCalendarEvent className="input-icon" />

                      &nbsp; Drop-off Date

                      <p className="text-red-500">
                        *
                      </p>

                    </label>


                    <Controller
                      name="dropofftime"
                      control={control}

                      render={({ field }) => (

                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                        >

                          <DemoContainer
                            components={[
                              "DateTimePicker",
                            ]}
                          >

                            <DateTimePicker
                              label="Dropoff time"

                              {...field}

                              value={field.value}

                              minDate={
                                pickup
                                  ? oneDayGap
                                  : dayjs()
                              }

                              slotProps={{
                                textField: {
                                  sx: textFieldSx,
                                },

                                popper: {
                                  className:
                                    "dark-mode-picker",
                                },
                              }}
                            />

                          </DemoContainer>

                        </LocalizationProvider>

                      )}
                    />


                    {errors.dropofftime && (
                      <p className="text-red-500">
                        {
                          errors
                            .dropofftime
                            .message
                        }
                      </p>
                    )}


                    {error && (
                      <p className="text-[8px] text-red-500">
                        {error}
                      </p>
                    )}

                  </div>


                  {/* =================================================
                      SEARCH BUTTON
                  ================================================= */}

                  <button
                    type="submit"
                    className="
                      book-content__box_button
                      transition-colors
                      duration-300
                    "
                  >
                    Search
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default CarSearch;
