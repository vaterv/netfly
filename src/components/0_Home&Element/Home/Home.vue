<template>
  <div class="content">
    <!-- 第一排图表 -->
    <div class="chart_first">
      <el-row :gutter="30">
        <!-- 左侧图表tip -->
        <el-col :xs="10" :sm="8" :md="7" :lg="6" :xl="5">
          <div class="grid-content bg-purple">
            <div class="chart_tip">
              <div class="tip_icon1">￥</div>
              <div class="tip_content">
                <h1>155.3w</h1>
                <p>MONTHLY SALES</p>
              </div>
            </div>
            <div class="chart_tip">
              <div class="tip_icon2"><i class="el-icon-s-order"></i></div>
              <div class="tip_content" id="tip_content2">
                <h1>15.9k</h1>
                <p>MONTHLY ORDERS</p>
              </div>
            </div>
            <div class="chart_tip">
              <div class="tip_icon3"><i class="el-icon-cherry"></i></div>
              <div class="tip_content">
                <h1>M: 38%</h1>
                <p>TYPES PERCENTAGE</p>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="4" :sm="9" :md="9" :lg="12" :xl="15" style="radius: 0px">
          <div
            ref="chart1"
            class="grid-content bg-purple-light"
            style="radius: 0px"
          ></div>
        </el-col>

        <el-col :xs="10" :sm="7" :md="8" :lg="6" :xl="4">
          <div class="grid-content bg-purple">
            <div ref="chart2" class="chart_right"></div>
            <div ref="chart3" class="chart_right"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div ref="chart4" class="chart_map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getEchartData1();
    this.getEchartData2();
    this.getEchartData3();
    this.getEchartData4();
  },
  methods: {
    getEchartData1() {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);
        const option = {
          title: {
            left: "left",
            text: "155.3w",
            subtext: "Different Fruit Monthly Sales",
            textStyle: {
              color: "#6ab04c",
              fontSize: 20,
            },
            padding: [30, 0, 0, 30],
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            x: "right",
            orient: "vertical",
            padding: [30, 50, 0, 0],
            // width:100,
            itemWidth: 30,
            selected: {
              Banana: false,
              Apple: false,
              Strawberry: false,
            },
            data: ["Cherry", "Watermelon", "Banana", "Apple", "Strawberry"],
          },
          grid: {
            left: "-5%",
            right: "5%",
            bottom: "-10%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true,
                connectedBackgroundColor: "#000",
                title: "",
              },
            },
            padding: [10, 10, 0, 0],
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            show: false,
            splitLine: {
              show: true,
              // interval: modSl,
              // lineStyle: {
              //     color: '#ccc',
              //     type: 'solid',
              // }
            },
          },
          yAxis: {
            show: false,
          },
          itemStyle: {
            // 点的颜色。
            color: "red",
          },
          series: [
            {
              name: "温度", //鼠标放在折线点上显示的名称
              type: "line", //折线图
              symbol: "circle", //折线点设置为实心点
              symbolSize: 6, //折线点的大小
              itemStyle: {
                normal: {
                  color: "#386db3", //折线点的颜色
                  lineStyle: {
                    color: "#386db3", //折线的颜色
                  },
                },
              },
            },
          ],
          // emphasis: {
          //   itemStyle: {
          //     // 高亮时点的颜色。
          //     color: 'blue'
          //   },
          // },
          series: [
            {
              name: "Cherry",
              type: "line",
              stack: "Total",
              data: [
                120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230,
              ],
              symbol: "circle", //折线点设置为实心点
              symbolSize: 6, //折线点的大小
              leble: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
            {
              name: "Watermelon",
              type: "line",
              stack: "Total",
              data: [
                220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330,
              ],
              symbol: "circle", //折线点设置为实心点
              symbolSize: 6, //折线点的大小
              leble: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
            {
              name: "Banana",
              type: "line",
              stack: "Total",
              data: [
                150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330,
              ],
              symbol: "circle", //折线点设置为实心点
              symbolSize: 6, //折线点的大小
            },
            {
              name: "Apple",
              type: "line",
              stack: "Total",
              data: [
                320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330,
              ],
              symbol: "circle", //折线点设置为实心点
              symbolSize: 6, //折线点的大小
            },
            {
              name: "Strawberry",
              type: "line",
              stack: "Total",
              data: [
                820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
                1330,
              ],
              symbol: "circle", //折线点设置为实心点
              symbolSize: 6, //折线点的大小
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    getEchartData2() {
      const chart2 = this.$refs.chart2;
      if (chart2) {
        const myChart = this.$echarts.init(chart2);
        const option = {
          title: {
            left: "left",
            text: "15.9k",
            subtext: "Monthly Orders",
            textStyle: {
              color: "#7c38bc",
              fontSize: 18,
            },
            padding: [20, 0, 0, 20],
          },
          grid: {
            left: "0%",
            right: "10%",
            bottom: "-12%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              shadowStyle: {
                // color:'#000'
              },
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            show: false,
            splitLine: {
              show: true,
              // interval: modSl,
              // lineStyle: {
              //     color: '#ccc',
              //     type: 'solid',
              // }
            },
          },
          yAxis: {
            show: false,
          },
          series: [
            {
              name: "order",
              data: [120, 100, 150, 80, 70, 110, 200, 150, 80, 70, 110, 130],
              type: "bar",
              itemStyle: {
                color: "#7c38bc",
              },
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }

      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    getEchartData3() {
      const chart3 = this.$refs.chart3;
      if (chart3) {
        const myChart = this.$echarts.init(chart3);
        const option = {
          title: {
            left: "left",
            text: "38%",
            subtext: "Porprotant Of Fruits",
            textStyle: {
              color: "#5cb6ff",
              fontSize: 20,
            },
            padding: [20, 0, 0, 20],
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
            show: false,
          },
          grid: {
            right: "-10%",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              center: ["70%", "50%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "40",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              color: [
                "#0066CC",
                "#0072E3",
                "#0080FF",
                "#2894FF",
                "#46A3FF",
                "#66B3FF",
                "84C1FF",
                "97CBFF",
              ],
              data: [
                { value: 1848, name: "Strawberry" },
                { value: 735, name: "Watermelon" },
                { value: 580, name: "Apple" },
                { value: 484, name: "Cherry" },
                { value: 300, name: "Banana" },
                { value: 580, name: "Peach" },
                { value: 484, name: "Pear" },
                { value: 300, name: "Orange" },
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }

      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    getEchartData4() {},
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #f1f2f7;
  width: 100%;
  padding-top: 30px;
}

.chart_first {
  width: 97%;
  margin-left: 20px;
}

// 第一排图表
.el-col {
  border-radius: 0px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  // background: #d3dce6;
}

.bg-purple-light {
  background: #fff;
  padding-top: 0px;
  // height: 330px !important;
  min-height: 360px !important;
}

.grid-content {
  border-radius: 0px;
  min-height: 360px;
}

.grid-content2 {
  height: 360px !important;
}

.chart_tip {
  width: 100%;
  height: 100px;
  background-color: white;
}

.chart_tip:nth-child(2) {
  margin: 30px 0px;
}

.tip_icon1,
.tip_icon2,
.tip_icon3 {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 30px;
  color: white;
  text-align: center;
  line-height: 60px;
  margin: 20px 20px;
}

.tip_icon1 {
  background-color: #6ab04c;
}

.tip_icon2 {
  background-color: #7c38bc;
}

.tip_icon3 {
  background-color: #5cb6ff;
}

.tip_content {
  width: 130px;
  margin: 20px 0px;
  float: left;
}

.tip_content > h1 {
  font-size: 30px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.696);
}

.tip_content > p {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.451);
}

.chart_right {
  width: 100%;
  height: 165px;
  background-color: #fff;
}

.chart_right:nth-child(1) {
  margin-bottom: 30px;
}

.chart_map {
  width: calc(100% - 40px);
  height: 800px;
  background-color: #fff;
  margin: 30px 20px 0px 20px;
}
</style>
