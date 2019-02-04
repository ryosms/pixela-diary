<template>
  <div v-if="svg" class="md-layout">
    <div v-html="svg" class="md-layout-item md-size-100"></div>
    <span class="md-layout-item md-size-10"></span>
    <MdButton class="md-layout-item md-size-10 md-primary" @click="changeGraphDate(-30)">
      <md-icon class="md-size-2x">replay_30</md-icon>
    </MdButton>
    <div class="md-layout-item md-size-55">
    </div>
    <MdButton class="md-layout-item md-size-10 md-primary" @click="changeGraphDate(30)">
      <md-icon class="md-size-2x">forward_30</md-icon>
    </MdButton>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdButton} from 'vue-material/dist/components';
  import axios from 'axios';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';

  Vue.use(MdButton);

  export default {
    name: "PixelaGraph",
    props: {
      username: String,
      graphId: String,
      diaryDate: Date,
    },
    data: () => ({
      graphDate: new Date(Date.now()),
      svg: '',
    }),
    created() {
      this.loadSvg();
    },
    methods: {
      loadSvg() {
        const targetDate = this.graphDate.getFullYear()
          + ('0' + (this.graphDate.getMonth() + 1)).slice(-2)
          + ('0' + this.graphDate.getDate()).slice(-2);
        const url = `https://pixe.la/v1/users/${this.username}/graphs/${this.graphId}`;
        const params = {
          'date': targetDate,
          'mode': 'short',
        };
        axios.get(url, {params}).then((response) => {
          this.svg = response.data;
        }).then((ignore) => {
          this.setPixelEvent();
        });
      },
      setPixelEvent() {
        const self = this;
        const pixels = document.querySelectorAll('.each-day');
        tippy(pixels);
        for (let i = 0; i < pixels.length; i++) {
          const pixel = pixels[i];
          pixel.addEventListener('click', function () {
            self.pixelClicked(this);
          });
        }
      },
      pixelClicked(pixel) {
        this.clearActiveClass();
        this.$parent.diaryDate = new Date(Date.parse(pixel.dataset.date));
        pixel.classList.add('active');
      },
      clearActiveClass() {
        const pixels = document.querySelectorAll('.each-day.active');
        for (let i = 0; i < pixels.length; i++) {
          pixels[i].classList.remove('active');
        }
      },
      changeGraphDate(days) {
        this.graphDate.setDate(this.graphDate.getDate() + days);
        this.loadSvg();
      },
    }
  }
</script>

<style>
  .active {
    outline: -webkit-focus-ring-color auto 3px;
    outline-offset: -2px;
  }
</style>
