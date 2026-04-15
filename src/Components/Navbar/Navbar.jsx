import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // مصفوفة العناصر متغيرة بناءً على وجود التوكن
  const menuItems = token
    ? ["Home", "Profile", "Log Out"]
    : ["Home", "Login", "Register"];

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
    setIsMenuOpen(false); // قفل القائمة في الموبايل
  }

  function handleProfile() {
    navigate("/Profile");
    setIsMenuOpen(false); // قفل القائمة في الموبايل
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>

      {/* موبايل: زر القائمة الجانبية */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* موبايل: اللوجو في النص */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <Link className="font-bold text-inherit" to="/Home">Home</Link>
        </NavbarBrand>
      </NavbarContent>

      {/* ديسكتوب: القائمة العادية */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <Link className="font-bold text-inherit" to="/Home">Home</Link>
        </NavbarBrand>
      </NavbarContent>

      {/* يمين الناف بار: أزرار الدخول أو البروفايل */}
      <NavbarContent justify="end">
        {!token ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/Login">Login</Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button as={Link} color="warning" to="/Register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="User"
                size="sm"
                src=""
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem onClick={handleProfile} key="profile">
                Profile
              </DropdownItem>
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      {/* قائمة الموبايل الجانبية */}
      <NavbarMenu>
        {menuItems.map((item, index) => {
          const isLogout = item === "Log Out";
          const isProfile = item === "Profile";

          return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                style={{ cursor: "pointer" }}
                color={isLogout ? "danger" : "foreground"}
                size="lg"
                onClick={() => {
                  if (isLogout) {
                    handleLogout();
                  } else if (isProfile) {
                    handleProfile();
                  } else {
                    navigate(`/${item}`);
                    setIsMenuOpen(false);
                  }
                }}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}