
// import { useState } from "react";
// import {
//   CreditCard,
//   Smartphone,
//   User,
//   Mail,
//   CheckCircle,
//   Tag,
//   X,
//   ArrowLeft,
//   Phone,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/NavigationBar";
// import Logo from "../components/Logo";

// export default function PaymentCheckoutPage() {
//   const location = useLocation();
//   const selectedPlan = location.state?.plan || "Pro Learner";
//   const navigate = useNavigate();

//   // Set base price and duration options based on selected plan
//   const getPlanDetails = () => {
//     const durationOptions = [
//       { label: "1 Month", value: 1, discount: 0 },
//       { label: "6 Months", value: 6, discount: 10 },
//       { label: "1 Year", value: 12, discount: 20 },
//       { label: "2 Years", value: 24, discount: 30 },
//     ];

//     switch (selectedPlan) {
//       case "Pro Learner":
//         return {
//           basePrice: 299,
       
//           name: "Pro Learner",
//           durationOptions,
//         };
//       case "Premium Power":
//         return {
//           basePrice: 499,
    
//           name: "Premium Power",
//           durationOptions,
//         };
//       default:
//         return {
//           basePrice: 299,
      
//           name: "Pro Learner",
//           durationOptions,
//         };
//     }
//   };

//   const { basePrice, originalPrice, name, durationOptions } = getPlanDetails();
//   const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);

//   // Calculate price based on duration
// const calculateDurationPrice = () => {
//   const baseTotal = basePrice * selectedDuration.value;
//   const durationDiscount = (baseTotal * selectedDuration.discount) / 100;
//   return baseTotal - durationDiscount;
// };

//   const durationPrice = calculateDurationPrice();
//   const originalDurationPrice = originalPrice * selectedDuration.value;
//   const taxes = Math.round(durationPrice * 0.18); // 18% GST

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     paymentMethod: "phonepe",
//   });

//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponError, setCouponError] = useState("");

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Sample coupon codes
//   const validCoupons = {
//     WELCOME20: {
//       discount: 20,
//       type: "percentage",
//       description: "Welcome Discount",
//     },
//     SAVE500: { discount: 500, type: "fixed", description: "Flat ₹500 Off" },
//     STUDENT10: {
//       discount: 10,
//       type: "percentage",
//       description: "Student Discount",
//     },
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const applyCoupon = () => {
//     const trimmedCode = couponCode.trim().toUpperCase();

//     if (!trimmedCode) {
//       setCouponError("Please enter a coupon code");
//       return;
//     }

//     if (validCoupons[trimmedCode]) {
//       setAppliedCoupon({
//         code: trimmedCode,
//         ...validCoupons[trimmedCode],
//       });
//       setCouponError("");
//       setCouponCode("");
//     } else {
//       setCouponError("Invalid coupon code");
//     }
//   };

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponCode("");
//     setCouponError("");
//   };

//   const calculateDiscount = () => {
//     if (!appliedCoupon) return 0;

//     if (appliedCoupon.type === "percentage") {
//       return Math.round((durationPrice * appliedCoupon.discount) / 100);
//     } else {
//       return Math.min(appliedCoupon.discount, durationPrice);
//     }
//   };

//   const discountAmount = calculateDiscount();
//   const finalPrice = durationPrice - discountAmount + taxes;

//   const handleSubmit = () => {
//     setIsProcessing(true);

//     // Simulate payment processing
//     setTimeout(() => {
//       setIsProcessing(false);
//       setShowSuccess(true);
//     }, 2000);
//   };

//   if (showSuccess) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
//         <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg border dark:border-zinc-800 p-6 text-center">
//           <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//             Payment Successful
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
//             Check your email for course access details.
//           </p>
//           <button
//             onClick={() => {
//               setShowSuccess(false);
//               setFormData({
//                 name: "",
//                 email: "",
//                 phone: "",
//                 paymentMethod: "phonepe",
//               });
//               setAppliedCoupon(null);
//               setCouponCode("");
//               setCouponError("");
//             }}
//             className="w-full bg-gray-900 dark:bg-gray-700 text-white py-2.5 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
//           >
//             Start Learning
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className=" mb-4 flex items-center gap-2 ">
//             <button
//               onClick={() => navigate(-1)}
//               className="mr-3 p-1 rounded-full cursor-pointer hover:bg-gray-200 bg-gray-100 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 transition-colors"
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <h1 className="text-3xl  text-indigo-500 ">Checkout</h1>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Order Summary */}
//             <div className="bg-white dark:bg-zinc-900 rounded-lg dark:border  shadow-sm dark:border-zinc-800 p-6 h-fit">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Order Summary
//               </h2>

