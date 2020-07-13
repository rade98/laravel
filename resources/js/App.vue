<template>
  <div id="app">

    <div class="container">
      <MyForm :form="form" @onFormSubmit="onFormSubmit" />
      <Loader v-if="loader" />
      <CustomerList
        :customers="customers"
        @onDelete="onDelete"
        @onEdit="onEdit"
      />

    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyForm from "./components/MyForm";
import CustomerList from "./components/CustomerList";
import Loader from "./components/Loader";

export default {
  name: "App",
  components: {
    MyForm,
    CustomerList,
    Loader
  },
  data() {
    return {
      url: "http://localhost:8000/api/leads",
      leads: [],
      laravelData: {},
      form: { name: "", lastname: "", phoneNumber: "", birthday: "", isEdit: false },
      loader: false
    };
  },
  mounted() {
        // Fetch initial results
        this.getCustomers();
    },
  methods: {
    
    getCustomers(page) {
      this.loader = true;
      if (typeof page === 'undefined') {
          page = 1;
      }
      axios.get('http://localhost:8000/api/leads?page=' + page).then(data => {
        this.laravelData = data.data; 
        this.loader = false;
      });
    },
    
    deleteCustomer(id) {
      this.loader = true;

      axios
        .delete(`${this.url}/${id}`)
        .then(() => {
          this.getCustomers();
        })
        .catch(e => {
          alert(e);
        });
    },
    createCustomer(data) {
      this.loader = true;

      axios
        .post(this.url, {
          name: data.name,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
          birthday: data.birthday
        })
        .then(() => {
          this.getCustomers();
        })
        .catch(e => {
          alert(e);
        });
    },
    editCustomer(data) {
      this.loader = true;

      axios
        .put(`${this.url}/${data.id}`, {
          name: data.name,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
          birthday: data.birthday
        })
        .then(() => {
          this.getCustomers();
        })
        .catch(e => {
          alert(e);
        });
    },
    onDelete(id) {
      // window.console.log("app delete " + id);

      this.deleteCustomer(id);
    },
    onEdit(data) {
      // window.console.log("app edit ", data);

      this.form = data;
      this.form.isEdit = true;
    },
    onFormSubmit(data) {
      // window.console.log("app onFormSubmit", data);

      if (data.isEdit) {
        // call edit customer
        this.editCustomer(data);
      } else {
        // call create customer
        this.createCustomer(data);
      }
    }
  },
  created() {
    this.getCustomers();
  }
};
</script>

<style>
body{
  background: #181818;
}
.rade-form{
  margin: 20px;
  padding: 30px;
  border: 2px solid rgba(44,52,64, 0.7);
    border-radius: 60px;
    box-shadow: 
      -12px -12px 12px 0 rgba(255,255,255,0.01),
      12px 12px 12px 0 rgba(0,0,0,0.15);
}
label{
  color: rgb(116, 119, 124);
}
.form-control{
  border: 2px solid rgba(44,52,64, 0.7);
  background: transparent;
  border-radius: 20px;
  color: #fff;
}
.position{
  position: relative;
  margin-top: 30px;
}
.rade-button-success{
  background: #53cbf1;
  color: #fff;
  width: 100px;
  border-radius: 20px;
}
.rade-button-edit{
 background: #53cbf1;
 color: #fff;
  width: 100px;
  border-radius: 20px;
}
.rade-button-rounded-edit{
 background: #53cbf1;
 color: #fff;
  border-radius: 100%;
}
.rade-button-rounded-delete{
 background: #f5222d;
 color: #fff;
  border-radius: 100%;
}
.table-dark{
  background-color: transparent;
}
#rade-table{
  border-radius: 25px !important;
  border: 2px solid rgba(44,52,64, 0.7);
    border-radius: 60px;
    box-shadow: 
      -12px -12px 12px 0 rgba(255,255,255,0.01),
      12px 12px 12px 0 rgba(0,0,0,0.15);
  width: 100%;  /*Tested and working as expected: */
  margin: 0px auto;
  float: none;
}
thead{
    border-top: hidden;
}
tr{
  line-height: 50px;
}

</style>
