import CurrencyTest from '../components/currency.vue';
import DateTest from '../components/date.vue';

export default [
  { path: '/currency', component: CurrencyTest, meta: { keepAlive: true} },
  { path: '/date', component: DateTest, meta: { keepAlive: true} },
];
