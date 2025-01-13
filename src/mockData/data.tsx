import { GridColDef } from "@mui/x-data-grid";
import EditBtn from "../components/editBtn";
import StatusSelector from "../components/statusSelector";

export const userColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5, // Smaller proportional width
    minWidth: 100, // Ensures it doesn't shrink too much
    filterable: true,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5, // Slightly more space for email
    minWidth: 200,
    filterable: true,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    minWidth: 120,
    filterable: true,
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 0.5,
    minWidth: 100,
    sortable: false, // No need to sort the action column
    filterable: false,
    renderCell: ({ row }) => {
      return <EditBtn to="/users/edituser" id={row.id} title="Edit" />;
    },
  },
];

export const bookingsColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
    minWidth: 100,
    filterable: true,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "end_date",
    headerName: "End Date",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    filterable: true,
    renderCell: ({ row }) => {
      return <StatusSelector id={row.id} status={row.status} />;
    },
  },
  {
    field: "property_id",
    headerName: "Property ID",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
  {
    field: "user_id",
    headerName: "User ID",
    flex: 1,
    minWidth: 150,
    filterable: true,
  },
];
