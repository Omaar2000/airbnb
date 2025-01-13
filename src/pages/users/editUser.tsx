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
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import useCrud from "../../hooks/useCRUD";
import { imgBaseURL } from "../../components/imageSlider";
import { baseUrl } from "../../constants";

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [profile_image, setImage] = useState<File | null>(null);
  const [profile_image_link, setImageLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { postMultipart, loading: postLoading } = useCrud();
  const { get, loading: getLoading, data } = useCrud();
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      await get(`https://test.catalystegy.com/api/users/` + id);
    };
    fetchData();
  }, [id]);

  // Sync state with fetched data
  useEffect(() => {
    if (data) {
      setUserData(data);
      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setRole(data.role || "");
      setImageLink(imgBaseURL + "/" + data.profile_image || "");
      // setImageLink(data.profile_image || "");
    }
  }, [data]);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const BODY = { profile_image, name, email, phone, role };
    console.log(`${baseUrl}/users/` + id, BODY);
    await postMultipart(`${baseUrl}/users/` + id, BODY);

    setTimeout(() => {
      navigate("/users");
    }, 500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  if (getLoading) return <>Loading .......</>;

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{"Edit User"}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} gap={"10px"}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#333" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#333" },
            }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#333" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#333" },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            type="email"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#333" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#333" },
            }}
          />
          <FormControl
            fullWidth
            margin="normal"
            sx={{
              mt: 0,
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#333" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#333" },
            }}
          >
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Image upload */}
        <Box
          alignItems="center"
          justifyContent="space-between"
          marginBottom="5rem"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="start"
          >
            <input
              accept="image/png"
              id="contained-button-file"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileRef}
            />
            {profile_image ? (
              <Box
                display="flex"
                alignItems="center"
                mt={2}
                position={"relative"}
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
                <IconButton
                  onClick={handleRemoveImage}
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
            ) : (
              <img
                src={`${profile_image_link}`}
                alt="Preview"
                style={{
                  maxWidth: "500px",
                  maxHeight: "500px",
                  marginInlineStart: "2rem",
                }}
              />
            )}
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="info"
                component="span"
                style={{ marginInlineStart: "2rem" }}
              >
                Upload Image
              </Button>
            </label>
          </Box>
        </Box>

        {/* Save button */}
        <Box
          sx={{
            background: "#333",
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
            disabled={postLoading}
            startIcon={
              postLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {postLoading ? "Loading" : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditUserPage;
