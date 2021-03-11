<template>
	<div>
		<el-row>
			<el-card class="box-card">
			  <div class="text item">
			    <el-col :span="11">
			    			  <slot name="icon"></slot>
			    			  </el-col>
			    <el-col :span="13">
			    			  <slot name="content"></slot>
			    </el-col>
			  </div>
			</el-card>
		</el-row>
	</div>
</template>

<script>
	export default{
		name:"StatusItem"
	}
</script>

<style scoped="scoped">
	.text {
	    font-size: 14px;
	  }
	
	  /* .item {
	    padding: 18px 0;
	  } */
	
	  .box-card {
	    width: 100%;
		height: 125px;
		background-color: transparent;
		border-radius: 15px;
	  }
	  
	  .el-card__body{
		  padding: 0;
	  }
</style>
