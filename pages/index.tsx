import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PropertyCard } from "@/components/common";
import { PropertyProps } from "@/interfaces";

interface PropertyWithId extends PropertyProps {
  id: string;
}

export default function Home() {
  const [properties, setProperties] = useState<PropertyWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        if (response.data.success) {
          setProperties(response.data.data);
        } else {
          console.error("Failed to fetch properties:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing properties for your next vacation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => handlePropertyClick(property.id)}
            />
          ))}
        </div>
        
        {properties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h2>
            <p className="text-gray-600">Check back later for new listings.</p>
          </div>
        )}
      </div>
    </div>
  );
}