//               <div className="border-b dark:border-zinc-800 pb-4 mb-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Logo />
//                   <div>
//                     <h3 className="font-medium text-gray-900 dark:text-white text-sm">
//                       {name} Plan Subscription
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-400 text-xs">
//                       {selectedDuration.label} Access
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Duration Selection */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Subscription Duration
//                 </label>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                   {durationOptions.map((duration) => (
//                     <button
//                       key={duration.value}
//                       type="button"
//                       onClick={() => setSelectedDuration(duration)}
//                       className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
//                         selectedDuration.value === duration.value
//                           ? "bg-indigo-600 text-white"
//                           : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
//                       }`}
//                     >
//                       {duration.label}
//                       {duration.discount > 0 && (
//                         <span className="block text-xs mt-1 text-green-600 dark:text-green-400">
//                           Save {duration.discount}%
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">
//                     Plan Price
//                   </span>
//                   <span className="line-through text-gray-400 dark:text-gray-500">
//                     ₹{originalDurationPrice.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">
//                     {name === "Pro Learner"
//                       ? "Launch Discount"
//                       : "Premium Discount"}
//                   </span>
//                   <span className="text-green-600 dark:text-green-500">
//                     -₹{(originalDurationPrice - durationPrice).toLocaleString()}
//                   </span>
//                 </div>
//                 {appliedCoupon && (
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Coupon ({appliedCoupon.code})
//                     </span>
//                     <span className="text-green-600 dark:text-green-500">
//                       -₹{discountAmount.toLocaleString()}
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">
//                     Taxes (18% GST)
//                   </span>
//                   <span className="text-gray-900 dark:text-white">
//                     ₹{taxes}
//                   </span>
//                 </div>
//                 <div className="border-t dark:border-zinc-800 pt-2 mt-3">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       Total
//                     </span>
//                     <span className="font-bold text-gray-900 dark:text-white text-lg">
//                       ₹{finalPrice.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Coupon Code Section */}
//               <div className="mt-4 pt-4 border-t dark:border-zinc-800">
//                 <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
//                   Coupon Code
//                 </h3>

//                 {appliedCoupon ? (
//                   <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
//                     <div className="flex items-center">
//                       <Tag className="w-4 h-4 text-green-600 dark:text-green-500 mr-2" />
//                       <div>
//                         <span className="font-medium text-green-800 dark:text-green-200 text-sm">
//                           {appliedCoupon.code}
//                         </span>
//                         <p className="text-xs text-green-600 dark:text-green-400">
//                           {appliedCoupon.description}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={removeCoupon}
//                       className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-1"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={couponCode}
//                         onChange={(e) => {
//                           setCouponCode(e.target.value);
//                           setCouponError("");
//                         }}
//                         placeholder="Enter code"
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
//                       />
//                       <button
//                         onClick={applyCoupon}
//                         className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
//                       >
//                         Apply
//                       </button>
//                     </div>
//                     {couponError && (
//                       <p className="text-xs text-red-600 dark:text-red-400">
//                         {couponError}
//                       </p>
//                     )}
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Try: WELCOME20, SAVE500, STUDENT10
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Checkout Form */}
//             <div className="bg-white dark:bg-zinc-900 rounded-lg dark:border  shadow-sm dark:border-zinc-800 p-6">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Payment Details
//               </h2>

