<template>
  <div id="date">
    <div v-for="item in testCases" :class="item.className">{{ item.data | date(...item.params) }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import TestBase from "../mixin/base-test";

@Component
export default class DateTest extends Mixins(TestBase) {
  public functionName: string = "date";
  public readonly testCases: Array<CheckItem> = [
    {
      className: "empty-val-undefined",
      data: undefined,
      params: [],
      description: `默认 {{ undefined | date }} 应该等于 ''`,
      result: ""
    },
    {
      className: "empty-val-null",
      data: null,
      params: [],
      description: `默认 {{ null | date }} 应该等于 ''`,
      result: ""
    },
    {
      className: "empty-val-string",
      data: "",
      params: [],
      description: `默认 {{ '' | date }} 应该等于 ''`,
      result: ""
    },
    {
      className: "test-year-uppercase",
      data: 1523169365575,
      params: ["YYYY"],
      description: `默认 {{ 1523169365575 | date('YYYY') }} 应该等于 2018`,
      result: "2018"
    },
    {
      className: "default",
      data: 1523169365575,
      params: [],
      description: `默认 {{ 1523169365575 | date }} 应该等于 2018/04/08 14:36:05 Sunday`,
      result: "2018/04/08 14:36:05 Sunday"
    },
    {
      className: "year",
      data: 1523169365575,
      params: ["yyyy"],
      description: `年 {{ 1523169365575 | date('yyyy') }} 应该等于 2018`,
      result: "2018"
    },
    {
      className: "month",
      data: 1523169365575,
      params: ["MM"],
      description: `月 {{ 1523169365575 | date('MM') }} 应该等于 04`,
      result: "04"
    },
    {
      className: "day",
      data: 1523169365575,
      params: ["dd"],
      description: `日 {{ 1523169365575 | date('dd') }} 应该等于 08`,
      result: "08"
    },
    {
      className: "hours-24",
      data: 1523169365575,
      params: ["HH"],
      description: `24小时制 {{ 1523169365575 | date('HH') }} 应该等于 14`,
      result: "14"
    },
    {
      className: "hours-12",
      data: 1523169365575,
      params: ["hh"],
      description: `12小时制 {{ 1523169365575 | date('hh') }} 应该等于 02`,
      result: "02"
    },
    {
      className: "minutes",
      data: 1523169365575,
      params: ["mm"],
      description: `分 {{ 1523169365575 | date('mm') }} 应该等于 36`,
      result: "36"
    },
    {
      className: "week",
      data: 1523169365575,
      params: ["EEE"],
      description: `星期 {{ 1523169365575 | date('EEE') }} 应该等于 Sunday`,
      result: "Sunday"
    },
    {
      className: "short-week",
      data: 1523169365575,
      params: ["EE"],
      description: `星期(简写) {{ 1523169365575 | date('EE') }} 应该等于 Sun`,
      result: "Sun"
    },
    {
      className: "week-cn",
      data: 1523169365575,
      params: ["EEE", "cn"],
      description: `星期(中文) {{ 1523169365575 | date('EEE','cn') }}  应该等于 星期日`,
      result: "星期日"
    },
    {
      className: "short-week-cn",
      data: 1523169365575,
      params: ["EE", "cn"],
      description: `星期(中文简写) {{ 1523169365575 | date('EE','cn') }}  应该等于 周日`,
      result: "周日"
    },
    {
      className: "customize",
      data: 1523169365575,
      params: [
        "EEE",
        {
          week: ["日", "一", "二", "三", "四", "五", "六"],
          shortWeek: [7, 1, 2, 3, 4, 5, 6]
        }
      ],
      description: `自定义星期  {{ 1523169365575 | date('EEE',{week:['日','一','二','三','四','五','六'],shortWeek:[7,1,2,3,4,5,6]}) }} 应该等于 日`,
      result: "日"
    },
    {
      className: "customize-short",
      data: 1523169365575,
      params: [
        "EE",
        {
          week: ["日", "一", "二", "三", "四", "五", "六"],
          shortWeek: [7, 1, 2, 3, 4, 5, 6]
        }
      ],
      description: `自定义星期(简写)  {{ 1523169365575 | date('EE',{week:['日','一','二','三','四','五','六'],shortWeek:[7,1,2,3,4,5,6]}) }}  应该等于 7`,
      result: "7"
    },
    {
      className: "string",
      data: "2018-04-08 14:36:05 Sunday",
      params: [],
      description: `测试苹果浏览器字符串日期 {{ '2018-04-08 14:36:05 Sunday' | date }} 应该等于 2018/04/08 14:36:05 Sunday`,
      result: "2018/04/08 14:36:05 Sunday"
    }
  ];
}
</script>

<style>
</style>
