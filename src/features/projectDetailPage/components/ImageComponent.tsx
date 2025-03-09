"use client";
import React, { useState } from "react";
import Image from "next/image";
import image_skeleton from "../../../../assets/dashboard_skeleton_image.png";
import { IImage } from "@/features/project/schemas/schema";

const ImageComponent = ({
  imagePaths,
  name,
}: {
  imagePaths: IImage[];

  name: string;
}) => {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(
    imagePaths[0] ?? null,
  );

  return (
    <section className="h-[100%] w-[100%]">
      {/* Main Image Display */}
      <div className="relative transition-all ease-in-out duration-300 mx-auto mb-[2rem] h-[350px] w-[100%] rounded-[1rem] border-[1px] border-border bg-secondaryBackgroundColor md:rounded-[15px]">
        {selectedImage ? (
          <Image
            src={selectedImage.url}
            alt={`Main image for ${name}`}
            sizes="(min-width: 768px) 100vw, 700px"
            priority
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-[15px]"
          />
        ) : (
          <Image
            src={image_skeleton}
            alt={`Placeholder image for ${name}`}
            sizes="(min-width: 768px) 100vw, 700px"
            priority
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-[15px]"
          />
        )}
      </div>

      {/* Thumbnail List */}
      <div className="flex flex-wrap items-center justify-center gap-[1rem]">
        {imagePaths.map((image, index) => (
          <div key={image.key} className="relative mb-2 h-[76px] w-[76px]">
            <Image
              src={image.url}
              alt={`Thumbnail ${name} ${index + 1}`}
              className={`cursor-pointer rounded-lg border-[1px] ${
                selectedImage?.key === image.key
                  ? "border-primary"
                  : "border-border"
              } transition ease-in-out duration-300`}
              onClick={() => setSelectedImage(image)}
              sizes="(min-width: 768px) 50vw, 100vw"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageComponent;
