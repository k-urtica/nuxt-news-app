<template>
  <v-snackbar v-model="snackBar" :timeout="3000" color="success">
    {{ message }}
    <v-btn @click="snackBar = false" text>閉じる</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
      required: true
    }
  },
  computed: {
    snackBar: {
      get() {
        return this.$store.state.snackBar;
      },
      set(val) {
        this.$store.commit("setSnackBar", val);
      }
    }
  }
};
</script>
