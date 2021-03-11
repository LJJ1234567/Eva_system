<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="12">
			  <div id="focus" autoresize></div>
		  </el-col>
		  <el-col :span="12">
			  <div id="chara" autoresize></div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import bus from '../bus.js'
	export default{
		name:"subfocus",
		data(){
			return {
				focus:[],
				chara:[],
				mychart:{}
			}
		},
		created() {
		},
		methods:{
			    // 1. data 原始气泡数据，是一个对象数组，形如[{name: '可乐', amount: 49}]
			    // 2. format 数组依次指定气泡中展示的名称以及影响气泡大小的数据值, 形如['name', 'amount']
			    // 3. dom 气泡图绘制所需要的dom id名
			    initBubbleChart (data = [], format = [], dom, title, filename) {
			      let [maxValue, temp] = [0, []]
			      data.forEach(item => {
			        temp.push(item[format[1]])
			      })
			      maxValue = Math.max.apply(null, temp)
			 
			      // 气泡颜色数组
			      let color = [
			        '#FFB600', '#886CFF', '#0084FF',
			        '#4CB690','#58B458', '#6C6C6C',
			        '#F56161', '#FC754C','#5F5EEC'
			      ]
			      // 气泡颜色备份
			      let bakeColor = [...color]
			      // 气泡数据
			      let bubbleData  = []
			      // 气泡基础大小
			      let basicSize = 70
			      // 节点之间的斥力因子,值越大,气泡间距越大
			      let repulsion = 380
			      // 根据气泡数量配置基础大小和斥力因子（以实际情况进行适当调整，使气泡合理分布）
			      if (data.length >= 5 && data.length < 10) {
			        basicSize = 50
			        repulsion = 230
			      }
			      if (data.length >= 10 && data.length < 20) {
			        basicSize = 40
			        repulsion = 150
			      } else if (data.length >= 20) {
			        basicSize = 30
			        repulsion = 75
			      }
			 
			      // 填充气泡数据数组bubbleData
			      for (let item of data) {
			        // 确保气泡数据条数少于或等于气泡颜色数组大小时，气泡颜色不重复
			        if (!bakeColor.length) bakeColor = [...color]
			        let colorSet = new Set(bakeColor)
			        let curIndex = Math.round(Math.random()*(colorSet.size - 1))
			        let curColor = bakeColor[curIndex]
			        colorSet.delete(curColor)
			        bakeColor = [...colorSet]
			        // 气泡大小设置
			        let size = (item[format[1]] * basicSize * 2) / maxValue
			        if (size < basicSize) size = basicSize
			 
			        bubbleData.push({
			          "name": item[format[0]],
			          "value": item[format[1]],
			          "symbolSize": size,
			          "draggable": true,
			          "itemStyle": {
			          "normal": {"color": curColor}
			          }
			        })
			      }
			      let bubbleId = document.getElementById(dom)
				  
				  var mainContainer = document.getElementById('main');
		          //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
		      
			      this.mychart = this.$echarts.init(bubbleId,'dark')
				  
				  
			      let bubbleOptions = {
					  title: {
					          text: title,
					          subtext: '数据来源：'+filename
					    },
					  toolbox:{
						 show:true,
						 feature:{
							 restore:{},
							 dataView:{
								 show:true,
								 title:'数据视图'
							 },
							 saveAsImage:{}
						 },
						 right:20
					  },
					  tooltip: {},
			          backgroundColor: '#100C2A',
			          animationEasingUpdate: 'bounceIn',
			          series: [{
			              type: 'graph',
			              layout: 'force',
			              force: {
			                  repulsion: repulsion,
			                  edgeLength: 10
			              },
			              // 是否开启鼠标缩放和平移漫游
			              roam: false,
			              label: {normal: {show: true}},
			              data: bubbleData
			          }]
			      }
			      this.mychart.setOption(bubbleOptions)
				  if(filename){
					  this.mychart.hideLoading();
				  }else{
					  this.mychart.showLoading();
				  }
				  
			    },
		},
		mounted() {
			let _this = this;
				window.onresize = function() {
					_this.mychart.resize()
				}
			
			this.initBubbleChart(this.focus, ['label', 'amount'], 'focus','焦点分析',this.$store.state.subfile)
			this.initBubbleChart(this.chara, ['label', 'amount'], 'chara','特性分析',this.$store.state.subfile)
			
			
			bus.$on('focus',res=>{
				console.log('focus:',res)
				let load_frous=[]
				let load_chara=[]
				for(let i=0;i<res.length;i++){
					let temp={}
					temp['label'] = res[i][0]
					temp['amount'] = res[i][1]
					load_frous.push(temp)
				}
				// console.log('load_frous',load_frous)
				this.focus = load_frous
				this.initBubbleChart(this.focus, ['label', 'amount'], 'focus','焦点分析',this.$store.state.subfile)
			}),
			bus.$on('chara',res =>{
				let load_chara=[]
				for(let i=0;i<res.length;i++){
					let temp={}
					temp['label'] = res[i][0]
					temp['amount'] = res[i][1]
					load_chara.push(temp)
				}
				this.chara = load_chara
				this.initBubbleChart(this.chara, ['label', 'amount'], 'chara','特性分析',this.$store.state.subfile)
			})
		}
	}
</script>

<style>
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
	  }
	#focus{
		width: 625px;
		height: 500px;
	}
	#chara{
		width: 625px;
		height: 500px;
	}
</style>
