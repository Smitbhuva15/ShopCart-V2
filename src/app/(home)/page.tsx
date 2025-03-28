import Banner from "@/compo/Home/Banner";
import CategoryShow from "@/compo/Home/CategoryShow";
import HomeCategory from "@/compo/Home/HomeCategory";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner />
      <HomeCategory />
      <CategoryShow />
      
    </div>
  );
}
