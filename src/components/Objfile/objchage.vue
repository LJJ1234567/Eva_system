<template>
	<div id="cha">
		<div id="change"></div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:'objchage',
		data(){
			return {
				legend_data:[],
				xAxis_data:[],
				Series:[]
			}
		},
		methods:{
			
		},
		mounted() {
			let change = this.$echarts.init(document.getElementById('change'),'dark')
			
			change.setOption({
				title: {
				        text: '一级指标变异系数',
						padding: 15
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data: [],
						padding: 15
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
					dataZoom: [
					        {   // 这个dataZoom组件，默认控制x轴。
					            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					            start: 0,      // 左边在 10% 的位置。
					            end: 50         // 右边在 60% 的位置。
					        }
					    ],
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
				        boundaryGap: false,
				        data: []
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: []
			})
			change.showLoading();
			bus.$on('change',Change =>{
				// console.log(Change)
				this.legend_data = Object.keys(Change[0]) 
				this.xAxis_data = Change[1]
				
				function series (obj_data){
					let all_series = []
					for(let key in obj_data){
						all_series.push({
							name:key,
							type:'line',
							stack:'总量',
							data:obj_data[key]
						})
					}
					return all_series
				}
				
				this.Series=series(Change[0])
				
				// console.log(this.Series)
				
				change.hideLoading();
				
				change.setOption({
					legend: {
					    data: this.legend_data
					},
					xAxis: {
					    type: 'category',
					    boundaryGap: false,
					    data: this.xAxis_data
					},
					series: this.Series
				})
				
			})
		}
	}
</script>

<style>
	#change{
		width: 1250px;
		height: 500px;
	}
</style>
