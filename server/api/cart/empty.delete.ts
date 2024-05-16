export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const {id} = getQuery(event);

    try {
        return await $fetch(`${config.servicesDomainUrl}/cart/empty/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: event.headers.get("Authorization") ?? ""
            }
        });
    } catch (e) {
        console.error(e)
        throw e;
    }
})
