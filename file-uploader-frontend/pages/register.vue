<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="8">
            <UserAuthForm
                buttonText="Register"
                :submitForm="registerUser"
                :hasName="true"
                title="Registration"
                :enableButton="isClicked"
            />
        </v-col>
    </v-row>
</template>
<script lang="ts">
import UserAuthForm from "@/components/UserAuthForm.vue";
import UserRegisterService from "@/plugins/userRegisterService";

export default {
    data() {
        return {
            isClicked: false
        };
    },
    components: {
        UserAuthForm
    },
    created() {
        if (this.$auth.loggedIn) {
            this.$router.push("/filerecords");
        }
    },
    methods: {
        async registerUser(regInfo) {
            try {
                this.isClicked = true;
                UserRegisterService.signUp(regInfo)
                    .then(signUpRes => {
                        this.$auth
                            .loginWith("local", {
                                data: regInfo
                            })
                            .then(response => {
                                this.$notifier.showMessage({
                                    content: signUpRes.data.message,
                                    color: "success"
                                });
                                this.$router.push("/filerecords");
                            });
                    })
                    .catch(error => {
                        if (error.response) {
                            this.$notifier.showMessage({
                                content: error.response.data.message,
                                color: "red"
                            });
                        }
                    });
            } catch (err) {
                this.$notifier.showMessage({
                    content: "An error has occurred. Please try again later.",
                    color: "red"
                });
                this.isClicked = false;
            }
        }
    }
};
</script>
<style></style>
