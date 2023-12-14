import React, { useState,useEffect,useRef } from 'react'
import TabStatus from "../../page-components/template/TabStatus"
import { useRouter } from 'next/router'

import ApiClient from '../../api/ApiClient';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import {signOut,signIn,useSession, getSession} from "next-auth/react"
import axios from 'axios'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import {
 
  Progress
} from "react-daisyui";
import { requireAuth } from '../../utils/requireAuth';
import { BASE_URL } from '../../api/axios';

const  newUpload = ({session})=> {
  
    // const {data: session,statusSession :sessionStatus} = useSession({
    //   required: true,
    //   onUnauthenticated() {
    //     router.push('/login');
    //   },
    // });
    // const { data: session, status } = useSession()
    // const loading = sessionStatus === "loading"
    console.log("session newUpload",session)
    const [template, setTemplate] = useState([]);
    const [isTemplateLoad, setTemplateLoad] = useState(false);
    const [progress, setProgress] = useState(0);
    const router = useRouter()
    const { slug } = router.query
    const effectRan = useRef(false)
    
    useEffect (() => {
      console.log("change session status")
      if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
        // if (sessionStatus!=="authenticated") {
        //   //alert(sessionStatus)
        //    router.push('/login');
        // }
        
        fetchData();

       
      }
      return () => {
        console.log('unmounted')
        effectRan.current = true
      }
    
    }, []);




    const fetchData = async () => {
      console.log("========try fetch data")
      try {
        setTemplateLoad(true)
        const response=  await ApiClient.get('/template/user-upload?page=1',
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        } );
      
        //console.log("response template "+response); 
        if(response.status == 200){
        
          let responseData = response.data;
          console.log("response template data :  ",response.data); 
          console.log("response template data :  ", responseData.resultData); 
         
          // dispatch(authActions.login({
          //     isLogin :true ,
          //     userData :responseData
          // }));
          // navigate("/", { replace: true });
          setTemplate(responseData.resultData)
          console.log("response template change :  ", template)
          setTemplateLoad(false)
  
        }
        
      } catch (error) {
        console.log("response data template error \n "+error); 
        setTemplateLoad(false)
      }
    }
  
    //form upload
    const validationSchema = Yup.object().shape({
     
      product: Yup.string().required('Product is required') ,
      file: Yup.mixed().test("required", "photo is required", value => value.length > 0),
  
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
  
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState ,setError} = useForm(formOptions);
    const { errors } = formState;
  
    const  onSubmit = async (dataSubmit)=> {
     
      // display form data on success
     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(dataSubmit, null, 4));
      //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(dataSubmit, null, 4))
      const formData = new FormData();
      formData.append("file", dataSubmit.file[0]);
      formData.append("product", dataSubmit.product);
   
      //formData.append("file", dataSubmit.file[0]);

      //console.log(dataSubmit.file[0])
      try {
        const config = {
          onUploadProgress: progressEvent => {
            let percentComplete = progressEvent.loaded / progressEvent.total
            percentComplete = parseInt(percentComplete * 100);
            console.log(percentComplete);
            setProgress(percentComplete);
          }
        }  
        const response=  await ApiClient.post('/template-file/upload', 
        
      
          formData,config,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
   //   console.log("response.status "+response); 
      if(response.status == 200){
      
        let responseData = response.data;
       // console.log("response data: ",response.data); 
        // dispatch(authActions.login({
        //     isLogin :true ,
        //     userData :responseData
        // }));
        // navigate("/", { replace: true });

      }
        
      } catch (error) {
        console.log("error response "+error); 
      }
     
  
      //alert("success")
      //return false;
    }

    // if (typeof window !== "undefined" && loading) return null
    return (
      <>
       
          <div className=" px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div className=" mx-auto text-center">

            {/* <div className="tabs tabs-boxed">
              <a className="tab tab-active">Upload</a>
              <a className="tab ">Review</a>
              <a className="tab">Publish</a>
              <a className="tab ">Reject</a>
            </div> */}
              <TabStatus nameNow={"Upload"}></TabStatus>

              <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Upload Template</h1>
      
              {/* upload form */}
            

              <form  onSubmit={handleSubmit(onSubmit)}  >
                

                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                  <div className="card-body">
                
                    {/* alert  error*/}

                

                    <div className="flex flex-row">
                      <div className="basis-1/4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Product</span>
                            </label>
                            <select className="select w-full max-w-xs mr-2" {...register("product")}>
                              <option disabled="" value="" >
                                Pick Product
                              </option>
                                <option value="1">Photo</option>
                                <option  value="2">Video</option>
                                <option value={"3"}>Music</option>
                          
                            </select>
                        
                            <div className="text-error text-sm ">{errors.product?.message}</div>
                          
                        </div>
                      </div>  
                      <div className="basis-1/4">  
                        <div className="form-control">
                            <label className="label">
                              <span className="label-text">Upload</span>
                            </label>
                            <input  type="file" placeholder="file" className={`input   `} {...register("file")} name="file" />
                            <div className="text-error text-sm ">{errors.file?.message}</div>
                          </div>
                        </div>
                
                      <div className="basis-1/4"><button className="btn btn-primary">Upload</button></div>
                      <div className='basis-2/4'>
                        <progress className="progress progress-primary w-56" value={progress} max={100} />
                        {progress}%

                      </div>
                    </div>
                        
                  
        
                    
                  </div>
                </div>

                {/* end card form */}
              </form>
            </div>

          </div>


        {/* list data */}

        {/* <Skeleton /> */}
        {isTemplateLoad?
                (
                  <>
                    <section className="mt-12 mx-auto sm:px-6 lg:px-8">
                      Loading
                    </section>
                  </>
                ):(
                  <>

               
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full"> 

                          {/* head table */}
                          <thead>
                              <tr>
                                  <th>
                                  <label>
                                      <input type="checkbox" className="checkbox" />
                                  </label>
                                  </th>
                                  <th>Produk</th>
                                  <th>file</th>
                                  <th>status</th>
                             
                                  <th></th>
                              </tr>
                          </thead>
                          {/* end table */}
                          <tbody>{template?.map((item) =>
                                <tr key={item.id_template}>
                                  <th>
                                      <label>
                                          <input type="checkbox" className="checkbox" />
                                      </label>
                                  </th>
                                  <td>
                                      <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                              <img src={BASE_URL+"/template-file/download/"+item.id_template+"/"+item.resultfile?.file_list?.thumbnail.file_name} />
                                            </div>
                                        </div>
                                        <div>{item?.resultfile?.file_name}</div>
                                      </div>
                                  </td>
                                  <td> 
                                
                                      <span className="badge badge-ghost badge-sm">success</span>
                                  </td>
                    
                                <th>
                                  <div className="card-actions justify-end">
                                      <button className="btn btn-primary" onClick={(e) => {router.push('/template-upload/edit/'+item.id_template)}}>
                                        Edit
                                      </button>
                                      <button className="btn btn-secondary">Download</button>
                                      <button className="btn btn-error">Delete</button>
                                  </div>
                                </th>
                              </tr> 
                               )}</tbody> 
                      
                        </table>
                        
                    </div>
           
                  </>
                )}
      
        


       

    
      </>
     
 
    
      
    )
}
export async function getServerSideProps(context) {
  return requireAuth(context,({session})=>{
    return {
      props: {session}, // will be passed to the page component as props
    }
  }) 
  
}

export default newUpload


/*

https://github.com/nextauthjs/next-auth-example/blob/main/pages/protected.tsx
https://www.hyperui.dev/components/ecommerce/products
http://localhost:3000/template-upload/new

*/