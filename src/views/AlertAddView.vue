<template>
  <b-card>
    <div>
      <b-form @submit.prevent="submit">
        <b-form-group
          id="name-alert-input-group"
          label="Enter Name of Alert:"
          label-for="name-input"
        >
          <b-form-input
            id="name-input"
            v-model="form.name"
            placeholder="name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group 
          id="price-input-group" 
          label="Enter Price:" 
          label-for="price-input">
          <b-form-input
            id="price-input"
            v-model="form.price"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-radio-group 
          v-model="form.minOrMax" 
          :options="[{text: 'min', value: 'MIN'}, {text: 'max', value: 'MAX'}]" 
          name="min-or-max">
        </b-form-radio-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </b-card>
</template>

<script>
import { useAlertsStore } from '@/store/alertsStore';
import { useAuthStore } from '@/store/authStore';

export default {
  name: "AlertsAddView",
  components: {},
  setup() {
    const alertsStore = useAlertsStore()
    const authStore = useAuthStore()

    return {
      alertsStore,
      authStore
    }
  },

  data() {
    return {
      form: {
        minOrMax: "",
        name: "",
        price: 0
      },
    }
  },
  
  methods: {
    submit() {
      this.alertsStore.submitNewAlert({
        token: this.authStore.userToken,
        minOrMax: this.form.minOrMax,
        name: this.form.name,
        price: this.form.price
      })
    }
  }
};
</script>