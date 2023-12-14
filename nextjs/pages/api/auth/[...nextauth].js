import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const accessTokenMinute=40;
const  accessTokenExpires = accessTokenMinute*1000 * 60;
import axios,{BASE_URL} from '../../../api/axios';
import {signOut} from "next-auth/react"

export  const authOptions = (req, res) =>   {
    return {
      providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: {label: 'Email', type: 'text', placeholder: 'Enter your email'},
            password: {label: 'Password', type: 'password', placeholder: 'Enter your password'},
          },
          async authorize(credentials) {
            const payload = {
              email: credentials.email,
              password: credentials.password,
            };

    
            try {
              const response=  await axios.post(BASE_URL+'/auth/login', 
                JSON.stringify(payload),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
              );
              const setCookies = response.headers['set-cookie']

              res.setHeader('Set-Cookie', setCookies)
            
              
              return response.data;
              
            } catch (error) {
              throw new Error('Wrong username or password');
            }
          
        
        
          
            return null;
          }
        }),
      ],// provider
      session: {
        jwt: true,
        // maxAge:accessTokenMinute* 60
      },// session
      jwt: {
        secret: 'SUPER_SECRET_JWT_SECRET',
        // maxAge: accessTokenMinute*60
      },// jwt
      callbacks: {
        async jwt({ token, user, account }) {
          if (account && user) {
           // console.log("nextauth account",account.expires_in)
          
            return {
              ...token,
              accessToken: user.accessToken,
              accessTokenExpires: Date.now() +accessTokenExpires,
              name: user.name,
            
            // refreshToken: user.data.refresh_token,
            };
          }
        //  console.log("nextauth token belum expired ", token)
         // return token
          
          if (Date.now() < token.accessTokenExpires) {
            //console.log("nextauth token belum expired ", token)
            return token
          }
          return refreshAccessToken(token,req, res) 
          
        },
    
        async session({ session, token }) {
          session.user.accessToken = token.accessToken;
          session.user.name = token.name;
        // session.user.refreshToken = token.refreshToken;
    
          return session;
        },
      },// calbacks
      pages: {
        signIn: '/login',
      }//pages
    }//  return auth options
    
  }//authOptions
  
  async function refreshAccessToken(token,req, res) {
    //console.log("/n/n=================/n/n [...nextauth] refreshAccessToken ")
   
    try {
 
  
      // const response = await fetch(url, {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   method: "get",
      // })

      //get response
      const response=  await axios.get(BASE_URL+'/auth/refresh', 
    
            {
                headers: { 
                    'Content-Type': 'application/json',
                    cookie: req.headers.cookie   
                },
            withCredentials: true
        }
      );
     
     

      //set cookies
      const setCookies = response.headers['set-cookie']
 
      res.setHeader('Set-Cookie', setCookies)
      //console.log("refresh set cookie",setCookies)
        //return data
      //console.log("refresh status",response.data)

        // return {
        //   ...token,
        //   error: "RefreshAccessTokenError",
        // }

      return {
        ...token,
        accessToken: response.data.accessToken,
        accessTokenExpires: Date.now() +accessTokenExpires,
        name: response.data.name,
      }
    } catch (error) {
      //console.log("error refresh token",error)
      // console.log("error refresh status",error.response.status)
      // console.log("error refresh data",error.response.data)
    

      //return signOut({ callbackUrl: '/login' });
      return {
        ...token,
        error: "RefreshAccessTokenError",
      }
    }
  }
  export default (req, res) => {
    return NextAuth(req, res, authOptions(req, res))
  }
  //export default (req, res) => NextAuth(req, res, authOptions);