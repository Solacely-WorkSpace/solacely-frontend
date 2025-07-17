import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const countries = [
	{
		name: "Global",
		icon: "/icons/CountryFlags/Global.svg",
		active: true,
		comingSoon: false,
	},
	{
		name: "Nigeria",
		icon: "/icons/CountryFlags/nigeria.svg",
		active: true,
		comingSoon: false,
	},
	{
		name: "South Africa",
		icon: "/icons/CountryFlags/south-africa.svg",
		active: false,
		comingSoon: true,
	},
	{
		name: "Ghana",
		icon: "/icons/CountryFlags/ghana.svg",
		active: false,
		comingSoon: true,
	},
	{
		name: "Kenya",
		icon: "/icons/CountryFlags/kenya.svg",
		active: false,
		comingSoon: true,
	},
    {
        name: "Uganda",
        icon: "/icons/CountryFlags/uganda.svg",
        active: false,
        comingSoon: true,
    },
    {
        name: "Rwanda",
        icon: "/icons/CountryFlags/rwanda.svg",
        active: false,
        comingSoon: true,
    },
];

function CountryDropdown() {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(countries[0]);
	const dropdownRef = useRef(null);

	// Detect country on mount
	useEffect(() => {
		async function detectCountry() {
			try {
				const res = await fetch("https://ipapi.co/json/");
				const data = await res.json();
				const countryName = data.country_name;
				// Try to match country name
				const found = countries.find(
					(c) => c.name.toLowerCase() === countryName.toLowerCase()
				);
				if (found && found.active) {
					setSelected(found);
				}
			} catch (e) {
				// fallback: do nothing, keep Global
			}
		}
		detectCountry();
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				className="flex items-center gap-2 px-4 py-3 rounded-lg  bg-white shadow-sm hover:bg-gray-50 min-w-[110px]"
				onClick={() => setOpen((o) => !o)}
			>
				<Image
					src={selected.icon}
					alt={selected.name}
					width={20}
					height={20}
                    className="w-4 h-4"
				/>
				<span className="font-medium text-base">{selected.name}</span>
				<svg
					className="w-4 h-4 ml-1 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{open && (
				<div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
					<ul className="py-2">
						{countries.map((country, idx) => (
							<li
								key={country.name}
								className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-purple-50 transition-colors ${
									country.active ? "" : "opacity-60"
								}`}
								onClick={() => {
									if (country.active) {
										setSelected(country);
										setOpen(false);
									}
								}}
							>
								<Image
									src={country.icon}
									alt={country.name}
									width={24}
									height={24}
                                    className="w-5 h-5"
								/>
								<span className="font-medium text-base">
									{country.name}
								</span>
								{country.name === "Global" && (
									<span className="ml-auto w-2 h-2 bg-primary rounded-full"></span>
								)}
								{country.comingSoon && (
									<span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
										Coming Soon
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default CountryDropdown;
