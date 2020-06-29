import React, { useState, useEffect } from 'react'

import { useStore, dispatch } from './../../store/makeimg'
import './index.less'
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
    useEffect(() => {
        // 拖动
        const domes = document.getElementsByClassName('img-j')
        if (domes && domes.length > 0) {
            for (let i = 0; i < domes.length; i++) {
                domes[i].onmousedown = function(ev){
            　　　　var oevent = ev || window.event
            　　　　var distanceX = oevent.clientX - domes[i].offsetLeft;
            　　　　var distanceY = oevent.clientY - domes[i].offsetTop;
                   const callBack = (ev) => {
                        var oevent = ev || window.event
                        const px = oevent.clientX - distanceX
                        const py = oevent.clientY - distanceY
                        const data = JSON.parse(JSON.stringify(normalOpt[i]))
                        data.px = px
                        data.py = py
                        dispatch('updateNormalOpt', { i, data } )
                   }
                   document.addEventListener('mousemove',() => {
                       
                   });
                   document.addEventListener('mouseup',() => {

                   });
            // 　　　　document.onmousemove = function(ev){
            // 　　　　　　var oevent = ev || window.event
            //            const px = oevent.clientX - distanceX
            //            const py = oevent.clientY - distanceY
            //            const data = JSON.parse(JSON.stringify(normalOpt[i]))
            //            data.px = px
            //            data.py = py
            //            dispatch('updateNormalOpt', { i, data } )
            // 　　　　};
            // 　　　　document.onmouseup = function(){
            //            console.log(122)
            // 　　　　　　document.onmousemove = null
            // 　　　　　　document.onmouseup = null
            // 　　　　};
                }
            }
        }
    })
    return (
      <div className="route-box-r">
        <div id="handel-view"></div>
        <div id="view" className="mobile" style={{ 'width': bgData.width + 'px', 'height':  bgData.height + 'px', 'transform': state.scale, 'background': bgData.bgColor  }}>
           {
               normalOpt && normalOpt.map((item, i) => {
                   if (item.src) {
                    return (<img className="img-j" alt="" key={i} src={item.src} style={ {'left' : item.px + 'px', top: item.py + 'px', width: item.width + 'px', height: item.height  + 'px'}} />)
                   }
                
               })
           }

           {
                textOpt && textOpt.map((item, i) => {
                    if (item.des) {
                     return (<span className="des" key={i} style={ {'left' : item.px + 'px', top: item.py + 'px', 'color': item.fsColor, 'font-size': item.fontSize + 'px'}} >{item.des}</span> )
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