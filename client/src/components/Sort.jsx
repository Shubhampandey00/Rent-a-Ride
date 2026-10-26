import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";

import {
  setData,
  setFilteredData,
  setPriceHightoLow,
  setPriceLowtoHigh,
  setYearAscending,
  setYearDecending,
} from "../redux/user/sortfilterSlice";

const Sort = () => {
  const { userAllVehicles, allVariants } = useSelector(
    (state) => state.userListVehicles
  );

  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      price: "",
      year: "",
    },
  });

  const handleInputChange = (e) => {
    if (e === "undefined") {
      dispatch(setData(userAllVehicles));
    } else if (e === "lowtohigh") {
      dispatch(setPriceLowtoHigh());
    } else if (e === "hightolow") {
      dispatch(setPriceHightoLow());
    } else if (e === "yearAscending") {
      dispatch(setYearAscending());
    } else if (e === "yearDecending") {
      dispatch(setYearDecending());
    }
  };

  useEffect(() => {
    if (!allVariants) {
      dispatch(setFilteredData(userAllVehicles));
    }
  }, []);

  // Dark mode styling for MUI TextField
  const textFieldSx = {
    m: 1,
    width: 150,

    "& .MuiInputBase-root": {
      color: "inherit",
    },

    "& .MuiInputLabel-root": {
      color: "inherit",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "currentColor",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#22c55e",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#22c55e",
    },

    "& .MuiSvgIcon-root": {
      color: "inherit",
    },
  };

  return (
    <div className="drop-shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-1 md:gap-3 md:justify-start mx-auto md:mx-[80px] lg:mx-0">

          {/* Price */}
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextField
                {...field}
                id="price"
                select
                label="Price"
                sx={textFieldSx}
                onChange={(event) => {
                  field.onChange(event);
                  handleInputChange(event.target.value);
                }}
                slotProps={{
                  select: {
                    MenuProps: {
                      PaperProps: {
                        className:
                          "dark:bg-gray-800 dark:text-white",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>

                <MenuItem value="lowtohigh">
                  Low to High
                </MenuItem>

                <MenuItem value="hightolow">
                  High to Low
                </MenuItem>
              </TextField>
            )}
          />

          {/* Year */}
          <Controller
            control={control}
            name="year"
            render={({ field }) => (
              <TextField
                {...field}
                id="year"
                select
                label="Year"
                sx={textFieldSx}
                onChange={(event) => {
                  field.onChange(event);
                  handleInputChange(event.target.value);
                }}
                slotProps={{
                  select: {
                    MenuProps: {
                      PaperProps: {
                        className:
                          "dark:bg-gray-800 dark:text-white",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>

                <MenuItem value="yearAscending">
                  Low to High
                </MenuItem>

                <MenuItem value="yearDecending">
                  High to Low
                </MenuItem>
              </TextField>
            )}
          />

        </div>
      </form>
    </div>
  );
};

export default Sort;