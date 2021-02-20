<template>
    <div>
        <br />
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="records" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>My Uploaded Files</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="dialog = true">
                            Upload New File
                        </v-btn>
                        <UploadFileDialog
                            :upload="upload"
                            :componentKey="componentKey"
                            :selectFiles="selectFiles"
                            :removeFile="removeFile"
                            :is-open.sync="dialog"
                            @closedialog="close"
                            ref="fileDialog"
                        />
                    </v-toolbar>
                    <v-dialog v-model="dialogDelete" max-width="290">
                        <v-card>
                            <v-card-title class="headline"
                                >Confirm Deletion</v-card-title
                            >
                            <v-card-text>
                                Are you sure you want to permanently remove this
                                file?
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="closeDelete"
                                    >Cancel</v-btn
                                >
                                <v-btn
                                    color="primary"
                                    text
                                    @click="deleteItemConfirm"
                                    :loading="isDeleteClicked"
                                    >OK</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>
                <template slot="item.index" slot-scope="props">
                    {{ props.index + 1 }}
                </template>
                <template v-slot:item.date="{ item }">
                    <span>{{
                        $moment(item.date).format("DD MMM YYYY HH:mma")
                    }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon @click="onDownloadClick(item.url)">
                        mdi-download
                    </v-icon>
                    <v-icon @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script lang="ts">
import FileRecordService from "@/plugins/fileRecordService";

export default {
    data() {
        return {
            componentKey: 0,
            dialog: false,
            dialogDelete: false,
            fileName: "",
            files: [],
            search: "",
            isDeleteClicked: false,
            userId: this.$auth.strategy.token.get(),

            headers: [
                { text: "#", value: "index" },
                {
                    text: "File Name",
                    value: "name"
                },
                { text: "Uploaded Date Time", value: "date" },
                { text: "Actions", value: "actions", sortable: false }
            ],
            records: []
        };
    },

    created() {
        if (!this.$auth.loggedIn) {
            this.$router.push("/");
        } else {
            this.initialize();
        }
    },

    methods: {
        initialize() {
            FileRecordService.getAll(this.userId)
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    // No existing directory.
                    // if (error.response) {
                    //     this.$notifier.showMessage({
                    //         content: error.response.data.message,
                    //         color: "red"
                    //     });
                    // }
                });
        },

        selectFiles(file: any) {
            this.files.push(file);
        },

        removeFile(file: any) {
            this.files.splice(this.files.indexOf(file), 1);
        },

        upload() {
            if (this.files.length === 0) {
                this.$notifier.showMessage({
                    content: "Please select a file!",
                    color: "red"
                });
                return;
            }
            const uploadDataPromise = new Promise((resolve, reject) => {
                let count: number = 0;
                this.files.forEach(currentFile => {
                    FileRecordService.uploadFile(
                        currentFile,
                        this.$auth.strategy.token.get()
                    )
                        .then(response => {
                            count++;
                            if (count === this.files.length) resolve(true);
                        })
                        .catch(() => {
                            this.$notifier.showMessage({
                                content:
                                    "Error encountered when uploading the file.",
                                color: "red"
                            });
                            this.files = [];
                        });
                });
            });

            uploadDataPromise.then((res: Boolean) => {
                if (res === true) {
                    this.close();
                    this.$notifier.showMessage({
                        content: "You have successfully uploaded the file.",
                        color: "success"
                    });
                    this.initialize();
                    this.$refs.fileDialog.onClosePress();
                }
            });
        },

        deleteItem(item: any) {
            this.fileName = item.name;
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.isDeleteClicked = true;
            FileRecordService.deleteFile(
                this.fileName,
                this.$auth.strategy.token.get()
            ).then(res => {
                if (res) {
                    this.$notifier.showMessage({
                        content: "You have successfully deleted the file.",
                        color: "red"
                    });
                    this.isDeleteClicked = false;
                    this.closeDelete();
                }
            });
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.files = [];
                this.componentKey++;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.fileName = "";
                this.componentKey++;
                this.initialize();
            });
        },

        onDownloadClick(url: string) {
            this.$notifier.showMessage({
                content: "Processing your request.",
                color: "orange"
            });

            FileRecordService.downloadFile(
                url,
                this.$auth.strategy.token.get()
            ).then(res => {
                const blob = new Blob([res.data], {
                    type: res.headers["content-type"]
                });
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = res.config.url.slice(
                    res.config.url.lastIndexOf("/") + 1
                );
                link.click();
            });
        }
    }
};
</script>
