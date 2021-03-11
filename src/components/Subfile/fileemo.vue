<template>
	<div>
		<div id = "myemo"></div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default {
		name:"fileemo",
		data(){
			return {
				emoRate:[
					{name:'消极型',value:0},
					{name:'无观点型',value:0},
					{name:'欠类型',value:0},
					{name:'期望型',value:0},
					{name:'积极型',value:0},
				],
				filename:''
			}
		},
		methods:{
		},
		created() {
			
		},
		mounted() {
			
			let myemo = this.$echarts.init(document.getElementById('myemo'),'dark')
			myemo.showLoading();
			myemo.setOption({
				title: {
				        text: '情感极性分布',
				        subtext: '数据来源：'+this.$store.state.subfile,
				        left: 'center'
				    },
				    tooltip: {
				        trigger: 'item'
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
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				    },
				    series: [
				        {
				            name: '情感类型',
				            type: 'pie',
				            radius: '50%',
				            data: [],
				            emphasis: {
				                itemStyle: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
			})
			
			bus.$on('emodata',rante =>{
				// console.log(rante[0])
				for(var i=0;i<rante.length;i++){
					this.emoRate[i].value = rante[i]
				}
				console.log(this.emoRate)
				myemo.hideLoading();
				myemo.setOption({
					title: {
					    subtext: '数据来源：'+this.$store.state.subfile,
					},
					series: [
					    {
					       data: this.emoRate, 
					    }
					]
				})
			})
		},
		
	}
</script>

<style scoped="scoped">
	#myemo{
		width: 1250px;
		height: 500px;
	}
	.bg-purple {
	  background: #d3dce6;
	}
</style>
