import { ErrorMessage } from "formik";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

import { getCroppedImg } from "../utils/cropImage";

const ProfilePicModal = ({ isOpen, onClose, setFieldValue, setPreview2, name }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [preview, setPreview] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageDataUrl = URL.createObjectURL(file);
      setImageSrc(imageDataUrl);
      setPreview(null);
    }
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setPreview(croppedImage);
      setPreview2(croppedImage);
      setFieldValue(name, croppedImage);
      onClose();
    } catch (e) {
      console.error("Cropping failed:", e);
    }
  };

  const handleRemove = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setPreview(null);
    setPreview2(null);
    setFieldValue(name, null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Upload & Crop Profile Photo</h3>

        {!imageSrc ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        ) : (
          <div className="relative h-64 w-full bg-gray-200">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1} // square crop for circular display
              cropShape="round" // makes the overlay circle
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        {preview && (
          <img src={preview} alt="preview" className="mx-auto mt-4 h-32 w-32 rounded-full object-cover" />
        )}

        <div className="mt-4 flex justify-end gap-3">
          {imageSrc && (
            <>
              <button
                onClick={handleCropSave}
                className="rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
              >
                Save
              </button>
              <button
                onClick={handleRemove}
                className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
              >
                Remove & Start Again
              </button>
            </>
          )}
          <button onClick={onClose} className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
            Cancel
          </button>
        </div>
        <ErrorMessage name={name} component="div" className="mt-2 text-sm text-red-500" />
      </div>
    </div>
  );
};

export default ProfilePicModal;
