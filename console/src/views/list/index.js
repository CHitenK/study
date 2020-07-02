import React, { useState, useEffect } from "react"
import zhCN from 'antd/es/locale/zh_CN'
import { Input, DatePicker, Button, Table,Pagination, ConfigProvider } from "antd"
import "./index.less"
import { useStore, dispatch } from './../../store/config'
import { getList } from './../../api/index'
import { transformTime } from './../../utils/tool'
const { RangePicker } = DatePicker

const List = () => {
  const [state, setState] = useState({
    dataSource: [],
    totals: 100,
    pageSize: 4,
    pageNum: 1,
    id: '',
    name: '',
    createUser: '',
    startDate: '',
    endDate: '',
  })
  
  const showLoading = useStore(s => s.showLoading)
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
        render: (ext,record,index) => <span>张山</span>
      },
      {
        title: '创建时间',
        key: 'creaTime',
        dataIndex: 'creaTime',
        align: 'center',
        render: (ext,record,index) => <span>{transformTime(record.creaTime, '-')}</span>
      },
      {
        title: '启用状态',
        key: 'isUse',
        align: 'center',
        width: 120
      },
      {
        title: '最近编辑时间',
        key: 'uodateTime',
        align: 'center',
        render: (ext,record,index) => <span>{transformTime(record.uodateTime, '-')}</span>
      },
      {
        title: '最近编辑人',
        key: 'editor',
        align: 'center',
        render: (ext,record,index) => <span>李四</span>
      },
      {
        title: '操作',
        align: 'center',
        width: 160,
        render: (ext,record,index) => ( 
          <div className="fs-12 clr-gr tool">
            <span>编辑</span>
            <span>停用</span>
            <span>查看</span>
            <span>删除</span>
        </div>
        )
      }
    ]
  }
  // 分页配置
  const setLoading = (op) => {
    dispatch('setShowLoading', op)
  }
 // 获取数据
  const getListApi = (page=1, size=10) => {
    const data = {
      page,
      size
    }
    getList().then(res => {
      const dataSource = []
      res.data.content.forEach(item => {
        dataSource.push({
          ...item,
          ...item.bgData
        })
      })
      setState({
        dataSource: dataSource
      })
    }).catch(err => {

    }).finally(() => {
    
    })
  }
  // 分页
  const changePageSize = (pageSize,current) => {
    console.log(pageSize,current)
  }
  // c
  const changePage = (c) => {
    console.log(c, 2132)
  }
  // 选择日期
  const changeDate = (t, d) => {
    console.log(d)
  }
  // 修改属性
  const changeValue = (e, key) => {
    const val = e.target.value || ''
    setState({
      [key]: val
    })
  }
  // 表格分页属性
  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: true,
    total: state.totals,
    pageSize: state.pageSize,
    current: state.pageNum,
    onShowSizeChange: (current,pageSize) => changePageSize(pageSize,current),
    onChange: (current) => changePage(current)
  }
  useEffect(() => {
    getListApi()
  },  [])
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
            <Input value={state.createUser} onChange={(e) => changeValue(e, 'createUser')} />
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
            <Button type="primary">查询</Button>
          </span>
          <span className="">
            <Button>重置</Button>
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
      <div className="mr-t-20 flex-l">
        <ConfigProvider local={zhCN}>
          <Pagination
            showTitle={false}
            total={85}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[10]}
            showTotal={total => `Total ${total} items`}
            onChange={(page, size) => changePageSize(page, size)}
          />
         </ConfigProvider>
      </div>
     
    </div>
  );
};
export default List;
