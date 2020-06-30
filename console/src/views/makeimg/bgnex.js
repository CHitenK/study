import React, { useState } from 'react'

import { InputNumber, Input, Switch, Radio, Upload, message, Button, DatePicker } from 'antd'
import { SketchPicker } from 'react-color'
import { useStore, dispatch } from './../../store/makeimg'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'
import './index.less'

const { TextArea } = Input
const BgNex = () => {
   const [ state, setState ] = useState({
        background: '#fff',
        showColorBox: false
   })
   const bgData = useStore(s => s.bgData)
   // 赋值 Funtion
   const setBgData = (val, key) => {
        const data = {}
        data[key] = val || ''
        dispatch('updateBg', data)
    }
   // Function 选择颜色
   const handleChangeComplete = (color, event) => {
      setState(oldState => ({
        ...oldState,
        showColorBox: false
      }))
      setBgData(color.hex, 'bgColor')
   }
   // 切换颜色选择器 Function
   const handleShowColorBox = () => {
      setState(oldState => ({
        ...oldState,
        showColorBox: !state.showColorBox
      }))

   }
  // Funtion 是否传参
  const switchTransmit = (e) => {
    setBgData(e, 'isTransmit')
  }
  // 获取输入框值 Funtion
  const changeValue = (e, key) => {
    const val = e.target.value || ''
    setBgData(val, key)
  }
  // 选择启用时间
  const setTime = (t) => {
    if (!t) return false
    console.log(t)
    setBgData(t, 'starTime')
  }
  const upLoadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  }
  // 渲染底图或底色
  const renderBg = () => {
    if (bgData.isBgColor === 1){ //底色
      return(
        <div>
               <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r">底色值是否传参 :</span>
                    <Switch checked={bgData.isTransmit} onChange={(e) => switchTransmit(e)} />
                </div>
        {
            bgData.isTransmit ? (
               <div>
                <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r">参数名 :</span>
                    <div className="w-90">
                    <Input placeholder="8个字符内"  value={bgData.transmitName}  onChange={(e) => changeValue(e, 'transmitName') } />
                    </div>
                </div>
                <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r">参数默认值 :</span>
                    <div className="w-90">
                    <Input value={bgData.deflautColor}  onChange={(e) => changeValue(e, 'deflautColor') }  placeholder="FFFFFF" />
                    </div>
                </div>
              </div> 
            ): (
                <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r">底色 :</span>
                    <div className="w-90">
                    <Input value={bgData.bgColor}  placeholder="#FFFFFF" onChange={(e) => changeValue(e, 'bgColor')}  />
                    </div>
                    <span className="color-box mr-l-10 clor-III" style={ {'background': state.background}} onClick={() => handleShowColorBox()}>选择</span>
                    {
                        state.showColorBox ? (
                        <SketchPicker
                        color={bgData.bgColor}
                        onChange ={ (color, event) => handleChangeComplete(color, event) }
                        />
                        ) : ''
                    }
                </div>
            )
          }
        </div>
      )
    } else {
      return (
          <div>
            <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r">底图地址 :</span>
                    <Input placeholder="https://api.crossplus.topgoods.mobi/image//item/image/20200620/104539_876530.jpg" value={bgData.bgImgSrc}  onChange={(e) => changeValue(e, 'bgImgSrc') } />
            </div>
            <div className="form-list clr-II fs-14 mr-t-15">
                <span className="form-label t-r">上传图片 :</span>
                <Upload {...upLoadProps}>
                    <Button>
                      <UploadOutlined /> Click to Upload
                    </Button>
                </Upload>
            </div>
          </div>
       
      )
    }

  }
  return (
    <div>
        <div className="fs-16 clr-I">基础配置</div>
        <div className="form-list clr-II fs-14 mr-t-15">
            <span className="form-label t-r">名称:</span>
            <Input  value={bgData.name || ''}  onChange={(val) => changeValue(val,'name')} />
        </div>
        <div className="form-list form-list-ot clr-II fs-14 mr-t-15">
            <span className="form-label t-r">描述:</span>
            <TextArea rows={3}  value={bgData.describe || ''} onChange={(val) => changeValue(val,'describe')}   />
        </div>
        <div className="form-list clr-II fs-14 mr-t-15">
            <span className="form-label t-r">启用时间 :</span>
            <DatePicker value={moment(bgData.starTime)} showTime format="YYYY/MM/DD HH:mm:ss"  onChange={(e, t) => setTime(t) }/>
        </div>
        <div className="fs-16 clr-I mr-t-30">底框</div>
        <div className="form-list clr-II fs-14 mr-t-15">
            <span className="form-label t-r">宽 :</span>
            <InputNumber  value={bgData.width || ''} onChange={(val) => setBgData(val,'width')} min={200}  />
            &nbsp;&nbsp;&nbsp;&nbsp;px
            <span className="form-label t-r">高 :</span>
            <InputNumber value={bgData.height || ''} onChange={(val) => setBgData(val,'height')}   />
            &nbsp;&nbsp;&nbsp;&nbsp;px
        </div>
        <div className="form-list clr-II fs-14 mr-t-15">
            <span className="form-label t-r">展现显示 :</span>
            <Radio.Group  onChange={(e) => changeValue(e, 'isBgColor')} value={bgData.isBgColor}>
                <Radio value={1}>底色</Radio>
                <Radio value={2}>底图</Radio>
            </Radio.Group>
        </div>
       { renderBg() }
     
    </div>
  )
}
export default BgNex