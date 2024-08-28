import {Flip, toast} from "react-toastify";

class Common {
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static toastSuccess(message) {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });
    }
    static formatDate(date) {
        // format 2024-07-05
        return date.toISOString().slice(0, 10);
    }

    static formatDateVi(dateStr) {
        const date = new Date(dateStr);
        const options = {year: "numeric", month: "2-digit", day: "2-digit"};
        return date.toLocaleDateString("vi-VN", options);
    }

    static formatPrice(price) {
        return price.toLocaleString("vi-VN", {style: "currency", currency: "VND"});
    }
}

export default Common;