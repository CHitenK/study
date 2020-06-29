import React, { useState } from 'react'
import { Input } from 'antd'
import './index.less'

const List = () =>{
    const [state, setState] = useState({})
    return (
        <div className="page-box">
          <div className="search-box">
             <div className="search-box-item fs-14 clr-II">
               <span className="">编号:</span>
               <div className="for-item"><Input /></div>
             </div>
             <div className="search-box-item fs-14 clr-II">
               <span className="">名称:</span>
               <div className="for-item"><Input /></div>
             </div>
             <div className="search-box-item fs-14 clr-II">
               <span className="">创建人:</span>
               <div className="for-item"><Input /></div>
             </div>
          </div>
        </div>
    )
}
export default List