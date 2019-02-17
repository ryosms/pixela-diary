<template>
  <form novalidate class="md-layout md-gutter md-alignment-center">
    <md-card class="md-layout-item md-size-90">
      <md-card-header>
        <div class="md-title">New Graph</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-field>
              <label for="graph-id">ID</label>
              <md-input name="graph-id" id="graph-id"/>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-field>
              <label for="graph-name">Name</label>
              <md-input name="graph-name" id="graph-name"/>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-field>
              <label for="unit">Unit</label>
              <md-input id="unit" name="unit"/>
            </md-field>
          </div>


          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-field>
              <label for="type">Type</label>
              <md-select name="type" id="type">
                <md-option></md-option>
                <md-option value="int">int</md-option>
                <md-option value="float">float</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-100">
            <md-field>
              <label for="color">Color</label>
              <md-select name="color" id="color">
                <md-option></md-option>
                <md-option value="shibafu">shibafu</md-option>
                <md-option value="momiji">momiji</md-option>
                <md-option value="sora">sora</md-option>
                <md-option value="ichou">ichou</md-option>
                <md-option value="ajisai">ajisai</md-option>
                <md-option value="kuro">kuro</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending"/>

      <md-card-actions>
        <md-button type="submit" class="md-primary">Create Graph</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
  import Vue from 'vue';
  import {MdCard, MdField, MdButton, MdMenu, MdList, MdSnackbar} from 'vue-material/dist/components';

  Vue.use(MdCard);
  Vue.use(MdField);
  Vue.use(MdButton);
  Vue.use(MdMenu);
  Vue.use(MdList);
  Vue.use(MdSnackbar);

  export default {
    name: 'CreateGraph',
    data: () => ({
      sending: false,
    }),
  };
</script>

<style scoped>

</style>