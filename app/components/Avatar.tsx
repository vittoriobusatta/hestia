'use client';

import Image from "next/image";
import placeholder from "../../public/placeholder.svg";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return ( 
    <Image 
      height="30" 
      width="30" 
      alt="Avatar" 
      src={src || placeholder}
      style={
        {
          borderRadius: "100%",
        }
      }
    />
   );
}
 
export default Avatar;