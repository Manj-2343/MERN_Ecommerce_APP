import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ShoppingBag } from "lucide-react";
import UserCartItemsContent from "./Cart-Items-Content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50">
      <SheetHeader className="border-b pb-4">
        <SheetTitle className="text-2xl font-bold text-primary">
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <ScrollArea className="mt-6 h-[calc(100vh-250px)]">
        <div className="space-y-6">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, i) => (
              <UserCartItemsContent key={i} cartItem={item} />
            ))
          ) : (
            <div className="text-center text-gray-500">Your cart is empty</div>
          )}
        </div>
      </ScrollArea>
      <div className="mt-6 space-y-4">
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-xl font-bold text-primary">
            ${totalCartAmount}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900 text-white transition-colors duration-300"
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
