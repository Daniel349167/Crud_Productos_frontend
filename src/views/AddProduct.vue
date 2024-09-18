<!-- src/views/AddProduct.vue -->
<template>
    <div class="container">
      <AddProductForm @product-added="goBack" @go-back="goBack" />
    </div>
  </template>
  
  <script>
  import AddProductForm from '@/components/AddProductForm.vue';
  
  export default {
    name: 'AddProductPage',
    components: {
      AddProductForm,
    },
    methods: {
      goBack() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  