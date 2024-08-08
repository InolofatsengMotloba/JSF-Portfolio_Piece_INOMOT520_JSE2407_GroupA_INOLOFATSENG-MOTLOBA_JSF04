<template>
  <div>
    <div v-if="error">
      <Error />
    </div>
    <div v-else-if="product">
      <div class="grid m-10 space-y-5">
        <a>
          <button
            @click="goBack"
            class="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Back
          </button>
        </a>
        <div
          class="flex flex-col items-center bg-white border-2 border-gray-500 p-4"
        >
          <img
            class="object-contain h-48 mt-3 mb-3"
            :src="product.image"
            :alt="product.title"
          />
          <h1
            class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600"
          >
            {{ product.title }}
          </h1>
          <p class="mt-2 text-center text-gray-700 mb-3">
            {{ product.description }}
          </p>
          <h2
            class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug mb-3"
          >
            $ {{ product.price }}
          </h2>
          <div class="justify-start flex-1 mt-2 mb-3">
            <span
              class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
              >{{ product.category }}</span
            >
          </div>
          <p class="mt-2 text-gray-700 mb-3">⭐ {{ product.rating?.rate }}</p>
          <p class="mt-1 text-gray-700 mb-3">
            Reviews: {{ product.rating?.count }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center p-5">
      <LoadingCard />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchSingleProduct } from "../api/api";
import { useProductStore } from "../store/productStore";
import LoadingCard from "../components/LoadingCard.vue";
import Error from "../components/Error.vue";

export default {
  name: "ProductDetailView",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  components: {
    LoadingCard,
    Error,
  },
  setup(props) {
    const product = ref(null);
    const error = ref(null);
    const route = useRoute();
    const router = useRouter();
    const productStore = useProductStore();

    /**
     * Fetches the product details from the API based on the product ID
     * Updates the product ref or sets an error message if the fetch fails
     *
     * @async
     * @function getProduct
     * @returns {Promise}
     */
    const getProduct = async () => {
      const { response, error: fetchError } = await fetchSingleProduct(
        props.id
      );
      if (fetchError) {
        error.value = fetchError.message;
      } else {
        product.value = response;
      }
    };

    onMounted(() => {
      getProduct();
    });

    /**
     * Navigates back to the home page
     *
     * @function goBack
     */
    const goBack = () => {
      router.push("/");
    };

    return {
      product,
      error,
      goBack,
    };
  },
};
</script>

<style scoped></style>
