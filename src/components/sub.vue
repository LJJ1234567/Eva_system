<template>
  <div>
	<el-card class="box-card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>当前位置</el-breadcrumb-item>
		  <el-breadcrumb-item>主观数据分析</el-breadcrumb-item>
		</el-breadcrumb>
	</el-card>
	<div class="br"></div>
	<el-card class="box-card">
		<el-tabs v-model="activeName" @tab-click="handleClick" >
			  <el-tab-pane label="文件上传" name="first">
				  <filesub></filesub>
			  </el-tab-pane>
			  <el-tab-pane label="评价分类" name="second">
				  <fileclass></fileclass>
			  </el-tab-pane>
			  <el-tab-pane label="情感分析" name="third">
				  <fileemo></fileemo>
			  </el-tab-pane>
			  <el-tab-pane label="关注度分析" name="fourth">
			  	  <subfocus></subfocus>
			  </el-tab-pane>
			  <el-tab-pane label="信息抽取" name="fiveth">
				  <fileinfo></fileinfo>
			  </el-tab-pane>
			</el-tabs>
		</el-card>	
  </div>
</template>

<script>
	import filesub from './Subfile/filesub.vue'
	import fileclass from './Subfile/fileclsss.vue'
	import fileinfo from './Subfile/fileinfo.vue'
	import fileemo from './Subfile/fileemo.vue'
	import subfocus from './Subfile/focus.vue'
export default {
  name:'',
  data(){
     return {
       files:'',
	   activeName: 'first'
    }
  },
  methods:{
    handleClick(tab, event) {
       // console.log(tab, event);
    }
  },
  components:{
	  filesub,
	  fileclass,
	  fileemo,
	  fileinfo,
	  subfocus
  }
}
</script>

<style lang="less" scoped>
	.text-center{
		text-align: center;
	}
	
</style>
