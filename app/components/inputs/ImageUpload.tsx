"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { FiLoader } from "react-icons/fi";

declare global {
  var cloudinary: any;
}

const uploadPreset = "wz5varom";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback(
    (result: any) => {
      setLoading(true);
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open();
        }
        return (
          <div
            className={`modal__image__upload ${
              value ? "modal__image__upload--filled" : ""
            }`}
            onClick={handleOnClick}
          >
            {loading ? (
              <>
                <FiLoader size={50} />
                <div>Uploading...</div>
              </>
            ) : (
              <> 
                <TbPhotoPlus size={50} />
                <div>Click to upload</div>
              </>
            )}
            {value && (
              <div>
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="House"
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
