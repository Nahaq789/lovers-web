<script setup lang="ts">
definePageMeta({ middleware: 'guest' });

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const { validatePassword, handleSignup } = useAuth();

const passwordError = computed(() => {
  if (!password.value) return null;
  return validatePassword(password.value)
    ? null
    : 'Must be at least 8 characters with uppercase, lowercase, and a number.';
});

const confirmPasswordError = computed(() => {
  if (!confirmPassword.value) return null;
  return password.value === confirmPassword.value
    ? null
    : 'Passwords do not match.';
});

const isFormValid = computed(
  () =>
    !!email.value &&
    !!password.value &&
    !passwordError.value &&
    !!confirmPassword.value &&
    !confirmPasswordError.value,
);

const onSubmit = async () => {
  if (!isFormValid.value || isLoading.value) return;
  errorMessage.value = '';
  isLoading.value = true;
  const result = await handleSignup(email.value, password.value);
  isLoading.value = false;
  if (!result.success) {
    errorMessage.value =
      result.error ?? 'An unexpected error occurred. Please try again.';
    return;
  }
  await navigateTo('/signup/verify');
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
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-1">Get Started</h1>
        <p class="text-sm font-medium" style="color: #39D2C0;">
          Create your account below.
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

        <div>
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
              autocomplete="new-password"
              :disabled="isLoading"
              class="w-full pt-7 pb-3 pl-4 pr-12 rounded-xl text-white text-sm outline-none placeholder-gray-600 disabled:opacity-50 transition-all"
              style="background-color: #101213; border: none;"
              @focus="$event.target.previousElementSibling.style.color = '#9489F5'"
              @blur="$event.target.previousElementSibling.style.color = password ? '#9489F5' : '#C0C0C0'"
            />
            <button
              type="button"
              class="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
            </button>
          </div>
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-150"
            leave-to-class="opacity-0"
          >
            <p v-if="passwordError" class="text-xs text-red-400 mt-1 pl-1">{{ passwordError }}</p>
          </Transition>
        </div>

        <div>
          <div class="relative">
            <label
              for="confirmPassword"
              class="absolute left-4 top-2 text-xs font-medium transition-colors"
              :style="confirmPassword ? 'color: #9489F5;' : 'color: #C0C0C0;'"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Re-enter your password..."
              autocomplete="new-password"
              :disabled="isLoading"
              class="w-full pt-7 pb-3 pl-4 pr-12 rounded-xl text-white text-sm outline-none placeholder-gray-600 disabled:opacity-50 transition-all"
              style="background-color: #101213; border: none;"
              @focus="$event.target.previousElementSibling.style.color = '#9489F5'"
              @blur="$event.target.previousElementSibling.style.color = confirmPassword ? '#9489F5' : '#C0C0C0'"
            />
            <button
              type="button"
              class="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <Icon :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
            </button>
          </div>
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-150"
            leave-to-class="opacity-0"
          >
            <p v-if="confirmPasswordError" class="text-xs text-red-400 mt-1 pl-1">{{ confirmPasswordError }}</p>
          </Transition>
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
            to="/signup/verify"
            class="text-xs sm:text-sm font-medium transition-opacity hover:opacity-75"
            style="color: #9489F5;"
          >
            Enter verify code
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style="background-color: #39D2C0;"
            :disabled="!isFormValid || isLoading"
            @click="onSubmit"
          >
            <Icon
              v-if="isLoading"
              name="lucide:loader-circle"
              class="size-4 animate-spin"
            />
            <span>{{ isLoading ? 'Loading...' : 'Register' }}</span>
          </button>
        </div>

      </div>

      <div class="flex items-center justify-center mt-6 sm:mt-8 gap-1">
        <span class="text-xs sm:text-sm text-gray-400">Already have an account?</span>
        <NuxtLink
          to="/login"
          class="text-xs sm:text-sm font-medium transition-opacity hover:opacity-75"
          style="color: #9489F5;"
        >
          Login
        </NuxtLink>
      </div>

    </div>
  </div>
</template>