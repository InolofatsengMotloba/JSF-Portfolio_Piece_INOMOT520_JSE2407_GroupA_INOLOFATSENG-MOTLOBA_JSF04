<template>
  <div class="flex justify-center mt-16">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4 text-slate-600 text-center">LOG IN</h1>
      <P class="mb-4 text-gray-500 text-center"
        >Enter your username and password to log in to your account</P
      >
      <form @submit.prevent="login" class="space-y-4">
        <!-- Username Input -->
        <div>
          <label for="username" class="block text-gray-700">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#381257] focus:border-[#381257] sm:text-sm"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-gray-700">Password:</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#381257] focus:border-[#381257] sm:text-sm"
            />
            <!-- Button to toggle the visibility -->
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {{ showPassword ? "hide" : "show" }}
            </button>
          </div>
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#381257] hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Login
          </button>
        </div>

        <p v-if="isSubmitting" class="text-gray-600 text-center">
          Authenticating...
        </p>
        <p v-if="errorMessage" class="text-red-600 text-center">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="text-green-600 text-center">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const isSubmitting = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
      if (!username.value || !password.value) {
        errorMessage.value = "Username and password are required.";
        return;
      }

      isSubmitting.value = true;
      errorMessage.value = "";
      successMessage.value = "";

      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const json = await response.json();
        if (json.token) {
          localStorage.setItem("authToken", json.token); // Store JWT
          store.commit("setAuth", json.token);

          // Notify user of successful login
          successMessage.value = "Login successful! Redirecting...";

          // Redirect to the previously intended route or to home
          const redirectPath = route.query.redirect || "/";
          setTimeout(() => {
            router.push(redirectPath);
          }, 1000);
        } else {
          errorMessage.value = "Login failed. Please check your credentials.";
        }
      } catch (error) {
        errorMessage.value = error.message;
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        alert("You are already logged in.");
        router.push("/");
      }
    });

    return {
      username,
      password,
      showPassword,
      isSubmitting,
      errorMessage,
      successMessage,
      togglePasswordVisibility,
      login,
    };
  },
};
</script>
