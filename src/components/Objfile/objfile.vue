<template>
	<div id = "file_body">
		<el-row>
		  <el-col :span="8">
			  <div id="subfile">
			  	<input type="file"
			  	       accept=".xls,.xlsx"
			  	       @change="inputFileChange">
			  	<el-button style="margin-left: 10px;"
			  	           size="small"
			  	           type="success"
			  	           @click="submitUpload">上传到服务器</el-button>
			  </div>
		  </el-col>
		  <el-col :span="16">
			  <el-button type="primary" size="small"><i class="el-icon-download">
				<a href="../../../static/stand.xlsx" download>标准数据样式下载</a>
			  </i></el-button>
		  </el-col>
		</el-row>
		
		<div class="br"></div>
		
		<el-row>
		  <el-col :span="24">
		    <el-card :body-style="{ padding: '0px' }">
			   <div style="padding: 14px;">
			     <span>标准数据格式参考</span>
			   </div>
		      <img src="../../assets/img/客观标准数据.png" class="image">
		      <div style="padding: 14px;">
		        <span>说明</span>
		        <div class="bottom">
		          <time class="time">{{ currentDate }}</time>
		          <el-button type="text" class="button">操作按钮</el-button>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
		
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:'objfile',
		data(){
			return {
				currentDate: new Date()
			}
		},
		methods:{
			inputFileChange (e) {
			  // input的@change事件拿到数据        
			  this.files = e.target.files[0]
			  console.log(this.files)
			},
			submitUpload () {
			  // 上传按钮点击事件
			  if (this.files) {
			    // 把文件放入FormData
			    let fd = new FormData();
			    fd.append("file", this.files);
			    // console.log(fd)
			    this.$http.post('objfile/', fd).then(res => {
			        if (res) this.$message.success('解析成功')
					// console.log(res.data)
					bus.$emit('change',res.data.Change)
					bus.$emit('average',res.data.Average)
					bus.$emit('entropy',res.data.Entropy)
					bus.$emit('info',res.data.Info)
					}).catch(Error =>{
						this.$message.warning('文件格式有误，请仔细检查！')
					})
				}else{
					this.$message('请选择文件上传！')
				}
			},
		},
		mounted() {
		
		}
	}
</script>

<style scoped="scoped">
	#file_body{
		height: 500px;
	}
	
	.time {
	    font-size: 13px;
	    color: #999;
	  }
	  .bottom {
	    margin-top: 13px;
	    line-height: 12px;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	  }
	
	  .button {
	    padding: 0;
	    min-height: auto;
	  }
	
	  .image {
	    width: 100%;
	    display: block;
	  }
</style>
