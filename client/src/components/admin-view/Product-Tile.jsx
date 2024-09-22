import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative group">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            className="bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900 text-white transition-colors duration-300"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2 mt-2 truncate">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0
                ? "line-through text-gray-500"
                : "text-primary"
            } text-lg font-semibold`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold text-green-600">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center p-4 bg-gray-50">
        <Button
          variant="outline"
          className="bg-gradient-to-l from-orange-600 to-red-600 hover:bg-gradient-to-r from-orange-600 to-red-600 text-white transition-colors duration-300"
          onClick={() => handleDelete(product?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
