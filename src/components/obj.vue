<template>
  <div>
	  <el-card class="box-card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>当前位置</el-breadcrumb-item>
		  <el-breadcrumb-item>客观数据分析</el-breadcrumb-item>
		</el-breadcrumb>
	  </el-card>
	  <div class="br"></div>
	  <el-card class="box-card">
			  <el-tabs v-model="activeName" @tab-click="handleClick">
				  <el-tab-pane label="文件上传" name="first">
					<objfile></objfile>
				</el-tab-pane>
				  <el-tab-pane label="变异系数" name="second">
					<objchage></objchage>
				</el-tab-pane>
				  <el-tab-pane label="描述性统计" name="third">
					  <objdesc></objdesc>
				  </el-tab-pane>
				  <el-tab-pane label="指标信息熵" name="fourth">
					  <objinfo></objinfo>
				  </el-tab-pane>
				  <el-tab-pane label="综合指标数" name="fiveth">
					  <objleida></objleida>
				  </el-tab-pane>
			  </el-tabs>
	  </el-card>
  </div>
</template>


<script>
	import objfile from './Objfile/objfile.vue'
	import objchage from './Objfile/objchage.vue'
	import objdesc from './Objfile/objdesc.vue'
	import objinfo from './Objfile/objinfo.vue'
	import objleida from './Objfile/objleida.vue'
export default {
  data () {
    return {
	  activeName: 'first',
    }
  },
  components:{
	  objfile,
	  objchage,
	  objdesc,
	  objinfo,
	  objleida
  },
  methods:{
	  handleClick(tab, event) {
		  // console.log(tab, event);
	  }
  }
}
</script>

<style lang="less" scoped>
	
</style>


