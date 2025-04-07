// MenuItem.jsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuItem({
	icon: Icon,
	href,
	label,
	rightIcon: RightIcon,
	onClick,
	className = ""
}) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<div
			className={`flex items-center space-x-2 py-2 hover:bg-gray-100 transition duration-300 rounded-lg ${className}`}
			onClick={onClick} // Handle click events
		>
			<div className="flex items-center space-x-2 px-4 w-full">
				<Icon
					className={`w-6 h-6 ${isActive ? 'text-[rgba(245,158,11)]' : 'text-gray-500'}`}
					aria-hidden="true"
				/>
				<Link href={href} passHref>
					<span
						className={`text-lg flex-1 ${isActive ? 'text-[rgba(245,158,11)] font-bold' : 'text-gray-700'}`}
					>
						{label}
					</span>
				</Link>
				{RightIcon && (
					<RightIcon className="w-4 h-4 text-gray-500" />
				)}
			</div>
		</div>
	);
};
