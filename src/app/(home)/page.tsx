import AboutUs from "@/compo/Home/AboutUs";
import Banner from "@/compo/Home/Banner";
import CategoryShow from "@/compo/Home/CategoryShow";
import HomeCategory from "@/compo/Home/HomeCategory";
import LocationSprade from "@/compo/Home/LocationSprade";
import Resister from "@/compo/Home/Resister";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner />
      <HomeCategory />
      <CategoryShow />
      <Resister />
      <LocationSprade />
      <AboutUs />
    </div>
  );
}
