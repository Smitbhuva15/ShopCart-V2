import PageHeader from '@/compo/Common/PageHeader';
import { aboutList } from '@/lib/newdata';
import React from 'react'


const subTitle = "About Our Brand";
const title = "Good Qualification Services And Better Expriences";
const desc = "Distinctively provide acces mutfuncto users whereas transparent proceses somes ncentivize eficient functionalities rather than extensible archtectur communicate leveraged services and cross-platform.";

const year = "35+";


export default function About() {


  return (
    <div>
      <PageHeader title={"About Our Brand"} curPage={"About"} />
      <div className='about-section style-3 padding-tb section-bg'>
        <div className='container'>
          <div className='row justify-content-center row-cols-xl-2 row-cols-1 align-items-center'>
            <div className='col'>
              <div className='about-left'>
                <div className='about-thumb'>
                  <img src="/images/about/01.jpg" alt="" />
                </div>
                <div className='abs-thumb'>
                  <img src="/images/about/02.jpg" alt="" />
                </div>
                <div className='about-left-content'>
                  <h3>{year}</h3>
                  <p>(expareance)</p>
                </div>

              </div>

            </div>


            {/* second  col*/}

            <div className='col'>
              <div className='about-right'>
                <div className='section-header'>
                  <span className='subtitle'>{subTitle}</span>
                  <h2 className='title'>{title}</h2>
                  <p>{desc}</p>
                </div>

                <div className='section-wrapper'>
                  <ul className='lab-ul'>
                    {
                      aboutList.map((val, i) => (
                        <li key={i}>
                          <div className='sr-left'>
                            <img src={val.imgUrl} alt="" />
                          </div>
                          <div className='sr-right'>
                            <h5>{val.title}</h5>
                            <p>{val.desc}</p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>

                </div>
              </div>


            </div>



          </div>
        </div>
      </div>
    </div>
  )
}
