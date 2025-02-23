import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    addCart,
    removeCart,
    updateQuantity,
  } from "../redux/slices/CartSlice.js";
import { toast } from "react-toastify";

const PageNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.caloriesPerServing * item.quantity,
    0
  );

  const menuItems = [
    { name: "Home", hasSubmenu: true, to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "Pages", hasSubmenu: true, to: "/" },
    { name: "Blog", hasSubmenu: true, to: "/" },
    { name: "On Sale", to: "/" },
    { name: "About Us", to: "/" },
    { name: "Contact", to: "/" },
  ];
  const submenus = {
    Home: [
      { name: "Home2", to: "/" },
      { name: "Home3", to: "/" },
      { name: "Home4", to: "/" },
      { name: "Home5", to: "/" },
    ],
    Pages: [
      { name: "FAQ", to: "/" },
      { name: "Privacy Policy", to: "/" },
      { name: "Terms of Service", to: "/" },
    ],
    Blog: [
      { name: "Latest News", to: "/" },
      { name: "Fashion Tips", to: "/" },
      { name: "Trends", to: "/" },
    ],
  };
  
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this product from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCart(id));
        Swal.fire("Removed!", "The product has been removed.", "success");
      }
    });
  };

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto px-[15px] pt-10 relative bg-transparent">
        {/* first part */}
        <div className="w-full lg:flex hidden border-b border-gray-300 z-50 bg-white">
          <div className="w-1/2 text-[#747474] text-[14px] py-3 pl-5">
            New Offers This Weekend only to{" "}
            <span className="text-[#8ba73b]">Get 50%</span> Flate
          </div>
          <div className="w-1/2 flex items-end justify-end pr-5">
            <ul className="flex space-x-6">
              <li className="flex items-center gap-1 px-2 border-l text-sm">
                <IoLocationSharp className="text-[#767676]" />
                <span className="text-[#747474] py-3">Store location</span>
              </li>
              <li className="flex items-center gap-1 px-2 border-l text-sm">
                <FaHeadphones className="text-[#767676]" />
                <span className="text-[#747474] py-3">
                  (+048) - 1800 33 689
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* second part */}
        <div className="mx-auto lg:flex flex-row hidden items-center justify-start gap-0 bg-white w-full z-50">
          <div className="w-[21.35%] h-full flex justify-start">
            <Link to="/" className="w-full pl-[30px]">
              <img
                src="/images/logo-black.svg"
                alt="Logo"
                className="h-auto w-[192px]"
              />
            </Link>
          </div>

          <div className="w-[78.65%] pb-3 pt-7 px-[30px] flex flex-col gap-4 border-l border-gray-300">
            {/* Menu Items */}
            <div className="px-[5px] flex 2xl:flex-row 2xl:justify-between lg:gap-2 lg:flex-col lg:items-start">
              <div className="relative w-[680px]">
                <input
                  type="email"
                  placeholder="Search among 1000,000 products..."
                  className="w-full py-[14px] px-6 text-sm border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#8ba73b] focus:border-transparent"
                />
                <button className="absolute text-sm font-bold right-2 top-1/2 transform -translate-y-1/2 bg-[#8ba73b] text-white px-7 py-[9px] rounded-3xl hover:bg-[#7a9732] transition-colors duration-300">
                  Search
                </button>
              </div>
              <div className="w-auto flex items-center justify-center gap-3 text-[#27272f]">
                {/* Group container for login with hover to show the form */}
                <div className="relative group p-2">
                  <Link to="/login" className="group">
                    <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                      <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
                        <GoPerson className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                      </div>
                      <div className="leading-5 text-[14px] font-bold">
                        Login <span className="text-[#8ba73b]">or</span>
                        <br /> Register{" "}
                      </div>
                    </div>
                  </Link>

                  {/* Hidden form that appears on hover */}
                  <div className="absolute z-50 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg p-6 rounded-md w-[300px] transition-opacity duration-500 ease-in-out">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[#000] text-2xl">Signin</span>
                      <span className="text-[#8ba73b] text-sm">
                        create and account
                      </span>
                    </div>
                    <hr className="bg-black h-[2px] mb-4" />
                    <form className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="username"
                        className="text-sm text-gray-700 w-full"
                      >
                        Username or Email
                        <input
                          type="text"
                          placeholder="Username or email"
                          className="px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:outline-none w-full"
                        />
                      </label>
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-700 w-full"
                      >
                        password
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:outline-none"
                        />
                      </label>
                      <button className="bg-[#8ba73b] mt-2 text-white px-4 py-3 rounded-3xl transition-all duration-300 ease-in-out">
                        Login
                      </button>
                      <Link to={"/"} className="text-[#8ba73b] text-sm mt-2">
                        Lost you password?
                      </Link>
                    </form>
                  </div>
                </div>

                <div className="relative group p-2">
                  <Link to="/wishlist" className="group">
                    <div className="flex items-center gap-3 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                      <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
                        <CiHeart className="text-3xl text-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out" />
                        <div className="absolute top-0 -right-3 w-6 h-6 bg-orange-400 text-white text-xs flex justify-center items-center rounded-full">
                          0
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="relative group p-2">
                  <Link to="/cart" className="group">
                    <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                      <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                        <IoBagHandleOutline className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                        <div className="absolute top-0 -right-3 w-6 h-6 bg-[#8ba73b] text-white text-xs flex justify-center items-center rounded-full">
                          {/* {cart.length || 0} */}
                          {cart?.length ?? 0}
                        </div>
                      </div>
                      <div className="leading-5 text-sm ml-1">
                        {/* ${totalAmount.toFixed(2) || 0} */}$
                        {totalAmount?.toFixed(2) ?? "0.00"}
                      </div>
                    </div>
                  </Link>

                  {/* Hidden form that appears on hover */}
                  <div className="absolute z-50 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-md w-[330px] transition-opacity duration-500 ease-in-out">
                    <h3 className="text-[16px] text-[#000] border-b flex items-center justify-end px-5 py-4">
                      <span className="mr-2">Subtotal:</span>
                      <span className="text-[#000] font-semibold">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </h3>
                    <div className="mt-2 space-y-3">
                      {cart.length > 0 ? (
                        cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between border-b text-[#000] px-5 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded-md"
                              />
                              <div>
                                <p className="text-[15px] font-semibold pb-1">
                                  {item.name}
                                </p>
                                <p className="text-gray-500 text-[15px]">
                                  {item.quantity}{" "}
                                  <RxCross2
                                    size={13}
                                    className="inline-block"
                                  />
                                  <span className="text-[#D48D3D]">
                                    {" "}
                                    ${item.caloriesPerServing.toFixed(2) || 0}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-black text-sm"
                            >
                              <RxCross2 />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">
                          Your cart is empty
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between px-5 py-4">
                      <Link
                        to="/cart"
                        className="px-4 py-2 border bg-[#fff] text-[#8ba73b] hover:bg-[#728a31] hover:text-[#fff] rounded-3xl text-sm transition-all duration-500"
                      >
                        View Cart
                      </Link>
                      <button className="px-4 py-2 bg-[#8ba73b] text-white hover:bg-[#728a31] rounded-3xl text-sm">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="flex text-[16px] mb-2">
              {/* Home  */}
              <li className="relative group">
                <Link
                  to={"/"}
                  className="text-[#000] py-[10px] px-[15px] cursor-pointer font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                >
                  Home
                  <RiArrowDropDownLine className="inline-block" />
                </Link>
                <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-0 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link to={"/"}>Home 2</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link to={"/"}>Home 3</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link to={"/"}>Home 4</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link to={"/"}>Home 5</Link>
                  </li>
                </ul>
              </li>

              {/* Shop */}
              <li className="relative group">
                <Link
                  to={"/"}
                  className="text-[#8ba73b] cursor-pointer p-4 py-[10px] px-[15px] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                >
                  Shop
                  <RiArrowDropDownLine className="inline-block" />
                </Link>

                {/* Mega Menu */}
                <div
                  className="absolute z-50 text-[14px] -left-3 mt-2 px-[27px] pt-[29px] pb-[100px] hidden group-hover:flex bg-white text-black shadow-lg w-[660px] h-[290px] transition-all duration-300 ease-in-out"
                  style={{
                    backgroundImage: "url('/images/shophover.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="w-1/3">
                    <h3 className="font-bold text-[#000] mb-5">SHOP LAYOUT</h3>
                    <ul className="space-y-1">
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Shop Fullwidth
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Shop left sidebar
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Shop right sidebar
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/3">
                    <h3 className="font-bold text-[#000] mb-5">
                      PRODUCT SINGLE
                    </h3>
                    <ul className="space-y-1">
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Simple Product
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Variable Product
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Group Product
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Affiliate Product
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/3">
                    <h3 className="font-bold text-[#000] mb-5">PRODUCT PAGE</h3>
                    <ul>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          My Account
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Checkout
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Cart
                        </Link>
                      </li>
                      <li className="text-black text-opacity-75">
                        <Link to={"/"} className="hover:text-[#8ba73b]">
                          Wishlist
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* pages */}
              <li className="relative group">
                <Link
                  to={"/"}
                  className="py-[10px] px-[15px] cursor-pointer font-bold  text-[#27272f] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                >
                  Page
                  <RiArrowDropDownLine className="inline-block" />
                </Link>

                {/* Dropdown Menu */}
                <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link to={"/"}>About Us</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link to={"/"}>FAQ</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-[#8ba73b]">
                    <Link href="#">404 page</Link>
                  </li>
                </ul>
              </li>

              {/* blog */}
              <li className="relative group">
                <Link
                  to={"/"}
                  className="py-[10px] px-[15px] cursor-pointer font-bold text-[#27272f] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                >
                  Blog
                  <RiArrowDropDownLine className="inline-block" />
                </Link>

                {/* Dropdown Menu */}
                <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
                  <li className="px-4 py-1 hover:text-[#8ba73b]">
                    <Link to={"/"}>Blog left sidebar</Link>
                  </li>
                  <li className="px-4 py-1 hover:text-[#8ba73b]">
                    <Link to={"/"}>Blog right sidebar</Link>
                  </li>
                  <li className="px-4 py-1 hover:text-[#8ba73b]">
                    <Link to={"/"}>single sidebar</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to={"/"}
                  className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
                >
                  On Sale
                </Link>
              </li>

              <li>
                <Link
                  to={"/"}
                  className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to={"/"}
                  className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:hidden top-0 left-0 px-7 py-7 flex items-center justify-between bg-[#fff] w-full z-50">
          <Link to="/" className="w-full">
            <img
              src="/images/logo-black.svg"
              alt="Logo"
              className="h-11 w-auto"
            />
          </Link>
          <div className="lg:hidden">
            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-xl text-[#000]"
            >
              <IoMenu />
            </button>

            {/* Sidebar Menu */}
            <div
              className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300`}
            >
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-lg"
              >
                <IoClose />
              </button>

              {/* Main Menu */}
              <nav className="mt-12 px-6">
                {!submenu ? (
                  <ul className="space-y-4 text-lg">
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center py-2 border-b"
                      >
                        <Link
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className="flex-1"
                        >
                          {item.name}
                        </Link>
                        {item.hasSubmenu && (
                          <button onClick={() => setSubmenu(item.name)}>
                            <FaChevronRight size={12} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  // Submenu Panel
                  <div>
                    {/* Back Button */}
                    <button
                      onClick={() => setSubmenu(null)}
                      className="flex items-center justify-center text-lg mb-4"
                    >
                      <FaChevronLeft size={12} className="mr-2" />
                    </button>
                    <ul className="space-y-4 text-lg">
                      {submenus[submenu]?.map((subItem, index) => (
                        <li key={index} className="py-2 border-b">
                          <Link
                            to={subItem.to}
                            onClick={() => setMenuOpen(false)}
                            className="block"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </nav>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMenuOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNavbar;
