import React, { useEffect } from "react";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AdminDashboard from "./pages/admin-view/DashBoard";
import AdminProducts from "./pages/admin-view/Products";
import AdminOrders from "./pages/admin-view/Orders";
import AdminFeatures from "./pages/admin-view/Features";
import AdminLayout from "./components/admin-view/Layout";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import ShoppingAccount from "./pages/shopping-view/Account";
import PaypalReturnPage from "./pages/shopping-view/Paypal-Return";
import PaymentSuccessPage from "./pages/shopping-view/Payment-Success";
import SearchProducts from "./pages/shopping-view/Search";
// import ShoppingLayout from "./components/shopping-view/Layout";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/Check-Auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import Footer from "./components/footer/Footer";
import ShoppingLayout from "./components/shopping-view/Layout";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const shouldShowFooter = () => {
    if (!isAuthenticated) return false;
    if (user?.role === "admin" && location.pathname.includes("shop"))
      return false;
    if (user?.role !== "admin" && location.pathname.includes("admin"))
      return false;
    return true;
  };
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        {/* Your other components and routes */}
        {shouldShowFooter() && <Footer />}
      </CheckAuth>
    </div>
  );
};

export default App;
