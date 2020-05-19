<template>
  <v-app>
    <div class="root">
      <KakeiboooAppBar/>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import KakeiboooAppBar from '@/components/KakeiboooAppBar.vue';

@Component({
  components: {
    KakeiboooAppBar,
  }
})
export default class App extends Vue {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

.root {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: "column";
  background: #FFFFFF;
}
</style>