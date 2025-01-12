import { GridColDef } from "@mui/x-data-grid";
import EditBtn from "../components/editBtn";
import StatusSelector from "../components/statusSelector";

export const userColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1, // Allows the column to resize proportionally
    filterable: true, // Enables filtering
    // Uses the default filter operators for text fields
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    filterable: true, // Enables filtering
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
    filterable: true,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    filterable: true,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    filterable: true,
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 1,
    filterable: true,
    renderCell: ({ row }) => {
      return <EditBtn to="/users/edituser" id={row.id} title="Edit" />;
    },
  },
];
export const bookingsColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1, // Allows the column to resize proportionally
    filterable: true, // Enables filtering
    // Uses the default filter operators for text fields
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 1,
    filterable: true, // Enables filtering
  },
  {
    field: "end_date",
    headerName: "End Date",
    flex: 1,
    filterable: true, // Enables filtering
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    filterable: true, // Enables filtering
    renderCell: ({ row }) => {
      return <StatusSelector id={row.id} status={row.status} />;
    },
  },
  {
    field: "property_id",
    headerName: "Property ID",
    flex: 1,
    filterable: true,
  },
  {
    field: "user_id",
    headerName: "User ID",
    flex: 1,
    filterable: true,
  },
  // {
  //   field: "edit",
  //   headerName: "Edit",
  //   flex: 1,
  //   filterable: true,
  //   renderCell: ({ row }) => {
  //     return <EditBtn to="/users/edituser" id={row.id} title="Edit" />;
  //   },
  // },
];
