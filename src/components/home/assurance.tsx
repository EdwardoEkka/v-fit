import { SiAegisauthenticator } from "react-icons/si";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { RiGuideFill } from "react-icons/ri";

const Assurance = () => {
    const assurances = [
        {
            icon: <SiAegisauthenticator size={50} color={"#C3E235"} />,
            text: "100% Authentic",
        },
        {
            icon: <RiSecurePaymentFill size={50} color={"#C3E235"} />,
            text: "Secure Shopping",
        },
        {
            icon: <FaShippingFast size={50} color={"#C3E235"} />,
            text: "Express Shipping",
        },
        {
            icon: <MdDashboardCustomize size={50} color={"#C3E235"} />,
            text: "Customized Services",
        },
        {
            icon: <RiGuideFill size={50} color={"#C3E235"} />,
            text: "Buyers Guide",
        },
    ];

    return (
        <div className="w-full bg-gray-600 py-8">
            <div className="container grid sm:grid-cols-5 grid-cols-1 gap-4 sm:gap-0 text-white sm:justify-between py-6 items-center">
                {assurances.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-2 font-medium"
                    >
                        {item.icon}
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assurance;
