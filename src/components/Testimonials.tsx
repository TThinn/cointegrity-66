import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import TestimonialCard from "./testimonials/TestimonialCard";
import ParticleEffect from "./testimonials/ParticleEffect";
import { useTestimonials } from "./testimonials/useTestimonials";
import { useParticles } from "./testimonials/useParticles";
import { useCardHeightMeasurement } from "./testimonials/useCardHeightMeasurement";

const Testimonials = () => {
	const [isMobile, setIsMobile] = useState(false);
	const {
		testimonials,
		activeTestimonials,
		changingIndex,
		isVisible,
		hoveredCard,
		handleCardMouseEnter,
		handleCardMouseLeave,
		testimonialsGridRef,
	} = useTestimonials();

	const { particles, sectionRef, buttonRef } = useParticles();

	// Use the new measurement-based height calculation
	const { cardHeight, measurementRef, isInitialized } =
		useCardHeightMeasurement(testimonials);

	// Handle responsive behavior
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 640;
			setIsMobile(mobile);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Get the active testimonials to display based on mobile/desktop and available testimonials
	const testimonialsToShow = isMobile
		? activeTestimonials.slice(0, 2)
		: activeTestimonials;

	return (
		<section
			id="testimonials"
			className="py-8 relative overflow-hidden"
			ref={sectionRef}
		>
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
				<div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
			</div>

			{/* Hidden measurement container */}
			<div
				ref={measurementRef}
				className="absolute -top-full opacity-0 pointer-events-none w-full"
			/>

			<Container>
				<div className="max-w-7xl mx-auto relative z-10">
					{/* Header Section */}
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">
							Client Success Stories
						</h2>
						<h3 className="mt-2 text-3xl md:text-4xl font-bold text-white">
							Why Leading Organizations Choose Our Web3 Expertise
						</h3>
						<p className="mt-4 text-white/60 max-w-2xl mx-auto leading-relaxed">
							Our knowledge-first approach to Web3 transformation helps
							organizations successfully navigate the complex decentralized
							landscape. With deep expertise in blockchain strategy, product
							development, tax compliance, and capital acceleration, our
							specialists bridge the gap between traditional business and Web3
							innovation. As your dependable guide through complex blockchain
							challenges, we deliver solutions that create measurable value.
							Don't just take our word for it-read what our clients say about
							working with our team:
						</p>
					</div>

					{/* Cards Section with improved spacing */}
					<div className="mb-8">
						<div
							ref={testimonialsGridRef}
							className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto w-full"
						>
							{testimonialsToShow.map((testimonialIndex, position) => (
								<TestimonialCard
									key={position}
									testimonial={testimonials[testimonialIndex]}
									position={position}
									isChanging={changingIndex === position}
									isVisible={isVisible}
									isHovered={hoveredCard === position}
									onMouseEnter={() => handleCardMouseEnter(position)}
									onMouseLeave={handleCardMouseLeave}
									cardHeight={cardHeight}
									isHeightStable={isInitialized}
								/>
							))}
						</div>
					</div>

					{/* CTA Section with proper 8px spacing */}
					<div className="text-center pt-2">
						<div className="inline-block relative">
							<ParticleEffect particles={particles} />
							<a
								href="#contact"
								ref={buttonRef}
								className="inline-flex items-center relative z-20"
							>
								<button
									className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full
                              border border-white/30 hover:bg-white/20 transition-all
                              transform hover:scale-105 duration-300 text-base font-semibold"
								>
									Connect with us
								</button>
							</a>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Testimonials;
