import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Button, Form, FormItem, Row, Input, Card, Container,Aside,Menu,Submenu,MenuItem,MenuItemGroup,Header,Dropdown,DropdownItem,DropdownMenu,Table,Main,TableColumn,RadioGroup,RadioButton} from 'element-ui';

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Row.name, Row);
Vue.component(Input.name, Input);
Vue.component(Card.name, Card);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Header.name, Header);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Table.name, Table);
Vue.component(Main.name, Main);
Vue.component(TableColumn.name, TableColumn);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
