<template>
<div id="rade-table">
    <div class="table-responsive">
      <table class="table table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Birthday</th>
            <th style="width: 148px;">Action</th>
          </tr>
        </thead>

        <tbody>
          <Customer
            v-for="customer in laravelData.data"
            :key="customer.id"
            :customer="customer"
            @onDelete="onDelete"
            @onEdit="onEdit"
          />
        </tbody>
      </table>
      <pagination
        :data="laravelData" @pagination-change-page="getCustomers"
      ></pagination>
    </div>
</div>
</template>
<script>
import Customer from "./Customer";
export default {
  name: "CustomerList",
  components: {
    Customer
  },
  props: {
    laravelData: {
      type: Array
    }
  },
  
  methods: {

    onDelete(id) {
      // window.console.log("customer list delete " + id);
      this.$emit("onDelete", id);
    },
    onEdit(data) {
      // window.console.log("customer list edit " + data);
      this.$emit("onEdit", data);
    }
  }
};
</script>

<style scoped></style>
