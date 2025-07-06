import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import CartItem from "../../components/CartItem/CartItem";
import { setCartItems } from "../../../core/redux/CartSlice/CartSlice";


const DELIVERY_FEE = 2000;
const TAX_RATE = 0.1;

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.ui); // assumed central product list

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { subtotal, tax, delivery, total } = useMemo(() => {
    let subtotal = 0;
    items.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (product) {
        subtotal += product.price * cartItem.quantity;
      }
    });

    const tax = subtotal * TAX_RATE;
    const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
    const total = Math.round(subtotal + tax + delivery);

    return { subtotal, tax, delivery, total };
  }, [items, products]);

  return (
    <div className="cart min-h-screen bg-tertiary">
      <div className="content pt-20 flex flex-wrap-reverse containers m-auto min-h-screen h-screen">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="left h-full w-full md:w-1/5 md:border-r-2 border-primary flex flex-col content-end"
        >
          <div className="content mt-4 mr-4 flex flex-col gap-5">
            <div className="flex sm:flex-col justify-between items-start">
              <h1 className="font-bold text-2xl">Subtotal:</h1>
              <h1 className="text-secondary font-bold text-2xl sm:mx-auto">
                {subtotal}
              </h1>
            </div>
            <div className="flex sm:flex-col justify-between items-start">
              <h1 className="font-bold text-2xl">Tax:</h1>
              <h1 className="text-secondary font-bold text-2xl sm:mx-auto">
                {tax}
              </h1>
            </div>
            <div className="flex sm:flex-col justify-between items-start">
              <h1 className="font-bold text-2xl">Delivery:</h1>
              <h1 className="text-secondary font-bold text-2xl sm:mx-auto">
                {delivery}
              </h1>
            </div>
            <hr className="h-0.5 bg-gray-200 w-5/6 mx-auto" />
            <div className="flex sm:flex-col justify-between items-start">
              <h1 className="font-bold text-2xl">Total:</h1>
              <h1 className="text-secondary font-bold text-2xl sm:mx-auto">
                {total}
              </h1>
            </div>
            <button className="h-10 w-full m-auto bg-secondary text-tertiary rounded-lg hover:opacity-95 active:opacity-85">
              Confirm Order
            </button>
          </div>
        </motion.div>

        <div className="right w-full md:w-4/5 flex">
          {items.length > 0 ? (
            <div className="content flex flex-col w-full text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="titles flex"
              >
                <div className="item border-r border-gray-300 w-1/4">Item</div>
                <div className="price border-r border-gray-300 w-1/4">Price</div>
                <div className="quantity border-r border-gray-200 w-1/4">Quantity</div>
                <div className="total border-r border-gray-200 w-1/4">Total</div>
              </motion.div>

              <div className="items">
                {items.map((cartItem, index) => {
                  const product = products.find(
                    (p) => p.id === cartItem.productId
                  );
                  if (!product) return null;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <CartItem
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        quantity={cartItem.quantity}
                        id={product.id}
                        collectionName={product.category || "general"}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h1 className="text-center w-full text-xl font-semibold py-10">
              No items in your cart
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
