<template>
    <v-app>
        <v-app-bar color="blue lighten-4" :clipped-left="clipped" fixed app>
            <v-icon>mdi-cloud-upload</v-icon>&nbsp;&nbsp;
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <div v-if="this.$auth.loggedIn" :key="$auth.user.id">
                <span class="text-sm-body-2">Hello {{ $auth.user.name }}!</span>
                <v-btn plain @click="signOut">
                    Log Out
                </v-btn>
            </div>
            <div v-else>
                <v-btn plain to="/">
                    Login
                </v-btn>
                <v-btn plain to="/register">
                    Register
                </v-btn>
            </div>
        </v-app-bar>
        <v-main>
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
        <Snackbar></Snackbar>
    </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar";

export default {
    components: {
        Snackbar
    },
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            title: "File Uploader Website"
        };
    },
    methods: {
        signOut() {
            this.$auth.logout().then(() => this.$router.push({ path: "/" }));
        }
    }
};
</script>
