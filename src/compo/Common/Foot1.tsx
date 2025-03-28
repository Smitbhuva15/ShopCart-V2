import { addressList, ItemList, quickList, socialList } from "@/lib/footerdata";
import Link from "next/link";

const title = "About ShopCart";
const desc = "Eduaid theme number one world class university in the world There are student are studing always in this university for all time.";
const ItemTitle = "Categories";



export default function Foot1() {
    return (
        <>
            <div className='cols'>
                <div className='footer-item our-address'>
                    <div className='footer-inner'>
                        <div className='footer-content'>
                            <div className='title'>
                                <h4>{title}</h4>
                            </div>
                            <div className='content'>
                                <p>{desc}</p>
                                <ul className='lab-ul office-address'>
                                    {
                                        addressList.map((val, i) => (
                                            <li key={i}>
                                                <i className={val.iconName}>{val.text}</i>
                                            </li>
                                        )

                                        )
                                    }
                                </ul>
                                <ul className='lab-ul social-icons'>
                                    {
                                        socialList.map((val, i) => (
                                            <li key={i} >
                                                <Link href="#" className={val.className}><i className={val.iconName}>{}</i></Link>
                                            </li>
                                        )

                                        )
                                    }
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='cols'>
                <div className='footer-item our-address'>
                    <div className='footer-inner'>
                        <div className='footer-content'>
                            <div className='title'>
                                <h4>{ItemTitle}</h4>
                            </div>
                            <div className='content'>

                                <ul className='lab-ul office-address'>
                                    {
                                        ItemList.map((val, i) => (
                                            <li key={i}>
                                                <Link href={val.link}>
                                                {val.text}
                                                </Link>
                                            </li>
                                        )

                                        )
                                    }
                                </ul>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
