import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-400 to-purple-500">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-slate-800 text-white p-6">
          <CardTitle className="text-2xl font-bold text-center">
            Processing Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-slate-800 animate-spin mb-4" />
            <p className="text-lg text-gray-700 text-center">
              Please wait while we process your payment...
            </p>
            <p className="text-sm text-gray-500 mt-4 text-center">
              This may take a few moments. Do not close or refresh this page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
