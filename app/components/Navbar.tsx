export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#" className="font-bold text-2xl text-gray-800 no-underline">My Website</a>
      <nav className="hidden md:flex">
        <a href="#" className="text-gray-600 hover:text-gray-800 text-sm p-3">Home</a>
        <a href="#" className="text-gray-600 hover:text-gray-800 text-sm p-3">About</a>
        <a href="#" className="text-gray-600 hover:text-gray-800 text-sm p-3">Contact</a>
      </nav>
      <button className="md:hidden text-gray-600 hover:text-gray-800 p-3" type="button">Menu</button>
    </div>
  </header>
  );
}