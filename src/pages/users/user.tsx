import { useEffect, useState } from "react";
import useCrud from "../../hooks/useCRUD";
import { userColumns } from "../../mockData/data";
import { Button, CircularProgress } from "@mui/material";
import Table from "../../components/table";
import { useNavigate } from "react-router";
import { baseUrl } from "../../constants";

const Users = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedIDs, setSelectedIDs] = useState<any[]>([]);
  const { data, get, loading: getLoading } = useCrud(); // Added del method from useCrud
  const { deleteItem, loading: deleteLoading } = useCrud(); // Added del method from useCrud
  const navigate = useNavigate();

  // Fetch users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await get(`${baseUrl}/users`);
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
          await deleteItem(`${baseUrl}/users/${id}`);
        })
      );

      // Remove deleted rows from the state
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedIDs.includes(row.id))
      );

      // Clear selected IDs
      setSelectedIDs([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <>
      <h1 style={{ margin: "2rem" }} className="text-2xl font-bold">
        {"Users"}
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
          onClick={() => navigate("/users/adduser")}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </div>
      <Table
        rows={rows}
        setSelectedIDs={setSelectedIDs}
        columns={userColumns}
        loading={getLoading}
      />
    </>
  );
};

export default Users;
