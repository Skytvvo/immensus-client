import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import "./utils.css";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme:{
            defaultTheme: "lightTheme",
            themes:{
                lightTheme: {
                    dark: false,
                    colors: {
                        "background-primary": "#F6F6F6",
                        "background-secondary": "#FFFFFF",
                        "action-primary": "#6993FF",
                        "action-secondary": "#D0D0D0",
                        "icon-primary": "#CCCCCC",
                        "icon-secondary": "#EFEFEF",
                        "border-primary": "#C4C4C4",
                        "text-secondary": "#ADADAD",
                        "text-primary": "#000000"
                    }
                }
            }
        }
    })
    app.vueApp.use(vuetify)
})
