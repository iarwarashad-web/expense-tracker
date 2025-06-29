export default function InfoCard({ icon, label, value, color = "purple", date, deleteIcon, deleteItem }) {
  const colorMap = {
    purple: "bg-purple-700",
    green: "bg-green-700",
    red: "bg-red-700",
    blue: "bg-blue-700",
  };

  const bgColor = colorMap[color] || "bg-purple-700";

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 mb-4 w-full hover:scale-105 transition duration-300">
      
      {/* Left content */}
      <div className="flex gap-3 items-center">
        <div className={`p-2 shadow rounded-full text-white text-4xl ${bgColor}`}>
          {icon}
        </div>
        <div>
          <h6 className="font-bold text-xl">{label}</h6>
          <span className="text-lg">${value}</span>
    { date&&     <p className="text-sm text-gray-500 font-bold">
            {new Date(date).toLocaleDateString()}
          </p>}
        </div>
      </div>

      {/* Right delete icon */}
      <button onClick={deleteItem} className={`p-2  text-red-600 text-2xl cursor-pointer }`}>
        {deleteIcon}
      </button>
    </div>
  );
}
