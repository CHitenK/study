import { createStore } from 'stamen'

const { useStore, dispatch } = createStore({
    state: {
      bgData: { // 底框配置项
          width: 320,
          height: 480,
          bgColor: '#FFFFFF',
          isTransmit: false,
          isBgColor: 1,
          bgImgSrc: '',
          transmitName: 'bg_color',
          deflautColor: '#FFFFFF',
          name: '',
          describe: '',
          starTime: '2020-06-27 19:42:28'
      },
      isShowNet: false,
      normalOpt: [
          {
              px: 0,
              py: 0,
              src: '',
              isTransmit: false,
              transmitName: '',
              width: 100,
              height: 100
          }
      ],
      textOpt: [
        {
            px: 0,
            py: 0,
            des: '',
            isTransmit: false,
            transmitName: '',
            fontSize: 14,
            fsColor: '#666666',
            showColorBox: false
        }
      ]
    },
    reducers: {
      // 更新底数据
      updateBg(state, data) {
        state.bgData = { ...state.bgData, ...data }
      },
      // 清除
      reseBg(state) {
        state.bgData = {}
      },
      // 切换开启/关闭网格
      swicthShowNet(state) {
        state.isShowNet = !state.isShowNet
      },
      updateNormalOpt(state, opt) {
        const { data, index } = opt
        const normalOpt = JSON.parse(JSON.stringify(state.normalOpt))
        normalOpt.splice(index, 1, data)
        state.normalOpt = normalOpt
      },
      insetNormalOpt(state, data) {
        state.normalOpt.push(data)
      },
      deleteNormalOpt(state, index) {
        const normalOpt = state.normalOpt
        normalOpt.splice(index, 1)
        state.normalOpt = normalOpt
      },
      updateTextOpt(state, opt) {
        const { data, index } = opt
        const textOpt = JSON.parse(JSON.stringify(state.textOpt))
        textOpt.splice(index, 1, data)
        state.textOpt = textOpt
      },
      insetTextOpt(state, data) {
        state.textOpt.push(data)
      },
      deleteTextOpt(state, index) {
        const textOpt = state.textOpt
        textOpt.splice(index, 1)
        state.textOpt = textOpt
      },
      reset(state) {
        const data = {
          bgData: { // 底框配置项
            width: 320,
            height: 480,
            bgColor: '#FFFFFF',
            isTransmit: false,
            isBgColor: 1,
            bgImgSrc: '',
            transmitName: 'bg_color',
            deflautColor: '#FFFFFF',
            name: '',
            describe: '',
            starTime: '2020-06-27 19:42:28'
          },
          isShowNet: false,
          normalOpt: [
              {
                  px: 0,
                  py: 0,
                  src: '',
                  isTransmit: false,
                  transmitName: '',
                  width: 100,
                  height: 100
              }
          ],
          textOpt: [
            {
                px: 0,
                py: 0,
                des: '',
                isTransmit: false,
                transmitName: '',
                fontSize: 14,
                fsColor: '#666666',
                showColorBox: false
            }
          ]
        }
        state = data
      }
    } 
})
export { useStore, dispatch }