import React, { useState } from 'react'
import { Upload, message, Button  } from 'antd'
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons'
const { Dragger } = Upload
import './index.scss'
const Compress = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
  return (
    <div className="compress-box">
        <div className="compress-box-name">
            图片压缩
        </div>
        <div className="compress-cont">
           <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">上传图片文件</p>
              <p className="ant-upload-hint">
                支持拖拽上传，多文件上传
              </p>
            </Dragger>
            <div className="compress-tool-box">
               {/* <Button type="primary">开始压缩</Button> */}
               <span className="compress-tool-item">的发射点反对法地方</span>
               <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
            </div>
        </div>
    </div>
  )
}

export default Compress