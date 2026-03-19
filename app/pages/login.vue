<script setup lang="ts">
definePageMeta({ middleware: "guest" });

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  // TODO: バリデーション → useAuth().login(email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-6">
    <div class="w-full max-w-sm space-y-8">

      <!-- ヘッダー -->
      <div class="space-y-1">
        <h1 class="text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p class="text-sm font-medium" style="color: #39D2C0;">
          Login to access your account below.
        </p>
      </div>

      <!-- フォーム -->
      <div class="space-y-5">

        <!-- メールアドレス -->
        <div class="space-y-1.5">
          <Label for="email">Email Address</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email..."
            autocomplete="email"
            :disabled="isLoading"
          />
        </div>

        <!-- パスワード -->
        <div class="space-y-1.5">
          <Label for="password">Password</Label>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password..."
              autocomplete="current-password"
              class="pr-10"
              :disabled="isLoading"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
              :aria-label="showPassword ? 'パスワードを隠す' : 'パスワードを表示'"
              @click="showPassword = !showPassword"
            >
              <Icon
                :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                class="size-4"
              />
            </button>
          </div>
        </div>

        <!-- エラーメッセージ -->
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150"
          leave-to-class="opacity-0"
        >
          <p
            v-if="errorMessage"
            class="text-sm text-destructive flex items-center gap-1.5"
            role="alert"
          >
            <Icon name="lucide:circle-alert" class="size-4 shrink-0" />
            {{ errorMessage }}
          </p>
        </Transition>

        <!-- Forgot Password & ログインボタン -->
        <div class="flex items-center justify-between gap-3">
          <NuxtLink
            to="/forgot-password"
            class="text-sm font-medium transition-opacity hover:opacity-80 shrink-0"
            style="color: #9489F5;"
          >
            Forgot Password?
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style="background-color: #39D2C0;"
            :disabled="isLoading"
            @click="handleSubmit"
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

    </div>
  </div>
</template>