import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { tokens } from "../../theme";
import React, { useRef, useState } from "react";
// import useUserStore from "../../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import useCrud from "../../hooks/useCRUD";
import { baseUrl } from "../../constants";
// import { useTranslation } from "react-i18next";
// import { ToastContainer } from "react-toastify";
// import { addItem, addMultipartItem } from "../../network/network";

const AddUserPage = () => {
  // const location = useLocation();

  const [imageError, setImageError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState(null);
  const [profile_image, setImage] = useState(null);
  const navigate = useNavigate();
  const { postMultipart, error, loading } = useCrud();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (!profile_image) {
      setImageError(true);
      return;
    }

    // Create a FormData instance
    const formData = new FormData();
    formData.append("profile_image", profile_image);
    formData.append("name", name || "");
    formData.append("email", email || "");
    formData.append("phone", phone || "");
    formData.append("role", role || "");

    console.log("FormData: ", formData);

    // Send FormData to the postMultipart function
    await postMultipart(`${baseUrl}/users`, formData);

    // Navigate on success
    setTimeout(() => {
      if (!error) navigate("/users");
    }, 500);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageError(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset the file input value
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{"Add User"}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} gap={"10px"}>
          <TextField
            label={"Name"}
            variant="outlined"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            fullWidth
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: red },
              "& .MuiInputLabel-root.Mui-focused": {
                color: red,
              },
            }}
          />
          <TextField
            label={"Phone"}
            variant="outlined"
            onChange={(e: any) => {
              setPhone(e.target.value);
            }}
            fullWidth
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: red },
              "& .MuiInputLabel-root.Mui-focused": {
                color: red,
              },
            }}
          />
          <TextField
            label={"Email"}
            variant="outlined"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            fullWidth
            required
            type="email"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: red },
              "& .MuiInputLabel-root.Mui-focused": {
                color: red,
              },
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
            sx={{
              mt: 0,
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: red },
              "& .MuiInputLabel-root.Mui-focused": {
                color: red,
              },
            }}
          >
            <InputLabel id="type-label">{"Role"}</InputLabel>

            <Select
              labelId="role-label"
              name="role"
              onChange={(e: any) => {
                setRole(e.target.value);
              }}
              required
              label="Role"
            >
              <MenuItem value="owner">{"owner"}</MenuItem>
              <MenuItem value="admin">{"admin"}</MenuItem>
              <MenuItem value="client">{"client"}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          // display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom="5rem"
        >
          <Box
            style={{}}
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            alignItems={"start"}
          >
            <input
              accept="image/png"
              id="contained-button-file"
              // multiple
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileRef}
            />
            {profile_image ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  mt: 2,
                  // position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(profile_image)}
                  alt="Preview"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "500px",
                    marginInlineStart: "2rem",
                  }}
                />
                <IconButton onClick={handleRemoveImage}>
                  <Close
                    sx={{
                      color: "red",
                      position: "absolute",
                      right: "-40%",
                      top: "-20%",
                      background: "white",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
                {/* <IconButton
                    // color="secondary"
                    // sx={{ position: "absolute", right: "-30%", top: "-20%" }}
                    ></IconButton> */}
              </Box>
            ) : imageError ? (
              <Typography marginInlineStart={"2rem"} color={"red"}>
                {"IMAGE IS REQUIRED*"}
              </Typography>
            ) : (
              <Typography marginInlineStart={"2rem"}>
                {"No Image Selected"}
              </Typography>
            )}
            <label aria-required htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="info"
                component="span"
                aria-required
                style={{ marginInlineStart: "2rem" }}
              >
                {"Upload Image"}
              </Button>
            </label>
          </Box>
          {/* /* Add more fields as necessary */}
        </Box>
        <Box
          sx={{
            background: red,
            position: "fixed",
            bottom: "0",
            display: "flex",
            justifyContent: "end",
          }}
          className="end-0"
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            style={{ fontSize: "15px" }}
            disabled={loading} // Disable the button while loading
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Loading" : "Save"}
          </Button>
        </Box>
      </form>
      {/* <ToastContainer position="top-center" autoClose="3000" /> */}
    </Box>
  );
};

export default AddUserPage;
