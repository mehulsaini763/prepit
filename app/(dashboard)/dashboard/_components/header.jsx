import Menu from "@/app/(dashboard)/dashboard/_components/menu";
const Header = () => {
  return (
    <div className="flex items-center justify-between text-xl font-semibold px-4 sm:px-8 py-4 shadow-sm">
      PrepIt!
      <Menu />
    </div>
  );
};

export default Header;
