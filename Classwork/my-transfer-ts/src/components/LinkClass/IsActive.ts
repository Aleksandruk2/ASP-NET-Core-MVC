const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block border-b border-t rounded-lg px-4 py-2 transition hover:bg-gray-700 hover:text-white
     ${isActive
        ? "border-b border-t border-gray-700 text-white"
        : "text-gray-300 border-transparent"}`;

export default linkClass;