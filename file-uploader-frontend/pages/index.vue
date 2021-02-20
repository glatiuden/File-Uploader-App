<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <div class="text-center">
                <vuetify-logo />
            </div>
            <br />
            <UserAuthForm
                buttonText="Login"
                title="Welcome to the File Uploader Website"
                :submitForm="loginUser"
                :hasName="false"
                :enableButton="isClicked"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import UserAuthForm from "@/components/UserAuthForm.vue";
import VuetifyLogo from "@/components/VuetifyLogo.vue";

export default {
    components: {
        VuetifyLogo,
        UserAuthForm
    },
    data() {
        return {
            isClicked: false
        };
    },
    created() {
        if (this.$auth.loggedIn) {
            this.$router.push({ path: "/fileRecords" });
        }
    },
    methods: {
        loginUser(loginInfo: any) {
            try {
                this.isClicked = true;
                this.$auth
                    .loginWith("local", {
                        data: loginInfo
                    })
                    .then(response => {
                        this.$router.push("/filerecords");
                    })
                    .catch(error => {
                        this.isClicked = false;
                        if (error.response) {
                            this.$notifier.showMessage({
                                content: error.response.data.message,
                                color: "red"
                            });
                        }
                    });
            } catch (err) {
                this.isClicked = false;
                this.$notifier.showMessage({
                    content: err,
                    color: "danger"
                });
            }
        }
    }
};
</script>
