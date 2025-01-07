import Timer from "./timer";

const Header = () => {
  return (
    <div className="bg-blue-700 flex items-center justify-between text-white text-3xl px-4 py-2 border-b w-full">
      <div className="font-semibold">CAT</div>
      <div className="font-extrabold">Basic Funda</div>
      <div className="font-semibold text-base">
        <Timer />
      </div>
    </div>
  );
};

export default Header;
