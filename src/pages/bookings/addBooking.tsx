import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { baseUrl } from "../../constants";
import useCrud from "../../hooks/useCRUD";

const AddBooking = () => {
  const [propertyId, setPropertyId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { post, loading } = useCrud();
  const { get: getUser, data: user } = useCrud();
  const { get: getProperty, data: property } = useCrud();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch property details using the get method
      await getProperty(`${baseUrl}/properties/${propertyId}`);
      if (!property) {
        throw new Error("Failed to fetch property details");
      }

      // Fetch user details using the get method
      await getUser(`${baseUrl}/users/${userId}`);
      if (!user) {
        throw new Error("Failed to fetch user details");
      }

      // Construct the booking data object
      const bookingData = {
        property_id: propertyId,
        user_id: userId,
        status,
        start_date: startDate,
        end_date: endDate,
        property, // Add fetched property details
        user, // Add fetched user details
      };

      console.log("Booking Data: ", bookingData);

      // Make the POST request to save the booking
      await post(`${baseUrl}/bookings`, bookingData);
      alert("Booking saved successfully!");
    } catch (error) {
      console.error("Error: ", error);
      alert("An error occurred while saving the booking.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Add Booking
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Property ID"
            variant="outlined"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="canceled">Canceled</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            required
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Saving..." : "Save Booking"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddBooking;
