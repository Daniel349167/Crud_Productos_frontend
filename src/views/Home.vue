<template>
  <div class="container">
    <h2 class="text-center">Gestión de Productos</h2>
    <div class="d-flex justify-content-between align-items-center my-4" style="margin-bottom: 0px !important;"> <!-- Reducido el margen inferior -->
      <b-button variant="primary" @click="goToAddProduct" class="size-add">
        <i class="bi bi-plus align-middle mr-2 icon-size"></i>
        Agregar Producto
      </b-button>
    </div>
    <ProductTable />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ProductTable from '@/components/ProductTable.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductTable,
  },
  methods: {
    goToAddProduct() {
      this.$router.push('/add-product');
    },
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}

.icon-size {
  font-size: 1.3rem; /* Ajusta el tamaño del ícono según prefieras */
  vertical-align: middle; /* Alinear verticalmente el ícono con el texto */
}

.size-add {
  font-size: 14px;
}

/* Estilo para reducir el margen inferior */
.mb-2 {
  margin-bottom: 0.5rem; /* Ajusta este valor según lo que prefieras */
}
</style>
