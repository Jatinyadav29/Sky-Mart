import { useContext, useState, useEffect } from "react";
import { MyStore } from "../Context/MyContext";
import CartProductsCard from "../Components/CartProductsCard";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const Cart = () => {
  let { cartItems, clearCart } = useContext(MyStore);
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  );

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  useEffect(() => {
    let timer;
    if (orderPlaced) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [orderPlaced, navigate]);

  return (
    <div className="min-h-screen text-white pt-8 pb-20 max-w-6xl mx-auto px-4 space-y-8 relative">
      {orderPlaced && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="border border-zinc-800 rounded-3xl p-8 sm:p-10 bg-zinc-950/90 backdrop-blur-xl shadow-2xl text-center max-w-md w-full space-y-6 relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-[11px] font-medium text-emerald-300">
                <Sparkles className="w-3.5 h-3.5" /> Order Placed
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Thank You For Your Order!
              </h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Your items have been processed successfully. Redirecting to home
                page in{" "}
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {countdown}s
                </span>
                ...
              </p>
            </div>

            <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden border border-zinc-800">
              <div
                className="bg-emerald-400 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 3) * 100}%` }}
              />
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition active:scale-[0.98] cursor-pointer"
            >
              Return Home Now
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-400 hover:text-red-400 hover:border-red-950/60 hover:bg-red-950/20 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-zinc-800/80 rounded-3xl bg-zinc-900/30 backdrop-blur-sm p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-zinc-800/60 flex items-center justify-center text-zinc-400 border border-zinc-700/50">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Your bag is empty
          </h2>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
            Looks like you haven't added anything to your cart yet. Explore our
            products catalog.
          </p>
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition active:scale-[0.98] inline-flex items-center gap-2 mt-2 cursor-pointer shadow-md"
          >
            Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((elem) => {
              return <CartProductsCard key={elem.id} cartItems={elem} />;
            })}
          </div>

          <div className="border border-zinc-800/80 p-6 rounded-3xl bg-zinc-900/40 backdrop-blur-sm lg:sticky lg:top-24 space-y-6 shadow-2xl">
            <h2 className="text-lg font-semibold tracking-tight border-b border-zinc-800/80 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Items Subtotal ({totalQuantity})</span>
                <span className="text-white font-medium">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-4 flex justify-between items-baseline">
              <div>
                <span className="text-base font-semibold block">
                  Total Price
                </span>
                <span className="text-[10px] text-zinc-500">
                  Taxes included
                </span>
              </div>
              <span className="text-2xl font-bold text-white">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition active:scale-[0.98] cursor-pointer shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
