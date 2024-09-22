import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-xl">
      <div className="grid gap-6 p-6">
        <div className="grid gap-4 bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Order Summary
          </h2>
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
            <div
              key={label}
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-200"
            >
              <p className="font-medium text-gray-700">{label}</p>
              <Label className="text-gray-900">{value}</Label>
            </div>
          ))}
          <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-200">
            <p className="font-medium text-gray-700">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-white ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-blue-500"
                } transition-all duration-300 transform hover:scale-105`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="bg-gray-300" />
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-bold text-lg text-blue-600 mb-2">
            Order Details
          </h3>
          <ul className="grid gap-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span>Qty: {item.quantity}</span>
                    <span className="font-semibold">${item.price}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-bold text-lg text-blue-600 mb-2">
            Shipping Info
          </h3>
          <div className="grid gap-1 text-gray-700">
            <span className="font-medium">{user.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>
              {orderDetails?.addressInfo?.city},{" "}
              {orderDetails?.addressInfo?.pincode}
            </span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span className="text-sm italic">
              {orderDetails?.addressInfo?.notes}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
