import { create } from 'zustand'

// global state
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct || !newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all the fields" }
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "Products created successfully" }
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json();

        set({ products: data.data })
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        })
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message }

        set(state => ({
            products: state.products.filter(product => product._id !== pid)
        }))
    },
    updateProduct: async (pid, newProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message }

        set(state => ({
            products: state.products.map((product) =>
                (product._id === pid ? data.data : product)
            )
        }))

        return { success: true, message: "Products updated successfully" }
    }
}));

// const [state, setState] = useState([]) pro