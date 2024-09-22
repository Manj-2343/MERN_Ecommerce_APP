import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] bg-gradient-to-br from-gray-50 via-white to-purple-50 rounded-2xl shadow-2xl">
        <div className="relative overflow-hidden rounded-2xl shadow-lg group max-w-md mx-auto">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={300}
            height={300}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mb-6 leading-relaxed">
              {productDetails?.description}
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <p
                className={`text-4xl font-bold ${
                  productDetails?.salePrice > 0
                    ? "text-gray-400 line-through"
                    : "text-slate-800"
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-3xl font-bold text-green-600">
                  ${productDetails?.salePrice}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview} />
              </div>
              <span className="text-gray-500 text-lg">
                ({averageReview.toFixed(2)})
              </span>
            </div>
            <div>
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-80 cursor-not-allowed bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 text-lg shadow-lg">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 text-lg shadow-lg transform hover:scale-105"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
          <Separator className="my-10" />
          <div className="max-h-[450px] overflow-auto pr-4 custom-scrollbar">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Reviews</h2>
            <div className="grid gap-8">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div
                    key={reviewItem.id}
                    className="flex gap-6 bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <Avatar className="w-16 h-16 border-3 border-purple-200">
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white text-xl font-bold">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-xl text-gray-800">
                          {reviewItem?.userName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-500 italic text-xl">No Reviews Yet</h1>
              )}
            </div>
            <div className="mt-12 flex-col flex gap-6">
              <Label className="text-2xl font-semibold text-gray-800">
                Write a review
              </Label>
              <div className="flex gap-3">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Share your thoughts..."
                className="py-3 px-5 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 text-lg"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 disabled:opacity-50 text-lg shadow-md transform hover:scale-105"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
