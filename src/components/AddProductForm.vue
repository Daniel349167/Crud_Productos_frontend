<!-- src/components/AddProductForm.vue -->
<template>
    <div>
      <h2 class="my-5 text-center">Agregar Nuevo Producto</h2>
      <b-form @submit.prevent="submitForm">
        <b-row>
          <b-col md="6">
            <b-form-group
              label="Nombre:"
              label-for="name"
              :state="!errors.name"
              invalid-feedback="{{ errors.name }}"
            >
              <b-form-input
                id="name"
                v-model="product.name"
                :state="!errors.name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
  
          <b-col md="6">
            <b-form-group
              label="Precio:"
              label-for="price"
              :state="!errors.price"
              invalid-feedback="{{ errors.price }}"
            >
              <b-form-input
                id="price"
                type="number"
                step="0.01"
                v-model.number="product.price"
                :state="!errors.price"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col md="12">
            <b-form-group label="Descripción:" label-for="description">
              <b-form-textarea
                id="description"
                v-model="product.description"
                rows="3"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col md="6">
            <b-form-group
              label="Stock:"
              label-for="stock"
              :state="!errors.stock"
              invalid-feedback="{{ errors.stock }}"
            >
              <b-form-input
                id="stock"
                type="number"
                v-model.number="product.stock"
                :state="!errors.stock"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
  
        <!-- Fila de botones -->
            <b-row class="d-flex mt-5 align-items-center text-center">
            <b-col>
                    <b-button variant="secondary" @click="emitGoBack" style="margin-left: 3rem;">Volver</b-button>
                    <b-button
                        type="submit"
                        variant="success"
                        class="ml-2"
                        style="margin-left: 2rem;"
                    >
                        Agregar Producto
                    </b-button>
            </b-col>
            </b-row>

      </b-form>
  
      <b-alert v-if="successMessage" variant="success" show class="mt-3">
        {{ successMessage }}
      </b-alert>
      <b-alert v-if="submitError" variant="danger" show class="mt-3">
        {{ submitError }}
      </b-alert>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    name: 'AddProductForm',
    data() {
      return {
        product: {
          name: '',
          description: '',
          price: null,
          stock: null,
        },
        errors: {},
        successMessage: '',
        submitError: '',
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        let isValid = true;
  
        if (!this.product.name) {
          this.errors.name = 'El nombre es obligatorio.';
          isValid = false;
        }
  
        if (this.product.price === null || this.product.price <= 0) {
          this.errors.price = 'El precio debe ser un número positivo.';
          isValid = false;
        }
  
        if (this.product.stock === null || this.product.stock <= 0) {
          this.errors.stock = 'El stock debe ser un número positivo.';
          isValid = false;
        }
  
        return isValid;
      },
      async submitForm() {
        if (this.validateForm()) {
          try {
            await api.post('/products', this.product);
            this.successMessage = 'Producto agregado exitosamente.';
            this.submitError = '';
            // Limpiar el formulario
            this.product = {
              name: '',
              description: '',
              price: null,
              stock: null,
            };
            // Emitir evento para navegar de regreso
            this.$emit('product-added');
          } catch (err) {
            this.submitError = 'Error al agregar el producto.';
            console.error(err);
          }
        }
      },
      emitGoBack() {
        this.$emit('go-back');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si son necesarios */
  </style>
  