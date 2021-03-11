<template>
  <div>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <i class="el-icon-user"><span>&nbsp;个人信息</span></i>
        <el-button style="float: right; padding: 3px 0"
                   type="text">操作按钮</el-button>
      </div>
      <div>
        <el-form ref="form"
                 :model="form"
                 label-width="80px"
                 label-position="left">

          <el-form-item label="姓名">
            <el-input v-model="form.name"
                      style="width:200px"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-select placeholder="男">
              <el-option label="男"
                         value="男"></el-option>
              <el-option label="女"
                         value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="真实姓名">
            <el-input style="width:200px"></el-input>
          </el-form-item>

          <el-form-item label="联系电话">
            <el-input style="width:400px"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">立即修改</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
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

// .box-card {
//   width: 480px;
// }
</style>
