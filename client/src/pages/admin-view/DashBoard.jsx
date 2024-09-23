import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { ImageIcon, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Upload Feature Image
          </h2>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
          />
          <Button
            onClick={handleUploadFeatureImage}
            className="mt-5 w-full bg-gradient-to-l from-slate-800 to-purple-900 hover:bg-gradient-to-r from-slate-800 to-purple-900  text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </CardContent>
      </Card>

      {featureImageList && featureImageList.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Feature Images
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureImageList.map((featureImgItem, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={featureImgItem.image}
                  alt={`Feature image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Image {index + 1}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {(!featureImageList || featureImageList.length === 0) && (
        <Card className="text-center p-8">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            No feature images uploaded yet
          </p>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard;
