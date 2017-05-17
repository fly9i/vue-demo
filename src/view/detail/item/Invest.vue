<template>
<el-row>
  <el-col :span="8">
    <el-tag type="primary">投资目标</el-tag>
    <el-tag type="gray" v-show="info.capitalIncrease==1">资本增长</el-tag>
    <el-tag type="gray" v-show="info.tradingProfits==1">交易利润</el-tag>
    <el-tag type="gray" v-show="info.speculation==1">投机</el-tag>
    <el-tag type="gray" v-show="info.hedging==1">对冲</el-tag>
  </el-col>
  <el-col :span="16">
    <el-tag type="primary">投资经验</el-tag>
    <el-tag type="success">交易年数:</el-tag>{{info.futTradingYears|yearFilter}}
    <el-tag type="success">总交易次数:</el-tag>{{info.futTradingTimes|tradeTimesFilter}}
      <el-tag type="success">知识水平:</el-tag>{{info.futTradingKnowledge|knowledgeFilter}}
  </el-col>
</el-row>
</template>
<script>
  import filters from '@/filter/filters';
  export default {
    name: 'Invest',
    props:['info','ticket'],
    filters:filters
  }
</script>
