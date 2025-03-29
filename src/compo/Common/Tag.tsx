import { tagsList } from "@/lib/blogdata";
import Link from "next/link";

const title = "Our Popular Tags";


export default function Tag() {
    return (
        <div className='widget widget-tags'>
            <div className='widget-header'>
                <h5 className='title'>{title}</h5>
            </div>
            <ul className='widget-wrapper'>
                {
                    tagsList.map((val,i)=>(
                        <li key={i}><Link href={val.link}>{val.text}</Link></li>
                    ))
                }
            </ul>
        </div>
      )
}
