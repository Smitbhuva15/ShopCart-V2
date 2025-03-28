import Link from 'next/link'
import Foot1 from './Foot1';
import { footerbottomList } from '@/lib/footerdata';
import Foot2 from './Foot2';


 

export default function Footer() {
    const date=new Date();
    const year=date.getFullYear()
    return (
        <footer className='style-2'>
            <div className='footer-top dark-view padding-tb'>
                <div className='container'>
                    <div className='row g-4 row-cols-xl-4  row-cols-sm-2  row-cols-1 jusctify-content-center' >
                        <Foot1 />
                        <Foot2 />

                    </div>
                </div>
            </div>

            {/* footer bottom */}

            <div className='footer-bottom'>
                <div className='container'>
                    <div className='section-wrapper'>
                        <p>&copy; {year}<Link href='/'>Shop Cart</Link> Designed by <Link href='/' target='_blank'>Smit.tech</Link></p>
                        <div className='footer-bottom-list'>
                            {
                                footerbottomList.map((val, i) => (
                                    <Link href="#" key={i}>{val.text}</Link>

                                )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
