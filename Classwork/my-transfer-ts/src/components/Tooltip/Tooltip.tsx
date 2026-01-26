type TooltipProps = {
    text: string;
    children: React.ReactNode;
    className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children, className="" }) => (
    <div className="relative group">
        {children}
        <span className={`
            pointer-events-none z-50
            absolute left-1/2 -translate-x-1/2  mt-1
            scale-0 group-hover:scale-100
            rounded bg-gray-900 px-2 py-1 text-xs text-white
            border border-gray-800/60
            transition
            whitespace-nowrap 
            ${className}
            `}>
            {text}
        </span>
    </div>
);

export default Tooltip;
