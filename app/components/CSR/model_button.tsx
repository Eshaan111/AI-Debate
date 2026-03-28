'use client'
import React from 'react'
import { useRouter,usePathname,useSearchParams } from 'next/navigation'

const ModelButton = ({src,name,inFavour} : any) => {
    const router =  useRouter();
    const curr_path = usePathname();
    const curr_params = useSearchParams();
    let params_new : any = {};
    const changeUrlParams = ()=>{
        for (const [key, value] of curr_params.entries()) {
            params_new[key] = value ;       
            // console.log(`${key}, ${value}`);
        }
        if(inFavour){
            params_new['modelInFavour'] = name
        }
        else{
            params_new['modelAgainst'] = name
        };

        router.push(`${curr_path}?modelInFavour=${params_new['modelInFavour']}&modelAgainst=${params_new['modelAgainst']}`, {scroll : false})
        
    }

  return (
    <button className="dc-slide" onClick={changeUrlParams}>
        <img src={src} alt="text" className="dc-slide-img" />
        <span className="dc-slide-text">{name}</span>
    </button>
  )
}

export default ModelButton
