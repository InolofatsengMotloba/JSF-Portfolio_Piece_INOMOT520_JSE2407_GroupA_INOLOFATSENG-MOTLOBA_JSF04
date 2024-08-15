<template>
  <div class="flex justify-center mt-16">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <form class="space-y-4">
        <!-- Username Input -->
        <div>
          <label for="username" class="block text-gray-700">Username:</label>
          <input
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
              id="password"
              name="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#381257] focus:border-[#381257] sm:text-sm"
            />
            <!-- Button to toggle the visibility -->
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              show
            </button>
          </div>
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#381257] hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>
