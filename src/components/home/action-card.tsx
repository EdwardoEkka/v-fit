const ActionCard = ({ img, name, index }: { img: string; name: string; index: number }) => {
    return (
      <div
        className={`relative w-full rounded-lg overflow-hidden ${
          index === 3 ? "md:hidden xl:block" : ""
        }`}
      >
        {/* Image Container */}
        <img
          src={img}
          alt={name}
          className="w-full h-80 object-cover"
        />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  
        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-3xl font-semibold">{name}</h3>
        </div>
      </div>
    );
  };
  
  export default ActionCard;
  