import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import zhCN from 'antd/es/locale/zh_CN'
import { Input, DatePicker, Button, Table,Pagination, ConfigProvider, message, Modal  } from "antd"
import "./index.scss"
import { getList, deleData, updateData } from './../../api/index'
import { transformTime } from './../../utils/tool'
import Lay from './editOpitions'
const { RangePicker } = DatePicker

const List = () => {
  const [state, setState] = useState({
    dataSource: [],
    total: 0,
    pageSize: 4,
    pageNo: 1,
    id: '',
    name: '',
    creatName: '',
    startDate: '',
    endDate: '',
    showLookLay: false,
    optArray: [],
    targetiId: '',
    imgLookSrc:  window.location.protocol + '//' + window.location.hostname + ':2020/api/makeimg?id=',
    whiteIds: ['MKI1598350477880', 'MKI1598930966762', 'MKI1612190113415'] // 白名单 不能删除/禁用
  })
  const history = useHistory()
 // 获取数据
  const getListApi = (page=1, size = 5) => {
    // const hide = message.loading('加载中...', 0)
    const data = {
      page,
      size: state.pageSize,
      id: state.id,
      name: state.name,
      creatName: state.creatName
    }
    getList(data).then(res => {
      const dataSource = []
      res.data.content.forEach(item => {
        dataSource.push({
          ...item,
          ...item.bgData
        })
      })
      setState({
        ...state,
        dataSource: dataSource,
        total: res.data.total,
        pageNo: page
      })
    }).catch(err => {
      setState({
        ...state,
        dataSource: [],
        total: 0,
        pageNo: 1
      })
    }).finally(() => {
      // setTimeout(hide, 0);
    })
  }
  // 分页
  const changePageSize = (current, pageSize,) => {
    getListApi(current)
  }
  // 选择日期
  const changeDate = (t, d) => {
    console.log(d)
  }
  // 修改属性
  const changeValue = (e, key) => {
    const val = e.target.value || ''
    setState({
      ...state,
      [key]: val
    })
  }
  // 删除
  const dele = (id) => {
    if (state.whiteIds.includes(id)) {
      message.error('无权限操作哟！')
      return false
    }
    const data = { 'id': id }
    deleData(data).then(res => {
      if (res.data.falge) {
        message.success('删除成功')
        getListApi(state.pageNo)
      }
    }).catch(err => {

    })
  }
  // 启用/停用
  const update = (data) => {
   if (state.whiteIds.includes(data.id)) {
     message.error('无权限操作哟！')
     return false
   }
   if (data.isUse) { // 停用
    Modal.confirm({
      title: '提示',
      content: '确定停用该图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      onOk: () => {
        const param = { id:  data.id, isUse: false, updateTime: Date.now(), editor: sessionStorage.getItem('userName') }
        updateData(param).then(res => {
          message.success('操作成功')
          getListApi(state.pageNo)
        }).catch(res => {
          message.error(res.msg)
        })
      }
    })
   } else { // 启用
    const param = { id:  data.id, isUse: true, updateTime: Date.now(), editor: sessionStorage.getItem('userName') }
    updateData(param).then(res => {
      message.success('操作成功')
        getListApi(state.pageNo)
    }).catch(res => {
      message.error(res.msg)
    })
   }
  }
  // 重置
  const reset = () => {
    setState({
      ...state,
      name: '',
      createUser: '',
      id: ''
    })
    getListApi(1)
  }
  // 显示/隐藏 填写参数的弹窗
  const setLookLay = () => {
    setState({
      ...state,
      showLookLay: !state.showLookLay
    })
  }
  // 查看图片
  const lookImg = (data) => {
    const arr = []
    if (data.bgData.isTransmit) {
      const t = { key: data.bgData.transmitName, value: data.bgData.deflautColor }
      arr.push(t)
    }
    data.normalOpt.forEach(item => {
      if (item.isTransmit) {
        const t = { key: item.transmitName, value:  item.defaultSrc }
        arr.push(t)
      }
    })
    data.textOpt.forEach(item => {
      if (item.isTransmit) {
        const t = {key: item.transmitName, value: item.defaultDes }
        arr.push(t)
      }
    })
    if (arr.length > 0) {
      setState({
        ...state,
        optArray: arr,
        showLookLay: true,
        targetiId: data.id
      })
    } else {
      console.log(state.imgLookSrc)
      window.open(state.imgLookSrc + data.id , '_blank')
    }
  }
  // 编辑
  const editImg = (record) => {
    if (state.whiteIds.includes(record.id)) {
      message.error('无权限操作哟！')
      return false
    }
    history.push('/content/edit/' + record.id )
  }
  // 修改图片访问参数
  const updateOptArray = (data, index) => {
    const optArray = state.optArray
    const newArr = optArray.splice(index, 1, data)
    setState({
      ...state,
      optArray: optArray
    })
  }
  useEffect(() => {
    getListApi()
  },  [])
  // 配置数据
  const data = {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 80,
        render: (ext,record,index) => <span>{index + 1}</span>
      },
      {
        title: '编号',
        key: 'id',
        align: 'center',
        dataIndex: 'id',
        width: 130
      },
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '描述',
        key: 'describe',
        dataIndex: 'describe',
        align: 'center'
      },
      {
        title: '创建人',
        key: 'creator',
        align: 'center',
        width: 120,
        render: (ext,record,index) => <span>{record.creatName || '- -'}</span>
      },
      {
        title: '创建时间',
        key: 'creatTime',
        dataIndex: 'creaTime',
        align: 'center',
        render: (ext,record,index) => <span>{transformTime(record.creatTime, '-')}</span>
      },
      {
        title: '启用状态',
        key: 'isUse',
        align: 'center',
        width: 120,
        render: (ext,record,index) => <span>{record.isUse ? '启用' : '停用'}</span>
      },
      {
        title: '最近编辑时间',
        key: 'updateTime',
        align: 'center',
        render: (ext,record,index) => <span>{transformTime(record.updateTime, '-')}</span>
      },
      {
        title: '最近编辑人',
        key: 'editor',
        align: 'center',
        render: (ext,record,index) => <span>{record.editor || '- -'}</span>
      },
      {
        title: '操作',
        align: 'center',
        width: 160,
        render: (ext,record,index) => (
          <div className="fs-12 clr-gr tool">
            <span onClick={() => editImg(record)}>编辑</span>
            <span  onClick={() => update(record)}>{record.isUse ? '停用' : '启用'}</span>
            {record.isUse && <span onClick={() => lookImg(record) }>查看</span>}
            <span onClick={() => dele(record.id)}>删除</span>
        </div>
        )
      }
    ]
  }
  return (
    <div className="page-box">
      <div className="search-box">
        <div className="search-box-item fs-14 clr-II">
          <span className="">编号:</span>
          <div className="for-item">
            <Input value={state.id} onChange={(e) => changeValue(e, 'id')}/>
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">名称:</span>
          <div className="for-item">
            <Input value={state.name} onChange={(e) => changeValue(e, 'name')} />
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">创建人:</span>
          <div className="for-item">
            <Input value={state.createUser} onChange={(e) => changeValue(e, 'creatName')} />
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">创建日期:</span>
          <div className="for-item w-230">
            <RangePicker
              placeholder={["开始日期", "结束日期"]}
              format="YYYY-MM-DD"
              value={state.date}
              onChange={(t, d) => changeDate(t, d)}
            />
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">
            <Button type="primary" onClick={() => getListApi(1)}>查询</Button>
          </span>
          <span className="" onClick={() => reset()} >
            <Button>重置</Button>
          </span>
          <span  onClick={() => history.push('/content/makeimg')} >
            <Button type="primary">新建图片</Button>
          </span>
        </div>
      </div>
      <div className="mr-t-30 table-box">
        <Table
          bordered
          pagination={false}
          dataSource={state.dataSource}
          columns={data.columns}
        />
      </div>
      <div className="mr-t-30 flex-l">
        <ConfigProvider local={zhCN}>
          <Pagination
            showTitle={false}
            total={state.total}
            current={state.pageNo}
            defaultPageSize={state.pageSize}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[4]}
            showTotal={total => `共 ${total} 条`}
            onChange={(page, size) => changePageSize(page, size)}
          />
         </ConfigProvider>
      </div>
      {
        state.showLookLay ? (<Lay setLookLay={setLookLay} optArray={state.optArray} updateOptArray={updateOptArray} id={state.targetiId} />) : ''
      }
      
    </div>
  );
};
export default List;
