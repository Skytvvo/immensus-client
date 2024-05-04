export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const formData = await readFormData(event)

    try {
        return await $fetch(`${config.servicesDomainUrl}/cloud/upload/image`, {
            method: "POST", body: formData, headers: {
                Authorization: event.headers.get("Authorization") ?? ""
            }
        });
    } catch (e) {
        console.error(e)
        throw e;
    }
})
