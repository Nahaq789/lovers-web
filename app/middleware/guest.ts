export default defineNuxtRouteMiddleware(async () => {
  await navigateTo("/login");
});
