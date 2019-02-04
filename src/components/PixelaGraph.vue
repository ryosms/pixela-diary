<template>
  <div v-if="svg" v-html="svg"></div>
</template>

<script>
  import axios from 'axios';

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
          this.setClickEvent();
        });
      },
      setClickEvent() {
        const self = this;
        const pixels = document.querySelectorAll('.each-day');
        for (let i = 0; i < pixels.length; i++) {
          pixels[i].addEventListener('click', function() { self.pixelClicked(this);});
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
    }

  }
</script>

<style>
  .active {
    outline: -webkit-focus-ring-color auto 3px;
    outline-offset: -2px;
  }
</style>
