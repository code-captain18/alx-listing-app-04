import type { NextApiRequest, NextApiResponse } from 'next';
import { PROPERTYLISTINGSAMPLE } from '../../../constants';
import { PropertyProps } from '../../../interfaces';

type ApiResponse = {
    success: boolean;
    data?: PropertyProps & { id: string };
    error?: string;
};

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

        // Convert id to number to match array index
        const propertyIndex = parseInt(id, 10);

        // Check if the index is valid
        if (isNaN(propertyIndex) || propertyIndex < 0 || propertyIndex >= PROPERTYLISTINGSAMPLE.length) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }

        // Get the property by index
        const property = PROPERTYLISTINGSAMPLE[propertyIndex];

        // Add an id field to the property for consistency
        const propertyWithId = {
            ...property,
            id: propertyIndex.toString()
        };

        res.status(200).json({
            success: true,
            data: propertyWithId
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}