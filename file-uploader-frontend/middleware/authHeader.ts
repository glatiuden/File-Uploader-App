export default function authHeader() {
    const token = this.$auth.strategy.token.get();
    console.log(token);
    if (token) {
        // for Node.js Express back-end
        return { "x-access-token": token };
    } else {
        return {};
    }
}
