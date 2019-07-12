import { EasyFilter } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $easyFilter: EasyFilter;
  }
  
  interface VueConstructor {
    easyFilter: EasyFilter;
  }
}
