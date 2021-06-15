<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span
              ><i class="el-icon-view" style="padding-right: 5px"></i
              >硬件监视</span
            >
          </div>
          <div>
            <el-row :gutter="20" style="padding-left: 30px">
              <el-col :span="12">
                <div class="dashboard-text">
                  操作系统：<el-tag>{{ hardware.system }}</el-tag>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="dashboard-text">
                  开机时间：<el-tag>{{ hardware.setuptime }}</el-tag>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-left: 10px">
              <el-col :span="6">
                <div id="cpuTemp" style="width: 194px; height: 170px"></div>
              </el-col>
              <el-col :span="6">
                <div id="cpuUsage" style="width: 194px; height: 170px"></div>
              </el-col>
              <el-col :span="6">
                <div id="memUsage" style="width: 194px; height: 170px"></div>
              </el-col>
              <el-col :span="6">
                <div id="diskUsage" style="width: 194px; height: 170px"></div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item, index) in stat" :key="index">
                <div class="stat-info__item">
                  <div
                    class="stat-info__icon"
                    :style="{ 'background-color': item.bgColor }"
                  >
                    <i :class="item.icon"></i>
                  </div>
                  <div class="stat-info__detail">
                    <span class="stat-info__total">{{ item.total }}</span>
                    <span class="stat-info__title">{{ item.title }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span
              ><i
                class="el-icon-chat-line-square"
                style="padding-right: 5px"
              ></i
              >报警事件（Top5）</span
            >
          </div>
          <el-timeline style="padding-left: 5px">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span
              ><i class="el-icon-guide" style="padding-right: 5px"></i
              >进程监视</span
            >
          </div>
          <div>
            <el-table
              :data="processData"
              stripe
              style="width: 100%"
              height="360"
            >
              <el-table-column prop="name" label="名称"> </el-table-column>
              <el-table-column prop="pid" label="PID"> </el-table-column>
              <el-table-column
                prop="cpu"
                label="CPU(%)"
                :formatter="FormatterCpu"
              >
              </el-table-column>
              <el-table-column
                prop="mem"
                label="内存(%)"
                :formatter="FormatterMem"
              >
              </el-table-column>
              <el-table-column
                prop="stime"
                label="启动时间"
                width="180"
                :formatter="DateFormat"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="warning"
                    size="mini"
                    >重新启动</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="width: 100%">
          <div slot="header" class="clearfix">
            <span
              ><i class="el-icon-setting" style="padding-right: 5px"></i
              >快捷操作</span
            >
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <el-button
                  type="warning"
                  style="width: 100px; height: 60px; font-size: 20px"
                  icon="el-icon-refresh"
                  @click="handleRestart()"
                  >重启
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="warning"
                  style="width: 100px; height: 60px; font-size: 20px"
                  icon="el-icon-warning-outline"
                  @click="handleClose()"
                  >关机
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { getToken } from "@/utils/auth";

export default {
  name: "DashboardClient",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  data() {
    return {
      processData: [],
      websock: null,
      TempChart: null,
      CpuChart: null,
      MemChart: null,
      DiskChart: null,
      timer: "",
      hardware: {
        system: "",
        setuptime: "",
      },
      activities: [],
      stat: [],
    };
  },
  mounted() {
    this.initCharts();
    this.loadData();
    this.loadMoniP();
    if (this.websock) {
      this.websock.close(); // 关闭websocket连接
    }
    this.initWebSocket(); // 初始化weosocket，发起连接
    // 这里使用定时器是为了等待连接后才发送数据，避免错误
    setTimeout(() => {
      // 添加状态判断，当为OPEN时，前端发送消息给后端
      if (this.websock.readyState === 1) {
        // 把后台需要的参数数据传过去
        const obj = {
          topic: "alarm",
          cycle: 5,
        };
        // 发给后端的数据需要字符串化
        this.websocketsend(obj);
      }
    }, 500);
    this.changeWindowSize();
    this.timer = setInterval(() => {
      this.loadData();
      this.loadMoniP();
    }, 5000);
  },
  methods: {
    initCharts() {
      this.TempChart = this.$echarts.init(document.getElementById("cpuTemp"));
      this.CpuChart = this.$echarts.init(document.getElementById("cpuUsage"));
      this.MemChart = this.$echarts.init(document.getElementById("memUsage"));
      this.DiskChart = this.$echarts.init(document.getElementById("diskUsage"));
    },

    loadData() {
      this.$store
        .dispatch("getDashboards")
        .then(() => {
          this.loading = false;
          this.hardware.system = this.$store.getters.hardware.server_version;
          this.hardware.setuptime = this.$store.getters.hardware.system_time;
          this.stat.length = 0;
          this.stat.push(
            {
              icon: "el-icon-upload2",
              title: "上行流量",
              total: this.$store.getters.flows.total_flow_out_s + "Kbps",
              bgColor: "#ebcc6f",
            },
            {
              icon: "el-icon-download",
              title: "下行流量",
              total: this.$store.getters.flows.total_flow_in_x + "Kbps",
              bgColor: "#3acaa9",
            },
            {
              icon: "el-icon-s-unfold",
              title: "发送总流量",
              total: this.$store.getters.flows.total_bytes_sent,
              bgColor: "#67c4ed",
            },
            {
              icon: "el-icon-s-fold",
              title: "接收总流量",
              total: this.$store.getters.flows.total_bytes_recv,
              bgColor: "#67c4ed",
            }
          );
          this.gaugeimg(
            "cpuTemp",
            "CPU温度",
            0,
            100,
            this.$store.getters.charts.cpuTemp || 32,
            "℃"
          );
          this.gaugeimg(
            "cpuUsage",
            "CPU使用率",
            0,
            100,
            this.$store.getters.charts.cpuUsage,
            "%"
          );
          this.gaugeimg(
            "memUsage",
            "内存使用率",
            0,
            100,
            this.$store.getters.charts.memUsage,
            "%"
          );
          this.gaugeimg(
            "diskUsage",
            "磁盘使用率",
            0,
            100,
            this.$store.getters.charts.diskUsage,
            "%"
          );
        })
        .catch(() => {
          this.loading = false;
        });
    },

    loadMoniP() {
      getMoniProcess({ token: getToken() }).then((response) => {
        if (response.code === 1000) {
          this.processData = response.data;
        }
      });
    },

    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      // 初始化weosocket
      const wsuri = "ws://127.0.0.1:49101";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      console.log("WebSocket连接成功");
    },

    websocketonerror(e) {
      console.log(`连接失败的信息：`, e);
      // 连接建立失败重连
      this.initWebSocket();
    },

    websocketonmessage(e) {
      const dataJson = JSON.parse(e.data);
      const dataArray = dataJson.map((item) => {
        return {
          content: item.content,
          timestamp: parseTime(item.timestamp),
        };
      });
      this.activities = dataArray.reverse().slice(0, 5);
    },

    websocketsend(data) {
      // 数据发送
      this.websock.send(JSON.stringify(data));
    },

    websocketclose(e) {
      // 关闭
      console.log("断开连接", e);
    },

    gaugeimg(id, title, min, max, val, unit) {
      const option = {
        title: {
          show: false,
          text: title,
          x: "center",
          y: "90%",
        },
        tooltip: {
          formatter: "{b} : {c}" + unit,
          confine: true,
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true,
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        series: [
          {
            center: ["50%", "50%"],
            number: [0, "50%"],
            // 仪表盘起始角度
            startAngle: 240,
            // 仪表盘结束角度
            endAngle: -60,
            name: title,
            type: "gauge",
            radius: "85%",
            // 坐标轴线
            axisLine: {
              // 属性lineStyle控制线条样式
              lineStyle: {
                color: [
                  [0.25, "#ddd"],
                  [1, "#ddd"],
                ],
                width: 10,
              },
            },
            // 坐标轴小标记
            axisTick: {
              show: false,
            },
            // 坐标轴文本标签，详见axis.axisLabel
            axisLabel: {
              show: true,
              distance: 1,
            },
            // 分隔线
            splitLine: {
              // 默认显示，属性show控制显示与否
              show: false,
            },
            // 指针粗细
            pointer: {
              width: 5,
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              textStyle: {
                fontWeight: "bolder",
              },
              offsetCenter: [0, "-20%"],
              padding: [5, 5],
              fontSize: 12,
            },
            detail: {
              formatter: "{value}" + unit,
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              textStyle: {
                color: "auto",
                fontWeight: "bolder",
                fontSize: 15,
              },
              offsetCenter: [0, "20%"],
            },
            data: [{}],
          },
        ],
      };
      option.series[0].min = min;
      option.series[0].max = max;
      option.series[0].data[0].value = val;
      option.series[0].data[0].name = title;
      option.series[0].axisLine.lineStyle.color[0][0] =
        (val - min) / (max - min);
      option.series[0].axisLine.lineStyle.color[0][1] = this.detectionData(
        val,
        id
      );
      switch (id) {
        case "cpuTemp":
          this.TempChart.setOption(option);
          break;
        case "cpuUsage":
          this.CpuChart.setOption(option);
          break;
        case "memUsage":
          this.MemChart.setOption(option);
          break;
        case "diskUsage":
          this.DiskChart.setOption(option);
          break;
      }
      // window.addEventListener('resize', function() {
      //   this.TempChart.resize()
      //   this.CpuChart.resize()
      //   this.MemChart.resize()
      //   this.DiskChart.resize()
      // })
    },

    /*
     *颜色设置，
     */
    detectionData(str, id) {
      if (id === "cpuTemp") {
        var color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0,
            color: "#32cd32",
          },
          {
            offset: 1,
            color: "#32cd32",
          },
        ]);
        if (str >= 60 && str <= 80) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff8c00",
            },
            {
              offset: 1,
              color: "#ff8c00",
            },
          ]);
        }
        if (str > 80) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff0000",
            },
            {
              offset: 1,
              color: "#ff0000",
            },
          ]);
        }
        return color;
      }
      if (id === "cpuUsage") {
        color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0,
            color: "#32cd32",
          },
          {
            offset: 1,
            color: "#32cd32",
          },
        ]);
        if (str >= 70 && str <= 90) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff8c00",
            },
            {
              offset: 1,
              color: "#ff8c00",
            },
          ]);
        }
        if (str > 90) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff0000",
            },
            {
              offset: 1,
              color: "#ff0000",
            },
          ]);
        }
        return color;
      }
      if (id === "memUsage") {
        color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0,
            color: "#32cd32",
          },
          {
            offset: 1,
            color: "#32cd32",
          },
        ]);
        if (str >= 70 && str <= 90) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff8c00",
            },
            {
              offset: 1,
              color: "#ff8c00",
            },
          ]);
        }
        if (str > 90) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff0000",
            },
            {
              offset: 1,
              color: "#ff0000",
            },
          ]);
        }
        return color;
      }
      if (id === "diskUsage") {
        color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0,
            color: "#32cd32",
          },
          {
            offset: 1,
            color: "#32cd32",
          },
        ]);
        if (str >= 70 && str <= 95) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff8c00",
            },
            {
              offset: 1,
              color: "#ff8c00",
            },
          ]);
        }
        if (str > 95) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "#ff0000",
            },
            {
              offset: 1,
              color: "#ff0000",
            },
          ]);
        }
        return color;
      }
    },

    handleClick(row) {
      this.$store
        .dispatch("exec", {
          msg_type: 103,
          process: row.name,
        })
        .then((response) => {
          if (response.code === 1000) {
            this.alertMsg(
              "恭喜您，进程【" + row.name + "】重启成功~~~",
              "success"
            );
          } else {
            this.$message.error("抱歉，进程【" + row.name + "】重启失败~~~");
          }
        });
    },

    handleRestart() {
      this.$store
        .dispatch("exec", {
          msg_type: 108,
          process: "",
        })
        .then((response) => {
          if (response.code === 1000) {
            this.alertMsg("您的电脑即将重启......", "success");
          } else {
            this.$message.error("抱歉，电脑重启失败~~~");
          }
        });
    },

    handleClose() {
      this.$store
        .dispatch("exec", {
          msg_type: 107,
          process: "",
        })
        .then((response) => {
          if (response.code === 1000) {
            this.alertMsg("您的电脑即将关闭......", "success");
          } else {
            this.$message.error("抱歉，电脑关闭失败~~~");
          }
        });
    },

    alertMsg(msg, type) {
      this.$message({
        message: msg,
        type: type,
      });
    },

    changeWindowSize() {
      // ipcRenderer.send("changWindowSize");
    },

    FormatterCpu(row) {
      if (row.cpu !== "-") {
        return parseFloat(row.cpu).toFixed(2);
      } else {
        return row.cpu;
      }
    },

    FormatterMem(row) {
      if (row.mem !== "-") {
        return parseFloat(row.mem).toFixed(2);
      } else {
        return row.mem;
      }
    },

    DateFormat(row) {
      if (row.stime !== 0) {
        return parseTime(row.stime);
      } else {
        return "-";
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  destroyed() {
    // 页面销毁时关闭ws连接
    if (this.websock) {
      this.websock.close();
    }
  },
};

// function getDashboard(params) {
//   return request({
//     url: "http://" + getIP() + ":8910/n_node/v1.0/sensor/seq",
//     method: "get",
//     params,
//   });
// }

function getMoniProcess() {
  // return request({
  //   url: "http://127.0.0.1:9081/manager/v1.0/process",
  //   method: "get",
  //   params,
  // });
}
</script>

<style  scoped>
.dashboard {
  &-container {
    margin: 15px;
  }
  &-text {
    font-size: 18px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.stat-info__item {
  display: flex;
  height: 50px;
  box-shadow: 2px 2px 5px #ccc;
}
.stat-info__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  color: white;
  [class*="el-icon"] {
    font-size: 50px;
  }
}
.stat-info__detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stat-info__total {
  color: #0085d0;
  font-size: 18px;
  font-weight: bold;
}
.stat-info__title {
  color: #666;
  font-size: 12px;
  padding-top: 8px;
}
</style>
