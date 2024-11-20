import type { UserSchemaType } from "@/dtos/user";

interface AuthCookie {
  user: UserSchemaType;
  token: string;
}
export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useCookie<AuthCookie>("auth");
  if (to.path === "/" && !auth.value.token) {
    return navigateTo("/login", { redirectCode: 401, replace: true });
  }
  if ((to.path === "/login" || to.path === "/register") && auth.value.token) {
    return navigateTo("/", { replace: true });
  }
});
