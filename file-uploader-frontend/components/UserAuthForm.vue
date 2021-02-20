<template>
    <v-card>
        <v-card-title class="headline justify-center">
            {{ title }}
        </v-card-title>
        <v-card-text>
            <v-form v-model="valid">
                <v-text-field
                    v-model="userInfo.name"
                    label="Name"
                    :rules="[required('name')]"
                    v-if="hasName"
                />

                <v-text-field
                    v-model="userInfo.email"
                    label="Email"
                    :rules="[required('email'), emailFormat()]"
                />

                <v-text-field
                    v-model="userInfo.password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    counter="true"
                    :rules="[required('password'), minLength('password', 8)]"
                />
                <v-spacer />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn
                elevation="2"
                color="primary"
                @click="submitForm(userInfo)"
                :disabled="!valid"
                :loading="enableButton"
                >{{ buttonText }}</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import validations from "@/plugins/validations";

export default {
    data() {
        return {
            valid: false,
            showPassword: false,
            userInfo: {
                email: "",
                password: ""
            },
            ...validations
        };
    },
    props: ["submitForm", "buttonText", "hasName", "title", "enableButton"]
};
</script>
<style lang="scss" scoped></style>
