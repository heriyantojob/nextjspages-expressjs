import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {getCsrfToken, signIn} from "next-auth/react";
import {useRouter} from "next/router";
function login() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
    //.min(8, 'Password must be at least 8 characters')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // )
    
    .required('Password is required'),
    email: Yup.string().required('Username is required') .email('Email is invalid'),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState ,setError} = useForm(formOptions);
  const { errors } = formState;

  const  onSubmit = async (dataSubmit)=> {
    // display form data on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));

    const res = await signIn('credentials', {
      redirect: false,
      email: dataSubmit.email,
      password: dataSubmit.password,
      callbackUrl: `/`,
    });

    if (res?.error) {
      //setError(true);
      setError("failed", {
        type: 'custom', message: 'Username or password is incorret'
      });
    } else {
      router.push('/');
    }
    //return false;
  }



  return (
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
                <button className="btn btn-primary">Login</button>
              </div>

              <p className="text-sm text-center  ">
                  No account?
                <Link href="/signup">
                  <a className="underline" href="">
                    Create Account
                  </a>
                </Link>
              </p>
            </div>
          </div>

          {/* end card form */}
        </form>
      </div>

    </div>

  )
}

export default login