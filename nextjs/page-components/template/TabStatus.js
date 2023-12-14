import React from 'react'
import Link from 'next/link'
function TabStatus({nameNow}) {
  console.log("nameNow",nameNow)
  let templateStatus = [ { name:"Upload",url:"/template-upload/new"},
                          {name:"Review",url:"/template-upload/review"},
                          {name:"Publish",url:"/template-upload/publish"},
                          {name:"Reject",url:"/template-upload/reject"},]
  return (
    <div className="tabs tabs-boxed">
      {templateStatus?.map((item) =>
        <Link key={item.name} href={item.url}>
          <a  className={`tab ${item.name===nameNow ? 'tab-active ' : ''} `}>{item.name}</a>
        </Link>
      )}
  
      {/* <a className="tab ">Review</a>
      <a className="tab">Publish</a>
      <a className="tab ">Reject</a> */}
    </div>
  )
}

export default TabStatus