import React, { useState } from 'react'

import { Button, Switch, message  } from 'antd'
import BgNex from './bgnex'
import Text from './text'
import NormalImg from './normalImg'
import PreView from './preview'
import { useStore, dispatch } from './../../store/makeimg'
import './index.less'
import { save } from './../../api/index'

const Makeimg = () => {
   //useState的参数为初始状态值，返回了一个长度为2的数组，第一个元素就是我们类组件里的state对象，第二个元素是个函数，作用相当于类组件里用的setState。这两个元素的名字随便是什么都可以
   const [state, setState] = useState({ active: 'bgNex' })
   const bgData = useStore(s => s.bgData)
   const textOpt = useStore(s => s.textOpt)
   const normalOpt = useStore(s => s.normalOpt)
   let canSave = true
   const rederForm = () => {
      const active = state.active
      switch(active) {
        case 'bgNex': {
            return (<BgNex />)
        }
        case 'text': {
            return (<Text />)
        }
        case 'normalImg': {
            return (<NormalImg />)
        }
        default: return (<BgNex />)
      }
   }
   const handdleTab = (val) => {
      setState(oldState => ({
        ...oldState,
        active: val
      }))
   }
   // Function 切换网格
   const switchNet = () => {
      dispatch('swicthShowNet')
   }
   const commit = () => {
      if (!canSave) return false
      canSave = false
      // 校验
      if (!bgData.name) {
        message.error('名称不能为空')
        return false
      }
      if (!bgData.describe) {
        message.error('描述不能为空')
        return false
      }
      if (!bgData.width || bgData.width <= 0) {
        message.error('底框宽高不能为空，且不小于0')
        return false
      }
      if (!bgData.height || bgData.height <= 0) {
        message.error('底框宽高不能为空，且不小于0')
        return false
      }
      if (bgData.isBgColor == 1 && !bgData.bgColor) {
        message.error('底框底色不能为空')
        return false
      }
      if (bgData.isBgColor == 2 && !bgData.bgImgSrc) {
        message.error('底框底图地址不能为空')
        return false
      }
      const data = {
        bgData, textOpt, normalOpt, creatName: sessionStorage.getItem('userName'),
        isUse: false
      }
      save(data).then(res => {
         message.success('保存成功')
         
      }).catch(res => {
        message.error(res.msg)
      }).finally(() => {
        canSave = true
      })
   }
   return (
        <div className="cont-box route-box">
           <div className="route-box-l">
              <div className="tool-box">
                 <Button type={state.active === 'bgNex' ? 'primary' : ''} className="mr-l-15"  onClick={() => handdleTab('bgNex')}>底框</Button>
                 {/* <Button type={state.active === 'qr' ? 'primary' : ''} className="mr-l-15" onClick={() => handdleTab('qr')}>小程序码</Button> */}
                 <Button type={state.active === 'normalImg' ? 'primary' : ''} className="mr-l-15" onClick={() => handdleTab('normalImg')}>常规图片</Button>
                 <Button type={state.active === 'text' ? 'primary' : ''} className="mr-l-15" onClick={() => handdleTab('text')}>文字</Button>
                 {/* <Button type={state.active === 'text' ? 'primary' : ''} className="mr-l-15" onClick={() => handdleTab('text')}>列表图片</Button> */}
              </div>
              <div className="form-box mr-t-30">
                <div className="form-box-l">
                {
                    rederForm()
                }
                </div>
              </div>
              <div className="mr-t-30 last-tool-box ">
                 <div>
                    <Button className="mr-l-15" type="primary" onClick={commit}>保存</Button>
                    <Button className="mr-l-15">重置</Button>
                 </div>
                 <div>
                   <Switch checkedChildren="开启网格" unCheckedChildren="关闭网格"  onChange={() => switchNet()} />
                 </div>
              </div>
           </div>
           <PreView />
        </div>
   )
}

export default Makeimg
