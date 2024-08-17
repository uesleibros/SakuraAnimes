"use client";

import { useState } from "react";
import Image from "next/image";

export default function CustomImage({ alt, src, placeholderImage, onClick, ...props }) {
	const [image, setImage] = useState((src && src) || "");
	return (
		<Image
			{...props}
			src={image}
			onError={() => {
        if (placeholderImage) {
          setImage(placeholderImage);
        }
      }}
		/>
	);
}