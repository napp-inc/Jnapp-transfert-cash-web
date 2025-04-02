import Image from 'next/image';
import Link from 'next/link';
const MenuItem = ({ src, alt, href, label, isActive }) => {
	return (
		<div className="flex items-center space-x-2 py-2 hover:bg-gray-100 transition duration-300">
			<Image src={src} alt={alt} width={24} height={24} className="w-6 h-6" loading="lazy" />
			<Link href={href} passHref>
				<span className={`text-lg ${isActive ? 'text-yellow-500 font-bold' : 'text-gray-700'}`}>{label}</span>
			</Link>
		</div>
	);
};

export default MenuItem;