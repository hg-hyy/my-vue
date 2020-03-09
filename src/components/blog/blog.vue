<script>
// import mapActions from 'vuex'
import {mapActions} from 'vuex'
export default {
  props: {
    myData: Array
  },
  data() {
    return {
      models: [
        { id: 1, name: "hyy", password: "123" },
        { id: 2, name: "xujing", password: "456" },
        { id: 3, name: "fangmeng", password: "789" }
      ]
    };
  },
  methods:{
    ...mapActions(['increment']),
  },
  //   render: function(h) {
  //     return h(
  //       'h1',
  //       {
  //         class: {
  //           foo: true,
  //           bar: false
  //         },
  //         style: {
  //           color: 'blue',
  //           fontSize: '24px'
  //         }
  //       },
  //       this.myData
  //     )
  //   },
  render: function(createElement) {
    return createElement(
      "table",
      {
        attrs: {
          class:
            "table table-bordered table-hover table-condensed table-striped"
        }
      },
      [
        createElement("th", "标题1"),
        createElement("th", "标题2"),
        createElement("th", "标题3"),
        createElement("tr", [
          createElement("td", this.$slots.default),
          createElement("td", this.$slots.default),
          createElement("td", this.$slots.default)
        ])
      ]
    );
  }
};
</script>
