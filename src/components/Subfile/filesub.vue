<template>
	<div>
		<el-row>
			<el-col :span="8">
				<input type="file"
				       accept=".xls,.xlsx"
				       @change="inputFileChange">
				<el-button style="margin-left: 10px;"
				           size="small"
				           type="success"
				           @click="submitUpload2">上传到服务器</el-button>
			</el-col>
			<el-button type="primary" size="small"><i class="el-icon-download">
							<a href="../../../static/主观文本数据200条.xlsx" download>标准数据样式下载</a>
			</i></el-button>
		</el-row>
		<div class="br"></div>
		<el-table
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"
		    :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize).filter(data => !search || data.con.toLowerCase().includes(search.toLowerCase()))"
			style="width: 100%"
			height="450"
			max-height="450"
			class = "text-center"
			>
		    <el-table-column
			  type = "index"
		      label="序号"
			  align="center"
		      >
		    </el-table-column>
		    <el-table-column
		      label="内容"
		      prop="con"
			  >
		    </el-table-column>
		    <el-table-column
		      align="right">
		      <template slot="header" slot-scope="scope">
		        <el-input
		          v-model="search"
		          size="mini"
		          placeholder="输入关键字搜索"/>
		      </template>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currpage"
		      :page-sizes="page_sizes"
		      :page-size="pagesize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="tableData.length">
		</el-pagination>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default {
		name:"filesub",
		data(){
			return {
				 tableData:[],
				 search: '',
				 pagesize:100,
				 currpage:1,
				 page_sizes:[100, 200, 300, 400],
				 loading: false
			}
		},
		methods:{
			inputFileChange (e) {
			  // input的@change事件拿到数据
			  this.files = e.target.files[0]
			  console.log(this.files)
			 },
			submitUpload2 (){
			  if (this.files){
				  this.loading = true
			    // 把文件放入FormData
			    let fd2 = new FormData();
			    fd2.append("file2", this.files);
			    // console.log(fd)
			    this.$http.post('subfile/', fd2)
			    .then(res =>{
				  this.loading = false
			      if (res) this.$message.success('解析成功')
				  console.log(res.data)
				    this.count = res.data.sub.length
				    this.tableData = res.data.sub
					this.$store.state.subfile = res.data.file
				    bus.$emit('emodata',res.data.rante)
				    bus.$emit('file',res.data.file)
				    bus.$emit('class',res.data.emos)
					bus.$emit('focus',res.data.focus)
					bus.$emit('chara',res.data.chara)
			    }).catch(error =>{
					this.$message.warning('文件格式有误,请仔细检查！')
					this.loading = false
				})
			  }else{
				  this.$message('请选择文件')
			  }
			},
			
			handleEdit(index, row) {
			        console.log(index, row);
			      },
			handleDelete(index, row) {
			        console.log(index, row);
			},
			
			handleSizeChange(val) {
			        console.log(`每页 ${val} 条`);
					this.pagesize = val
			      },
			      handleCurrentChange(val) {
			        console.log(`当前页: ${val}`);
					this.currpage = val
			      }
		}
	}
</script>

<style>
	
</style>
