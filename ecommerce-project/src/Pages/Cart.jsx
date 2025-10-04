import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty 🛒</p>
        ) : (
          <>
            <div className="grid gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                 <button onClick={() => { console.log('removing', item.id); removeFromCart(item.id) 
                    toast.success("Remove from cart")
                  }}>
                     Remove
                </button>

                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <h3 className="text-2xl font-semibold">
                Total: ${total.toFixed(2)}
              </h3>
              <button
                onClick={() => {
                  alert("Checkout successful!");
                  clearCart();
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
