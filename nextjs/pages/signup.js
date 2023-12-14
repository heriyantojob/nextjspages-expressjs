import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link'
import axios from '../api/axios';
const REGISTER_URL = '/auth/register';
function  Signup() {

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Username is required') .email('Email is invalid'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState,setError} = useForm(formOptions);
  const { errors } = formState;

  // get functions to build form with useForm() hook


  const  onSubmit = async (dataSubmit)=> {
    // display form data on success
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(dataSubmit, null, 4));

    try {
      const response = await axios.post(REGISTER_URL,
          JSON.stringify({username: dataSubmit.username, email: dataSubmit.email,password :dataSubmit.password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      reset();
      setError("success", {
        type: 'custom', message: 'Your account has been created'
      });
      
  
    } catch (err) {
        if (!err?.response) {
            

            setError("failed", {
              type: 'custom', message: 'No Server Response'
            });
        } else if (err.response?.status === 409) {
          setError("failed", {
            type: 'custom', message: 'Username Taken'
          });
            setErrMsg('');
        } else {
          setError("failed", {
            type: 'custom', message: 'Registration Failed'
          });
          
        }
        // errRef.current.focus();

      
    }
    //return false;
  }
 
 

  return (
<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center text-primary sm:text-3xl">
        Get started today
      </h1>
      <p className="max-w-md mx-auto mt-4 text-center ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
        dolores deleniti inventore quaerat mollitia?
      </p>
     
      {/* end form */}

     
 

       

        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div className="card-body">
          {/* alert succes */}


          {errors.success &&
            <h2>
              <div className="alert alert-success shadow-lg">
                <div>
                  <button >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                  </button>
               
                  <span>{errors.success?.message}</span>
                </div>
              </div>
            </h2>
          }


          {/* alert  error*/}

          {errors.failed &&
            <h2>
              <div className="alert alert-error shadow-lg">
                <div>
                 
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
          
               
                  <span>{errors.failed?.message}</span>
                </div>
              </div>
            </h2>
          }
      

          {/* form */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-lg font-medium">Sign in to your account</p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input   {...register('username')} type="text" placeholder="Username" className={`input input-bordered ${errors.username ? 'input-error ' : ''} `} />
                <div className="text-error text-sm ">{errors.username?.message}</div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register('email')} type="text" placeholder="email" className={`input input-bordered ${errors.email ? 'input-error ' : ''} `} />
                <div className="text-error text-sm ">{errors.email?.message}</div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="password"
                  className={`input input-bordered ${errors.password ? 'input-error ' : ''} `}
                />
                  <div className="text-error text-sm ">{errors.password?.message}</div>
                
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Create Account</button>
              </div>
            </form>

            <p className="text-sm text-center  ">
              Already a member? 
              <Link href="/login">
                <a className="underline" href="">
                Sign In
                </a>
              </Link>
            </p>
          </div>
        </div>

        {/* end card form */}
    
    </div>
  </div>
  )
}

export default Signup


/*
https://tkssharma.com/nextjs-with-react-hook-forms-building-forms/
*/ 