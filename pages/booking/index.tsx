import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/bookings", formData);

            // Handle successful response
            if (response.data.success) {
                alert("Booking confirmed!");
                // Reset form on success
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    cardNumber: "",
                    expirationDate: "",
                    cvv: "",
                    billingAddress: "",
                });
            } else {
                setError(response.data.error || "Failed to submit booking.");
            }
        } catch (error: any) {
            // Handle API errors
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError("Failed to submit booking.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields for booking details */}
            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Confirm & Pay"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}