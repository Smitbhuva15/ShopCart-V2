
import { quickList } from '@/lib/footerdata';
import Link from 'next/link'


const quickTitle = "Quick Links";
const tweetTitle = "Recent Tweets";
const tweetList = [
    {
        iconName: 'icofont-twitter',
        desc: <p>Aminur islam <Link href="#">@ShopCart Greetings!  #HTML_Template</Link> Grab your item, 50% Big Sale Offer !!</p>,
    },
    {
        iconName: 'icofont-twitter',
        desc: <p>Somrat islam <Link href="#">@ShopCart Hey! #HTML_Template</Link> Grab your item, 50% Big Sale Offer !!</p>,
    },
]



export default function Foot2() {
  return (
    <>
    <div className='cols'>
                            <div className='footer-item our-address'>
                                <div className='footer-inner'>
                                    <div className='footer-content'>
                                        <div className='title'>
                                            <h4>{quickTitle}</h4>
                                        </div>
                                        <div className='content'>

                                            <ul className='lab-ul office-address'>
                                                {
                                                    quickList.map((val, i) => (
                                                        <li key={i}>
                                                            <i>{val.text}</i>
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
                                            <h4>{tweetTitle}</h4>
                                        </div>
                                        <div className='content'>

                                            <ul className='lab-ul office-address'>
                                                {
                                                    tweetList.map((val, i) => (
                                                        <li key={i}>
                                                            <i className={val.iconName}></i>
                                                            {val.desc}
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
