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
  const router = useRouter();
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

      const prevHasFavorited = hasFavorited;
      setHasFavorited((prevHasFavorited) => !prevHasFavorited);

      try {
        let request;
        if (prevHasFavorited) {
          request = axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = axios.post(`/api/favorites/${listingId}`);
        }

        await request;
        router.refresh();
      } catch (error) {
        new Error("Something went wrong while toggling favorite" + error);
        setHasFavorited(prevHasFavorited);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
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
