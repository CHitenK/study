import React, { useState } from "react";
import { Input, DatePicker, Button, Table } from "antd";
import "./index.less";

const { RangePicker } = DatePicker;

const List = () => {
  const [state, setState] = useState({
    dataSource: [],
  })
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
        width: 130
      },
      {
        title: '名称',
        key: 'name',
        align: 'center'
      },
      {
        title: '描述',
        key: 'describe',
        align: 'center'
      },
      {
        title: '创建人',
        key: 'creator',
        align: 'center',
        width: 120
      },
      {
        title: '创建时间',
        key: 'creaTime',
        align: 'center',
        width: 140
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
        align: 'center'
      },
      {
        title: '最近编辑人',
        key: 'editor',
        align: 'center'
      },
      {
        title: '操作',
        align: 'center'
      }
    ]
  }
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
          rowClassName={() => "editable-row"}
          bordered
          dataSource={state.dataSource}
          columns={data.columns}
        />
      </div>
    </div>
  );
};
export default List;
