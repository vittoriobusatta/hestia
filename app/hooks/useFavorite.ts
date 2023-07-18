import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();
  const [hasFavorited, setHasFavorited] = useState(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  });

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      try {
        if (hasFavorited) {
          setHasFavorited(false);
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          setHasFavorited(true);
          await axios.post(`/api/favorites/${listingId}`);
        }
      } catch (error) {
        console.log(error);
        setHasFavorited(!hasFavorited);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal]
  );

  useEffect(() => {
    const list = currentUser?.favoriteIds || [];
    setHasFavorited(list.includes(listingId));
  }, [currentUser, listingId]);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
