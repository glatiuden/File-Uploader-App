<template>
    <v-dialog v-model="open" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span>Upload New File(s)</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <dropzone
                        id="dropzoneUpload"
                        ref="dropzoneUpload"
                        :options="dropzoneOptions"
                        :duplicateCheck="true"
                        :destroyDropzone="true"
                        @vdropzone-removed-file="removeFile"
                        @vdropzone-success="fileUploadSucceed"
                        @vdropzone-upload-progress="inProgress = true"
                        @vdropzone-success-multiple="inProgress = false"
                        :useCustomSlot="true"
                    >
                        <h3 class="headline">
                            Drag and drop to upload content!
                        </h3>
                        <div class="subtitle">
                            ...or click to select a file from your computer
                        </div>
                    </dropzone>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="onClosePress">
                    Close
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="onUploadPress"
                    :disabled="inProgress"
                    :loading="isLoading"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import "nuxt-dropzone/dropzone.css";

import Dropzone from "nuxt-dropzone";
import FileRecordService from "@/plugins/fileRecordService";

export default {
    components: {
        Dropzone
    },
    data() {
        return {
            inProgress: false,
            isLoading: false,
            files: [],
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                uploadMultiple: true,
                thumbnailWidth: 200,
                addRemoveLinks: true,
                dictDefaultMessage:
                    "Drag 'n' drop some files here, or click to select files (Max File Size: 2MB)"
            }
        };
    },
    computed: {
        open: {
            get: function() {
                return this.isOpen;
            },
            set: function(newValue) {
                this.$emit("update:isOpen", newValue);
            }
        }
    },
    methods: {
        fileUploadSucceed: function(file) {
            this.selectFiles(file);
        },
        onUploadPress: function() {
            this.isLoading = true;
            this.upload();
        },
        onClosePress: function() {
            this.isLoading = false;
            this.inProgress = false;
            this.files = [];
            this.$refs.dropzoneUpload.removeAllFiles(true);
            this.open = false;
        }
    },
    props: [
        "upload",
        "componentKey",
        "is-open",
        "closedialog",
        "selectFiles",
        "removeFile"
    ]
};
</script>
