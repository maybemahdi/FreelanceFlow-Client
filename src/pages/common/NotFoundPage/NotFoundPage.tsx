import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="text-center mt-12">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 inline-block text-blue-500 underline">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;