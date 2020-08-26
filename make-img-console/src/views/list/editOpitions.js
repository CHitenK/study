import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'

const Lay = (prams) => {
  return(
    <div className="list-lay-out">
        <div className="list-lay-content">
           <div className="lay-name-box">
              <span>
                参数确认
              </span>
              <span>X</span>
           </div>
           <div className="lay-list-cont">
              <div className="lay-list-item">
                <span className="item-lable">bg_color :</span>
                <div className="lay-input-box">
                  <Input />
                </div>
              </div>
           </div>
           <div className="lay-tool-box">
             <Button type="primary">立即查看</Button>
             <span className="jiange"></span>
             <Button>关闭</Button>
           </div>
        </div>
    </div>
  )
}

export default Lay