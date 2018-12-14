/* eslint-disable indent, quotes, no-unused-vars, eqeqeq */
import Vue                from 'vue';
import NodeEditor         from './components/NodeEditor.vue';

Vue.config.productionTip = false

var instance = new Vue({
  render: h => h(NodeEditor),
  mounted: function () {
  }
});

instance.$mount('#app');
