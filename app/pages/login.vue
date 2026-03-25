<script setup lang="ts">
definePageMeta({ middleware: 'guest' });

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const { handleLogin } = useAuth();

const onSubmit = async () => {
  const result = await handleLogin(email.value, password.value);
  if (!result.success) {
    errorMessage.value =
      result.error ?? 'An unexpected error occurred. Please try again.';
    return;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 sm:p-6" style="background-color: #1A1F24;">
    <div class="w-full max-w-xs sm:max-w-sm md:max-w-md">

      <div class="flex flex-col items-center mb-8 sm:mb-10">
        <img
          src="~/assets/images/app_logo.png"
          alt="Lovers"
          class="size-16 sm:size-20 mb-3 object-contain"
        />
        <span
          class="text-3xl sm:text-4xl font-bold tracking-wide text-white"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          ll
        </span>
      </div>

      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-1">Welcome back</h1>
        <p class="text-sm font-medium" style="color: #39D2C0;">
          Login to access your account below.
        </p>
      </div>

      <div class="space-y-3 sm:space-y-4">

        <div class="relative">
          <label
            for="email"
            class="absolute left-4 top-2 text-xs font-medium transition-colors"
            :style="email ? 'color: #9489F5;' : 'color: #C0C0C0;'"
          >
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email..."
            autocomplete="email"
            :disabled="isLoading"
            class="w-full pt-7 pb-3 px-4 rounded-xl text-white text-sm outline-none placeholder-gray-600 disabled:opacity-50 transition-all"
            style="background-color: #101213; border: none;"
            @focus="$event.target.previousElementSibling.style.color = '#9489F5'"
            @blur="$event.target.previousElementSibling.style.color = email ? '#9489F5' : '#C0C0C0'"
          />
        </div>

        <div class="relative">
          <label
            for="password"
            class="absolute left-4 top-2 text-xs font-medium transition-colors"
            :style="password ? 'color: #9489F5;' : 'color: #C0C0C0;'"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password..."
            autocomplete="current-password"
            :disabled="isLoading"
            class="w-full pt-7 pb-3 pl-4 pr-12 rounded-xl text-white text-sm outline-none placeholder-gray-600 disabled:opacity-50 transition-all"
            style="background-color: #101213; border: none;"
            @focus="$event.target.previousElementSibling.style.color = '#9489F5'"
            @blur="$event.target.previousElementSibling.style.color = password ? '#9489F5' : '#C0C0C0'"
          />
          <button
            type="button"
            class="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            :aria-label="showPassword ? 'パスワードを隠す' : 'パスワードを表示'"
            @click="showPassword = !showPassword"
          >
            <Icon
              :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
              class="size-4"
            />
          </button>
        </div>

        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150"
          leave-to-class="opacity-0"
        >
          <p
            v-if="errorMessage"
            class="text-sm text-red-400 flex items-center gap-1.5"
            role="alert"
          >
            <Icon name="lucide:circle-alert" class="size-4 shrink-0" />
            {{ errorMessage }}
          </p>
        </Transition>

        <div class="flex items-center justify-between pt-1 sm:pt-2">
          <NuxtLink
            to="/forgot-password"
            class="text-xs sm:text-sm font-medium transition-opacity hover:opacity-75"
            style="color: #9489F5;"
          >
            Forgot Password?
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style="background-color: #39D2C0;"
            :disabled="isLoading"
            @click="onSubmit"
          >
            <Icon
              v-if="isLoading"
              name="lucide:loader-circle"
              class="size-4 animate-spin"
            />
            <span>{{ isLoading ? 'Loading...' : 'Login' }}</span>
          </button>
        </div>

      </div>

      <div class="flex items-center justify-center mt-6 sm:mt-8 gap-1">
        <span class="text-xs sm:text-sm text-gray-400">Don't have an account?</span>
        <NuxtLink
          to="/register"
          class="text-xs sm:text-sm font-medium transition-opacity hover:opacity-75"
          style="color: #9489F5;"
        >
          Create
        </NuxtLink>
      </div>

    </div>
  </div>
</template>