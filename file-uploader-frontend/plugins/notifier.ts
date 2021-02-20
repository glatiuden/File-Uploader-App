export default ({ app, store }: any, inject) => {
    inject("notifier", {
        showMessage({ content = "", color = "" }) {
            store.commit("snackbar/showMessage", { content, color });
        }
    });
};
