import { Vue, Component } from 'vue-property-decorator';

@Component
class Base extends Vue {
  public beforeCreate(): void {
    if (window.loadMoreThanOnce) {
      window.location.reload();
    }
  }
  public setLoad(): void {
    window.loadMoreThanOnce = true;
  }
}

export default Base;
