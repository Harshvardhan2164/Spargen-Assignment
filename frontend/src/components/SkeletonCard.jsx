const SkeletonCard = () => {
    return (
        <div className="animate-pulse rounded-2xl shadow-md p-4 bg-gray-100 dark:bg-gray-700">
            <div className="h-52 bg-gray-300 dark:bg-gray-600 rounded-xl mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
    );
};

export default SkeletonCard;