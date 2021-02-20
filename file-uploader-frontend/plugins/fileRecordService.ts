import http from './axios';

class FileRecordService {
    getAll(token: string) {
        return http.get("/files", {
            headers: {
                "x-access-token": token
            }
        });
    }

    uploadFile(file: File, token: string) {
        const formData = new FormData();
        formData.append("file", file);
        return http.post(`/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": token
            }
        });
    }

    downloadFile(url: string, token: string) {
        return http.get(url, {
            headers: {
                "x-access-token": token
            },
            responseType: "blob"
        });
    }

    deleteFile(fileName: string, token: string) {
        return http.delete(`/files/${fileName}`, {
            headers: {
                "x-access-token": token
            },
            responseType: "blob"
        });
    }
}

export default new FileRecordService();
