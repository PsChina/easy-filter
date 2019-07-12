import CurrencyTest from '../components/currency.vue';
import DateTest from '../components/date.vue';
import OrderByTest from '../components/orderBy/index.vue';
import OrderByDefaultTest from '../components/orderBy/orderByDefault.vue';
import OrderByCustomizeFuncTest from '../components/orderBy/orderByCustomizeFunc.vue';

export default [
  { path: '/currency', component: CurrencyTest, meta: { keepAlive: true} },
  { path: '/date', component: DateTest, meta: { keepAlive: true} },
  { path: '/orderby', component: OrderByTest, meta: { keepAlive: true}, children: [
    {
      path: 'default',
      component: OrderByDefaultTest,
    },
    {
      path: 'customize-func',
      component: OrderByCustomizeFuncTest,
    },
  ] },
];
