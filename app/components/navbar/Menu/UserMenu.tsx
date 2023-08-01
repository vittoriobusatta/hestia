"use client";

import React, { useCallback, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "../../../types/index";
import useLoginModal from "../../../hooks/useLoginModal";
import useRegisterModal from "../../../hooks/useRegisterModal";
import MenuItem from "./MenuItem";
import Avatar from "../../Avatar";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (currentUser) {
      return rentModal.onOpen();
    }
  }, [currentUser, rentModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof Element &&
        !event.target.closest(".user-connect")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="user">
      <MenuItem
        label="Louer votre bien"
        onClick={onRent}
        className="rent__button"
      />
      <div className="user-menu">
        <button className="user-menu-container" onClick={toggleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="burger-icon"
          >
            <g fill="none">
              <path d="M2 16h28M2 24h28M2 8h28"></path>
            </g>
          </svg>
          <div className="button-menu">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="user-connect">
          <ul className="user-connect-list">
            {currentUser ? (
              <>
                <MenuItem
                  label="Voyages"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="Favoris"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="Réservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="
                    Propriétés
                  "
                  onClick={() => router.push("/properties")}
                />
                <MenuItem
                  label="
                  Louer votre bien
                "
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem
                  label="
                  Déconnexion
                "
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="
                  S'inscrire
                "
                  onClick={registerModal.onOpen}
                />
                <MenuItem
                  label="
                  Se connecter
                "
                  onClick={loginModal.onOpen}
                />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
