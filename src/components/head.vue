<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <el-row>
        <el-col :span="8">
          <div>logo</div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">评教分析系统</div>
        </el-col>
        <el-col :span="9">
          <div>
            <el-menu 
                     class="el-menu-demo"
                     mode="horizontal"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
              <el-menu-item index="1" @click="home"><i class="el-icon-s-home" ></i>首页</el-menu-item>
              <el-menu-item index="2" @click="theory"><i class="el-icon-tickets"></i>原理中心</el-menu-item>
              <el-menu-item index="3" @click="model"><i class="el-icon-monitor"></i>模型查看</el-menu-item>
              <el-submenu index="4">
                <template slot="title"><i class="el-icon-user-solid"></i>我的工作台</template>
                <el-menu-item index="2-2" @click="person"><i class="el-icon-user-solid"></i>个人中心</el-menu-item>
                <el-menu-item index="2-3"
                              @click="logout"><i class="el-icon-right"></i>退出</el-menu-item>
              </el-submenu>
            
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script >
// @ is an alias to /src
export default {
    //个人中心
    methods: {
			logout () {
				window.sessionStorage.clear()
				this.$http.post('logout/').then(res =>{
					console.log(res)
				})
				this.$router.push('/login')
			},
			//个人中心
			person (){
				this.$router.push('/userinfo')
			},
			//首页
			home (){
				// console.log('返回首页')
				this.$router.push('/body')
			},
			theory(){
				this.$router.push('/theory')
			},
			model(){
				this.$router.push('/model')
			}
  },
	mounted() {
	}
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  // text-align: center;
  line-height: 61px;
  color: white;
}

</style>
