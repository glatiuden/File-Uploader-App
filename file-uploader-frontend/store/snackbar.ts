export const state = () => ({
    content: "",
    color: ""
});

export const mutations = {
    showMessage(state: any, payload: any) {
        state.content = payload.content;
        state.color = payload.color;
    }
};
