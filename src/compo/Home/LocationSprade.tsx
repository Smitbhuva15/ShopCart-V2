import { clientsList } from "@/lib/newdata";
import Link from "next/link";



const title = "More Then 1,90,000 Customers";

const desc = "Buy products on your any device with our app & enjoy your time what you want. Just download & install & start to shopping";

export default function LocationSprade() {
    return (
        <div className='clients-section style-2 padding-tb'>
            <div className='container'>
                <div className='section-header text-center'>
                    <h2 className='title'>{title}</h2>
                    <p>{desc}</p>
                </div >

                {/* main section */}
                <div className='section-wrapper'>
                    <div className='clients'>{
                        clientsList.map((val, i) => (
                            <div key={i} className='client-list'>
                                <Link href="/singup" className='client-content'><span>{val.text}</span></Link>
                                <div className='client-thumb'>
                                    <img src={val.imgUrl} alt="" />
                                </div>
                            </div>
                        ))

                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
