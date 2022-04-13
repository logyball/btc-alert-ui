<template>
  <div class="home">
    <img width="200" height="200" alt="BTC logo" src="../assets/btc.png">
    <img width="200" height="200" alt="Money logo" src="../assets/money.png">
    <img width="200" height="200" alt="Alert logo" src="../assets/alert.png">
    <HelloWorld msg="BTC Alerter Dude"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
