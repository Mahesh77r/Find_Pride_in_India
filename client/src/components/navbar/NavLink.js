import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi"; 
 
 export const navForMinistry = [
    { name: 'Dashboard', to: '/', current: true },
    { name: 'DOM\'s', to: '/checkpoints', current: false },
    { name: 'Products', to: '/products', current: false },
  ];

 export const navForDOM = [
    { name: "Dashboard", link: '/', icon: MdOutlineDashboard},
    { name: 'Checkpoints', link: '/checkpoints', icon: AiOutlineUser },
    { name: 'Order', link: '/order',  icon: FiMessageSquare  },
    { name: 'Complaints', link: '/complaints', icon: TbReportAnalytics,},
  ]

//   const navForDOM = [
//     { name: "dashboard", link: "/",  },
//     { name: "user", link: "/",  },
//     { name: "messages", link: "/",},
//     { name: "analytics", link: "/",  margin: true },
//     { name: "File Manager", link: "/", icon: FiFolder },
//     { name: "Cart", link: "/", icon: FiShoppingCart },
//     { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
//     { name: "Setting", link: "/", icon: RiSettings4Line },
//   ];