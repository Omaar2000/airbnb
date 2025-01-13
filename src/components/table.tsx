// image previewer
// add category
// make edit and add generic
import { useTheme } from "@emotion/react";
// import { tokens } from "../theme";

import { Box, Button, CircularProgress } from "@mui/material";
import {
  DataGrid,
  GridLogicOperator,
  GridOverlay,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Table = ({ to, rows, columns, setSelectedIDs, loading }: any) => {
  const [data, setRows] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setRows([...rows]);
  }, [rows]);

  const handleSelectionChange = (newSelection: any) => {
    console.log(newSelection);
    setSelectedIDs(newSelection);
    const selectedRowData = newSelection.map((id: any) =>
      data.find((row) => row.id === id)
    );
    setSelectedItems(selectedRowData);
    console.log(selectedItems);
  };

  return (
    <Box m="10px">
      <Box
        display="flex"
        justifyContent={
          selectedItems.length !== 0 || to !== "" ? "space-between" : "start"
        }
        mx="1rem"
      ></Box>
      <Box>
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rows={data}
          columns={columns}
          // pagination
          // paginationMode="server"
          // onFilterModelChange={handleFilterModelChange}
          onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
          loading={loading}
          sx={{
            height: "500px",
            direction: "ltr !important",
            textAlign: "start",
          }}
        />
        {/* <CustomFooter handlePageSizeChange={handlePageSizeChange} /> */}
      </Box>
    </Box>
  );
};

export default Table;
