import Footer from "@/components/Footer/Footer";
import Navbard from "@/components/Navbard/Navbard";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className="max-w-[2000px] m-auto">
      {/* <Navbard/> */}
      <div >
      <Outlet/>
      <Footer/>
      </div>
    </div>
  )
}
