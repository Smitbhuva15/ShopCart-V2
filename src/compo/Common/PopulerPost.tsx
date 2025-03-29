import { postList } from "@/lib/blogdata"
import Link from "next/link"


const title="Most Popular Posts"


export default function PopulerPost() {
  return (
    <div className='widget widget-post'>
            <div className='widg et-header'> 
                <h5>{title}</h5>
            </div>
            <ul className='widget-wrapper'>
                {
                    postList.map((blog,i)=>(
                        <li key={i} className='d-flex flex-wrap justify-content-between'>
                            <div className='post-thumb'>
                                <Link href={`/blog/${blog.id}`}><img src={blog.imgUrl} alt="" /></Link>
                            </div>
                            <div className='post-content'>
                            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                            <p>{blog.date}</p>
                            </div>
    
                        </li>
                    ))
                }
            </ul>
        </div>
  )
}
