<template>
  <el-container>
  <el-aside width="250px" class="Aside">
    <div class="bg-tou">
      <el-avatar icon="el-icon-user-solid" :size="100"></el-avatar>
    </div>

    <div class="User">{{username}}</div>
    <!-- 菜单区域 -->
    <div >
      <el-menu default-active="person" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="#545c64" text-color="#fff"
      router>
      <el-menu-item index="person" >
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
  
      <el-menu-item index="security">
        <i class="el-icon-document"></i>
        <span slot="title">账户安全</span>
      </el-menu-item>

      <el-menu-item >
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>

    </el-menu>
    </div>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
export default {
   data () {
    return {
      username:''
    }
  },
  created () {
    this.username = window.sessionStorage.getItem('token')
    console.log('获取token信息',this.username)
  },
  methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style lang="less" scoped>
.Aside{
  background-color:#545c64;
}

.bg-tou{
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.User{
  text-align: center;
  color:royalblue;
  font-size: 30px;
  
}

</style>
