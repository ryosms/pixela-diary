<template>
  <div class="home">
    <UserToken/>
  </div>
</template>

<script>
  import {Component, Vue} from 'vue-property-decorator';
  import UserToken from '@/components/UserToken.vue'; // @ is an alias to /src

  @Component({
    components: {
      UserToken,
    },
  })
  export default class Home extends Vue {
  }
</script>
