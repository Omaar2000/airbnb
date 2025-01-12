import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useCRUD";
import ImageSlider, { imgBaseURL } from "../../components/imageSlider";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>(); // Access the id from the URL
  const [property, setProperty] = useState<any>({});
  const { get, data } = useCrud();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get(`https://test.catalystegy.com/api/properties/` + id);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      setProperty(data);
      console.log(data);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const images =
    property.images != null && typeof property.images !== "object"
      ? JSON.parse(property.images)
      : [];

  return (
    <div className="mx-auto ">
      {/* Image Slider for Small Devices */}
      <div className="mb-8 sm:hidden">
        <ImageSlider images={images} name={property.name} />
      </div>

      {/* Images Grid for Larger Devices */}
      <img
        src={`${imgBaseURL}/${images[0]}`}
        // src={`https://bio3.catalyst.com.eg/public/Catalyst_portfolio/IMG_0997%20(1).jpg`}
        alt={`${property.name} image ${2 + 1}`}
        className="w-full h-[200px] object-cover hidden sm:block rounded-md mb-4"
      />
      <div className="hidden sm:grid grid-cols-3 gap-4 mb-8">
        {images.slice(1).map((img: string, index: number) => (
          <div key={index} className="relative">
            {index === 2 ? (
              <></>
            ) : (
              <img
                src={`${imgBaseURL}/${img}`}
                alt={`${property.name} image ${index + 1}`}
                className="w-[200px] h-[100px] object-cover rounded-md"
              />
            )}
          </div>
        ))}
      </div>

      {/* Property Details */}
      <div className="bg-white p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          {property.name}
        </h1>
        <p className="text-lg text-gray-600">{property.description}</p>

        <div className="space-y-4">
          <p className="text-xl font-medium text-gray-800">
            Price: <span className="text-green-500">${property.price}</span>
          </p>
          <p className="text-lg text-gray-700">Location: {property.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
