import React, { useEffect,useRef } from 'react'
import LoadMore from './LoadMore';
import Explore from './Explore';
import { motion , useInView ,useAnimation} from "framer-motion";
import Hero from './Hero';

const Home = ({curstate,setcurstate}) => {
    const ref= useRef(null);
    const inview = useInView(ref, {once:true});
    const maincontrols = useAnimation();
  
    useEffect(()=>{
      if(inview){
        maincontrols.start("visible");
      }
    },[inview]);
  return (
    <div ref={ref}>
    <motion.div
    variants={{
      hidden:{opacity:0,y:300},
      visible:{opacity:1,y:0}
    }}
    initial="hidden"
    animate={maincontrols}
    transition={{duration:1,delay:0.25}}
    >
  <Hero curstate={curstate} setcurstate={setcurstate}/>
  <div className="sm:p-16 py-16 px-8 flex flex-col gap-10">
   <Explore/>
    <LoadMore />
  </div>
  </motion.div>
  </div>
  )
}

export default Home
