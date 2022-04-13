<template>
  <div>
    <b-table :items="items"> <!-- :busy="isBusy" class="mt-3" outlined> -->
      <!-- <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template> -->
    </b-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useAlertsStore } from '@/store/alertsStore';

export default defineComponent({
  name: "AlertsView",
  components: {},

  data() {
    return {
      items: ""
    }
  },

  mounted() {
    const authStore = useAuthStore()
    const alertsStore = useAlertsStore()

    alertsStore.getAlerts(authStore.userToken)
      .then(() => {
        let resItems = []
        alertsStore.alerts.forEach(alert => {
          resItems.push({
            Name: alert.name,
            Type: alert.type,
            Price: alert.price,
            Status: alert.status
          })
        })
        this.items = resItems
      })
      .catch(e => {
        console.error(e)
      })
  }
});
</script>
