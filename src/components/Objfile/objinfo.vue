<template>
	<div >
		<div id ="info"></div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:'objinfo',
		data(){
			return {
				legend_data:[],
				yAxis_data:[],
				Series:[]
			}
		},
		mounted() {
			var info = this.$echarts.init(document.getElementById('info'),'dark');
			var option;
			info.showLoading();
			option = {
				title: {
				        text: '一级指标信息熵',
						padding: 15
				    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {            // Use axis to trigger tooltip
			            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
			        }
			    },
			    legend: {
			        data: [],
					padding: 15
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
				dataZoom: [
				        {
				            id: 'dataZoomX',
				            type: 'slider',
				            xAxisIndex: [0],
							
				            filterMode: 'filter'
				        },
				        {
				            id: 'dataZoomY',
				            type: 'slider',
				            yAxisIndex: [0],
							
				            filterMode: 'empty'
				        }
				    ],
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: {
			        type: 'value'
			    },
			    yAxis: {
			        type: 'category',
			        data: []
			    },
			    series: []
			};
			
			option && info.setOption(option);
			
			bus.$on('entropy',Entropy=>{
				// console.log(Entropy)
				this.legend_data = Object.keys(Entropy[0])
				this.yAxis_data = Entropy[1]
				
				for(let key in Entropy[0]){
					let all_sum = []
					for(let item in Entropy[0][key])
					{	
						let sum = 0
						for(let i=0;i<item.length;i++){
							sum+=Entropy[0][key][item][i]
						}
						all_sum.push(sum)
					}
					this.Series.push(
					{
						name: key,
						type: 'bar',
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						},
						data: all_sum
					})
				}
				// console.log(this.Series)
				info.hideLoading();
				info.setOption({
					legend: {
					    data: this.legend_data
					},
					yAxis: {
					    data: this.yAxis_data
					},
					series: this.Series
				})
			})
			
		}
	}
</script>

<style scoped="scoped">
	#info{
		width: 1250px;
		height: 500px;
	}
</style>
