import React from 'react'
import {signOut,useSession} from "next-auth/react"

function token() {

    const {data: session,status :sessionStatus} = useSession();
    return (
        <div>
            <div className='w-100 break-words'>
                    {JSON.stringify(session)}
          {/* <div>     {session.user.accessToken}</div> */}
              {/* <div>     {session.user.accessToken}</div>
              <div>{session.user.accessToken}</div>
              <div>{session.user.refreshToken}</div> */}
            </div>
        </div>

    )
}

export default token
