const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block border-b border-t rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:text-gray-700
     ${isActive
        ? "border-b border-t border-gray-700 dark:text-white text-gray-700"
        : "dark:text-gray-300 text-gray-600 border-transparent"}`;

export default linkClass;