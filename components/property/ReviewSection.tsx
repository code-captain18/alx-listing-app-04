import axios from "axios";
import { useState, useEffect } from "react";

interface ReviewSectionProps {
    propertyId: string;
}

interface Review {
    id: string;
    comment: string;
    rating: number;
    author: string;
    date: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/properties/${propertyId}/reviews`);

                // Handle API response structure
                if (response.data.success) {
                    setReviews(response.data.data || []);
                } else {
                    setReviews([]);
                    console.error("Failed to fetch reviews:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [propertyId]);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    return (
        <div>
            {reviews.map((review) => (
                <div key={review.id}>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;