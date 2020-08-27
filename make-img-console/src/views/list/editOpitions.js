import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'

const Lay = (prams) => {
  const { optArray, setLookLay, updateOptArray, id } = prams
  const setvalue = (e, index) => {
    const target = optArray[index]
    updateOptArray({ key: target.key, value: e.target.value || '' }, index)
  }
  const imgLookSrc = window.location.origin + '/api/makeimg?id=' + id
  let url = ''
  optArray.map(item => {
    url += `&${item.key}=${item.value}`
  })
  url = imgLookSrc + url
  // 立即查看
  const lookNow = () => {
    window.open(url, '_blank')
    setLookLay()
  }
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
                图片访问路径： <a href={url} target="_blank">{url}</a>
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
             <Button type="primary" onClick={() => lookNow()}>立即查看</Button>
             <span className="jiange"></span>
             <Button onClick={() => setLookLay()}>关闭</Button>
           </div>
        </div>
    </div>
  )
}

export default Lay