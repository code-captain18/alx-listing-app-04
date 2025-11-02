import React from 'react';
import Image from 'next/image';
import { PropertyProps } from '../../interfaces';
import { PLACEHOLDER_IMAGES } from '../../constants';
import ReviewSection from './ReviewSection';

interface PropertyDetailProps {
    property: PropertyProps & { id?: string };
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
    const { name, address, rating, price, image, discount, offers, category } = property;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to properties
                    </button>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    {/* Property Header */}
                    <div className="relative h-96 md:h-[500px]">
                        <Image
                            src={image || PLACEHOLDER_IMAGES.PROPERTY}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Overlay with property info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                                        <p className="text-lg opacity-90">
                                            {address.city}, {address.state}, {address.country}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                                        <svg className="w-5 h-5 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold">{rating.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Discount Badge */}
                        {discount && (
                            <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                                {discount}% OFF
                            </div>
                        )}
                    </div>

                    {/* Property Details */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Property Categories */}
                                {category && category.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Features</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {category.map((cat, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Property Specifications */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xl font-semibold text-gray-900">{offers.bed}</div>
                                                <div className="text-sm text-gray-600">Bed{offers.bed !== '1' ? 's' : ''}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xl font-semibold text-gray-900">{offers.shower}</div>
                                                <div className="text-sm text-gray-600">Bath{offers.shower !== '1' ? 's' : ''}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xl font-semibold text-gray-900">{offers.occupants}</div>
                                                <div className="text-sm text-gray-600">Guest{offers.occupants !== '1' ? 's' : ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Details */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium text-gray-900">{name}</div>
                                                <div className="text-gray-600">
                                                    {address.city}, {address.state}, {address.country}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                                    <div className="mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-bold text-gray-900">
                                                ${price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-600 ml-2">per night</span>
                                        </div>
                                        {discount && (
                                            <div className="text-green-600 font-medium mt-1">
                                                Save {discount}% on this booking!
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Rating</span>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="font-medium">{rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Accommodates</span>
                                            <span className="font-medium">{offers.occupants} guest{offers.occupants !== '1' ? 's' : ''}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Bedrooms</span>
                                            <span className="font-medium">{offers.bed}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-gray-600">Bathrooms</span>
                                            <span className="font-medium">{offers.shower}</span>
                                        </div>
                                    </div>

                                    {/* Book Now Button */}
                                    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                        Book Now
                                    </button>

                                    {/* Contact Info */}
                                    <div className="mt-4 text-center">
                                        <button className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                            Contact Host
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {property.id && (
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg mt-8">
                        <ReviewSection propertyId={property.id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetail;