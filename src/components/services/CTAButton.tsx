import React, { useState, useEffect } from "react";

interface CTAButtonProps {
	buttonRef: React.RefObject<HTMLAnchorElement>;
}

const CTAButton: React.FC<CTAButtonProps> = ({ buttonRef }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<a
			href="#contact"
			className="inline-flex items-center relative z-10"
			ref={buttonRef}
		>
			<button
				className={`backdrop-blur-sm px-6 py-3 rounded-full
                 border transition-all transform hover:scale-105 duration-300 text-base font-semibold
                 shadow-lg ${
										isMobile
											? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-500/30 hover:from-pink-600 hover:to-purple-700"
											: "bg-white/25 text-white border-white/30 hover:bg-white/40"
									}`}
			>
				Let's get started
			</button>
		</a>
	);
};

export default CTAButton;
