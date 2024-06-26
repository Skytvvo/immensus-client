export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    try {
        return await $fetch(`${config.servicesDomainUrl}/auth/login`, {method: "POST", body});
    } catch (e) {
        console.error(e)
        throw e;
    }
})
