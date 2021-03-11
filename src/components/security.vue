<template>
  <div>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <i class="el-icon-user"><span>&nbsp;账户安全</span></i>
        <el-button style="float: right; padding: 3px 0"
                   type="text">操作按钮</el-button>
      </div>
      
      <el-row type="flex"
              class="row-bg item"
              justify="space-around">
        <el-col :span="3">
          <div class="grid-content ">登录密码</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple-light">
            <el-divider direction="vertical"></el-divider>
            <span></span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content "><el-button type="primary">修改</el-button></div>
        </el-col>
      </el-row>

       <el-row type="flex"
              class="row-bg item"
              justify="space-around">
        <el-col :span="3">
          <div class="grid-content ">安全邮箱</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple-light">
            <el-divider direction="vertical"></el-divider>
            <span></span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content "><el-button type="primary">修改</el-button></div>
        </el-col>
      </el-row>


       <el-row type="flex"
              class="row-bg item"
              justify="space-around">
        <el-col :span="3">
          <div class="grid-content ">密保手机</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple-light">
            <el-divider direction="vertical"></el-divider>
            <span></span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content"><el-button type="primary">修改</el-button></div>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.item {
  height: 50px;
  line-height: 50px;
}

</style>
