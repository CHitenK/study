import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'

const Lay = (prams) => {
  const { optArray, setLookLay, updateOptArray } = prams
  const setvalue = (e, index) => {
    const target = optArray[index]
    updateOptArray({ key: target.key, value: e.target.value || '' }, index)
  }
  const imgLookSrc = process.env.NODE_ENV === 'production' ?  'http://chimke.cn:8088/api/makeimg?id=' :  window.location.host + '/api/makeimg?id='
  let url = ''
  optArray.map(item => {
    url += `&${item.key}=${item.value}`
  })
  url = imgLookSrc + url
  return(
    <div className="list-lay-out">
        <div className="list-lay-content">
           <div className="lay-name-box">
              <span>
                参数确认
              </span>
              <span onClick={() => setLookLay()}>X</span>
           </div>
           <div className="lay-list-cont">
              <div className="show-can">
                图片访问路径： <a href={url}>{url}</a>
              </div>
              {
                optArray && optArray.map((item, index) => {
                  return (
                    <div className="lay-list-item" key={index} >
                      <span className="item-lable">{item.key} :</span>
                      <div className="lay-input-box">
                        <Input value={item.value} onChange={(e) => setvalue(e, index)} />
                      </div>
                    </div>
                  )
                })
              }
           </div>
           <div className="lay-tool-box">
             <Button type="primary">立即查看</Button>
             <span className="jiange"></span>
             <Button onClick={() => setLookLay()}>关闭</Button>
           </div>
        </div>
    </div>
  )
}

export default Lay