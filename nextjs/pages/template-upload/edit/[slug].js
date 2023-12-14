import React ,{useRef,useEffect} from 'react'
import { useRouter } from 'next/router'
import { requireAuth } from '../../../utils/requireAuth';
import ApiClient from '../../../api/ApiClient';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
function Upload() {
    const router = useRouter()
    const { slug } = router.query
    const effectRan = useRef(false)

    //react hook form set

    const validationSchema = Yup.object().shape({
     
      title: Yup.string().required('Title is required') ,
      tags: Yup.string().required('tags is required') ,
      description: Yup.string().required('Description is required') ,
      // file: Yup.mixed().test("required", "photo is required", value => value.length > 0),
  
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
  
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState ,setError,setValue} = useForm(formOptions);
    const { errors } = formState;

    //useEffect load data first
    useEffect (() => {
      console.log("slug",slug)
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
        // setTemplateLoad(true)
        const response=  await ApiClient.get('/template/upload/'+slug,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        } );
      
        //console.log("response template "+response); 
        if(response.status == 200){
        
          let responseData = response.data;
          console.log("response template data :  ",response.data); 
          console.log("response template data :  ", responseData.resultData); 
          if(response.data){
            setValue("title", responseData?.resultData?.title);
            console.log(responseData?.resultData?.tags)
            let  responseDataTags = responseData?.resultData?.tags.join(",");
            console.log(responseDataTags);
            setValue("tags", responseDataTags);
            setValue("product", responseData?.resultData?.product);
            setValue("description", responseData?.resultData?.description);
            
            
          }
         
          // dispatch(authActions.login({
          //     isLogin :true ,
          //     userData :responseData
          // }));
          // navigate("/", { replace: true });
          // setTemplate(responseData.resultData)
          // console.log("response template change :  ", responseData.resultData)
          // setTemplateLoad(false)
  
        }
        
      } catch (error) {
        console.log("response data template error \n "+error); 
       // setTemplateLoad(false)
      }
    }

    const  onSubmit = async (dataSubmit)=> {
      // console.log("product",dataSubmit.title)
      // return;
      // const formData = new FormData();
      // formData.append("title", dataSubmit.title);
      // formData.append("description", dataSubmit.description);
      // formData.append("tags", dataSubmit.tags);
      
      //formData.append("file", dataSubmit.file[0]);
      //console.log(dataSubmit.file[0])
      let formData =  {
        'title': dataSubmit.title,
        'description': dataSubmit.description,
        'tags' : dataSubmit.tags
      }
      try {
        
        
        const response=  await ApiClient.patch('/template/'+slug, 
        
      
          formData,
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
  
    return (
      <>
    <div className=" px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className=" mx-auto text-center">
        <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Upload Template</h1>
 

        <form onSubmit={handleSubmit(onSubmit)}>
          

          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
          
        {/* alert  error*/}

      
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Product</span>
                    </label>
                    <select className="select w-full max-w-xs mr-2" {...register("product")}>
                      <option disabled="" >
                        Pick Product
                      </option>
                        <option value="1">Photo</option>
                        <option  value="2">Video</option>
                        <option value={"3"}>Music</option>
                  
                    </select>
                
                    <div className="text-error text-sm ">{errors.product?.message}</div>
                  
                </div>
        



             
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input  type="text" placeholder="title" className={`input input-bordered  `} {...register("title")}/>
                <div className="text-error text-sm ">{errors.title?.message}</div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tags</span>
                </label>
                <input  type="text" placeholder="tags" className={`input input-bordered  `}  {...register("tags")} />
                <div className="text-error text-sm ">{errors.tags?.message}</div>
              </div>

           
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Categori</span>
                </label>

                <div className="input-group">
                  <label className="label cursor-pointer">
                    <span className="label-text">Photo</span> 
                    <input type="checkbox" className="checkbox checkbox-primary" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Video</span> 
                    <input type="checkbox" className="checkbox checkbox-primary" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Music</span> 
                    <input type="checkbox" className="checkbox checkbox-primary" />
                  </label>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>

                <textarea className={`textarea textarea-primary `}   {...register("description")}  placeholder="Description"></textarea>
                <div className="text-error text-sm ">{errors.description?.message}</div>
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
export async function getServerSideProps(context) {
  return requireAuth(context,({session})=>{
    return {
      props: {session}, // will be passed to the page component as props
    }
  }) 
  
}



export default Upload

/*
https://www.hyperui.dev/components/ecommerce/products

*/