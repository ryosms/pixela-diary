<template>
  <div>{{ $route.params.graph_id }}</div>
</template>

<script>
  export default {
    name: 'EditDiary',
    created() {
      if (!this.$store.state.username || !this.$store.state.token) {
        this.$router.replace('/');
      }
    },
  };
</script>

<style scoped>

</style>