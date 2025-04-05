// components/MenuItem.jsx
import Link from 'next/link';
import { IconType } from 'react-icons'; // Type pour les icônes

const MenuItem = ({
  icon: Icon,
  href,
  label,
  isActive = false,
}) => {
  return (
    <div className="flex items-center space-x-2 py-2 hover:bg-gray-100 transition duration-300 rounded-lg">
      <div className="flex items-center space-x-2 px-4">
        <Icon 
          className={`w-6 h-6 ${isActive ? 'text-yellow-500' : 'text-gray-500'}`}
          aria-hidden="true"
        />
        <Link href={href} passHref>
          <span
            className={`text-lg ${
              isActive ? 'text-yellow-500 font-bold' : 'text-gray-700'
            }`}
          >
            {label}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MenuItem;