//               <div className="space-y-4">
//                 {/* Personal Information */}
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Phone
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
//                     <input
//                       type="phone"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
//                       placeholder="Enter your phone no."
//                     />
//                   </div>
//                 </div>

//                 {/* Payment Method */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Payment Method
//                   </label>

//                   <div className="grid grid-cols-3 gap-2 my-4">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleInputChange({
//                           target: { name: "paymentMethod", value: "phonepe" },
//                         })
//                       }
//                       className={`
//                         flex-1 rounded-lg font-medium cursor-pointer text-sm transition-all w-fit duration-200 shadow-sm
//                         ${
//                           formData.paymentMethod === "phonepe"
//                             ? "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2"
//                             : "hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600"
//                         }
//                       `}
//                     >
//                       <img
//                         src="/assets/phonepe-logo.png"
//                         className="rounded-lg w-30 h-auto"
//                         alt="PhonePe"
//                       />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={
//                     isProcessing ||
//                     !formData.name ||
//                     !formData.email ||
//                     !formData.phone
//                   }
//                   className="w-full bg-gradient-to-br from-indigo-500 to-indigo-400 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
//                 >
//                   {isProcessing ? (
//                     <div className="flex items-center justify-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Processing...
//                     </div>
//                   ) : (
//                     `Pay ₹${finalPrice.toLocaleString()}`
//                   )}
//                 </button>

//                 <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
//                   Secure checkout • 256-bit SSL encryption • 30-day refund
//                   policy
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  User,
  Mail,
  CheckCircle,
  Tag,
  X,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/NavigationBar";
import Logo from "../components/Logo";
import { Helmet } from "react-helmet-async";

