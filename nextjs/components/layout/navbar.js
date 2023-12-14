import { useState } from 'react'
import Link from 'next/link'
import {signOut,signIn,useSession} from "next-auth/react"
import axios,{BASE_URL} from '../../api/axios';

function Navbar(props) {

  const logout = async (e) => {
       
       
    //alert("logout")

     try {
         const response=  await axios.get(BASE_URL+'/auth/logout', 
           
          
             {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
             }
         );
         if(response.status == 204||response.status == 200){
             //console.log(response.data);   
             let responseData = response.data;
           
            signOut({ callbackUrl: '/login' })
  
 
         }
     }catch (error) {
         console.log(error.response.data);   
     }
     return signOut({ callbackUrl: '/login' });
   

  }  

  const {data: session,status :sessionStatus} = useSession();
  // console.log("session navbar",session);
    return (
      <>
        {/* Hello world */}
        <div className="navbar bg-base-100 z-40">
          <div className="flex-1 lg:flex-none  ">
            {/* drawer */}

            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                
                <li>
                  <a>Item 1</a>
                </li>
                <li tabIndex={0}>
                  <a className="justify-between">
                    Parent
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                  </a>
                  <ul className="p-2 bg-base-100">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>

            {/* logo */}
            <Link href="/">
              <a className="btn btn-ghost normal-case text-xl">Heriyanto Project</a>
            </Link>
            
          </div>

          <div className="flex-1 hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <Link href="#!">
                <li>
                  <a>app</a>
                </li>
              </Link>
            

              {/* service menu */}

              <li tabIndex={0}>
                <a>
                  Services
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-base-100 z-40">
                  <Link href="/services">
                    <li>
                      <a>All Services</a>
                    </li>
                  </Link>
                  <Link href="/services/design">
                    <li>
                      <a>Design</a>
                    </li>
                  </Link>
                  <Link href="/services/web-development">
                    <li>
                      <a>Web Development</a>
                    </li>
                  </Link>
                
                  <Link href="/services/mobile-development">
                    <li>
                      <a>Mobile Development</a>
                    </li>
                  </Link>

                  
          
                </ul>
            </li>



              {/* downlaod file menu */}
              <li tabIndex={1}>
                <a>
                  Template
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-base-100 z-40">
                  <Link href="/template-upload/new">
                    <li>
                      <a>All Template</a>
                    </li>
                  </Link>

                  <li>
                    <a>images</a>
                  </li>
                  <Link href="/template-upload/new">
                    <li>
                      <a>Vector</a>
                    </li>
                  </Link>
                  <li>
                    <a>video</a>
                  </li>
                </ul>
              </li>
              <Link href="/blog">
                <li>
                  <a>Blog</a>
                </li>
              </Link>
             
            </ul>
          </div>


            <div className=" flex-none gap-2">
                {/* <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered"
                  />
                </div> */}

                {/* select theme */}

                  <div className="dropdown dropdown-end">
                        <div>
                          <label tabIndex={0} className="btn btn-ghost ">
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                              >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                              />
                            </svg>
                            theme

                            <svg
                                width="12px"
                                height="12px"
                                className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 2048 2048">
                              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                            </svg>

                          </label>
                        </div>
                      
                        <ul
                          tabIndex={0}
                          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button  onClick={ (e) => 
                                                {props.changeChoseTheme(e, "light");
                                            }} >
                              Light
                         
                            </button>
                          </li>
                          <li>
                            <button   onClick={ (e) => 
                                                {props.changeChoseTheme(e, "dark");
                                            }} >
                              Dark
                         
                            </button>
                          </li>
                          <li>
                            <button     onClick={ (e) => 
                                                {props.changeChoseTheme(e, "luxury");
                                            }} > 
                              Luxury
                            </button>
                          </li>


                    
                        </ul>
                  </div>
                      

                {/* end select theme */}
                {sessionStatus==="authenticated"?
                (
                    <>
                                    {/* profile */}
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" />
                          </div>
                        </label>
                        <ul
                          tabIndex={0}
                          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                        >
                        
                          <li>
                            <a className="justify-between">
                              Profile
                              <span className="badge">New</span>
                            </a>
                          </li>
                          <Link href="/template-upload/new">
                            <li>
                              <a className="justify-between">
                                Upload
                               
                              </a>
                          </li>
                          </Link>
                         
                          <li>
                            <a>Settings</a>
                          </li>
                          <li>
                            <a onClick={signIn}>signIn</a>
                          </li>
                        
                          <li>
                            <a onClick={()=> signOut({ callbackUrl: '/login' })}>Logout</a>
                          </li>
                        </ul>
                      </div>
                      
                    </>

                ):
                (
                    <>
                      <Link href="/login">
                        <a className="btn btn-primary">Login</a>
                      </Link>
                  
                    </>
                )}
              
                

            </div>
        </div>
      </>

    )
}
export default Navbar