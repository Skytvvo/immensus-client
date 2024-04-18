export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const {id} = getQuery(event)
    try {
        const response = await $fetch(`${config.servicesDomainUrl}/products/${id}`);
        return response;
    } catch (e) {
        console.error(e)
        throw e;
    }
})
