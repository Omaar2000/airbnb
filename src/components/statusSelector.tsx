import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useCrud from "../hooks/useCRUD";
import { baseUrl } from "../constants";

const StatusSelector = ({
  id,
  status: initialStatus,
}: {
  id: string;
  status: string;
}) => {
  const [status, setStatus] = useState(initialStatus);
  const { post, error, loading } = useCrud(); // Custom hook for CRUD operations

  const handleRoleChange = async (newStatus: string) => {
    setStatus(newStatus);
    // API call to update status
    const response = await post(`${baseUrl}/bookings/${id}/status`, {
      status: newStatus,
    });
    console.log("Status updated successfully:", response);
  };

  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{
        mt: 0,
        mb: 2,
      }}
    >
      <InputLabel id="type-label">{"Status"}</InputLabel>
      <Select
        labelId="status-label"
        name="status"
        value={status}
        onChange={(e: any) => handleRoleChange(e.target.value)}
        required
        label="Status"
        disabled={loading} // Disable dropdown while the request is loading
      >
        <MenuItem value="canceled">{"canceled"}</MenuItem>
        <MenuItem value="pending">{"pending"}</MenuItem>
        <MenuItem value="confirmed">{"confirmed"}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatusSelector;
