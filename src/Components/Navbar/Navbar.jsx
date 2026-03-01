import React, { useContext, useState } from "react";

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



  const menuItems = [
    "Register",
    "Login",
    "Log Out",
  ];

   const  {token , setToken}  = useContext(AuthContext)

   console.log("Token in Navbar:", token);

   

   let nav = useNavigate()

   function handalLogout(){
    localStorage.removeItem("token")
    setToken(null)
    nav("/Login")
   }

   let Profile = useNavigate()

    function handalProfile(){
      Profile("/Profile")
    }




  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
         <Link className="font-bold text-inherit" to={"/Home"}>Home</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <Link className="font-bold text-inherit" to={"/Home"}>Home</Link>
        </NavbarBrand>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        {!token && <>

          <NavbarItem className="hidden lg:flex">
            <Link to="/Login">Login</Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="warning" href="#" to={"/Register"} variant="flat">
              Sign Up
            </Button>
          </NavbarItem>

        </>}



{  token &&     <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">


            <DropdownItem onClick={handalProfile} key="logout">
              
              Profile
            </DropdownItem>
            <DropdownItem onClick={handalLogout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>}

     


      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

