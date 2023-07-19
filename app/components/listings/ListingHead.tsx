"use client";

import Image from "next/image";
import { SafeListing, SafeUser } from "@/app/types";
import Avatar from "../Avatar";

interface ListingHeadProps {
  listing: SafeListing;
  user: SafeUser;
}

const ListingHead: React.FC<ListingHeadProps> = ({ listing, user }) => {
  const { imageSrc, title, locationValue } = listing;
  const { name, image } = user;

  return (
    <section className="listing__h">
      <Image
        className="listing__image"
        src={imageSrc}
        alt={title}
        height={400}
        width={400}
      />
      <div className="listing__head">
        <div className="listing__head__left">
          <h1>{title}</h1>
          <p>{locationValue}</p>
        </div>
        <div className="listing__head__right">
          <h2>
            Hosted by <span>{name?.split(" ")[0]}</span>
          </h2>
          <Avatar src={image} />
        </div>
      </div>
      <hr />
    </section>
  );
};

export default ListingHead;
