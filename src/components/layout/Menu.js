
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdHomeRepairService,MdOutlineCategory  } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { IoTicketSharp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaGifts } from "react-icons/fa";
// Sidebar Data
export const Menu = [
  {
    icon: MdOutlineDashboardCustomize,
    heading: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: TbDeviceAnalytics,
    heading: "Analytics",
    path: "/analytics",
  },
  {
    icon: MdHomeRepairService,
    heading: "Services",
    path: "/service",
  },
  {
    icon: IoIosPeople,
    heading: "Staff",
    path: "/staff",
  },
  {
    icon: MdOutlineCategory ,
    heading: "Category",
    path: "/category",
  },
  {
    icon: FaGifts,
    heading: "Coupons",
    path: "/coupon",
  },
  {
    icon: IoTicketSharp,
    heading: "Bookings",
    path: "/booking",
  },

  {
    icon: GrGallery,
    heading: "Gallery",
    path: "/gallery",
  },
  {
    icon: AiOutlineTransaction,
    heading: "Transactions",
    path: "/transactions",
  },
  // {
  //   icon: UilPackage,
  //   heading: 'Products'
  // },
  // {
  //   icon: UilChart,
  //   heading: 'Analytics'
  // },
];
