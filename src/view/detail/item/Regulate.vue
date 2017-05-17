<template>
  <el-row>
    <el-row>
      <el-col :span="24">
        账户所有人本人及其直系亲属是否为等级的证券经纪人，证券交易所、监管组织、证券或商品经纪公司的员工、关联人员、利害关系人？
        <check-show :check="info.isSecuritiesPractitioner==1"></check-show>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-show="info.isSecuritiesPractitioner==1">
        相关公司名称或者直系亲属的信息:
        {{info.securitiesPractitionerInfo}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        账户持有人是否是一家公共上市公司的董事，持10%及以上股权的股东或决策人？
        <check-show :check="info.isDecisionMaker==1"></check-show>
        <span v-show="info.isDecisionMaker==1">
          <el-tag type="primary">上市公司股票代码</el-tag>{{info.symbolsOfDecisionMaker}}
        </span>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
  export default {
    name: 'Regulate',
    props: ['info', 'ticket']
  }
</script>
