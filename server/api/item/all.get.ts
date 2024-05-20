export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        return await $fetch(`${config.servicesDomainUrl}/products/all`, {
            headers: {
                Authorization: event.headers.get("Authorization") ?? ""
            }
        });
    } catch (e) {
        console.error(e)
        throw e;
    }
})
