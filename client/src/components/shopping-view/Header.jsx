import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import NovelleEmporiumLogo from "./Logo";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="
    text-lg font-bold
    cursor-pointer
    relative
    text-gray-800
    transition-all duration-300
    hover:text-primary
    after:content-['']
    after:absolute
    after:w-full
    after:h-0.5
    after:bg-primary
    after:bottom-0
    after:left-0
    after:scale-x-0
    after:origin-bottom-right
    after:transition-transform
    after:duration-300
    hover:after:scale-x-100
    hover:after:origin-bottom-left
  "
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        </motion.div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative group transition-all duration-300 hover:bg-primary hover:text-white bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900 text-white"
        >
          <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:bg-white group-hover:text-primary">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-primary cursor-pointer transition-transform duration-300 hover:scale-110">
            <AvatarFallback className="bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900 text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-56 animate-in slide-in-from-top-1 duration-300"
        >
          <DropdownMenuLabel className="font-semibold text-primary">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer transition-colors hover:bg-primary/10"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer transition-colors hover:bg-red-100 text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "bg-primary text-white" : "bg-background text-primary"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to="/shop/home"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            <span className="font-bold text-lg text-primary">
              <NovelleEmporiumLogo />
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden hover:bg-primary/10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
