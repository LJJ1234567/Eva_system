<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="../assets/logo.png"
             alt />
      </div>
      <!-- 表单区域 -->

      <el-form ref="loginFormRef"
               :model="loginFrom"
               :rules="loginFromRules"
               label-width="0px"
               class="login-form">
        <!--
        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username"
                    prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginFrom.password"
                    prefix-icon="el-icon-unlock"
                    type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登录</el-button>
          <el-button type="info"
                     @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
	import bus from './bus.js'
export default {
  data () {
    return {
      // 登录表单的数据绑定
      loginFrom: {
        username: '',
        password: ''
      },
      // 表单的验证规则对象
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    resetloginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录检测
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        // // 发送请求
        const { data: res } = await this.$http.post(
          'login/',
          this.qs.stringify(this.loginFrom)
        )
        console.log(res)
        // console.log(typeof (res.msg.status))

        // 状态检测
		if (res.status === 403) return this.$message.error(res.msg)
        if (res.status === 404) return this.$message.error(res.msg)
        if (res.status === 200) {
			this.$message.success(res.msg)
			window.sessionStorage.setItem('time',res.time)
			// token(res.data.token)保存到sessionStorage中
			var user = res.user
			window.sessionStorage.setItem('token', user)
			// 页面跳转
			this.$router.push('/head')
		}
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avater_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  // background-color: tomato;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
