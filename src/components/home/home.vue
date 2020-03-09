<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-carousel :interval="4000" type="card" height="416px">
        <el-carousel-item v-for="item in images" :key="item">
          <!-- <img :src='item'> -->
          <el-image :src="item" :fit="fit"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="8" class="dashboard">
      <ul class="list-group">
        <li v-for="todo in todos" :key="todo.text" class="list-group-item">
          {{ todo.text }}
        </li>

        <li
          v-for="value in groceryList"
          :key="value.id"
          class="list-group-item"
        >
          {{ value.id }}{{ value.text }}
        </li>
        <li v-for="item in aa" :key="item.id" class="list-group-item">
          {{ item.message }}
        </li>
      </ul>
    </el-col>
    <el-col :span="8" class="dashboard">
      <el-table :data="posts">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="content" label="正文"> </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="8" class="dashboard">
      <el-card :body-style="{ padding: '0px' }">
        <!-- <el-image :src="img"/> -->
        <div class="lazy1">
          <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
        </div>
        <div style="padding: 14px;">
          <span>Angoles of AOA</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">AOA</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" class="dashboard">
      <el-row class="inputs">
        <el-col>
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="message"
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-col>
        <el-col>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="message"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-col>
        <el-col>
          <el-select v-model="mutiselected" multiple placeholder="请选择">
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            >
            </el-option> </el-select
        ></el-col>
        <el-col>
          <el-select v-model="selected" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col>
          <div class="block">
            <el-cascader
              v-model="value"
              :options="tabs"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </div>
        </el-col>
        <el-col>
          <el-checkbox-group v-model="checkedNames">
            <el-checkbox label="备选项1" border></el-checkbox>
            <el-checkbox label="备选项2" border></el-checkbox>
            <el-radio v-model="picked" label="one">one</el-radio>
            <el-radio v-model="picked" label="two">two</el-radio>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8" class="dashboard">
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-col>
    <el-col :span="8" class="dashboard">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="12" class="dashboard" :tab-position="tabPosition">
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="12">
      <!-- <blog :myData="items"/> -->
      <!-- <component :my-data="items" :is="currentView"></component> -->
      <blog><slot v-for="model in models" v-bind="model">{{model.id}}</slot></blog>
    </el-col>
  </el-row>
</template>
<script>
import blog from '../../components/blog/blog.vue'

export default {
  name: 'mains',
  components: {
    blog
  },
  props: {
    msg: { type: String, default: 'test msg' }
  },
  methods: {
    reversedMessage1: function() {
      return this.msg
        .split('')
        .reverse()
        .join('')
    },
    fullname: function() {
      return this.fristname + '-----' + this.lastname
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    handleChange() {
      return false
    },
    load() {
      this.count += 1
    }
  },
  computed: {
    reversedMessage: function() {
      return this.msg
        .split('')
        .reverse()
        .join('')
    }
  },
  data() {
    const r = require.context('../../assets/images/home', true, /^\.\/.*\.png$/)
    const images = r.keys().map(r)
    return {
      currentDate: new Date(),
      message: 'hello, world!',
      aa: [{ message: 'hello' }, { message: 'world' }],
      checked: false,
      value: '',
      items: [1, 2, 3, 4],
      currentView: blog,
      fit: 'cover',
      images: images,
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      img: require('../../assets/images/xiezhen/3.jpg'),
      drawer: false,
      direction: 'rtl',
      count: 7,
      checkedNames: [],
      picked: '',
      tabPosition: 'left',
      selected: '',
      mutiselected: [],
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ],
      tips: '页面加载：' + new Date().toLocaleString(),

      seen: true,
      todos: [{ text: '学习java' }, { text: '学习pgp' }, { text: '学习c#' }],
      groceryList: [
        { id: 'one', text: '蔬菜' },
        { id: 'two', text: '奶酪' },
        { id: 'three', text: '随便其它什么人吃的东西' }
      ],
      rawHtml: '<span style="color:red">this should bu red</span>',
      fristname: 'hello',
      lastname: 'world',
      posts: [
        { id: 1, title: 'My journey with Vue', content: 'hahahhah' },
        { id: 2, title: 'Blogging with Vue', content: 'hehehhehehe' },
        { id: 3, title: 'Why Vue is so fun', content: 'heiheiheiehie' }
      ],
      postFontSize: 1,
      models: [
        { id: 1, name: 'hyy', password: '123' },
        { id: 2, name: 'xujing', password: '456' },
        { id: 3, name: 'fangmeng', password: '789' }
      ],
      tabs: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            }
          ]
        }
      ]
    }
  },
}
</script>
<style scoped>
.lazy1 {
  width: 800px;
  height: 500px;
  overflow: scroll;
}
.dashboard {
  margin-top: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
