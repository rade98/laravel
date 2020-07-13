<template>
<div class="rade-form">
    <form class="row">
        <div class="col">
          <label>First Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
            placeholder="First Name"
            @change="handleChange"
            :value="form.name"
          />
        </div>

        <div class="col">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            class="form-control"
            placeholder="Last Name"
            @change="handleChange"
            :value="form.lastname"
          />
        </div>

        <div class="col">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            class="form-control"
            placeholder="088871110"
            @change="handleChange"
            :value="form.phoneNumber"
          />
        </div>

        <div class="col">
          <label>Date of birth</label>
          <input
            type="date"
            name="birthday"
            class="form-control"
            @change="handleChange"
            :value="form.birthday"
          />
        </div>

        <div class="col position">
          <button :class="btnClass" @click="onFormSubmit">
            {{ btnName }}
          </button>
        </div>
    </form>
</div>
</template>

<script>
export default {
  name: "MyForm",
  data() {
    return {
      btnName: "Save",
      btnClass: "btn rade-button-success"
    };
  },
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    handleChange(event) {
      const { name, value } = event.target;
      let form = this.form;
      form[name] = value;
      this.form = form;
    },
    onFormSubmit(event) {
      // prevent form submit
      event.preventDefault();

      // form validation
      if (this.formValidation()) {
        // window.console.log("ready to submit");
        this.$emit("onFormSubmit", this.form);

        // change the button to save
        this.btnName = "Save";
        this.btnClass = "btn rade-button-success";

        // clear form fields
        this.clearFormFields();
      }
    },
    formValidation() {
      // first name
      if (document.getElementsByName("name")[0].value === "") {
        alert("Enter first name");
        return false;
      }

      // last name
      if (document.getElementsByName("lastname")[0].value === "") {
        alert("Enter last name");
        return false;
      }

      // email
      if (document.getElementsByName("phoneNumber")[0].value === "") {
        alert("Enter phone number");
        return false;
      }

      if (document.getElementsByName("birthday")[0].value === "") {
        alert("Enter birthday");
        return false;
      }

      return true;
    },
    clearFormFields() {
      // clear form data
      this.form.name = "";
      this.form.lastname = "";
      this.form.phoneNumber = "";
      this.form.birthday = "";
      this.form.isEdit = false;

      // clear form fields
      document.querySelector(".form").reset();
    }
  },
  updated() {
    if (this.form.isEdit) {
      this.btnName = "Update";
      this.btnClass = "btn rade-button-edit";
    }
  }
};
</script>

<style scoped></style>
