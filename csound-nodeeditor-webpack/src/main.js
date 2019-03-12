/* eslint-disable indent, quotes, no-unused-vars, eqeqeq */
import Vue                  from 'vue';
// import NodeEditor         from './components/NodeEditor.vue';
import Linen                from './components/Linen.vue';
import VueCircleSlider      from 'vue-circle-slider';

Vue.config.productionTip = false;
Vue.use(VueCircleSlider);

var instance = new Vue({
  render: function (createElement) {
    return createElement('div',
        Array.apply(null, { length: 1 }).map(function () {
            return createElement(Linen)
        }));
  },
  mounted: function () {
  }
});

instance.$mount('#app');
