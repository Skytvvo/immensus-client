export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)

    try {
        return await $fetch(`${config.servicesDomainUrl}/products`, {
            query
        });
    } catch (e) {
        console.error(e)
        throw e;
    }
})
