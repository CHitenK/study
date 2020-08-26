import React, { useState, useEffect } from "react"
import './index.scss'

const Badge = (prams) => {
  const { name } = prams
   return(
     <div className="badge-box">
        <div class="space-label">
          <div class="top">
              <div class="ring"></div>
              <div class="ring"></div>
              <div class="ring"></div>
          </div>
   <div class="text">{name || '新建图片'}</div>
          <div class="bottom">
              <div class="ring"></div>
              <div class="ring"></div>
              <div class="ring"></div>
          </div>
      </div>
     </div>
   )
}

export default Badge