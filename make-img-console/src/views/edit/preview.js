import React, { useState, useEffect } from 'react'

import { useStore, dispatch } from './../../store/edit'
import './index.scss'
// import Drag from './../../utils/drag'
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
    const drag = (index, type) => {
        const dom = document.getElementById('target')
        console.log(index, type)
        dom.onmousedown = function(ev){
    　　　　var oevent = ev || window.event
    　　　　var distanceX = oevent.clientX - dom.offsetLeft;
    　　　　var distanceY = oevent.clientY - dom.offsetTop;
    
            document.onmousemove = function(event) {
                var oevent = event || window.event
                const px = oevent.clientX - distanceX
                const py = oevent.clientY - distanceY
                const data = type === 'updateNormalOpt' ? JSON.parse(JSON.stringify(normalOpt[index])) : JSON.parse(JSON.stringify(textOpt[index]))
                data.px = px
                data.py = py
                console.log(data)
                dispatch(type, { index, data } )
            }
            // document.addEventListener('mousemove', callBack);
            document.onmouseup = function(event){
                this.onmousemove = null
                this.onmouseup = null
            }
        }
    }
    const dbClick = (e) => {
        const target = e.target
        if (!e.target) return false
        const oldTarget = document.getElementById('target')
        if (oldTarget) {
            oldTarget.setAttribute('id', '')
        }
        target.setAttribute('id', 'target')
        const type = target.getAttribute('type')
        const index = target.getAttribute('index')
        if (!type) return false
        drag(index, type)
    }
    useEffect(() => {
        // 拖动
        // const domes = document.getElementsByClassName('img-j')
        // if (domes && domes.length > 0) {
        //     for (let i = 0; i < domes.length; i++) {
                
        //         }
        //     }'url(http://chimke.cn/images/upload/1598279483616.jpg)',
        // 

    })
    return (
      <div className="route-box-r">
        <div id="handel-view"></div>
        <div id="view" className="mobile" style={{ 
            'width': bgData.width + 'px', 
            'height':  bgData.height + 'px', 
            'transform': state.scale, 
            'backgroundColor': bgData.bgColor,
            'backgroundImage': bgData.bgImgSrc ? 'url(' + bgData.bgImgSrc +')' : 'none',
            'backgroundSize': '100% 100%',
            'backgroundRepeat': 'no-repeat'
             }}>
           {
               normalOpt && normalOpt.map((item, i) => {
                    const src = item.isTransmit && item.defaultSrc ? item.defaultSrc || '' : item.src || ''
                    if (src) {
                      return (<img className="img-j" alt="" index={i} onDoubleClick={(e) => dbClick(e)} type="updateNormalOpt"  key={src} src={src} style={ {'left' : item.px + 'px', top: item.py + 'px', width: item.width + 'px', height: item.height  + 'px'}} />)
                    }
               })
           }
           {/* <div className="img-j img-j-12" onDoubleClick={(e) => dbClick(e)}>

           </div> */}
           {
                textOpt && textOpt.map((item, i) => {
                    const des = item.isTransmit && item.defaultDes ? item.defaultDes || '' : item.des || ''
                    if (des) {
                      return (<span className="des" onDoubleClick={(e) => dbClick(e)} type="updateTextOpt" index={i} key={i} style={ {'left' : item.px + 'px', top: item.py + 'px', 'color': item.fsColor, 'fontSize': item.fontSize + 'px'}} >{des}</span> )
                    }
                 
                })
           }
           {
             isShowNet && renderLineX().map((item, i) => {
                  return (<span className="line-x" key={i} style={ {'left' : item }}></span>)
              })
           }
           {
               isShowNet && renderLineY().map((item, i) => {
                    return (<span className="line-Y" key={i} style={ {'top' : item }}></span>)
                })
           }
        </div>
      </div>
    )
}
export default PreView