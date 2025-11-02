import type { NextApiRequest, NextApiResponse } from 'next';
import { PROPERTYLISTINGSAMPLE } from '../../constants';
import { PropertyProps } from '../../interfaces';

type ApiResponse = {
    success: boolean;
    data?: (PropertyProps & { id: string })[];
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    try {
        const {
            page = '1',
            limit = '12',
            location,
            minPrice,
            maxPrice,
            category,
            minRating
        } = req.query;

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const startIndex = (pageNum - 1) * limitNum;

        // Add id to each property
        let properties = PROPERTYLISTINGSAMPLE.map((property, index) => ({
            ...property,
            id: index.toString()
        }));

        // Filter properties based on query parameters
        if (location && typeof location === 'string') {
            const searchLocation = location.toLowerCase();
            properties = properties.filter(property =>
                property.address.city.toLowerCase().includes(searchLocation) ||
                property.address.country.toLowerCase().includes(searchLocation) ||
                property.address.state.toLowerCase().includes(searchLocation)
            );
        }

        if (minPrice && typeof minPrice === 'string') {
            const min = parseInt(minPrice, 10);
            properties = properties.filter(property => property.price >= min);
        }

        if (maxPrice && typeof maxPrice === 'string') {
            const max = parseInt(maxPrice, 10);
            properties = properties.filter(property => property.price <= max);
        }

        if (category && typeof category === 'string') {
            properties = properties.filter(property =>
                property.category.some((cat: string) =>
                    cat.toLowerCase().includes(category.toLowerCase())
                )
            );
        }

        if (minRating && typeof minRating === 'string') {
            const minRat = parseFloat(minRating);
            properties = properties.filter(property => property.rating >= minRat);
        }

        // Calculate pagination
        const total = properties.length;
        const totalPages = Math.ceil(total / limitNum);
        const paginatedProperties = properties.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginatedProperties,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}