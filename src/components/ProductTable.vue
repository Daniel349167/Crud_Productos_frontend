<template>
  <div>
    <!-- Mostrar mensaje de error si lo hay -->
    <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>

    <!-- Mostrar spinner mientras los productos están cargando, centrado -->
    <div v-if="loading" class="loading-spinner-container">
      <b-spinner label="Cargando..."></b-spinner>
    </div>

    <!-- Mostrar la tabla solo si los productos están cargados y hay productos disponibles -->
    <b-table
      v-if="!loading && products.length > 0"
      striped
      hover
      :items="products"
      :fields="fields"
      responsive="sm"
      class="mt-3"
    >
      <!-- Columna de Nombre, alineada a la izquierda -->
      <template #cell(name)="data">
        <span class="pl-2">{{ data.item.name }}</span>
      </template>

      <!-- Columna de Descripción, alineada a la izquierda -->
      <template #cell(description)="data">
        <span class="pl-2">{{ data.item.description }}</span>
      </template>

      <!-- Columna de Precio, centrada -->
      <template #cell(price)="data">
        <span class="text-center">{{ formatCurrency(data.item.price) }}</span>
      </template>

      <!-- Columna de Stock, centrada -->
      <template #cell(stock)="data">
        <span class="text-center">{{ data.item.stock }}</span>
      </template>

      <!-- Columna de Acciones, centrada -->
      <template #cell(actions)="data">
        <b-button
          size="sm"
          variant="warning"
          @click="editProduct(data.item.id)"
          style="margin-right: 0.5em;"
        >
          Editar
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          class="ml-2"
          @click="confirmDelete(data.item)"
        >
          Eliminar
        </b-button>
      </template>
    </b-table>

    <!-- Mostrar mensaje cuando no hay productos (después de la carga y sin errores) -->
    <p v-if="!loading && products.length === 0 && !error" class="text-center mt-3">
      No hay productos disponibles.
    </p>

    <!-- Modal de Confirmación -->
    <b-modal
      id="modal-confirm-delete"
      v-model="isDeleteModalVisible"
      title="Confirmar Eliminación"
      hide-footer
    >
      <div v-if="productToDelete">
        <p>
          ¿Estás seguro de que deseas eliminar el producto
          <strong>{{ productToDelete.name }}</strong>?
        </p>
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>

      <!-- Personalización del pie del modal -->
      <div class="modal-footer" style="padding-bottom: 0px;"> <!-- Se fuerza la personalización del footer -->
        <b-button variant="secondary" @click="isDeleteModalVisible = false">Cancelar</b-button>
        <b-button variant="danger" @click="deleteProduct">Ok</b-button> <!-- Botón rojo para "Eliminar" -->
      </div>
    </b-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default defineComponent({
  name: 'ProductTable',
  setup() {
    const router = useRouter();
    const products = ref([]);
    const error = ref(null);
    const loading = ref(true); // Estado de carga
    const productToDelete = ref(null);
    const isDeleteModalVisible = ref(false); // Controlar la visibilidad del modal con v-model

    const fields = [
      { key: 'name', label: 'Nombre' },
      { key: 'description', label: 'Descripción' },
      { key: 'price', label: 'Precio' },
      { key: 'stock', label: 'Stock' },
      { key: 'actions', label: 'Acciones' },
    ];

    async function fetchProducts() {
      loading.value = true;
      try {
        const response = await api.get('/products');
        products.value = response.data;
        error.value = null;
      } catch (err) {
        products.value = [];
        error.value = 'Error al cargar los productos.';
        console.error(err);
      } finally {
        loading.value = false; // Terminó la carga, se apaga el spinner
      }
    }

    function formatCurrency(value) {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return '$0.00';
      }
      return `$${numericValue.toFixed(2)}`;
    }

    function editProduct(id) {
      router.push({ name: 'EditProduct', params: { id } });
    }

    function confirmDelete(product) {
      productToDelete.value = product;
      isDeleteModalVisible.value = true; // Mostrar el modal
    }

    async function deleteProduct() {
      try {
        await api.delete(`/products/${productToDelete.value.id}`);
        await fetchProducts();
        isDeleteModalVisible.value = false; // Ocultar el modal tras eliminar
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();

    return {
      products,
      error,
      loading, // Agregado para controlar el estado de carga
      fields,
      formatCurrency,
      editProduct,
      confirmDelete,
      deleteProduct,
      isDeleteModalVisible, // Variable para gestionar la visibilidad del modal
      productToDelete,
    };
  },
});
</script>

<style>
.mt-3 {
  margin-top: 1rem;
}

.text-center {
  text-align: center; /* Centrar el texto en las filas de la tabla */
}

.pl-2 {
  padding-left: 2rem; /* Agregar padding a la izquierda solo a las columnas de Nombre y Descripción */
}

.b-table thead th {
  text-align: center; /* Centrar los encabezados de la tabla */
}

/* Centrar el texto de las columnas de precio, stock y acciones */
.b-table tbody td:nth-child(3),
.b-table tbody td:nth-child(4),
.b-table tbody td:nth-child(5) {
  text-align: center;
}

/* Estilo para centrar el spinner de carga */
.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Ocupa la mayor parte de la pantalla */
}
</style>
