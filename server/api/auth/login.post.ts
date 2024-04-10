export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    try {
        const response = await $fetch(`${config.servicesDomainUrl}/auth/login`, {method: "POST", body});
        return response;
    } catch (e) {
        console.error(e)
        throw e;
    }
})
