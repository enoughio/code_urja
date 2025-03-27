import React from 'react'
import Introduction from '@/Frontend/componets/about/Introduction'
import MissionVision from '@/Frontend/componets/about/MissionVision'
import History from '@/Frontend/componets/about/History'
import Leadership from '@/Frontend/componets/about/Leadership'
import ValueCulture from '@/Frontend/componets/about/ValueCulture'
import Achievements from '@/Frontend/componets/about/Achievements'
import Testimonials from '@/Frontend/componets/about/Testimonials'
import Contact from '@/Frontend/componets/about/Contact'


const page = () => {
  return (
    <div>
      <div className=' p-8 '>
        <div>
        <Introduction/>
        </div>
        <div className=' p-8 bg-[#189ab4]'><MissionVision/></div>
        <div className=' p-8 '><History/></div>
        <div className=' p-8 bg-[#189ab4]'><Leadership/></div>
        <div className=' p-8 '><ValueCulture/></div>
        <div className=' p-8 bg-[#189ab4]'><Achievements/></div>
        <div className=' p-8 '><Testimonials/></div>
        <div className=' p-8 bg-[#189ab4]'><Contact/></div>

{/*         
      <Introduction/>
      <MissionVision/>
      <History/>
      <Leadership/>
      <ValueCulture/>
      <Achievements/>
      <Testimonials/>
      <Contact/> */}

      </div>
      

      
    </div>
  )
}

export default page