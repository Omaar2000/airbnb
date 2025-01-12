import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/users/user";
import Properties from "./pages/properties/properties";
import PropertyDetails from "./pages/property_details/propertyDetails";

import AddUserPage from "./pages/users/addUser";
import EditUserPage from "./pages/users/editUser";
import Bookings from "./pages/bookings/bookingsPage";
import AddBooking from "./pages/bookings/addBooking";
import AddPropertyPage from "./pages/properties/addProperty";
import Navbar from "./components/navBar";

// import { mockDataTeam, userColumns } from "./data/mockData";
// import useUserStore from "./stores/useUserStore";
// import Features from "./pages/features/Features";
// import BoatsRequests from "./pages/BoatsRequests";
// import BoatDetail from "./pages/BoatDetails";
// import Users from "./pages/users/Users"
function App() {
  return (
    <div style={{ transition: "all 2s" }}>
      <BrowserRouter>
        <Navbar />
        <div className="m-20">
          <Routes>
            {/* <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
              /> */}
            <Route path="users" element={<Users />} />
            <Route path="properties" element={<Properties />} />
            <Route
              path="properties/addproperty"
              element={<AddPropertyPage />}
            />
            <Route path="properties/:id" element={<PropertyDetails />} />
            {/* <Route
              path="properties/addproperty"
              element={<AddPropertyPage />}
            /> */}
            <Route path="users/adduser" element={<AddUserPage />} />
            <Route path="users/edituser/:id" element={<EditUserPage />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/addbooking" element={<AddBooking />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
