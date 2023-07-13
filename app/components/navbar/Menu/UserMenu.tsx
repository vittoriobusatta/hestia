"use client";

import React, { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "../../../types/index";
import useLoginModal from "../../../hooks/useLoginModal";
import useRegisterModal from "../../../hooks/useRegisterModal";
import MenuItem from "./MenuItem";
import Avatar from "../../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  

  return (
    <div className="user">
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
          <div className="user-connect-list">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
