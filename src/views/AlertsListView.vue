<template>
  <table-lite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="table.isLoading = false"
  ></table-lite>
</template>

<script>
import TableLite from 'vue3-table-lite';
import { defineComponent, reactive } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useAlertsStore } from '@/store/alertsStore';

export default defineComponent({
  name: "AlertsView",
  components: { TableLite },
  setup() {
    const authStore = useAuthStore()
    const alertsStore = useAlertsStore()

    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: false,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Type",
          field: "type",
          width: "15%",
          sortable: true,
        },
        {
          label: "Price",
          field: "price",
          width: "15%",
          sortable: true,
        },
        {
          label: "Status",
          field: "status",
          width: "15%",
          sortable: true,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
          order: 'name',
          sort: 'asc'
      },
    });

    const doSearch = (offset, limit, order, sort, init) => {
        table.isLoading = true
        table.rows = [];


        alertsStore.getAlerts(authStore.userToken)
            .then(() => {
                let counter = 0;
                alertsStore.alerts.every(alert => {
                    if (counter >= offset) {
                        table.rows.push({
                            id: alert._id,
                            name: alert.name,
                            type: alert.type,
                            price: alert.price,
                            status: alert.status,
                        })
                    }
                    counter += 1
                    return (table.rows.length < limit)
                })

                table.rows.sort((a, b) => {
                    if (sort == 'asc') {
                      return (a[order] > b[order]) ? 1 : -1
                    }
                    return (a[order] > b[order]) ? -1 : 1
                })

                table.isLoading = false
                table.sortable.order = order;
                table.sortable.sort = sort;
                if (init) {
                    table.totalRecordCount = alertsStore.alerts.length
                }
            })
            .catch(e => {
                console.error(e)
            })
    }

    doSearch(0, 10, 'name', 'asc', true)

    return {
      table,
      doSearch
    };
  },
});
</script>
