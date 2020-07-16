import React, { useState  } from 'react'
import { useHistory } from "react-router-dom"
import './index.less'
import muneList from './../utils/menu'
import { useStore, dispatch } from './../store/config'
const Left = () => {
  const [ state, setState ] = useState({
    muneList
  })
  const history = useHistory()
  const activeRoute = useStore(s => s.activeRoute)
  // 跳转
  const goLink = (data) => {
    if (!data.path) return false
    history.push(data.path)
    dispatch('updateActiveRoute', data )
  }
  return (
    <div className="left-box">
      <div className="logo-img-box f-c pd-15">
          <span className="fs-20 clr-w">cmk-test</span>
      </div>
      <div>
        {
          state.muneList.map((item, index) => {
            if (item.isMenu) {
              return (
                <div className={ activeRoute.id === item.id ? 'index-box f-c fs-14 index-box-active' : 'index-box f-c fs-14'} key={item.id} onClick={() => goLink(item)}>
                  {item.icon}<span className="index-box-item">{item.name}</span>
                </div>
              )
            } else {
              return ''
            }
          })
        }
      </div>
    </div>
  )
}
export default Left