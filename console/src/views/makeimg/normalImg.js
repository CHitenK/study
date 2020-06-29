import React, { useState } from 'react'
import { Button, InputNumber, Input, Upload, Switch, message } from 'antd'
import { useStore, dispatch } from './../../store/makeimg'
import { UploadOutlined } from '@ant-design/icons'
import './index.less'

const Normal = () => {
    const [state, setState ] = useState({
       age: 12
    })
    const normalOpt = useStore(s => s.normalOpt)
    // 更新数据
    const setBgData = (val, key, index) => {
      const data = JSON.parse(JSON.stringify(normalOpt[index]))
      data[key] = val
      dispatch('updateNormalOpt', { index, data } )
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
    const add = () => {
        dispatch('insetNormalOpt', {
            px: 0,
            py: 0,
            src: '',
            isTransmit: false,
            transmitName: '',
            width: 100,
            height: 100
        })
    }
    // 删除
    const deleteOpt = (index) => {
        dispatch('deleteNormalOpt', index)
    }
    return (
        <div>
            <div className="fs-16 clr-I">常规图片</div>
               {
                   normalOpt && normalOpt.map((item,index) => {
                       return (
                        <div className="nor-list mr-t-30" key={index}>
                           <div className="nor-list-l">
                               <div className="form-list clr-II fs-14 mr-t-5">
                                    <span className="form-label t-r">宽 :</span>
                                    <InputNumber  value={item.width} onChange={(val) => setBgData(val, 'width', index)} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                    <span className="form-label t-r">高 :</span>
                                    <InputNumber  value={item.height} onChange={(val) => setBgData(val, 'height', index)}  />
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                </div>
                                <div className="form-list clr-II fs-14 mr-t-5">
                                    <span className="form-label t-r">X :</span>
                                    <InputNumber  value={item.px} onChange={(val) => setBgData(val, 'px', index)} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                    <span className="form-label t-r">Y :</span>
                                    <InputNumber  value={item.py} onChange={(val) => setBgData(val, 'py', index)}  />
                                    &nbsp;&nbsp;&nbsp;&nbsp;px
                                </div>
                                <div className="form-list clr-II fs-14 mr-t-15">
                                    <span className="form-label t-r">图片是否传参 :</span>
                                    <Switch checked={item.isTransmit} onChange={(e) => switchTransmit(e,  index)} />
                                </div>
                                {  
                                    item.isTransmit ?
                                    (
                                        <div className="form-list clr-II fs-14 mr-t-15">
                                            <span className="form-label t-r">参数名 :</span>
                                            <div className="w-90">
                                            <Input placeholder="8个字符内"  value={item.transmitName}  onChange={(e) => changeValue(e, 'transmitName', index) } />
                                            </div>
                                        </div>
                                    )
                                   : (
                                       <div>
                                            <div className="form-list clr-II fs-14 mr-t-15">
                                                <span className="form-label t-r">底图地址 :</span>
                                                <Input placeholder="https://api.crossplus.topgoods.mobi/image//item/image/20200620/104539_876530.jpg" value={item.src}  onChange={(e) => changeValue(e, 'src', index) } />
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
                               
                            </div>
                            {
                                normalOpt.length > 1 && (<Button danger onClick={() => deleteOpt(index)}>删除</Button>)
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
export default Normal
