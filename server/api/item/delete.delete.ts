export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const {id} = getQuery(event);

    try {
        return await $fetch(`${config.servicesDomainUrl}/products/delete/${id}`, {
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
