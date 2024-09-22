import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-24 h-24 rounded-md object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="flex-1">
        <h3 className="font-extrabold text-lg text-gray-800 mb-2">
          {cartItem?.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-full p-1 w-fit">
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900 text-white transition-colors duration-300"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold  text-lg w-8 text-center">
            {cartItem?.quantity}
          </span>
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900 text-white hover:text-white transition-colors duration-300"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-lg text-primary">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          className="mt-2  text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors duration-300"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash className="w-5 h-5 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
