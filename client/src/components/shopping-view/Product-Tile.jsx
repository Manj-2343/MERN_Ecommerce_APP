import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4 bg-gradient-to-b from-gray-50 to-white">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-gray-600">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-gray-600">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              } text-lg font-semibold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-green-600">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="bg-gray-100 rounded-b-lg">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed bg-gray-300 text-gray-600">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-slate-900 hover:bg-slate-700 text-white transition-colors duration-300 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
