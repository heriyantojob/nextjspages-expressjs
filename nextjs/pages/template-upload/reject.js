import React from 'react'
import { useRouter } from 'next/router'
import TabStatus from "../../page-components/template/TabStatus"
function reject() {
    const router = useRouter()
    const { slug } = router.query
    return (
      <>
    <div className=" px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className=" mx-auto text-center">

        <TabStatus nameNow={"Reject"}></TabStatus>
        <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Upload Template</h1>
 
        <section className="mt-12 mx-auto sm:px-6 lg:px-8">
            <div className="mt-12 grid gap-1 sm:grid-cols-2 lg:grid-cols-4 z-0">
                    

                
                

                <div  className="card  bg-base-100 shadow-xl z-0 ">
                    <figure>
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            tes
                        
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Edit</button>
                            <button className="btn btn-secondary">Download</button>
                            <button className="btn btn-error">Delete</button>
                        </div>
                    </div>
                </div>  
                    
            </div>
        </section>

    

      </div>

    </div>
      </>
     
 
    
      
    )
}

export default reject

/*
https://www.hyperui.dev/components/ecommerce/products

*/