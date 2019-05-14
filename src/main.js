/* eslint-disable indent, quotes, no-unused-vars, eqeqeq */
import Vue                  from 'vue';
import Editor               from './components/Editor.vue';
import VueCircleSlider      from 'vue-circle-slider';
import Vuetify              from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(VueCircleSlider);
Vue.use(Vuetify);

var instance = new Vue({
  render: function (createElement) {
    return createElement('div',
        [
            createElement(Editor)
        ]);
  },
  mounted: function () {
  }
});

instance.$mount('#app');
