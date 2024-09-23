import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <Card className="p-10 max-w-md w-full bg-white shadow-xl rounded-xl">
        <CardHeader className="p-0 mb-6 text-center">
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been processed.
          </p>
        </CardHeader>
        <Button
          className="w-full py-3 bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900  text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
        <p className="text-center text-sm text-gray-500 mt-4">
          A confirmation email has been sent to your registered email address.
        </p>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
