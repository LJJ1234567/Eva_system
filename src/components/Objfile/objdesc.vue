<template>
	<div>
	    <div id="main"></div>
		<div class="br"></div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:'objdesc',
		data(){
			return {
				Source:[],
				Series:[]
			}
		},
		mounted() {
			
			// var main_wid = document.getElementById("body_main").offsetWidth
			// console.log(main_wid)
			
			var myChart = this.$echarts.init(document.getElementById('main'),'dark')
				myChart.showLoading();
			    myChart.setOption({
					title: {
					    text: '一级指标下的均值及占比',
						padding: 15
					},
			        legend: {
						padding: 15
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
			        tooltip: {
			            trigger: 'axis',
			            showContent: false
			        },
			        dataset: {
			            source: []
			        },
			        xAxis: {type: 'category'},
			        yAxis: {gridIndex: 0},
			        grid: {top: '55%'},
			        series: []
			    });
			
			    myChart.on('updateAxisPointer', function (event) {
			        var xAxisInfo = event.axesInfo[0];
			        if (xAxisInfo) {
			            var dimension = xAxisInfo.value + 1;
			            myChart.setOption({
			                series: {
			                    id: 'pie',
			                    label: {
			                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
			                    },
			                    encode: {
			                        value: dimension,
			                        tooltip: dimension
			                    }
			                }
			            });
			        }
			    });
			
			bus.$on('average',Average =>{
				// console.log('均值数据打印')
				// console.log(Average)
				let first = ['teachers']
				let teachers = first.concat(Average[1])
				// console.log(teachers)
			
				this.Source.push(teachers)
				for(let key in Average[0]){
					let temp = []
					temp.push(key)
					for(let item in Average[0][key]){
						let sum = 0
						for(var i=0;i<Average[0][key][item].length;i++){
							sum+=Average[0][key][item][i]
						}
						temp.push((sum/Average[0][key][item].length))
					}
					this.Source.push(temp)
				}
				console.log(this.Source)
				
				var obj_len = Object.keys(Average[0]).length;
				for(let i=0;i<obj_len;i++){
					this.Series.push({
						type: 'line', smooth: true, seriesLayoutBy: 'row', 
						emphasis: {focus: 'series'},
					})
				}
				this.Series.push({
				    type: 'pie',
				    id: 'pie',
				    radius: '30%',
				    center: ['50%', '25%'],
				    emphasis: {focus: 'data'},
				    label: {
				        formatter: '{b}: {@+'+teachers[1]+'} ({d}%)'
				    },
				    encode: {
				        itemName: 'teachers',
				        value: teachers[1],
				        tooltip: teachers[1]
				    }
				})
				// console.log(this.Series)
				myChart.hideLoading();
				myChart.setOption({
					dataset: {
					    source: this.Source,
					},
					series: this.Series
				});
			})
		}	
	}
</script>

<style scoped="scoped">
	#main{
		width: 1250px;
		height: 500px;
	}
</style>
