import React, { useState, useEffect } from "react"
import { Input, DatePicker, Button, Table } from "antd"
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
 //  setLoading(true)
  const getListApi = () => {
    getList().then(res => {
      console.log(res)
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
  const changePageSize = (pageSize,current) => {
    console.log(pageSize,current)
  }
  const changePage = (current) => {
    console.log(current)
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
    console.log(paginationProps)
  },  [])
  return (
    <div className="page-box">
      <div className="search-box">
        <div className="search-box-item fs-14 clr-II">
          <span className="">编号:</span>
          <div className="for-item">
            <Input />
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">名称:</span>
          <div className="for-item">
            <Input />
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">创建人:</span>
          <div className="for-item">
            <Input />
          </div>
        </div>
        <div className="search-box-item fs-14 clr-II">
          <span className="">创建日期:</span>
          <div className="for-item w-230">
            <RangePicker
              placeholder={["开始日期", "结束日期"]}
              format="YYYY-MM-DD"
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
    </div>
  );
};
export default List;
