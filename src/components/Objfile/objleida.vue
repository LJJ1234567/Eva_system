<template>
	<div>
		<div class="row">
			<el-card class="box-card" v-for="(item,index) in list" :key =index>
			  <div slot="header" class="clearfix">
			    <span>卡片名称,序号{{index+1}}</span>
			    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			  </div>
			  <div class="echarts-04"></div>
			</el-card>
		</div>
	</div>
	
	
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:'objleida',
		data(){
			return{
				list:[
						// [
						// 	{name:'教学',value:[0.9,0.6,0.8,0.7,0.7,0.5,0.9,0.6,0.8,0.7]},
						// 	{name:'师德',value:[0.8,0.9,0.7,0.6,0.7,0.5,0.8,0.9,0.7,0.6,]},
						// 	{name:'0.6标准',value:[0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6]},
						// ],
						// [
						// 	{name:'教学',value:[0.5,0.6,0.7,0.8,0.9,0.9,0.9,0.4,0.5,0.6]},
						// 	{name:'师德',value:[0.5,0.6,0.8,0.6,0.9,0.7,0.8,0.8,0.7,0.9]},
						// 	{name:'0.6标准',value:[0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6]},
						// ],
					],
				legend_data:['0.6标准'],
				// legend_data:['0.6标准','教学','师德'],
				indicator_data:[
								// {text: "指标1/指标11/",max: 1},
								// {text: "指标2/指标11/",max: 1},
								// {text: "指标3/指标11/",max: 1},
								// {text: "指标4/指标11/",max: 1},
								// {text: "指标5/指标11/",max: 1},
								// {text: "指标6/指标11/",max: 1},
								// {text: "指标7/指标11/",max: 1},
								// {text: "指标8/指标11/",max: 1},
								// {text: "指标9/指标11/",max: 1},
								// {text: "指标10/指标20/",max: 1},
							]
			}
		},
		created() {
			bus.$on('info',Info =>{
				let all=[]
				let indics = []
				for(let key in Info[0]){
					let temp = []
					// let ind =[]
					this.legend_data.push(key)
					let JsonInfo = JSON.parse(Info[0][key])
					// console.log(JsonInfo)
					for(let i in JsonInfo){
						let item = {}
						// ind.push(Object.keys(JsonInfo[i]))
						item['value'] = Object.values(JsonInfo[i])
						item['name'] = key
						temp.push(item)
					}
					all.push(temp)
					indics.push(Object.keys(JsonInfo[0]))
				}
				
				function indicator(data){
					let temp = []
					let led = []
					for(let i=0;i<data.length;i++){
						temp.push(data[i].length) 
					}
					let max_len = Math.max.apply(null,temp)
					// console.log(max_len)
					for(let i=0;i<max_len;i++){
						let item = {}
						let str_name = ''
						for(let j=0;j<data.length;j++){
							str_name+=data[j][i]+'/'
							// console.log(str_name)
						}
						item['text'] = str_name
						item['max'] = 1
						led.push(item)
					}
					return led
				}
				
				this.indicator_data = indicator(indics)
				let stand = []
				for(let k=0;k<this.indicator_data.length;k++){
					stand.push(0.6)
				}
				// console.log(stand)
				// console.log(all)
				
				function chart_data(data,stand){
					let len = data.length
					let son_len = data[0].length
					let new_data = []
					for(let j=0;j<son_len;j++){
						let item=[]
						for(let i=0;i<len;i++){
							item.push(data[i][j])
						}
						item.push({
							value: stand,
							name: '0.6标准'
						})
						new_data.push(item)
					}
					return new_data
				}
				this.list = chart_data(all,stand)
				
				
				console.log(this.legend_data)
				console.log(this.indicator_data)
				console.log(this.list)
				
			})
		},
		mounted() {
	
			var leidaChart = document.getElementsByClassName('echarts-04'); // 对应地使用ByClassName
			for(var i = 0;i < leidaChart.length;i++ ){
			  let myChart4 = this.$echarts.init(leidaChart[i],'dark');
			  myChart4.setOption({
				title: {
					  text: '指标雷达图',
					  subtext: '数据来源：上传的文件'
					},
					tooltip: {
					  trigger: 'axis'
					},
					legend: {
					  orient: 'vertical',
					  x: 'right',
					  y: 'bottom',
					  data: this.legend_data
					},
					toolbox: {
					  show: true,
					  feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						restore: { show: true },
						saveAsImage: { show: true }
					  }
					},
					polar: [
					  {
						indicator: this.indicator_data
					  }
					],
					calculable: true,
					series: [
					  {
						name: '预算 vs 开销（Budget vs spending）',
						type: 'radar',
						data: this.list[i]
					  }
					] 
				})
			}
		},
		
	}
</script>

<style scoped="scoped">
	.row{
		
	}
	.box-card{
		width: 550px;
		float: left;
		margin:0px;
		margin: 10px;
	}
	.echarts-04{
		width: 500px;
		height: 400px;
	}
	.el-card__body{
		padding: 0;
	}
	
</style>

// 	title: {
// 	      text: '指标雷达图',
// 	      subtext: '数据来源：上传的文件'
// 	    },
// 	    tooltip: {
// 	      trigger: 'axis'
// 	    },
// 	    legend: {
// 	      orient: 'vertical',
// 	      x: 'right',
// 	      y: 'bottom',
// 	      data: ['教学', '师德', '标准']
// 	    },
// 	    toolbox: {
// 	      show: true,
// 	      feature: {
// 	        mark: { show: true },
// 	        dataView: { show: true, readOnly: false },
// 	        restore: { show: true },
// 	        saveAsImage: { show: true }
// 	      }
// 	    },
// 	    polar: [
// 	      {
// 	        indicator: [
// 	          { text: '指标1', max: 10000 },
// 	          { text: '指标2', max: 10000 },
// 	          { text: '指标3', max: 10000 },
// 	          { text: '指标4', max: 10000 },
// 	          { text: '指标5', max: 10000 },
// 	          { text: '指标6', max: 10000 }
// 	        ]
// 	      }
// 	    ],
// 	    calculable: true,
// 	    series: [
// 	      {
// 	        name: '预算 vs 开销（Budget vs spending）',
// 	        type: 'radar',
// 	        data: this.list
// 	      }
// 	    ]
// 	  })
// 	}
