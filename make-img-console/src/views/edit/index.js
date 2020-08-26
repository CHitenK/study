import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Switch, message  } from 'antd'
import BgNex from './bgnex'
import Text from './text'
import NormalImg from './normalImg'
import PreView from './preview'
import Badge from './../../components/badge/index'
import { useStore, dispatch } from './../../store/edit'
import './index.scss'
import { getImgDetail, updateData } from './../../api/index'

const EditImg =  (opt) => {
  const  { params } = opt.match // 获取路由参数
   //useState的参数为初始状态值，返回了一个长度为2的数组，第一个元素就是我们类组件里的state对象，第二个元素是个函数，作用相当于类组件里用的setState。这两个元素的名字随便是什么都可以
   const [state, setState] = useState({ 
     active: 'bgNex',
     canRender: false,
     bgData: {},
     textOpt: [],
     normalOpt: [],
     oldImgData: {}
   })
   const bgData = useStore(s => s.bgData)
   const textOpt = useStore(s => s.textOpt)
   const normalOpt =  useStore(s => s.normalOpt)
   const history = useHistory()
   let canSave = true
   const rederForm = () => {
      if (!state.canRender){
        return ''
      }
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
      if (bgData.isBgColor == 1 ) {
        if (bgData.isTransmit && !bgData.bgColor) {
          message.error('底框底色不能为空')
          return false
        } else {
          if (!bgData.transmitName || !bgData.deflautColor) {
            message.error('参数名和默认值不能为空')
            return false
          }
        }
      }
      if (bgData.isBgColor == 2 && !bgData.bgImgSrc) {
        message.error('底框底图地址不能为空')
        return false
      }
      let flage = true
      // 校验图片
      for (let i = 0; i < normalOpt.length; i++ ) {
        const item = normalOpt[i]
        if (item.isTransmit) {
          if (!item.transmitName || !item.defaultSrc) {
            message.error('图片参数名和默认值不能为空')
            flage = false
            break
          }
        }
      }
      if (!flage) return false
      // 校验文字
      for (let t = 0; t < textOpt.length; t++ ) {
        const item = textOpt[t]
        if (item.isTransmit) {
          if (!item.transmitName || !item.defaultDes) {
            message.error('文案参数名和默认值不能为空')
            flage = false
            break
          }
        }
      }
      if (!flage) return false
      if (!canSave) return false
      canSave = false
      const data = {
        ...state.oldImgData,
        bgData, textOpt, 
        normalOpt, 
        editor: sessionStorage.getItem('userName'),
        isUse: true,
        updateTime: Date.now()
      }
      updateData(data).then(res => {
         message.success('保存成功')
         history.push('/content/list')
      }).catch(res => {
        message.error(res.msg)
      }).finally(() => {
        canSave = true
      })
   }
   const getData = () => {
     getImgDetail({ id: params.id }).then(res => {
       const targetData = res.data || {}
       setState({
         ...state,
         oldImgData: targetData
       })
       dispatch('updateBg', targetData.bgData)
       dispatch('resetNormalOpt', targetData.normalOpt)
       dispatch('resetTextOpt', targetData.textOpt)
       setState(oldState => ({
        ...oldState,
        canRender: true
      }))
     }).catch(res => {
       message.error(res)
     })
   }
   // 传入空数组的作用 effect 只会在组件 mount 和 unmount 时期执行
   useEffect(() => {
     getData()
   },  [])
   return (
        <div className="cont-box route-box">
           
           <div className="route-box-l">
              <Badge name="编辑图片" />
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
export default EditImg
