import type { NextApiRequest, NextApiResponse } from 'next';

interface Review {
    id: string;
    comment: string;
    rating: number;
    author: string;
    date: string;
}

type ApiResponse = {
    success: boolean;
    data?: Review[];
    error?: string;
};

// Sample reviews data
const SAMPLE_REVIEWS: Review[] = [
    {
        id: '1',
        comment: 'Amazing property! The location was perfect and the amenities were top-notch. Would definitely stay here again.',
        rating: 5,
        author: 'Sarah Johnson',
        date: '2024-10-15'
    },
    {
        id: '2',
        comment: 'Great place to stay. Clean, comfortable, and exactly as described. The host was very responsive.',
        rating: 4,
        author: 'Michael Chen',
        date: '2024-10-10'
    },
    {
        id: '3',
        comment: 'Lovely property with beautiful views. The beds were comfortable and the kitchen was well-equipped.',
        rating: 5,
        author: 'Emma Rodriguez',
        date: '2024-10-05'
    },
    {
        id: '4',
        comment: 'Good location and nice property overall. A few minor issues but nothing major. Would recommend.',
        rating: 4,
        author: 'David Wilson',
        date: '2024-09-28'
    },
    {
        id: '5',
        comment: 'Perfect for our family vacation! Spacious, clean, and the kids loved the pool area.',
        rating: 5,
        author: 'Lisa Thompson',
        date: '2024-09-20'
    }
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Property ID is required'
            });
        }

        // For demo purposes, return same reviews for all properties
        // In a real app, you'd filter reviews by property ID
        const propertyReviews = SAMPLE_REVIEWS.map(review => ({
            ...review,
            id: `${id}-${review.id}` // Make IDs unique per property
        }));

        res.status(200).json({
            success: true,
            data: propertyReviews
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}