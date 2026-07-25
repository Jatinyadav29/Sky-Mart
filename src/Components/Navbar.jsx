import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  ShoppingCart,
  LogOut,
  ChevronsLeftRightEllipsisIcon,
  AlertTriangle,
} from "lucide-react";
import { MyStore } from "../Context/MyContext";

const Navbar = () => {
  let { setCurrentUser, currentUser, clearCart, cartItems } =
    useContext(MyStore);
  let navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    if (cartItems && cartItems.length > 0) {
      setShowLogoutModal(true);
    } else {
      confirmLogout();
    }
  };

  const confirmLogout = () => {
    setCurrentUser(null);
    clearCart();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartItems");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      <nav className="mx-auto max-w-6xl w-full flex items-center justify-between px-6 py-2.5 border border-zinc-800/80 rounded-full bg-zinc-900/50 text-white sticky top-4 z-50 backdrop-blur-md shadow-2xl">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-md transition-transform duration-300 group-hover:scale-105">
            <ChevronsLeftRightEllipsisIcon />
          </div>
          <span className="font-semibold text-sm tracking-wide text-white select-none">
            201<span className="text-zinc-400 font-normal">Mart</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`
            }
          >
            About
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          {currentUser && (
            <div className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/60 text-xs font-medium text-zinc-300">
              <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center text-[10px] uppercase font-bold">
                {currentUser?.name?.[0] || "U"}
              </div>
              <span className="max-w-25 truncate">
                {currentUser?.name || "User"}
              </span>
            </div>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `p-2.5 rounded-full border transition-all duration-200 flex items-center justify-center relative ${
                isActive
                  ? "bg-white text-black border-white"
                  : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700"
              }`
            }
            title="Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </NavLink>

          <button
            onClick={handleLogoutClick}
            className="p-2.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-red-400 hover:border-red-950/60 hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="border border-zinc-800/80 rounded-3xl p-6 sm:p-8 bg-zinc-950/90 backdrop-blur-xl shadow-2xl text-center max-w-sm w-full space-y-5 relative">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Clear Cart & Logout?
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Logging out will clear all{" "}
                <span className="text-white font-medium">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>{" "}
                currently in your shopping bag.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-1/2 py-2.5 rounded-full text-xs font-semibold border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700 transition active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="w-1/2 py-2.5 rounded-full text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition active:scale-95 cursor-pointer shadow-lg shadow-red-500/20"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
