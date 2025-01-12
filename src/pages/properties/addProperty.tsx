import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import useCrud from "../../hooks/useCRUD";
import { baseUrl } from "../../constants";

const AddPropertyPage = () => {
  const [imageError, setImageError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("2877.11");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]); // Change to an array to hold multiple files

  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  // Use the custom hook
  const { postMultipart, loading: addLoading, error: addingError } = useCrud();
  const {
    get: getUser,
    data: user,
    loading: getLoading,
    error: getError,
  } = useCrud();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        await getUser(`${baseUrl}/users/${userId}`);
      }
    };
    fetchUser();
    console.log(user);
  }, [userId]);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (images.length === 0) {
      setImageError(true);
      return;
    }

    // Create a FormData instance
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("location", location);
    images.forEach((image, index) => {
      formData.append("images", image); // Append each image file
    });
    formData.append("user", userId); // Send userId instead of the entire user object
    console.log("user", formData);
    // Send FormData to the postMultipart function
    await postMultipart(`${baseUrl}/properties`, formData);

    // Navigate on success
    setTimeout(() => {
      if (!addingError) navigate("/properties");
    }, 500);
  };

  const handleImageChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files)); // Convert FileList to an array
      setImageError(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index)); // Remove the selected image
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset the file input value
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{"Add Property"}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} gap={"10px"}>
          {/* User ID Input */}
          <TextField
            label={"User ID"}
            variant="outlined"
            type="text"
            value={userId ?? ""}
            onChange={(e: any) => setUserId(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
            }}
          />
          <TextField
            label={"Name"}
            variant="outlined"
            onChange={(e: any) => setName(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
            }}
          />
          <TextField
            label={"Description"}
            variant="outlined"
            onChange={(e: any) => setDescription(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
            }}
          />
          <TextField
            label={"Price"}
            variant="outlined"
            type="number"
            onChange={(e: any) => setPrice(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
            }}
          />
          <TextField
            label={"Location"}
            variant="outlined"
            onChange={(e: any) => setLocation(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
            }}
          />
        </Box>

        <Box
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom="5rem"
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            alignItems={"start"}
          >
            <input
              accept="image/png"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileRef}
            />
            {images.length > 0 ? (
              <Box sx={{ display: "flex", alignItems: "start", mt: 2 }}>
                {images.map((image, index) => (
                  <Box key={index} sx={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      style={{
                        maxWidth: "500px",
                        maxHeight: "500px",
                        marginInlineStart: "2rem",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        right: "-40%",
                        top: "-20%",
                        background: "white",
                        borderRadius: "50%",
                      }}
                    >
                      <Close sx={{ color: "red" }} />
                    </IconButton>
                  </Box>
                ))}
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
        </Box>

        <Box
          sx={{
            background: red,
            position: "fixed",
            bottom: "0",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            style={{ fontSize: "15px" }}
            disabled={addLoading}
            startIcon={
              addLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {addLoading ? "Loading" : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPropertyPage;
