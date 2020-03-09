<template>
  <div style="margin-top:20px">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="name"
          suffix-icon="el-icon-date"
          v-model="name"
        />
      </el-col>
      <el-col :span="4">
        <el-input placeholder="age" suffix-icon="el-icon-date" v-model="age" />
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="address"
          suffix-icon="el-icon-date"
          v-model="address"
        />
      </el-col>
      <el-col :span="2">
        <el-button type="sucess" @click="handleadd">Add</el-button>
      </el-col>
      <el-col :span="10">
        <p>
          Ask a question:
          <el-input v-model="question" style="width:30%" />
          {{ answer }}
        </p>
      </el-col>
    </el-row>
    <el-table
      :data="search ? handlesearch(search) : db[currentPage - 1]"
      style="width: 100%;margin:10px 0px"
      border
      max-height="690"
      highlight-current-row
    >
      :row-class-name="tableRowClassName" >
      <el-table-column prop="key" label="ID" width="50" />
      <el-table-column prop="name" label="姓名" width="180">
        <template v-slot="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="180" />

      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="address" label="地址" width="180" />
      <el-table-column prop="createdate" label="创建时间" />
      <el-table-column align="right">
        <template v-slot:header>
          <el-input v-model="search" placeholder="搜索" />
        </template>
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="end" type="flex">
      <el-col :span="12">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="pagesizes"
          :layout="layout"
          :total="total"
          :pager-count="pagercount"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'
const DB = []
for (let i = 1; i < 21; i++) {
  DB.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: +i,
    email: 'example@vue.com',
    address: `London Park no. ${i}`,
    createdate: new Date().toLocaleString()
  })
}
export default {
  data() {
    return {
      name: '',
      age: '',
      address: '',
      createdate: new Date().toLocaleString(),
      search: '',
      DB,
      db: [],
      pagesize: 5,
      pagesizes: [5, 10, 20, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper',
      currentPage: 1,
      pagercount: 5,
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    }
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else return 'success-row'
    },
    getAnswer: function() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark ?)'
        return
      }
      this.answer = 'Wait for when I am  try to Thinking...'
      axios
        .get('https://yesno.wtf/api')
        .then(res => {
          this.answer = lodash.capitalize(res.data.answer) //首字母大写
        })
        .catch(e => {
          this.answer = 'Error! Could not reach the API. ' + e
        })
    },
    pagination() {
      let num = 0
      this.db = []
      for (let i = 0; i < this.total; i++) {
        if (i % this.pagesize == 0 && i != 0) {
          this.db.push(this.DB.slice(num, i))
          num = i
        }
        if (i + 1 == this.DB.length) {
          this.db.push(this.DB.slice(num, i + 1))
        }
      }
      return this.db
    },
    handleadd() {
      var da = {
        key: this.DB.length + 1,
        name: this.name,
        age: this.age,
        email: 'example@vue.com',
        address: this.address,
        createdate: new Date().toLocaleString()
      }
      DB.push(da)
    },
    handlesearch(keywords) {
      return this.DB.filter(dt => !keywords || dt.name.includes(keywords))
    },
    handleEdit(index) {
      console.log(index)
    },
    handleDelete(index) {
      this.DB.splice(index, 1)
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
  computed: {
    total: function() {
      return this.DB.length
    }
  },
  watch: {
    total: function() {
      this.pagination()
    },
    pagesize: function() {
      this.pagination()
    },
    // 如果 `question` 发生改变，这个函数就会运行
    question: function(newQuestion, oldQuestion) {
      console.log(newQuestion, oldQuestion)
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created() {
    this.pagination()
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = lodash.debounce(this.getAnswer, 500)
  },
  mounted() {},
  beforeUpdate() {},
  updated() {}
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
