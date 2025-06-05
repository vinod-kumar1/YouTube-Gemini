import { Link } from "react-router";

const Sidebar = ({ sidebar }) => {
  return (
    <div
      className={`absolute top-20 left-0 bg-black px-1 h-screen z-30 ${
        sidebar ? "w-40" : "w-10"
      } ${!sidebar && "bg-transparent"}`}
    >
      {sidebar && (
        <div
          className={
            "text-white hover:text-red-500 *:cursor-pointer flex mt-4 relative left-2"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 z-3 -left-2 relative hover:underline"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="">
            <Link to="/">Home</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
