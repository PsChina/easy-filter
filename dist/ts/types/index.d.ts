import Vue from 'vue';
import './vue';

type NumberDate = number | string;
type WeekConfig = 'cn' | 'en' | DateOption;
type DateData = NumberDate | Date;

interface CurrencyOption {
  [key: string]: any;
  symbolOnLeft: boolean;
  separator: string;
  addSpace: boolean;
  pad: boolean;
  round: boolean;
}

interface DateOption {
  [key: string]: string[];
  week: string[];
  shortWeek: string[];
}

interface DateOptions {
  [key: string]: DateOption;
  cn: DateOption;
  en: DateOption;
}

type Comparator = (item1: any, item2: any, key: string, reverse?: boolean) => number;

type MatchFunction = (val: any) => boolean;

type Match = string | MatchFunction;

interface MatchRules {
   match: Match;
   ignore?: string[] | string;
}

interface SignOption {
  zero: string;
}

type Sign = SignOption | boolean;
interface NumberOptions {
  round?: boolean;
  pad?: boolean;
  sign?: Sign;
  separator?: string;
}

interface LimitToOption {
  startWithIndex: number;
  startWith?: any;
  ignore?: string | RegExp;
  cutOut?: boolean;
}

type FilterOptions = MatchRules | Match | RegExp;

export function install(vue: typeof Vue): void;

export declare interface EasyFilter {

  currency(input: NumberDate, symbol?: string, digits?: number, options?: CurrencyOption ): string;

  date(input: DateData, formatMode?: string, option?: WeekConfig): DateData;

  orderBy(input: any[],
          expression?: Comparator | string,
          reverse?: boolean,
          comparator?: Comparator | string,
          ): any[];

  filter(input: any, matchOptions?: FilterOptions): any;
  
  number(
    input: NumberDate,
    digits?: number,
    options?: NumberOptions,
  ): string;

  limitTo(
    input: number | string | any[],
    limit?: number,
    option?: LimitToOption,
  ): string | number | any[]

  uppercase(input: string, start?: number, end?: number): string

  lowercase(input: string, start?: number, end?: number): string
}
