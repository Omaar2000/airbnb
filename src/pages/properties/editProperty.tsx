import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import useCrud from "../../hooks/useCRUD";
import { baseUrl } from "../../constants";
import { imgBaseURL } from "../../components/imageSlider";
const EditPropertyPage = () => {
  const [imageError, setImageError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    get,
    data: property,
    loading: getLoading,
    error: getError,
  } = useCrud();
  const {
    postMultipart,
    loading: updateLoading,
    error: updateError,
  } = useCrud();

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        await get(`${baseUrl}/properties/${id}`);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property) {
      setName(property.name || "");
      setDescription(property.description || "");
      setPrice(property.price || "");
      setLocation(property.location || "");
    }
  }, [property]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      setImageError(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("location", location);

    images.forEach((image) => formData.append("images", image));

    await postMultipart(`${baseUrl}/properties/${id}`, formData);

    if (!updateError) {
      navigate("/properties");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages([...images, ...files]);
      setImageError(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset the file input value
    }
  };

  const parsedImgs =
    property.images != null && typeof property.images !== "object"
      ? JSON.parse(property.images)
      : [];

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>Edit Property</h1>
      {getLoading ? (
        <CircularProgress />
      ) : getError ? (
        <Typography color="error">Error fetching property details</Typography>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Form Fields */}
          <Box style={{ margin: "2rem" }} gap="10px">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          </Box>

          {/* Image Upload Section */}
          <Box
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="start"
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
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="info"
                component="span"
                style={{ marginInlineStart: "2rem" }}
              >
                Upload Images
              </Button>
            </label>

            {images.length > 0 ? (
              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", mt: 2 }}
              >
                {images.map((image, index) => (
                  <Box key={index} sx={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: "-10%",
                        right: "-10%",
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
              <Typography color="red">IMAGE IS REQUIRED*</Typography>
            ) : parsedImgs && images.length === 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.length === 0 &&
                  parsedImgs &&
                  parsedImgs.map((img: string, index: number) => (
                    <div key={index} className="overflow-hidden rounded-md">
                      <img
                        src={`${imgBaseURL}/${img}`}
                        alt={`${property.name} image ${index + 1}`}
                        className="w-full h-[200px] object-cover"
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <Typography>No Images Selected</Typography>
            )}

            {/* Parsed Images */}
          </Box>

          {/* Submit Button */}
          <Box
            sx={{ position: "fixed", bottom: "0", right: "0", padding: "1rem" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              disabled={updateLoading}
              startIcon={
                updateLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {updateLoading ? "Loading" : "Save"}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default EditPropertyPage;
