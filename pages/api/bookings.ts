import type { NextApiRequest, NextApiResponse } from 'next';

interface BookingData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    billingAddress: string;
    propertyId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
}

type ApiResponse = {
    success: boolean;
    data?: {
        bookingId: string;
        confirmationNumber: string;
        message: string;
    };
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    try {
        const bookingData: BookingData = req.body;

        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'cardNumber', 'expirationDate', 'cvv', 'billingAddress'];
        const missingFields = requiredFields.filter(field => !bookingData[field as keyof BookingData]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(bookingData.email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Validate card number (basic validation - should be 16 digits)
        const cardNumberClean = bookingData.cardNumber.replace(/\s+/g, '');
        if (!/^\d{16}$/.test(cardNumberClean)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid card number. Must be 16 digits.'
            });
        }

        // Validate CVV (3 or 4 digits)
        if (!/^\d{3,4}$/.test(bookingData.cvv)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid CVV. Must be 3 or 4 digits.'
            });
        }

        // Validate expiration date (MM/YY format)
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(bookingData.expirationDate)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid expiration date. Use MM/YY format.'
            });
        }

        // Simulate booking processing
        console.log('Processing booking for:', {
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
            phone: bookingData.phoneNumber,
            propertyId: bookingData.propertyId,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            guests: bookingData.guests
        });

        // Generate booking confirmation
        const bookingId = `BK${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const confirmationNumber = `ALX${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        res.status(200).json({
            success: true,
            data: {
                bookingId,
                confirmationNumber,
                message: `Booking confirmed! Your confirmation number is ${confirmationNumber}. A confirmation email will be sent to ${bookingData.email}.`
            }
        });

    } catch (error) {
        console.error('Booking API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error. Please try again later.'
        });
    }
}