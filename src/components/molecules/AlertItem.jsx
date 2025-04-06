import Heading from "../atoms/Heading";
import Image from 'next/image';
import TypesOfAlerts  from "../atoms/AlertTypes";

const AlertItem = ({ type, title, timestamp }) => {
    const config = TypesOfAlerts[type] || TypesOfAlerts.warning;

    return (
        <div className={`flex items-center p-4 mb-4 rounded-lg ${config.backgroundColor}`}>
            <div className="mr-4">
                <Image src={config.icon} alt={`${type} icon`} width={48} height={48} className="rounded-full" priority />
            </div>
            <div className="flex-grow">
                <Heading level="h3" children={title} className={`text-lg font-bold ${config.color}`} />
            </div>
            <p className={`text-right text-sm ${config.color}`}>{timestamp}</p>
        </div>
    );
};

export default AlertItem;