<template>
  <el-container class="home-container">
    <!-- 头部区域 -->

    <el-container>
      <!-- 侧面菜单栏区 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button"
             @click="toggleCollapse">点击收起</div>
        <el-menu background-color="#545C64"
                 text-color="#fff"
                 active-text-color="#4896F4"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router
                 default-active="welcome">
          <el-menu-item index="welcome">
            <i class="el-icon-s-home"></i><span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="obj">
            <i class="el-icon-s-data"></i><span slot="title">客观数据分析</span>
          </el-menu-item>

          <el-menu-item index="sub">
            <i class="el-icon-s-marketing"></i><span slot="title">主观数据分析</span>
          </el-menu-item>

          <el-menu-item index="record">
            <i class="el-icon-edit"></i><span slot="title">记录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主题区域 -->
      <el-main>
        <!-- 路由站位符 -->
				<keep-alive>
					 <router-view></router-view>
				</keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script >
// @ is an alias to /src

export default {
  data () {
    return {
      // 左侧菜单数据
      // menulist = []
      isCollapse: false,
      activepath: ''
    }
  },
  created () {
    // this.getMenuList()
    this.activepath = window.sessionStorage.getItem('activepath')
  },
  // name: 'home',
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('menus')
    //   // if(res.meta.status !== 200 ) return this.$message.error(res.meta.meg)
    //   // this.menulist = res.data
    //   console.log(res)
    // },

    //菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },

    //保存连接的激活状态
    saveNav (activepath) {
      window.sessionStorage.setItem('activepath', activepath)
      this.activepath = activepath
    },

    //个人中心
    person (){
      this.$router.push('/userinfo')
    }
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
.el-aside {
  background-color: #545c64;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf2;
}

.toggle-button {
  background-color: #485164;
  font-size: 10px;
  line-height: 30px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-main{
	padding: 10px;
}
.el-card__body{
	padding: 15px;
}
</style>
