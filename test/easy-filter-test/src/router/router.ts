import CurrencyTest from '../components/currency.vue';
import DateTest from '../components/date.vue';
import OrderByTest from '../components/orderBy/index.vue';
import OrderByDefaultTest from '../components/orderBy/orderByDefault.vue';
import OrderByCustomizeFuncTest from '../components/orderBy/orderByCustomizeFunc.vue';
import FilterTest from '../components/filter.vue';
import NumberTest from '../components/number.vue';
import LimitToTest from '../components/limitTo.vue';

export default [
  { path: '/currency', component: CurrencyTest },
  { path: '/date', component: DateTest },
  { path: '/orderby', component: OrderByTest, children: [
    {
      path: 'default',
      component: OrderByDefaultTest,
    },
    {
      path: 'customize-func',
      component: OrderByCustomizeFuncTest,
    },
  ] },
  {
    path: '/filter', component: FilterTest,
  },
  {
    path: '/number', component: NumberTest,
  },
  {
    path: '/limitTo', component: LimitToTest,
  },
];
