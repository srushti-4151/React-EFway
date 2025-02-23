import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { GoGitCompare } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import Footer from "../../components/Footer";
import {
  addCart,
  removeCart,
  updateQuantity,
} from "../../redux/slices/CartSlice.js";
import { BiHeart } from "react-icons/bi";
import { PiBagBold } from "react-icons/pi";
import { LiaFireAltSolid } from "react-icons/lia";
import { TbClockHour2 } from "react-icons/tb";
import { FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { BsPinterest } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import Swal from "sweetalert2";
import PageNavbar from "../../components/PageNavbar.jsx";

const Productdetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((item) => item.id === product?.id);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [MoreRec, setMoreRec] = useState([]);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const decodeProductNameFromURL = (name) => {
    return name.replace(/~/g, " ").replace(/\-/g, " ");
  };

  const recname = decodeProductNameFromURL(name);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://dummyjson.com/recipes/search?q=${recname}`
        );
        if (res.data.recipes.length > 0) {
          setProduct(res.data.recipes[0]);
          console.log("ress", res);
        }
      } catch (err) {
        console.log("error while fetching the details of product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [recname]);

  const handleAddToCart = (item) => {
    if (!item) return;

    const cartItem = cart.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
      // Update quantity if the item is already in the cart
      dispatch(
        updateQuantity({ id: item.id, quantity: cartItem.quantity + 1 })
      );
      toast.success("Cart updated!");
    } else {
      // Add new item to the cart
      dispatch(addCart({ ...item, quantity: 1 }));
      toast.success("Added to Cart!");
    }
  };
  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/recipes/tags");
        setTags(res.data);
      } catch (err) {
        console.error("Error fetching tags", err);
      }
    };

    fetchTags();
  }, []);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = "https://dummyjson.com/recipes?limit=0";
        if (activeTag) {
          url = `https://dummyjson.com/recipes/tag/${activeTag}`;
        }
        const res = await axios.get(url);
        let filteredRecipes = res.data.recipes;

        setRecipes(filteredRecipes);
      } catch (err) {
        console.error("Error fetching recipes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [activeTag]);

  //fetch more products
  useEffect(() => {
    const fetchMoreRec = async () => {
      setLoading(true);
      try {
        let url = "https://dummyjson.com/recipes?limit=0";
        const res = await axios.get(url);
        let filteredMoreRecipes = res.data.recipes;

        setMoreRec(filteredMoreRecipes);
      } catch (error) {
        console.log("error while getting morerecipies", error);
      }
    };

    fetchMoreRec();
  }, []);

  const formatProductNameForURL = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/-/g, "~");
  };

  const handleProductClick = (recipe) => {
    setProduct(recipe); // Set the clicked recipe's data into the product state
    const encodedName = formatProductNameForURL(recipe.name); // Format the recipe name for URL
    navigate(`/product-details/${encodedName}`); // Update the URL
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
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
       <PageNavbar />

        <div className="w-full max-w-[1440px] mx-auto px-4 mt-10 relative bg-transparent">
          <div className="flex flex-col justify-center items-start">
            <div className="flex mt-6 max-w-lg">
              <div className="flex justify-center items-center mr-2 px-6 py-1 bg-white rounded-3xl">
                <Link href="/">
                  <FaHome className="text-gray-700" />
                </Link>
              </div>
              <div className="flex justify-center items-center mx-2 px-6 py-1 bg-white rounded-3xl">
                <button
                  onClick={() => {
                    setActiveTag("");
                  }}
                  className="text-gray-700 hover:text-[#8ba73b]"
                >
                  Products{" "}
                </button>
              </div>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl mt-7 font-bold">Product Details</h1>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto md:px-4 px-0 mt-10 pb-20 relative bg-transparent min-h-screen">
          <div className="lg:flex block items-start gap-4 relative">
            {/* Sidebar - Visible only on lg screens */}
            <aside className="hidden lg:block w-1/4 sticky self-start top-5 h-fit">
              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  PRODUCT CATEGORIES
                </h2>
                <ul className="text-gray-600">
                  {tags.slice(20, 30).map((tag) => (
                    <li
                      key={tag}
                      className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
                        activeTag === tag ? "text-[#8ba73b] font-bold" : ""
                      }`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products on sale */}
              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  Products on sale
                </h2>
                {loading ? (
                  <div className="text-center py-10 w-full">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {recipes.slice(0, 4).map((recipe) => (
                      <div
                        key={recipe.id}
                        className="group p-2 relative transition-all ease-out duration-300 h-full flex bg-white rounded-md shadow-lg overflow-hidden mb-0"
                      >
                        <button onClick={() => handleProductClick(recipe)}>
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </button>

                        <div className="px-2">
                          <div>
                            <h3 className="text-[14px] mb-3 text-gray-800 hover:text-[#8BA73B] leading-[1.4] overflow-hidden transition-all duration-300">
                              <button
                                onClick={() => handleProductClick(recipe)}
                              >
                                {recipe.name}
                              </button>
                            </h3>
                            <div className="flex items-center mb-1 text-[#8BA73B] text-sm">
                              {product?.rating &&
                                [...Array(Math.floor(product.rating))].map(
                                  (_, i) => (
                                    <span key={i}>
                                      <FaStar />
                                    </span>
                                  )
                                )}
                              {product?.rating % 1 !== 0 && (
                                <span>
                                  <FaStar />
                                </span>
                              )}
                              <span className="ml-2 flex items-center text-[#F6A64D] text-sm">
                                {recipe.rating}
                              </span>
                            </div>
                            <p className="text-gray-800 font-bold text-[18px]">
                              ${recipe.caloriesPerServing}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            <div className="flex-1 p-4 pt-0">
              {/* Product Details */}
              <div className="bg-white pt-[27px] px-[30px] pb-[35px] mb-[50px]">
                {loading || !product ? (
                  <div className="text-center py-10 w-full">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap ">
                    <div className="px-[15px] md:sticky top-5 h-fit md:flex-none md:basis-[41.6666%] md:max-w-[41.6666%]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className=""
                      />
                    </div>

                    <div className="px-[15px] md:flex-none md:basis-[58.3333%] md:max-w-[58.3333%] text-[#27272f]">
                      {/* name */}
                      <h1 className="text-[30px] font-semibold mb-2">
                        {product.name}
                      </h1>
                      {/* Star Rating */}
                      <div className="flex items-center mt-3 text-[#8BA73B] text-xl">
                        {product?.rating &&
                          [...Array(Math.floor(product.rating))].map((_, i) => (
                            <span key={i}>
                              <FaStar />
                            </span>
                          ))}
                        {product?.rating % 1 !== 0 && (
                          <span>
                            <FaStar />
                          </span>
                        )}
                      </div>
                      {/* price */}
                      <p className="text-[#F6A64D] font-bold text-2xl mt-3">
                        ${product.caloriesPerServing}
                      </p>
                      {/* Ingredients List */}
                      <h2 className="text-xl mt-3 mb-2">Ingredients :</h2>
                      <ul className="list-disc list-inside text-gray-700">
                        {product.ingredients?.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>

                      {/* Cooking Time Information */}
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="flex items-center justify-start gap-1 my-1">
                          <TbClockHour2
                            className="text-gray-900 inline-block"
                            size={22}
                          />
                          Prep Time:
                          <span className="font-semibold ml-1">
                            {product.prepTimeMinutes} mins
                          </span>
                        </p>
                        <p className="flex items-center justify-start gap-[2px] my-1">
                          <LiaFireAltSolid
                            className="text-orange-500 inline-block"
                            size={25}
                          />
                          Cook Time:
                          <span className="font-semibold ml-1">
                            {product.cookTimeMinutes} mins
                          </span>
                        </p>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4">
                        <h4 className="text-xl mt-3 mb-2">Instructions:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-900">
                          {product.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      {/* buttons */}
                      <div className="flex flex-row flex-wrap mt-7 justify-start items-center gap-2">
                        {cartItem ? (
                          <Link
                            href="/cart"
                            className="bg-[#8BA73B] mb-1 text-white text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6c832e] transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <PiBagBold
                              size={20}
                              className="inline-block font-bold"
                            />
                            <span className="leading-none">
                              Already in Cart
                            </span>
                          </Link>
                        ) : (
                          <>
                            <div className="flex items-center border-2 rounded-3xl px-1">
                              <button
                                onClick={decreaseQuantity}
                                className="px-3 py-3 text-sm font-bold"
                              >
                                -
                              </button>
                              <span className="mx-4 text-lg text-[#626262]">
                                {quantity}
                              </span>
                              <button
                                onClick={increaseQuantity}
                                className="px-3 py-3 text-sm font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="bg-[#8BA73B] text-[#fff] text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6A802D] transition-all duration-300 flex items-center justify-center gap-2"
                              onClick={() => handleAddToCart(product)}
                            >
                              <PiBagBold
                                size={20}
                                className="inline-block font-bold"
                              />
                              <span className="leading-none">ADD TO CART</span>
                            </button>
                            <button className="w-10 h-10 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                              <BiHeart size={25} />
                            </button>
                          </>
                        )}
                      </div>
                      {/* tags */}
                      <p className="text-black mt-4">
                        <span className="font-medium text-[17px]">Tags:</span>{" "}
                        <span className="text-[#6A802D]">
                          {" "}
                          {product.tags.join(", ")}
                        </span>
                      </p>
                      {/* meal tyep */}
                      <p className="text-black mt-2">
                        <span className="font-medium text-[17px]">
                          mealType:
                        </span>{" "}
                        <span className="text-[#6A802D]">
                          {" "}
                          {product.mealType.join(", ")}
                        </span>
                      </p>
                      <div className="mt-7 flex flex-row flex-wrap items-center justify-start">
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#3B5998] bg-[#3B5998]">
                          <TiSocialFacebook
                            className="text-[#fff] cursor-pointer"
                            size={22}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#00A8E8] bg-[#00A8E8]">
                          <FaTwitter
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#0377AE] bg-[#0377AE]">
                          <FaLinkedinIn
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#32506D] bg-[#32506D]">
                          <FaInstagram
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#88A33B] bg-[#88A33B]">
                          <FaGoogle
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />{" "}
                          <span className="text-[10px] text-[#fff] group-hover:text-[#8BA73B]">
                            +
                          </span>
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#CB2027] bg-[#CB2027]">
                          <BsPinterest
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#8BA73B] bg-[#8BA73B]">
                          <IoMdMail
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* You may also like */}
              {loading ? (
                <div className="text-center py-10 w-full">loading.....</div>
              ) : (
                <div>
                  <h1 className="mb-[30px] pb-[19px] text-[22px] text-[#27272f] font-bold border-b border-[#e3e3d9] border-1">
                    You may also like
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {MoreRec.slice(30, 33).map((recipe) => (
                      <div
                        key={recipe.id}
                        className="group p-6 relative transition-all ease-out duration-300 h-full flex flex-col bg-white rounded-md shadow-lg overflow-hidden mb-0"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full cursor-pointer object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent interference
                              handleProductClick(recipe);
                            }}
                          />

                          <Link
                            href={`/product/${formatProductNameForURL(
                              recipe.name
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e]">
                              <CiSearch size={20} />
                            </div>
                          </Link>
                        </div>

                        <div className="mt-5 mb-1">
                          <div>
                            <Link
                              href={"#"}
                              className="text-[13px] font-semibold leading-[28px] text-[#8BA73B] mt-4 italic"
                            >
                              {recipe.cuisine}
                            </Link>
                            <h3 className="text-[15px] font-bold text-gray-800 leading-[1.4] overflow-hidden max-h-[3em] h-[3em] hover:underline">
                              <button
                                onClick={() => handleProductClick(recipe)}
                              >
                                {recipe.name}
                              </button>
                            </h3>
                            <p className="text-[#8BA73B] font-bold text-xl mt-1">
                              ${recipe.caloriesPerServing}
                            </p>
                          </div>

                          <div className="flex items-center mt-3 text-[#F6A64D] text-lg">
                            Rating : {recipe.rating}
                          </div>

                          <div className="flex flex-row mt-5 justify-between">
                            {cart.some((item) => item.id === recipe.id) ? (
                              <Link
                                href="/cart"
                                className="bg-[#8BA73B] mb-1 text-white text-[14px] px-5 rounded-3xl py-2 hover:bg-[#6c832e] transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                <PiBagBold
                                  size={20}
                                  className="inline-block font-bold"
                                />
                                <span className="leading-none">
                                  Already in Cart
                                </span>
                              </Link>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleAddToCart(recipe)}
                                  className="bg-[#fff] text-gray-800 border border-gray-400 hover:text-[#fff] text-xs px-5 rounded-3xl py-2 hover:bg-[#8BA73B] transition-all duration-300 flex items-center justify-center gap-1"
                                >
                                  <CiShoppingCart
                                    size={16}
                                    className="inline-block"
                                  />
                                  <span className="leading-none lg:inline-block hidden">
                                    ADD TO CART
                                  </span>
                                </button>
                                <div className="flex items-center text-gray-800">
                                  <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                                    <CiHeart size={25} />
                                  </button>
                                  <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                                    <GoGitCompare size={19} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Sidebar - Visible only on meduim and mobile*/}
              <aside className="lg:hidden block w-full mt-10">
                <div className="py-5 px-7 mb-[30px] shadow bg-white">
                  <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                    PRODUCT CATEGORIES
                  </h2>
                  <ul className="text-gray-600">
                    {tags.slice(0, 10).map((tag) => (
                      <li
                        key={tag}
                        className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
                          activeTag === tag ? "text-[#8ba73b] font-bold" : ""
                        }`}
                        onClick={() => setActiveTag(tag)}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="py-5 px-7 mb-[30px] shadow bg-white">
                  <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                    Products on sale
                  </h2>
                  {loading ? (
                    <div className="text-center py-10 w-full">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                        <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {recipes.slice(0, 4).map((recipe) => (
                        <div
                          key={recipe.id}
                          className="group p-2 relative transition-all ease-out duration-300 h-full flex bg-white rounded-md shadow-lg overflow-hidden mb-0"
                        >
                          <button onClick={() => handleProductClick(recipe)}>
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </button>

                          <div className="px-2">
                            <div>
                              <h3 className="text-[14px] mb-3 text-gray-800 hover:text-[#8BA73B] leading-[1.4] overflow-hidden transition-all duration-300">
                                <button
                                  onClick={() => handleProductClick(recipe)}
                                >
                                  {recipe.name}
                                </button>
                              </h3>
                              <div className="flex items-center mb-1 text-[#8BA73B] text-sm">
                                {product?.rating &&
                                  [...Array(Math.floor(product.rating))].map(
                                    (_, i) => (
                                      <span key={i}>
                                        <FaStar />
                                      </span>
                                    )
                                  )}
                                {product?.rating % 1 !== 0 && (
                                  <span>
                                    <FaStar />
                                  </span>
                                )}
                                <span className="ml-2 flex items-center text-[#F6A64D] text-sm">
                                  {recipe.rating}
                                </span>
                              </div>
                              <p className="text-gray-800 font-bold text-[18px]">
                                ${recipe.caloriesPerServing}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Productdetails;