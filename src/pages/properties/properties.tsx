import { useEffect, useState } from "react";
import useCrud from "../../hooks/useCRUD";
import { Button } from "@mui/material";
import { Card } from "../../components/propertiesCard";
import { useNavigate } from "react-router";

const Properties = () => {
  const [rows, setRows] = useState<any[]>([]);
  const { data, get, loading } = useCrud();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get(`https://test.catalystegy.com/api/properties`);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setRows(data);
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button
          // Add functionality for the Add button
          onClick={() => navigate("/properties/addproperty")}
          variant="contained"
          color="success"
          className=""
        >
          Add a Property
        </Button>
      </div>
      {/* <Table rows={rows} columns={userColumns} loading={loading} /> */}
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {rows.map((row) => (
          <Card key={row.id} {...row} />
        ))}
      </div>
    </>
  );
};

export default Properties;
