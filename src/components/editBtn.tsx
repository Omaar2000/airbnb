import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditBtn = ({
  to,
  id,
  title,
}: {
  to: string;
  id: string;
  title: string;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to + "/" + id);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleClick}
      >
        {title}
      </Button>
    </>
  );
};

export default EditBtn;
