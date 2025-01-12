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
import { useNavigate } from "react-router-dom";
// import useUserStore from "../stores/useUserStore";
// import "./layout/style.css";
// import CustomFooter from "./Pagination.jsx";
// import usePaginationStore from "../stores/usePaginationStore.js";
// import {deleteItem } from "../network/network.js";

const Table = ({ to, rows, columns, setSelectedIDs, loading }: any) => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const [data, setRows] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterValues, setFilterValues] = useState(null);

  // const { page, setPageSize, setPage } = usePaginationStore();

  useEffect(() => {
    setRows([...rows]);
  }, [rows]);

  // const { token, logout } = useUserStore();

  // const handleDelete = async () => {
  //   selectedItems.map(async (row) => {
  //     try {
  //       await deleteItem(token, logout, Endpoint + row.id);
  //       setPage(page);
  //       setRows(data.filter((row) => !selectedItems.includes(row)) || []);
  //     } catch (error) {
  //       console.error("error");
  //     }
  //   });
  // };
  const handleSelectionChange = (newSelection: any) => {
    console.log(newSelection);
    setSelectedIDs(newSelection);
    const selectedRowData = newSelection.map((id: any) =>
      data.find((row) => row.id === id)
    );
    setSelectedItems(selectedRowData);
    console.log(selectedItems);
  };

  // const handleFilterModelChange = (model: any) => {
  //   // Extract and store filter values
  //   setFilterValues(model.filters);
  //   console.log("Filter values:", model);
  //   // You can now use filterValues in your application logic
  // };

  // // const handlePageSizeChange = (newPageSize) => {
  // //   setPageSize(newPageSize);
  // //   setPage(1); // Reset to the first page whenever the page size changes
  // // };

  return (
    <Box m="10px">
      <Box
        display="flex"
        justifyContent={
          selectedItems.length !== 0 || to !== "" ? "space-between" : "start"
        }
        mx="1rem"
      >
        {/* <SearchBar /> */}
      </Box>
      <Box
      // m={selectedItems.length === 0 && "54px 0 0 0"}
      // height="85vh"
      // sx={{
      // maxHeight: "10px",
      // maxWidth="100%"
      // sx={{
      //   height: "74vh",
      //   "& .MuiDataGrid-root": {
      //     border: "none",
      //   },
      //   "& .MuiDataGrid-cell": {
      //     borderBottom: "none",
      //   },
      //   // "& .name-column--cell": {
      //   //   color: colors.greenAccent[300],
      //   //   // textAlign: "start !important",
      //   // },
      //   // "& .MuiDataGrid-headerContainer": {
      //   //   backgroundColor: colors.blueAccent[700],
      //   //   borderBottom: "none",
      //   // },
      //   // "& .MuiDataGrid-virtualScroller": {
      //   //   backgroundColor: `${colors.primary[400]} !important`,
      //   // },
      //   // ".MuiDataGrid-footerContainer": {
      //   //   display: "none",
      //   //   // marginTop: "200px",
      //   //   backgroundColor: colors.blueAccent[700],
      //   // },
      //   // "& .MuiCheckbox-root": {
      //   //   color: `${colors.primary[200]} !important`,
      //   // },
      //   "& .MuiDataGrid-overlay ": {
      //     // color: `${colors.greenAccent[200]} !important`,
      //     // height: "1px",
      //     // display: "block",
      //     margin: "100px 0",
      //     // justifyContent: "center",
      //     // alignItems: "center",
      //     // overflow: "hidden",
      //   },
      // }}
      >
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
          sx={{ direction: "ltr !important", textAlign: "start" }}
        />
        {/* <CustomFooter handlePageSizeChange={handlePageSizeChange} /> */}
      </Box>
    </Box>
  );
};

export default Table;
