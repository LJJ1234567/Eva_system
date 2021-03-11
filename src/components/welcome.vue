<template>
  <div>
	<el-card class="box-card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item >当前位置</el-breadcrumb-item>
			<el-breadcrumb-item >首页</el-breadcrumb-item>
		</el-breadcrumb>
	</el-card>
    <div class="br"></div>
    <el-card class="box-card">
      <div class="text item">
        <el-row :gutter="20">
          <el-col :span="6">
			  <StatusItem class="color1">
				  <template v-slot:icon>
					  <img src="../assets/img/电脑.png" width="32px" alt="">
					  <h3>访问IP</h3>
					  <div>{{ip}}</div>
				  </template>
				  <template v-slot:content>
					 <h3>上次登录时间</h3>
					 <div>{{lsat_time}}</div>
					 <div style="display: flex;">
						 <h3>位置：</h3>
						 <div style="margin: 10px 0;">{{local}}</div>
					 </div>
				  </template>
			  </StatusItem>
		  </el-col>
          <el-col :span="6">
			  <StatusItem class="color2">
				  <template v-slot:icon>
					  <img src="../assets/img/时间.png" width="25px" alt="">
					  <h3>运行天数</h3>
					  <div>{{runtimes}}天</div>
				  </template>
				  <template v-slot:content>
						 <div style="height: 28px;"></div>
						 <h3>访问次数</h3>
						 <div>{{visits}}</div>
				  </template>
			  </StatusItem>
		  </el-col>
          <el-col :span="6">
			  <StatusItem class="color3">
				  <template v-slot:icon>
					  <img src="../assets/img/次数.png" width="30px" alt="">
					  <h3>数据处理总量</h3>
					  <div>{{handelfiles}}</div>
				  </template>
				  <template v-slot:content>
					  <el-row type="flex" class="row-bg" justify="space-around">
					    <el-col>
							<el-row>
							  <el-col :span="18"><div class="item_font">客观数据处理量</div></el-col>
							  <el-col :span="6">{{objfiles}}</el-col>
							</el-row>
						</el-col>
					    <el-col>
							<el-col :span="18"><div class="item_font">客观数据处理量</div></el-col>
							<el-col :span="6">{{subfiles}}</el-col>
						</el-col>
					  </el-row>
				  </template>
			  </StatusItem>
		  </el-col>
          <el-col :span="6">
			  <StatusItem class="color4">
				  <template v-slot:icon>
					 <img src="../assets/img/文件.png" width="23px" alt="">
					  <h3>今日数据处理</h3>
				  </template>
				  <template v-slot:content>
					 <el-row type="flex" class="row-bg" justify="space-around">
					   <el-col>
						    <el-row>
								<el-col :span="12"><div class="item_font">客观数据</div></el-col>
								<el-col :span="12">{{objfiles}}</el-col>
							</el-row>
						</el-col>
					    <el-col>
							<el-col :span="12"><div class="item_font">主观数据</div></el-col>
							<el-col :span="12">{{subfiles}}</el-col>
					    </el-col>
					 </el-row>
				  </template>
			  </StatusItem>
		  </el-col>
        </el-row>
      </div>
    </el-card>
	
	<div class="br"></div>
	<el-card>
		<div id="first_main"></div>
	</el-card>
  </div>
</template>

<script>
	import StatusItem from './FirstPage/stausitem.vue'
	import BMap from 'BMap'
export default {
  name: 'welcome',
  data () {
    return {
      lsat_time:'',
	  local:'',
	  ip:'',
	  runtimes:0,
	  handelfiles:0,
	  visits:0,
	  objfiles:0,
	  subfiles:0
    }
  },
  computed:{
  },
  components:{
	  StatusItem
  },
  methods:{
	  get_ip(){
		    var element = document.createElement("script");
		    element.src = "http://pv.sohu.com/cityjson?ie=utf-8";
		    document.body.appendChild(element);
			console.log(returnCitySN);
			this.ip = returnCitySN['cip']
			this.local = returnCitySN['cname']
			// localStorage.setItem('cityname', returnCitySN['cname'])
	  },
	  // 网络状态检测
	  network(){
		  var chartDom = document.getElementById('first_main');
		  var myChart =this.$echarts.init(chartDom, 'dark');
		  var option;
		  function randomData() {
		      now = new Date(+now + oneDay);
		      value = value + Math.random() * 21 - 10;
		      return {
		          name: now.toString(),
		          value: [
		              [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
		              Math.round(value)
		          ]
		      };
		  }
		  
		  var data = [];
		  var now = +new Date(1997, 9, 3);
		  var oneDay = 24 * 3600 * 1000;
		  var value = Math.random() * 1000;
		  for (var i = 0; i < 1000; i++) {
		      data.push(randomData());
		  }
		  
		  option = {
		      title: {
		          text: '网络状态实时监测'
		      },
		      tooltip: {
		          trigger: 'axis',
		          formatter: function (params) {
		              params = params[0];
		              var date = new Date(params.name);
		              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
		          },
		          axisPointer: {
		              animation: false
		          }
		      },
		      xAxis: {
		          type: 'time',
		          splitLine: {
		              show: false
		          }
		      },
		      yAxis: {
		          type: 'value',
		          boundaryGap: [0, '100%'],
		          splitLine: {
		              show: false
		          }
		      },
		      series: [{
		          name: '模拟数据',
		          type: 'line',
		          showSymbol: false,
		          hoverAnimation: false,
		          data: data
		      }]
		  };
		  setInterval(function () {
		      for (var i = 0; i < 5; i++) {
		          data.shift();
		          data.push(randomData());
		      }
		      myChart.setOption({
		          series: [{
		              data: data
		          }]
		      });
		  }, 1000);
		  option && myChart.setOption(option);
	  }
  },
  created() {
	 this.get_ip()
	 
	 
	// 基础数据获取
	 this.$http.post('base/').then(res=>{
		// console.log(res)
		this.runtimes = res.data.run_times
		this.handelfiles = res.data.handel_files
		this.visits = res.data.visits
		this.objfiles = res.data.objs
		this.subfiles = res.data.subs
	 }).catch(Error)
	 
  },
  mounted() {
	  this.lsat_time = window.sessionStorage.getItem('time').substring(0,19)
	  
	  this.network()
	  
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.color1{
		background-color: #FEDD9B;
		border-radius: 15px;
	}
	.color2{
		background-color: #D1EFFE;
		border-radius: 15px;
	}
	.color3{
		background-color: #FDE1D9;
		border-radius: 15px;
	}
	.color4{
		background-color: #E2E1FE;
		border-radius: 15px;
	}
	
	#first_main{
		width: 100%;
		height: 380px;
	}
	
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
	  }
	   .row-bg {
		  height: 100px;
		  flex-direction: column;
	      padding: 10px 0;
	    }
	 .item_font{
		 font-weight: bold;
	 }
</style>
