import React, { useState } from 'react'

import { InputNumber, Input, Switch, Radio, Upload, message, Button, DatePicker } from 'antd'
import { SketchPicker } from 'react-color'
import { useStore, dispatch } from './../../store/makeimg'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'
import './index.scss'

const { TextArea } = Input
const BgNex = () => {
   const [ state, setState ] = useState({
        background: '#fff',
        showColorBox: false,
        fineName: ''
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
  const upLoadProps = {
    name: 'file',
    accept: 'image/*',
    action: '/api/file/upload',
    headers: {
    },
    onRemove(e) {
      setState(oldState => ({
        ...oldState,
        fineName: ''
      }))
      setBgData('', 'bgImgSrc')
    },
    beforeUpload(e, flie) {
        if (flie.size > 100 * 1024 ) {
            message.error(`图片大小不能超过100kb`);
            return false
        }
        return true
    },
    onChange(info) {
      let fineName = ''
      if (info.file.status === 'done') {
        const { file } = info
        fineName = 'http://chimke.cn/images/upload/' + file.response.filename
        message.success(`上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`上传失败，稍后重试`);
      }
      setState(oldState => ({
        ...oldState,
        fineName
      }))
      setBgData(fineName, 'bgImgSrc')
    }
}
  // 渲染底图或底色
  const renderBg = () => {
    if (bgData.isBgColor === 1){ //底色
      return(
        <div>
               <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r need">底色值是否传参 :</span>
                    <Switch checked={bgData.isTransmit} onChange={(e) => switchTransmit(e)} />
                </div>
        {
            bgData.isTransmit ? (
               <div>
                <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r need">参数名 :</span>
                    <div className="w-90">
                    <Input placeholder="8个字符内"  value={bgData.transmitName}  onChange={(e) => changeValue(e, 'transmitName') } />
                    </div>
                </div>
                <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r need">参数默认值 :</span>
                    <div className="w-90">
                    <Input value={bgData.deflautColor}  onChange={(e) => changeValue(e, 'deflautColor') }  placeholder="FFFFFF" />
                    </div>
                </div>
              </div> 
            ): (
                <div className="form-list clr-II fs-14 mr-t-15">
                    <span className="form-label t-r need">底色 :</span>
                    <div className="w-90">
                    <Input value={bgData.bgColor}  placeholder="#FFFFFF" onChange={(e) => changeValue(e, 'bgColor')}  />
                    </div>
                    <span className="color-box mr-l-10 clor-III" style={ {'background': bgData.bgColor}} onClick={() => handleShowColorBox()}>选择</span>
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
                    <span className="form-label t-r need">底图地址 :</span>
                    <Input placeholder="https://api.crossplus.topgoods.mobi/image//item/image/20200620/104539_876530.jpg" disabled={!!state.fineName} value={bgData.bgImgSrc}  onChange={(e) => changeValue(e, 'bgImgSrc') } />
            </div>
            <div className="form-list form-list-ot clr-II fs-14 mr-t-15">
                <span className="form-label t-r">上传图片 :</span>
                <Upload {...upLoadProps}>
                    <Button disabled={!!state.fineName}>
                      <UploadOutlined /> 选择文件
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
            <span className="form-label t-r need">名称:</span>
            <Input  value={bgData.name || ''}  onChange={(val) => changeValue(val,'name')} />
        </div>
        <div className="form-list form-list-ot clr-II fs-14 mr-t-15">
            <span className="form-label t-r need">描述:</span>
            <TextArea rows={3}  value={bgData.describe || ''} onChange={(val) => changeValue(val,'describe')}   />
        </div>
        <div className="fs-16 clr-I mr-t-30 need">底框</div>
        <div className="form-list clr-II fs-14 mr-t-15">
            <span className="form-label t-r">宽 :</span>
            <InputNumber  value={bgData.width || ''} onChange={(val) => setBgData(val,'width')} min={20}  />
            &nbsp;&nbsp;&nbsp;&nbsp;px
            <span className="form-label t-r">高 :</span>
            <InputNumber value={bgData.height || ''} onChange={(val) => setBgData(val,'height')}  min={20}  />
            &nbsp;&nbsp;&nbsp;&nbsp;px
        </div>
        <div className="form-list clr-II fs-14 mr-t-15">
            <span className="form-label t-r need">展现显示 :</span>
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