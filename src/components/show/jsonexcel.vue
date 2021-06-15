<template>
  <div id="app">
    <hr />
    <h2>Fetch Example</h2>
    <downloadexcel
      class="btn"
      :fetch="fetchData"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="test.xlsx"
      :before-generate="startDownload"
      :before-finish="finishDownload"
    >
      Download Excel
    </downloadexcel>
  </div>
</template>
  
  <script>
import downloadexcel from "vue-json-excel";
// import downloadexcel from "../../api/vue-json-excel.esm";
import axios from "axios";

export default {
  name: "App",
  components: {
    downloadexcel,
  },
  data() {
    return {
      json_fields: {
        "Complete name": "name",
        Date: "date",
      },
    };
  }, //data
  methods: {
    async fetchData() {
      const response = await axios.get(
        "http://127.0.0.1:8002/d_sysop/v1.0/netConf"
      );
      return response.data.data;
    },
    startDownload() {
      alert("show loading");
    },
    finishDownload() {
      alert("hide loading");
    },
  },
};
</script>
  
  