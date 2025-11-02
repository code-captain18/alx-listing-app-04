import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { PropertyDetail } from "@/components/property";

export default function PropertyDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`/api/properties/${id}`);
                // Handle the API response structure
                if (response.data.success) {
                    setProperty(response.data.data);
                } else {
                    console.error("Failed to fetch property:", response.data.error);
                    setProperty(null);
                }
            } catch (error) {
                console.error("Error fetching property details:", error);
                setProperty(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!property) {
        return <p>Property not found</p>;
    }

    return <PropertyDetail property={property} />;
}