import React from 'react'
import Image from 'next/image'
export default function Custom404() {
    return (
        <div className="md:container md:mx-auto">
                <Image src="/404.svg"   layout="responsive"
                    width={700}
                    height={475}  />
                    
        </div>
    
        
    );
  }