import React from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Sparkles, Compass } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] relative flex flex-col items-center justify-center p-4 text-white text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-black pointer-events-none" />

      <div className="relative z-10 border border-zinc-800/80 rounded-3xl p-8 sm:p-14 bg-zinc-950/80 backdrop-blur-xl shadow-2xl max-w-lg w-full space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center shadow-xl">
          <Compass
            className="w-6 h-6 text-zinc-300 animate-spin"
            style={{ animationDuration: "12s" }}
          />
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-zinc-800 bg-zinc-900/60 text-zinc-400">
            Error 404
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white pt-2">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-xs mx-auto">
            The coordinate or route you are looking for does not exist or has
            been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" /> Return Home
          </Link>
        </div>
      </div>

      <div className="relative z-10 pt-8 text-[11px] text-zinc-600 font-mono tracking-widest">
        201MART • ROUTE_EXCEPTION_HANDLER
      </div>
    </div>
  );
};

export default NotFound;
