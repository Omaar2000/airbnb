import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./imageSlider";
import { Button, CircularProgress } from "@mui/material";
import { baseUrl } from "../constants"; // Assuming you have a baseUrl constant
import useCrud from "../hooks/useCRUD";

interface CardProps {
  id: number;
  user_id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  images: string;
  video: string;
  created_at: string;
  updated_at: string;
}

export const Card: React.FC<CardProps> = ({
  name,
  description,
  price,
  location,
  images,
  id,
}) => {
  const navigate = useNavigate();
  const { deleteItem, loading: deleteLoading } = useCrud(); // Using deleteItem from useCrud hook

  const handleCardClick = () => {
    navigate(`/properties/${id}`); // Navigate to the details route with the id
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent `onClick` from being triggered

    await deleteItem(`${baseUrl}/properties/${id}`); // Use deleteItem from useCrud
    // alert("Property deleted successfully!");
    // Optionally: redirect or update UI to reflect the deletion

    window.location.reload(); // Refresh the page (optional)
  };

  const parsedImgs =
    images != null && typeof images != "object" ? JSON.parse(images) : [];

  return (
    <div
      className="border shadow-lg p-4 rounded-lg hover:cursor-pointer"
      onClick={handleCardClick}
    >
      {parsedImgs ? <ImageSlider images={parsedImgs} name={name} /> : null}
      <h2 className="text-lg font-bold mb-2">{name}</h2>
      <p className="text-sm mb-4 text-gray-700">{description}</p>
      <p className="text-sm text-gray-800 font-semibold mb-2">
        Price: ${price}
      </p>
      <p className="text-sm text-gray-600 mb-20">Location: {location}</p>
      <div className="flex justify-end gap-3 place-content-end h-fit">
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          startIcon={
            deleteLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
          disabled={deleteLoading} // Disable while deleting
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent `onClick` from being triggered
            navigate(`/properties/editproperty/${id}`);
          }}
          variant="contained"
          color="info"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