export default function PaymentCheckoutPage() {
  const location = useLocation();
  const selectedPlan = location.state?.plan || "Pro Learner";
  const navigate = useNavigate();

  // Set base price and duration options based on selected plan
  const getPlanDetails = () => {
    const durationOptions = [
      { label: "1 Month", value: 1, discount: 0 },
      { label: "6 Months", value: 6, discount: 10 },
      { label: "1 Year", value: 12, discount: 20 },
      { label: "2 Years", value: 24, discount: 30 },
    ];

    switch (selectedPlan) {
      case "Pro Learner":
        return {
          basePrice: 299,
          name: "Pro Learner",
          durationOptions,
        };
      case "Premium Power":
        return {
          basePrice: 499,
          name: "Premium Power",
          durationOptions,
        };
      default:
        return {
          basePrice: 299,
          name: "Pro Learner",
          durationOptions,
        };
    }
  };

  const { basePrice, name, durationOptions } = getPlanDetails();
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[2]);

  // Calculate price based on duration
  const calculateDurationPrice = () => {
    const baseTotal = basePrice * selectedDuration.value;
    const durationDiscount = (baseTotal * selectedDuration.discount) / 100;
    return baseTotal - durationDiscount;
  };

  const durationPrice = calculateDurationPrice();
  const taxes = Math.round(durationPrice * 0.18); // 18% GST

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "phonepe",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample coupon codes
  const validCoupons = {
    WELCOME20: {
      discount: 20,
      type: "percentage",
      description: "Welcome Discount",
    },
    SAVE500: { discount: 500, type: "fixed", description: "Flat ₹500 Off" },
    STUDENT10: {
      discount: 10,
      type: "percentage",
      description: "Student Discount",
    },
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const applyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();

    if (!trimmedCode) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (validCoupons[trimmedCode]) {
      setAppliedCoupon({
        code: trimmedCode,
        ...validCoupons[trimmedCode],
      });
      setCouponError("");
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percentage") {
      return Math.round((durationPrice * appliedCoupon.discount) / 100);
    } else {
      return Math.min(appliedCoupon.discount, durationPrice);
    }
  };

  const discountAmount = calculateDiscount();
  const finalPrice = durationPrice - discountAmount + taxes;

  const handleSubmit = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg border dark:border-zinc-800 p-6 text-center">
          <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Payment Successful
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Check your email for course access details.
          </p>
          <button
            onClick={() => {
              setShowSuccess(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                paymentMethod: "phonepe",
              });
              setAppliedCoupon(null);
              setCouponCode("");
              setCouponError("");
            }}
            className="w-full bg-gray-900 dark:bg-gray-700 text-white py-2.5 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            Start Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
          <Navbar />
          <Helmet>
                  <title>Payment Checkout | Learnexa</title>
                </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className=" mb-4 flex items-center gap-2 ">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-1 rounded-full cursor-pointer hover:bg-gray-200 bg-gray-100 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl  text-indigo-500 ">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg dark:border  shadow-sm dark:border-zinc-800 p-6 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="border-b flex justify-between items-start dark:border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Logo />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {name} Plan Subscription
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {selectedDuration.label} Access
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/plans");
                  }}
                  className="shadow-sm rounded-lg text-sm px-4 py-2 bg-gray-50 dark:text-gray-200 cursor-pointer dark:bg-zinc-800"
                >
                  Change Plan
                </button>
              </div>

              {/* Duration Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subscription Duration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {durationOptions.map((duration) => (
                    <button
                      key={duration.value}
                      type="button"
                      onClick={() => setSelectedDuration(duration)}
                      className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        selectedDuration.value === duration.value
                          ? "bg-indigo-600 text-white"
                          : "bg-white shadow-sm dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {duration.label}
                      {duration.discount > 0 && (
                        <span className="block text-xs mt-1  p-1  rounded-full  dark:bg-green-900/30 dark:border dark:border-green-500 text-green-500 dark:text-green-400">
                          Save {duration.discount}%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Plan Price
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ₹{(basePrice * selectedDuration.value).toLocaleString()}
                  </span>
                </div>
                {selectedDuration.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Duration Discount ({selectedDuration.discount}%)
                    </span>
                    <span className="text-green-600 dark:text-green-500">
                      -₹
                      {(
                        (basePrice *
                          selectedDuration.value *
                          selectedDuration.discount) /
                        100
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Coupon ({appliedCoupon.code})
                    </span>
                    <span className="text-green-600 dark:text-green-500">
                      -₹{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Taxes (18% GST)
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ₹{taxes}
                  </span>
                </div>
                <div className="border-t dark:border-zinc-800 pt-2 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      ₹{finalPrice.toLocaleString()}
                    </span>
                  </div>

                  {basePrice * selectedDuration.value - finalPrice > 200 && (
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        🎉You saved
                      </span>
                      <span className="font-bold text-green-500 text-sm">
                        ₹
                        {(
                          basePrice * selectedDuration.value -
                          finalPrice
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="mt-4 pt-4 border-t dark:border-zinc-800">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Coupon Code
                </h3>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-green-600 dark:text-green-500 mr-2" />
                      <div>
                        <span className="font-medium text-green-800 dark:text-green-200 text-sm">
                          {appliedCoupon.code}
                        </span>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {appliedCoupon.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError("");
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {couponError}
                      </p>
                    )}
             
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg dark:border  shadow-sm dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Details
              </h2>

              <div className="space-y-4">
                {/* Personal Information */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="phone"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 dark:border-zinc-800 rounded-md focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="Enter your phone no."
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>

                  <div className="grid grid-cols-3 gap-2 my-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange({
                          target: { name: "paymentMethod", value: "phonepe" },
                        })
                      }
                      className={`
                        flex-1 rounded-lg font-medium cursor-pointer text-sm transition-all w-fit duration-200 shadow-sm
                        ${
                          formData.paymentMethod === "phonepe"
                            ? "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2"
                            : "hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600"
                        }
                      `}
                    >
                      <img
                        src="/assets/phonepe-logo.png"
                        className="rounded-lg w-30 h-auto"
                        alt="PhonePe"
                      />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={
                    isProcessing ||
                    !formData.name ||
                    !formData.email ||
                    !formData.phone
                  }
                  className="w-full bg-gradient-to-br from-indigo-500 to-indigo-400 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${finalPrice.toLocaleString()}`
                  )}
                </button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                  Secure checkout • 256-bit SSL encryption • 30-day refund
                  policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}