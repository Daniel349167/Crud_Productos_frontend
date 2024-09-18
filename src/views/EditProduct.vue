<template>
  <div class="container">
    <EditProductForm :productId="id" @go-back="goBack" @product-updated="goBack" />
  </div>
</template>

<script>
import EditProductForm from '@/components/EditProductForm.vue';

export default {
  name: 'EditProduct',
  components: {
    EditProductForm,
  },
  props: ['id'],
  methods: {
    goBack() {
      this.$router.push('/'); // Navega de regreso a la página de inicio
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
