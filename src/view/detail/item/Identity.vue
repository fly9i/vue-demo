<template>
  <el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <img :src="info.idCardFront" title="身份证正面" alt="身份证正面" @click="imageClick(0)">
      </el-col>
      <el-col :span="8">
        <img :src="info.idCardBack" title="身份证反面" alt="身份证反面" @click="imageClick(1)">
      </el-col>
      <el-col :span="8">
        <img :src="info.signaturePic" title="手写签名" alt="手写签名" @click="imageClick(2)">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-tag type="primary">姓</el-tag>
        {{info.lastName}}&nbsp;&nbsp;&nbsp;&nbsp;
        <el-tag type="primary">名</el-tag>
        {{info.firstName}}
      </el-col>
      <el-col :span="8">
        <el-tag type="primary">姓名拼音</el-tag>
        {{info.lastNameEn+' '+info.firstNameEn}}
      </el-col>

      <el-col :span="8">
        <el-tag type="primary">身份证号</el-tag>
        {{info.idCardNo}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-tag type="primary">身份证地址</el-tag>
        <el-tag type="success">省:</el-tag>
        {{info.idCardState}}
        <el-tag type="success">市:</el-tag>
        {{info.idCardCity}}
        <el-tag type="success">详细:</el-tag>
        {{info.idCardAddress}}
      </el-col>

      <el-col :span="16">
        <el-tag type="primary">永久居住地地址</el-tag>
        &nbsp;&nbsp;与身份证地址一致？
        <check-show :check="sameAddr"></check-show>
        <span v-show="!sameAddr">
          <el-tag type="success">省:</el-tag>
          {{info.residenceState}}
          <el-tag type="success">市:</el-tag>
          {{info.residenceCity}}
          <el-tag type="success">详细:</el-tag>
          {{info.residenceAddress}}
        </span>
      </el-col>
    </el-row>

    <!-- 原来的工作信息 -->
    <el-row>
      <el-col :span="8">
        <el-tag type="primary">就业情况</el-tag>
        {{info.occupationType}}
      </el-col>
      <el-col :span="8">
        <el-tag type="primary">行业</el-tag>
        {{info.industry}}
      </el-col>
      <el-col :span="8">
        <el-tag type="primary">职业</el-tag>
        {{info.occupation}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-tag type="primary">单位名称</el-tag>
        {{info.companyName}}
      </el-col>
      <el-col :span="8">
        <el-tag type="primary">单位地址</el-tag>
        <el-tag type="success">省:</el-tag>
        {{info.companyState}}
        <el-tag type="success">市:</el-tag>
        {{info.companyCity}}
        <el-tag type="success">详细:</el-tag>
        {{info.companyAddress}}
      </el-col>
      <el-col :span="8">
        <el-tag type="primary">邮编</el-tag>
        {{info.companyPostal}}
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
  export default {
    name: 'Identity',
    props: ['info', 'ticket','imageClick'],
    computed: {
      sameAddr(){
        return this.info.idCardAddress == this.info.residenceAddress
      }
    }
  }
</script>
<style>
</style>
