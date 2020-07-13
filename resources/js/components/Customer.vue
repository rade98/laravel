<template>
  <tr>
    <td>{{ customer.id }}</td>
    <td>{{ customer.name }} {{ customer.lastname }}</td>
    <td>{{ customer.phoneNumber }}</td>
    <td>{{ customer.birthday }}</td>
    <td>
      <button class="btn rade-button-rounded-edit" @click="onEdit"><i class='far fa-edit'></i></button>
      <button class="btn rade-button-rounded-delete" @click="onDelete"><i class='far fa-trash-alt'></i></button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Customer",
  props: {
    customer: {
      type: Object
    }
  },
  methods: {
    onDelete() {
      // window.console.log("customer delete " + this.customer.id);
      this.$emit("onDelete", this.customer.id);
    },
    onEdit() {
      // window.console.log("customer edit " + this.customer.id);
      this.$emit("onEdit", this.customer);
    }
  }
};
</script>

<style scoped></style>
