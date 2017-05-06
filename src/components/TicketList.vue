<template>

    <el-table :data="ticketList" stripe border>
      <el-table-column
        prop="infoId"
        label="资料ID"
        width="300">
      </el-table-column>
      <el-table-column
        prop="ticketId"
        label="申请单ID"
        width="300">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="state"
        :formatter="stateFilter"
        label="最新状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="operationTime"
        label="状态更新时间"
        :formatter="timeFilter"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="130"
        fixed="right">
        <template scope="scope">
          <el-button-group>
            <el-button type="primary" size="small" v-show="operation.btnCheck">查看</el-button>
            <el-button type="primary" size="small" v-show="operation.btnEdit">编辑</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  import filters from '@/filter/filters';
  export default {
    props:['operation'],
    methods: {
      timeFilter(row, col){
        return filters.timeFilter(row.operationTime);
      },
      stateFilter(row, col){
        return filters.stateFilter(row.state);
      },
    },
    data: function () {
      return {

        ticketList: [
          {
            infoId: 'c715ba460b2040168b2f1e5f0b6cc10e',
            ticketId: 'c715ba460b2040168b2f1e5f0b6cc10e',
            mobile: '130****1234',
            state: 'START',
            operationTime: 1494056602718,
          }
        ]
      }
    }
  }
</script>

