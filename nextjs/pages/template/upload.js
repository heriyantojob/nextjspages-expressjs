import React from 'react'
import { useRouter } from 'next/router'
function Upload() {
    const router = useRouter()
    const { slug } = router.query
    return (
      <>
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Get started today!</h1>
        <p className="mt-4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
          eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          

          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
              <p className="text-lg font-medium">Sign in to your account</p>
        {/* alert  error*/}

         

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input  type="text" placeholder="email" className={`input input-bordered  `} />
                <div className="text-error text-sm "></div>
              </div>
            
              <div className="form-control mt-6">
                <button className="btn btn-primary">Publish</button>
              </div>

              
            </div>
          </div>

          {/* end card form */}
        </form>
      </div>

    </div>
      </>
     
 
    
      
    )
}

export default Upload

/*
https://www.hyperui.dev/components/ecommerce/products

*/