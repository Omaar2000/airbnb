import { useEffect, useState } from "react";
import useCrud from "../../hooks/useCRUD";
import { bookingsColumns } from "../../mockData/data";
import { Button, CircularProgress } from "@mui/material";
import Table from "../../components/table";
import { useNavigate } from "react-router";
import { baseUrl } from "../../constants";

const Bookings = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedIDs, setSelectedIDs] = useState<any[]>([]);
  const { data, get, loading: getLoading } = useCrud(); // Added del method from useCrud
  const { deleteItem, loading: deleteLoading } = useCrud(); // Added del method from useCrud
  const navigate = useNavigate();

  // Fetch users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await get(`${baseUrl}/bookings`);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  // Update rows when data changes
  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  // Handle delete functionality
  const handleDelete = async () => {
    try {
      // Perform delete requests for all selected IDs
      await Promise.all(
        selectedIDs.map(async (id) => {
          await deleteItem(`${baseUrl}/bookings/${id}`);
        })
      );

      // Remove deleted rows from the state
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedIDs.includes(row.id))
      );

      // Clear selected IDs
      setSelectedIDs([]);
    } catch (error) {
      console.error("Error deleting bookings:", error);
    }
  };

  return (
    <>
      <h1 style={{ margin: "2rem" }} className="text-2xl font-bold">
        {"Bookings"}
      </h1>

      <div className="flex justify-end gap-3">
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          startIcon={
            deleteLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
          disabled={selectedIDs.length === 0} // Disable button if no IDs are selected
        >
          Delete
        </Button>
        <Button
          onClick={() => navigate("/bookings/addbooking")}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </div>
      <Table
        rows={rows}
        setSelectedIDs={setSelectedIDs}
        columns={bookingsColumns}
        loading={getLoading}
      />
    </>
  );
};

export default Bookings;
