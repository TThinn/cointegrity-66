import { useLayoutEffect, useRef, useState, useMemo } from "react";
import Container from "./ui/Container";
import { MapPin, Zap, Shield, Award } from "lucide-react";

const CTA_PARTICLE_COUNT_DESKTOP = 15;
const CTA_PARTICLE_COUNT_MOBILE = 3;

const processSteps = [
	{
		id: 1,
		icon: <MapPin className="text-[#cb46b3] w-8 h-8" />,
		title: "DISCOVER",
		description:
			"We analyze your organization's unique position to identify high-potential blockchain opportunities and regulatory considerations. This comprehensive assessment establishes your Web3 readiness and creates a solid foundation for strategic digital transformation planning.",
	},
	{
		id: 2,
		icon: <Zap className="text-[#cb46b3] w-8 h-8" />,
		title: "STRATEGIZE",
		description:
			"We develop a tailored Web3 roadmap aligned with your business objectives, addressing compliance requirements and technical implementation. Our structured approach transforms complex blockchain concepts into actionable plans with clear milestones and resource optimization.",
	},
	{
		id: 3,
		icon: <Shield className="text-[#cb46b3] w-8 h-8" />,
		title: "IMPLEMENT",
		description:
			"Our team provides hands-on guidance during execution, ensuring methodical progress while building internal competence through knowledge transfer. Regular progress reviews keep your blockchain implementation aligned with strategic objectives and regulatory compliance.",
	},
	{
		id: 4,
		icon: <Award className="text-[#cb46b3] w-8 h-8" />,
		title: "SCALE",
		description:
			"We support sustainable growth of your operational Web3 initiative through strategic funding, community engagement, and continuous optimization. Our regulatory monitoring helps you adapt efficiently while identifying new blockchain application opportunities within your business ecosystem.",
	},
];

