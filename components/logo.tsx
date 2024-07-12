const Logo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-full">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#3498db", stopOpacity: 0 }} />
                <stop offset="100%" style={{ stopColor: "#2ecc71", stopOpacity: 0 }} />
            </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grad1)" />
        <path d="M20 50 Q 50 20, 80 50 T 20 50" stroke="white" strokeWidth="4" fill="none">
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 0 10; 0 0"
                dur="4s"
                repeatCount="indefinite"
            />
        </path>
        <path d="M20 70 Q 50 40, 80 70 T 20 70" stroke="white" strokeWidth="4" fill="none" opacity="0.5">
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 0 -10; 0 0"
                dur="4s"
                repeatCount="indefinite"
            />
        </path>
    </svg>
);;
export default Logo;