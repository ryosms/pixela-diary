<template>
  <div>
    <ul>
      <li v-for="graph in this.$store.state.graphs">
        {{ graph.name }}
      </li>
    </ul>
  </div>
  
</template>

<script>
  export default {
    name: 'GraphList',
    created() {
      if (this.$store.state.graphs.length === 0) {
        this.$router.replace('/');
      }
    },
  };
</script>

<style scoped>

</style>