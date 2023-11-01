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

  const logout = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>


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