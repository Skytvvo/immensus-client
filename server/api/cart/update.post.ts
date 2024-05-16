export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    try {

        return await $fetch(`${config.servicesDomainUrl}/cart/update`, {
            method: "POST", body, headers: {
                Authorization: event.headers.get("Authorization") ?? ""
            }
        });
    } catch (e) {
        console.error(e)
        throw e;
    }
})
