import { BrowserRouter, Route, Routes } from "react-router-dom";

import Privacy from "./pages/user/Privacy";
import Home from "./pages/user/Home";
import SignUp from "./pages/user/SignUp";
import SignIn from "./pages/user/SignIn";
import Vehicles from "./pages/user/Vehicles";
import Profile from "./pages/user/Profile";

import With_nav from "./components/Layout/WithNav";
import PrivateRoute from "./components/PrivateRoute";
import { PrivateSignin } from "./components/PrivateRoute";
import TermsAndConditions from "./pages/user/TermsAndConditions";

import AdminPrivateRoutes from "./components/AdminPrivateRoutes";
import Enterprise from "./pages/user/Enterprise";
import Contact from "./pages/user/Contact";

import VendorSignin from "./pages/vendor/pages/VendorSignin";
import VendorSignup from "./pages/vendor/pages/VendorSignup";
import VendorPrivateRoute from "./components/VendorPrivateRoute";
import VendorDashboard from "./pages/vendor/Dashboard/VendorDashboard";

import Layout from "./pages/admin/layouts/Layout";
import AdminDashNew from "./pages/admin/dashboard/AdminDashNew";

import VehicleDetails from "./pages/user/VehicleDetails";
import EditProductComponent from "./pages/admin/components/EditProductComponent";
import Orders from "./pages/user/Orders";
import AvailableVehicles from "./pages/user/AvailableVehiclesAfterSearch";

import VendorEditProductComponent from "./pages/vendor/Components/VendorEditProductComponent";
import VendorDeleteVehicleModal from "./pages/vendor/Components/VendorDeleteVehicleModal";

import CheckoutPage from "./pages/user/CheckoutPage";
import Razorpay from "./pages/user/Razorpay";
import AllVehiclesofSameModel from "./pages/user/AllVehiclesofSameModel";

import AddProductModal from "./pages/admin/components/AddProductModal";
import VendorAddProductModal from "./pages/vendor/Components/VendorAddVehilceModal";

import CarNotFound from "./pages/user/CarNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrong URL */}
        <Route path="*" element={<CarNotFound />} />

        {/* Pages with Navbar */}
        <Route element={<With_nav />}>
          <Route path="/" element={<Home />} />

          <Route path="/vehicles" element={<Vehicles />} />

          <Route path="/enterprise" element={<Enterprise />} />

          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Sign In / Sign Up */}
        <Route element={<PrivateSignin />}>
          <Route path="/signin" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/vendorSignin" element={<VendorSignin />} />

          <Route path="/vendorSignup" element={<VendorSignup />} />
        </Route>

        {/* User Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile/*" element={<Profile />} />

          <Route path="/allVariants" element={<AllVehiclesofSameModel />} />

          <Route path="/vehicleDetails" element={<VehicleDetails />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/availableVehicles" element={<AvailableVehicles />} />

          <Route path="/checkoutPage" element={<CheckoutPage />} />

          <Route path="/privacy-policy" element={<Privacy />} />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route path="/razorpay" element={<Razorpay />} />
        </Route>

        {/* Vendor Private Routes */}
        <Route element={<VendorPrivateRoute />}>
          <Route path="/vendorDashboard/*" element={<VendorDashboard />} />

          <Route
            path="/vendorDashboard/vendorEditProductComponent"
            element={<VendorEditProductComponent />}
          />

          <Route
            path="/vendorDashboard/vendorDeleteVehicleModal"
            element={<VendorDeleteVehicleModal />}
          />

          <Route
            path="/vendorDashboard/vendorAddProduct"
            element={<VendorAddProductModal />}
          />
        </Route>

        {/* Admin Private Routes */}
        <Route element={<AdminPrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/adminDashboard/*" element={<AdminDashNew />} />

            <Route
              path="/adminDashboard/editProducts"
              element={<EditProductComponent />}
            />

            <Route
              path="/adminDashboard/addProducts"
              element={<AddProductModal />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
