export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    try {
         return await $fetch(`${config.servicesDomainUrl}/auth/registration`, {method: "POST", body});
    } catch (e) {
        console.error(e)
        throw e;
    }
})
