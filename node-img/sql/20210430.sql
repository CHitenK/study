-- # 调拨更新路径
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/transfer/orderList?from=oldsystem',server_addr='' WHERE authority_name='调拨订单列表';
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/transfer/tallyList?from=oldsystem',server_addr='' WHERE authority_name='调拨理货单列表';
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/transfer/deliveryList?from=oldsystem',server_addr='' WHERE authority_name='调拨出库列表'
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/transfer/warehouseList?from=oldsystem',server_addr='' WHERE authority_name='调拨入库列表';
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/transfer/transferFlow?from=oldsystem',server_addr='' WHERE authority_name='调出调入流水';

-- # 销售
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/sales/salesorder?from=oldsystem',server_addr='' WHERE authority_name='销售订单';
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/sales/presalelist?from=oldsystem',server_addr='' WHERE authority_name='预售单列表';
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/sales/platformpurchase?from=oldsystem',server_addr='' WHERE authority_name='平台采购单';

-- # 采购
-- UPDATE st_permission_info SET url='http://depx.topideal.mobi/purchase/purchaseorderList?from=oldsystem',server_addr='' WHERE authority_name='采购订单列表';

# 模板管理
UPDATE st_permission_info SET url='http://depx.topideal.mobi/template/exportTemplateList?from=oldsystem',server_addr='' WHERE authority_name='导出模板管理';

UPDATE st_permission_info SET url='http://depx.topideal.mobi/deployrRemind/debtTermList?from=oldsystem',server_addr='' WHERE authority_name='账期提醒配置';
UPDATE st_permission_info SET url='http://depx.topideal.mobi/purchase/quotaWarmList?from=oldsystem',server_addr='' WHERE authority_name='项目额度预警';