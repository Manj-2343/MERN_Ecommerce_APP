import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Order Summary
          </h3>
          <div className="grid gap-3">
            {[
              { label: "Order ID", value: orderDetails?._id },
              {
                label: "Order Date",
                value: orderDetails?.orderDate.split("T")[0],
              },
              { label: "Order Price", value: `$${orderDetails?.totalAmount}` },
              { label: "Payment Method", value: orderDetails?.paymentMethod },
              { label: "Payment Status", value: orderDetails?.paymentStatus },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <p className="font-medium text-gray-600">{label}</p>
                <Label className="font-semibold text-gray-800">{value}</Label>
              </div>
            ))}
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium text-gray-600">Order Status</p>
              <Badge
                className={`py-1 px-3 text-white font-semibold ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-blue-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Order Details
          </h3>
          <ul className="grid gap-4">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails?.cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                >
                  <span className="font-medium text-gray-700">
                    {item.title}
                  </span>
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-semibold text-gray-800">
                    ${item.price}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No items in this order.</p>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Shipping Information
          </h3>
          <div className="grid gap-2 text-gray-700">
            <p className="font-semibold">{user.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>
              {orderDetails?.addressInfo?.city},{" "}
              {orderDetails?.addressInfo?.pincode}
            </p>
            <p>Phone: {orderDetails?.addressInfo?.phone}</p>
            {orderDetails?.addressInfo?.notes && (
              <p className="mt-2 italic text-gray-600">
                Notes: {orderDetails?.addressInfo?.notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
