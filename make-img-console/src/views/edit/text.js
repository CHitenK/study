import React, { useState } from 'react'
import { Button, InputNumber, Input, Switch  } from 'antd'
import { useStore, dispatch } from './../../store/edit'
import { SketchPicker } from 'react-color'
import './index.scss'

const Text = () => {
    const [state ] = useState({
      name: ''
    })
    const textOpt = useStore(s => s.textOpt)
    // 更新数据
    const setBgData = (val, key, index) => {
      const data = JSON.parse(JSON.stringify(textOpt[index]))
      data[key] = val
      dispatch('updateTextOpt', { index, data} )
    }
    // Funtion 是否传参
    const switchTransmit = (e, index) => {
        setBgData(e, 'isTransmit', index)
    }
    // 获取输入框值 Funtion
    const changeValue = (e, key, index) => {
        const val = e.target.value || ''
        setBgData(val, key, index)
    }
    const add = () => {
        dispatch('insetTextOpt', {
            px: 0,
            py: 0,
            des: '',
            isTransmit: false,
            transmitName: '',
            fontSize: 14,
            fsColor: '#666666',
            showColorBox: false
        })
    }
    // 打开颜色框
    const handleShowColorBox = (index) => {
        const val = !textOpt[index].showColorBox
        setBgData(val, 'showColorBox', index)
    }
    // Function 选择颜色
    const handleChangeComplete = (color, key, index) => {
        setBgData(color.hex, key, index)
        setTimeout(() => {
            setBgData(false, 'showColorBox', index)
        }, 1500)
    }
    // 删除
    const deleteOpt = (index) => {
        dispatch('deleteTextOpt', index)
    }
    return (
        <div>
            <div className="fs-16 clr-I">文字</div>
               {
                   textOpt && textOpt.map((item,index) => {
                       return (
                        <div className="nor-list mr-t-30" key={index}>
                           <div className="nor-list-l">
                                <div className="form-list clr-II fs-14 mr-t-5">
                                    <span className="form-label t-r need">X :</span>
                                    <InputNumber  value={item.px} onChange={(val) => setBgData(val, 'px', index)} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                    <span className="form-label t-r need">Y :</span>
                                    <InputNumber  value={item.py} onChange={(val) => setBgData(val, 'py', index)}  />
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                </div>
                                <div className="form-list clr-II fs-14 mr-t-15">
                                    <span className="form-label t-r need">文字大小 :</span>
                                    <div className="w-90">
                                      <Input placeholder="文字大小" value={item.fontSize}  onChange={(e) => changeValue(e, 'fontSize', index) } />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                </div>
                                <div className="form-list clr-II fs-14 mr-t-15">
                                    <span className="form-label t-r need">文字颜色 :</span>
                                    <div className="w-90">
                                    <Input value={item.fsColor}  placeholder="#FFFFFF" onChange={(e) => changeValue(e, 'fsColor', index)}  />
                                    </div>
                                    <span className="color-box mr-l-10 clor-III" style={ {'background': item.fsColor}} onClick={() => handleShowColorBox(index)}>选择</span>
                                    {
                                        item.showColorBox ? (
                                        <SketchPicker
                                        color={item.fsColor}
                                        onChange ={ (color, event) => handleChangeComplete(color, 'fsColor', index) }
                                        />
                                        ) : ''
                                    }
                                </div>
                                <div className="form-list clr-II fs-14 mr-t-15">
                                    <span className="form-label t-r need">是否传参 :</span>
                                    <Switch checked={item.isTransmit} onChange={(e) => switchTransmit(e,  index)} />
                                </div>
                                {  
                                    item.isTransmit ?
                                    ( <div>
                                        <div className="form-list clr-II fs-14 mr-t-15">
                                            <span className="form-label t-r need">参数名 :</span>
                                            <div className="w-90">
                                              <Input placeholder="8个字符内"  value={item.transmitName}  onChange={(e) => changeValue(e, 'transmitName', index) } />
                                            </div>                                        
                                        </div>
                                        <div className="form-list clr-II fs-14 mr-t-15">
                                            <span className="form-label t-r need">默认文案 :</span>
                                            <Input placeholder="输入文字" value={item.defaultDes}  onChange={(e) => changeValue(e, 'defaultDes', index) } />
                                        </div>
                                     </div>
                                    )
                                   : (
                                       <div>
                                            <div className="form-list clr-II fs-14 mr-t-15">
                                                <span className="form-label t-r need">文案 :</span>
                                                <Input placeholder="输入文字 " value={item.des}  onChange={(e) => changeValue(e, 'des', index) } />
                                            </div>
                                       </div>
                                   )
                                }
                               
                            </div>
                            {
                                textOpt.length > 1 && (<Button danger onClick={() => deleteOpt(index)}>删除</Button>)
                            }
                        </div>)
                   })
               }
              <div className="mr-t-30">
                <Button onClick={add}>增加</Button>
              </div>
        </div>
    )
}
export default Text
