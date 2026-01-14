import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getActiveSection } from "@/utils/scrollManager";
import OptimizedImage from "./ui/OptimizedImage";

interface HeaderProps {
	backgroundType?: "dark" | "light";
}

const Header = ({ backgroundType = "dark" }: HeaderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState<string>("");
	const [resourcesOpen, setResourcesOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const isHomepage =
		location.pathname === "/" || location.pathname === "/web3-consulting";

	// No longer using complex URL tracking

	useEffect(() => {
		const handleScroll = () => {
			// Handle background change on scroll
			const offset = window.scrollY;
			setScrolled(offset > 50);

			if (isHomepage) {
				// Handle section highlighting on homepage using scroll manager
				const sections = [
					"Web3-Consulting",
					"about",
					"process", 
					"services",
					"partners",
					"founders",
					"testimonials",
					"contact"
				];
				
				const currentSection = getActiveSection(sections);
				setActiveSection(currentSection);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHomepage]);

	// Simple navigation using anchor links

	// Helper function to determine if we should use Link or anchor
	const NavLink = ({
		to,
		children,
		className,
		onClick,
		target,
		rel,
		"aria-label": ariaLabel,
		sectionId,
	}: {
		to: string;
		children: React.ReactNode;
		className?: string;
		onClick?: () => void;
		target?: string;
		rel?: string;
		"aria-label"?: string;
		sectionId?: string;
	}) => {
		// For external links
		if (to.startsWith("http") || to.startsWith("mailto:")) {
			return (
				<a
					href={to}
					className={className}
					onClick={onClick}
					target={target}
					rel={rel}
					aria-label={ariaLabel}
				>
					{children}
				</a>
			);
		}

		// For section navigation on homepage - use anchor links for smooth scroll
		if (sectionId && to.startsWith("#")) {
			return (
				<a
					href={to}
					className={className}
					onClick={onClick}
					aria-label={ariaLabel}
				>
					{children}
				</a>
			);
		}

		// For all other navigation (including cross-page section links)
		return (
			<Link to={to} className={className} onClick={onClick}>
				{children}
			</Link>
		);
	};

	const navigation = [
		{
			href: "/#about",
			label: "About Us",
			section: "about",
			sectionId: isHomepage ? "about" : undefined,
		},
		{
			href: "/#services",
			label: "Services",
			section: "services",
			sectionId: isHomepage ? "services" : undefined,
		},
		{
			href: "/#partners",
			label: "Partners",
			section: "partners",
			sectionId: isHomepage ? "partners" : undefined,
		},
		{
			href: "/#founders",
			label: "Team",
			section: "founders",
			sectionId: isHomepage ? "founders" : undefined,
		},
		{
			href: "/mica",
			label: "MiCA",
			section: "mica",
			sectionId: undefined,
		},
	];

	const resourcesItems = [
		{ href: "/mica", label: "MiCA-Ready" },
		{ href: "/glossary/", label: "Glossary" },
		{ href: "/blog/", label: "Blog" },
		{ href: "/news", label: "News" },
		{ href: "/guides", label: "Guides" },
		{ href: "/case-studies", label: "Case Studies" },
	];

	// Dynamic dropdown styles based on background type
	const getDropdownStyles = () => {
		console.log("Background type:", backgroundType); // Debug log

		if (backgroundType === "light") {
			return {
				container: "bg-black/90 backdrop-blur-lg border border-gray-300",
				item: "text-white bg-black/90 hover:bg-gray-800 hover:text-white",
			};
		} else {
			return {
				container: "bg-black/30 backdrop-blur-lg border border-white/20",
				item: "text-white hover:bg-white/10 hover:text-white",
			};
		}
	};

	const dropdownStyles = getDropdownStyles();

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-black/70 before:w-full before:h-16 before:backdrop-blur-lg before:absolute before:top-0 shadow-md" : "py-6 bg-transparent"}`}
		>
			<Container>
				<div className="flex items-center justify-between">
					<a href="/#Web3-Consulting" className="relative z-10 micro-interaction">
						<div className="flex items-center">
							<OptimizedImage
								src="/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png"
								alt="Cointegrity Logo"
								className="h-10 w-auto"
								priority={true}
								sizes="40px"
								width={120}
								height={40}
							/>
						</div>
					</a>

					<nav className="hidden md:flex items-center gap-1">
						{navigation.map(({ href, label, section, sectionId }) => (
							<NavLink
								key={href}
								to={href}
								sectionId={sectionId}
								className={`micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors relative
                  ${activeSection === section || location.pathname === `/${section === "founders" ? "team" : section}` ? "text-white font-semibold" : "hover:text-white"}`}
							>
								{label}
							</NavLink>
						))}

						{/* Resources Dropdown */}
						<div
							className="relative"
							onMouseEnter={() => setResourcesOpen(true)}
							onMouseLeave={() => setResourcesOpen(false)}
						>
							<button className="micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors flex items-center gap-1">
								Resources
								<ChevronDown
									size={16}
									className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
								/>
							</button>

							{resourcesOpen && (
								<div
									className={`absolute top-full left-0 ${dropdownStyles.container} rounded-lg min-w-48 py-2 z-50 overflow-hidden`}
								>
									{resourcesItems.map(({ href, label }) => (
										<Link
											key={href}
											to={href}
											className={`block px-4 py-2 ${dropdownStyles.item} transition-all duration-300 relative overflow-hidden`}
											onClick={() => setResourcesOpen(false)}
										>
											{label}
										</Link>
									))}
								</div>
							)}
						</div>

						<NavLink
							to={isHomepage ? "#contact" : "/#contact"}
							sectionId={isHomepage ? "contact" : undefined}
							className="pl-4 micro-interaction"
						>
							<Button variant="primary" size="sm">
								Connect
							</Button>
						</NavLink>
					</nav>

					<button
						className="md:hidden text-white p-2 micro-interaction"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</Container>

			{isOpen && (
				<div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 md:hidden pt-20">
					<Container>
						<nav className="flex flex-col gap-4 items-center text-center">
							{navigation.map(({ href, label, section, sectionId }) => (
								<NavLink
									key={href}
									to={href}
									sectionId={sectionId}
									className={`micro-interaction w-full py-4 text-xl border-b border-white/10
                    ${activeSection === section || location.pathname === `/${section === "founders" ? "team" : section}` ? "text-white" : "text-white/90 hover:text-white"}`}
									onClick={() => setIsOpen(false)}
								>
									{label}
								</NavLink>
							))}

							{/* Mobile Resources Menu */}
							<div className="w-full border-b border-white/10">
								<div className="text-white/90 py-4 text-xl">Resources</div>
								{resourcesItems.map(({ href, label }) => (
									<Link
										key={href}
										to={href}
										className="block w-full py-2 text-lg text-white/70 hover:text-white pl-4"
										onClick={() => setIsOpen(false)}
									>
										{label}
									</Link>
								))}
							</div>

							<NavLink
								to={isHomepage ? "#contact" : "/#contact"}
								sectionId={isHomepage ? "contact" : undefined}
								className="micro-interaction w-full py-4 text-xl text-white mt-4"
								onClick={() => setIsOpen(false)}
							>
								<Button variant="primary" size="sm" className="w-full">
									Contact Us
								</Button>
							</NavLink>
						</nav>
					</Container>
				</div>
			)}
		</header>
	);
};

export default Header;
