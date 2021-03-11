<template>
  <div>
	  <div class="br"></div>
	  <el-row :gutter="20">
	    <el-col :span="16">
	  		<el-card class="box-card">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <div id='cost'></div>
				  </el-col>
				  <el-col :span="12">
					 <div id="acc"></div>
				  </el-col>
				</el-row>
	  		</el-card>
			<el-card>
				<div id="cnn"></div>
			</el-card>
	  	</el-col>
	    <el-col :span="8">
	  		<el-card class="box-card">
	  		  1
	  		</el-card>
	  	</el-col>
	  </el-row>
	  
  </div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	methods:{
		model_acc(){
			var chartDom = document.getElementById('cnn');
			var myChart = this.$echarts.init(chartDom,'dark');
			var option;
			
			option = {
				title: {
				        text: '5分类模型准确率与出错率',
				        subtext: '训练数据：'
				},
				 tooltip: {
				         trigger: 'axis',
				         axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				             type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				         },
				},
				toolbox: {
				        show: true,
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            dataView: {readOnly: false},
				            magicType: {type: ['line', 'bar']},
				            restore: {},
				            saveAsImage: {}
				        }
				},
			    xAxis: {
			        type: 'category',
			        data: ['积极型', '欠类型', '无观点型', '期望型', '消极型','出错率']
			    },
			    yAxis: {
			        type: 'value',
					axisLabel: {
					            formatter: '{value}%'
					          }
			    },
			    series: [{
			        data: [98, 70, 80, 75, 65,{
						value: 2,
						itemStyle: {
							color: '#a90000'
						}
					}],
			        type: 'bar',
			        showBackground: true,
			        backgroundStyle: {
			            color: 'rgba(180, 180, 180, 0.2)'
			        },
					label: {
								show: true,
								position: 'top'
						    },
			    }]
			};
			option && myChart.setOption(option);
		},
		
		train_cost(){
			var chartDom = document.getElementById('cost');
			var myChart = this.$echarts.init(chartDom,'dark');
			var option;
			
			option = {
				title: {
				        text: '模型训练损失',
				        subtext: '训练数据：'
				},
				 tooltip: {
				         trigger: 'axis',
				         axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				             type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				         },
				},
				toolbox: {
				        show: true,
				        feature: {
				            dataView: {readOnly: false},
				            magicType: {type: ['line', 'bar']},
				            restore: {},
				            saveAsImage: {}
				        }
				},
				legend: {
				        data: ['训练集', '验证集']
				    },
			    xAxis: {
			        type: 'category',
			        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [
					{
						name:'训练集',
						data: [900, 950, 900, 800, 700, 600, 300],
						type: 'line',
						smooth: true
					},
					{
						name:'验证集',
						data: [700, 500, 400, 300, 200, 150, 100],
						type: 'line',
						smooth: true
					},
				]
			};
			
			option && myChart.setOption(option);
		},
		
		tran_acc(){
			var chartDom = document.getElementById('acc');
			var myChart = this.$echarts.init(chartDom,'dark');
			var option;
			
			option = {
				title: {
				        text: '模型训练准确率',
				        subtext: '训练数据：'
				},
				 tooltip: {
				         trigger: 'axis',
				         axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				             type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				         },
				},
				toolbox: {
				        show: true,
				        feature: {
				            dataView: {readOnly: false},
				            magicType: {type: ['line', 'bar']},
				            restore: {},
				            saveAsImage: {}
				        }
				},
			    xAxis: {
			        type: 'category',
			        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [{
			        data: [820, 932, 901, 934, 1290, 1330, 1320],
			        type: 'line',
			        smooth: true
			    }]
			};
			
			option && myChart.setOption(option);
		},
		
	},
	mounted() {
		this.model_acc()
		this.tran_acc()
		this.train_cost()
	},
	created() {
	}
}
</script>

<style lang="less" scoped>
	#acc{
		width: 100%;
		height: 350px;
	}
	#cost{
		width: 100%;
		height: 350px;
	}
	#cnn{
		width:100%;
		height: 400px;
	}
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
</style>