const Process = () => {
	const isDarkBackground = true;
	const ctaRef = useRef<HTMLAnchorElement | null>(null);
	const ctaSectionRef = useRef<HTMLDivElement | null>(null);
	const [ctaPosition, setCtaPosition] = useState({
		x: 50,
		y: 50,
	});
	const [particleCount, setParticleCount] = useState<number | null>(null);

	useLayoutEffect(() => {
		const updateCtaPosition = () => {
			if (ctaRef.current && ctaSectionRef.current) {
				const btnBox = ctaRef.current.getBoundingClientRect();
				const sectionBox = ctaSectionRef.current.getBoundingClientRect();
				const x =
					(((btnBox.left + btnBox.right) / 2 - sectionBox.left) /
						sectionBox.width) *
					100;
				const y =
					(((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) /
						sectionBox.height) *
					100;
				setCtaPosition({
					x,
					y,
				});
			}
		};
		const timeout = setTimeout(updateCtaPosition, 100);
		window.addEventListener("resize", updateCtaPosition);
		return () => {
			window.removeEventListener("resize", updateCtaPosition);
			clearTimeout(timeout);
		};
	}, []);

	const particles = useMemo(() => {
		if (!particleCount) return [];
		return Array.from(
			{
				length: particleCount,
			},
			() => ({
				size: 20 + Math.random() * 80,
				x: ctaPosition.x - 4 + (Math.random() - 0.5) * 12,
				y: ctaPosition.y - 4 + (Math.random() - 0.5) * 12,
				moveX: (Math.random() - 0.5) * 10,
				moveY: (Math.random() - 0.5) * 14,
				rotate: Math.random() * 360,
				delay: Math.random() * 5,
				duration: 8 + Math.random() * 12,
				color: [
					"rgba(225,29,143,0.9)",
					"rgba(147,51,234,0.6)",
					"rgba(255,255,255,0.15)",
				][Math.floor(Math.random() * 3)],
			}),
		);
	}, [ctaPosition, particleCount]);

	useLayoutEffect(() => {
		const isMobile = window.innerWidth < 768;
		setParticleCount(
			isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP,
		);
		const handleResize = () => {
			const isMobile = window.innerWidth < 768;
			setParticleCount(
				isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP,
			);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (particleCount === null) return null;

	return (
		<section id="process" className="py-20 relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
				<div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
			</div>

			<Container>
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="text-center mb-16 animate-fade-up">
						<h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">
							Results-Focused Approach
						</h2>
						<h3 className="mt-2 text-3xl md:text-4xl font-bold mb-2 text-white">
							From Web3 Complexity to Blockchain Success{" "}
						</h3>
						<p className="mt-2 text-white/60 max-w-2xl mx-auto">
							Our Proven 4-Step Process
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
						{processSteps.map((step, index) => (
							<div
								key={step.id}
								className={`p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 ${isDarkBackground ? "border border-white/30 hover:border-white/50" : "border border-black/30 hover:border-black/50"}`}
								style={{
									animationDelay: `${0.1 + index * 0.1}s`,
								}}
							>
								<div
									className="w-12 h-12 flex items-center justify-center rounded-xl mb-4"
									style={{
										background: `linear-gradient(135deg, rgba(203, 70, 179, 0.2), rgba(203, 70, 179, 0.3))`,
									}}
								>
									{step.icon}
								</div>
								<h3
									className={`text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 ${isDarkBackground ? "text-white" : "text-gray-800"}`}
								>
									{step.title}
								</h3>
								<p
									className={`text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] ${isDarkBackground ? "text-gray-200" : "text-gray-600"}`}
								>
									{step.description}
								</p>
							</div>
						))}
					</div>

					{/* CTA Section with Particles and light bleeding effect */}
					<div className="mt-16 relative">
						{/* External shadow effect that matches particle positions */}
						<div className="absolute inset-0 z-[5] pointer-events-none overflow-visible">
							{particles.map((p, i) => (
								<div
									key={`shadow-particle-${i}`}
									className="absolute rounded-full blur-[25px] animate-light-particle"
									style={{
										width: `${p.size * 1.5}px`,
										height: `${p.size * 1.5}px`,
										background: p.color.replace(/[^,]+(?=\))/, "0.15"),
										left: `calc(${p.x}% - ${p.size * 0.25}px)`,
										top: `calc(${p.y}% - ${p.size * 0.25}px)`,
										animationDelay: `${p.delay}s`,
										animationDuration: `${p.duration}s`,
										["--move-x" as string]: `${p.moveX}vw`,
										["--move-y" as string]: `${p.moveY}vh`,
										["--rotate" as string]: `${p.rotate}deg`,
										opacity: 0.4,
										mixBlendMode: "screen",
									}}
								/>
							))}
						</div>

						{/* CTA Section */}
						<div
							ref={ctaSectionRef}
							className={`flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16 p-6 md:p-7 rounded-lg backdrop-blur-sm bg-transparent relative z-10 overflow-hidden transition-all duration-300 ${isDarkBackground ? "border border-white/30 hover:border-white/50" : "border border-black/30 hover:border-black/50"}`}
						>
							{/* Particles */}
							<div className="absolute inset-0 z-[1] pointer-events-none">
								{particles.map((p, i) => (
									<div
										key={`cta-particle-${i}`}
										className="absolute rounded-full blur-[12px] animate-light-particle"
										style={{
											width: `${p.size}px`,
											height: `${p.size}px`,
											background: p.color,
											left: `${p.x}%`,
											top: `${p.y}%`,
											animationDelay: `${p.delay}s`,
											animationDuration: `${p.duration}s`,
											["--move-x" as string]: `${p.moveX}vw`,
											["--move-y" as string]: `${p.moveY}vh`,
											["--rotate" as string]: `${p.rotate}deg`,
										}}
									/>
								))}
							</div>

							<div className="flex-1 text-center md:text-left relative z-10">
								<h3 className="text-[clamp(1.25rem,1.1rem+0.8vw,2rem)] font-bold mb-3 text-white">
									Interested in discussing your Web3 possibilities?
								</h3>
							</div>

							<a
								href="#contact"
								className="inline-flex items-center relative z-10"
								ref={ctaRef}
							>
								<button
									className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full
                      border border-white/30 hover:bg-white/20 transition-all
                      transform hover:scale-105 duration-300 text-base font-semibold"
								>
									Book a Consultation
								</button>
							</a>
						</div>

						{/* Mask to hide shadow orbs inside CTA */}
						<div
							className="absolute inset-0 bg-[#010822] z-[6] pointer-events-none rounded-lg"
							style={{
								clipPath:
									"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0.5% 0.5%, 0.5% 99.5%, 99.5% 99.5%, 99.5% 0.5%, 0.5% 0.5%, 0% 0%)",
							}}
						></div>
					</div>
				</div>
			</Container>

			{/* Animation Styles */}
			<style>
				{`
          @keyframes light-particle {
            0%, 100% { 
              opacity: 0.4;
              transform: translate(0, 0) scale(1) rotate(0);
            }
            25% {
              opacity: 0.6;
              transform: 
                translate(calc(var(--move-x) * 0.3), calc(var(--move-y) * -0.7)) 
                scale(1.2) 
                rotate(calc(var(--rotate) * 0.3));
            }
            50% { 
              opacity: 0.8;
              transform: 
                translate(var(--move-x), var(--move-y)) 
                scale(1.5) 
                rotate(calc(var(--rotate) * 0.6));
            }
            75% {
              opacity: 0.6;
              transform: 
                translate(calc(var(--move-x) * -0.3), calc(var(--move-y) * 0.7)) 
                scale(1.3) 
                rotate(var(--rotate));
            }
          }
          .animate-light-particle {
            animation: light-particle ease-in-out infinite;
            mix-blend-mode: screen;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-light-particle {
              animation: none;
              opacity: 0.3 !important;
            }
          }
        `}
			</style>
		</section>
	);
};

export default Process;
