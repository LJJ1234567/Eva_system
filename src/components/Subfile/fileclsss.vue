<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>消极型</span>
			      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			    </div>
			    <el-table
			        :data="negative"
			        style="width: 100%"
					height="250"
					max-height="250"
					>
			        <el-table-column
			          type="index"
			          label="序号">
			        </el-table-column>
			        <el-table-column
			          prop="neg"
			          label="内容"
			          >
			        </el-table-column>
			      </el-table>
				
			  </el-card>
		  </el-col>
		  <el-col :span="12">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>无观点型</span>
			      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			    </div>
			   <el-table
			       :data="noView"
			       style="width: 100%"
			   	height="250"
			   	max-height="250"
			   	>
			       <el-table-column
			         type="index"
			         label="序号">
			       </el-table-column>
			       <el-table-column
			         prop="nvi"
			         label="内容"
			         >
			       </el-table-column>
			     </el-table>
			  </el-card>
		  </el-col>
		</el-row>
		
		<br>
		
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>欠类型</span>
			      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			    </div>
			    <el-table
			        :data="owe"
			        style="width: 100%"
			    	height="250"
			    	max-height="250"
			    	>
			        <el-table-column
			          type="index"
			          label="序号">
			        </el-table-column>
			        <el-table-column
			          prop="owe"
			          label="内容"
			          >
			        </el-table-column>
			      </el-table>
			  </el-card>
		  </el-col>
		  <el-col :span="12">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>期望建议型</span>
			      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			    </div>
			   <el-table
			       :data="expect"
			       style="width: 100%"
			   	height="250"
			   	max-height="250"
			   	>
			       <el-table-column
			         type="index"
			         label="序号">
			       </el-table-column>
			       <el-table-column
			         prop="exp"
			         label="内容"
			         >
			       </el-table-column>
			     </el-table>
			  </el-card>
		  </el-col>
		</el-row>
		
		<br>
		
		<el-row :gutter="20">
		  <el-col :span="24">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>积极型</span>
			      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			    </div>
			   <el-table
			       :data="positive"
			       style="width: 100%"
					height="250"
					max-height="250"
					>
			       <el-table-column
			         type="index"
			         label="序号">
			       </el-table-column>
			       <el-table-column
			         prop="pos"
			         label="内容"
			         >
			       </el-table-column>
			     </el-table>
			  </el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:"fileclass",
		data(){
			return {
				negative:[],
				noView:[],
				owe:[],
				expect:[],
				positive:[]
			}
		},
		mounted() {
			bus.$on('class',emos =>{
				console.log(emos)
				this.negative = emos[0]
				this.noView = emos[1]
				this.owe = emos[2]
				this.expect = emos[3]
				this.positive = emos[4]
			})
	
		}
	}
</script>

<style>
</style>
