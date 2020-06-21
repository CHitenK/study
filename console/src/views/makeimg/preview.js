import React, { useState } from 'react'

import { useStore } from './../../store/makeimg'
import './index.less'

const PreView = () => {
    const [state, setState] = useState({
        scale: 'scale(1,1)'
    })
    const bgData = useStore(s => s.bgData)
    const isShowNet = useStore(s => s.isShowNet)
    const normalOpt = useStore(s => s.normalOpt)
    const textOpt = useStore(s => s.textOpt)
    // 计算缩放
    const computeStyle = () => {
        let x = 1, y = 1
        if (bgData.width > 340) {
         x = (340 / bgData.width).toFixed(2)
        }
        if (bgData.height > 540) {
         y = (520 / bgData.height).toFixed(2)
        }
        setState(old => ({
            ...old,
            scale: `scale(${x},${y})`
        }))
        // return `scale(${x},${y})`
    }
    // 显示X轴的网格
    const renderLineX = () => {
        if (!bgData.width) {
            return []
        }
        const array = []
        for (let i = 0; i < bgData.width; i++) {
            if (i % 10 === 0 ) {
                array.push(i +'px')
            }
        }
        setTimeout(() => {
            computeStyle()
        }, 1500);
        return array
    }
    // 显示Y轴的网格
    const renderLineY = () => {
        if (!bgData.height) {
            return []
        }
        const array = []
        for (let i = 0; i < bgData.height; i++) {
            if (i % 10 === 0 ) {
                array.push(i +'px')
            }
        }
        return array
    }
   
    return (
      <div className="route-box-r">
        <div className="mobile" style={{ 'width': bgData.width + 'px', 'height':  bgData.height + 'px', 'transform': state.scale, 'background': bgData.bgColor  }}>
           {
               normalOpt && normalOpt.map(item => {
                   if (item.src) {
                    return (<img className="img-j" alt="" src={item.src} style={ {'left' : item.px + 'px', top: item.py + 'px', width: item.width + 'px', height: item.height  + 'px'}} />)
                   }
                
               })
           }
           {
                textOpt && textOpt.map(item => {
                    if (item.des) {
                     return (<span className="des" style={ {'left' : item.px + 'px', top: item.py + 'px', 'color': item.fsColor, 'font-size': item.fontSize + 'px'}} >{item.des}</span> )
                    }
                 
                })
           }
           {
             isShowNet && renderLineX().map(item => {
                  return (<span className="line-x" style={ {'left' : item }}></span>)
              })
           }
           {
               isShowNet && renderLineY().map(item => {
                    return (<span className="line-Y" style={ {'top' : item }}></span>)
                })
           }
        </div>
      </div>
    )
}
export default PreView