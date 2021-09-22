import axios from 'axios'
const PORT = process.env.PORT || 5000;


const food2foodUrl = `http://localhost:${PORT}`

const dbCalls = axios.create({
    baseURL: food2foodUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})
const dbRequests = {
    getAllDonations: () => dbCalls.get(`/donations`), 
    getAllInventories: (id) => dbCalls.get(`/${id}/inventory`),
    getWarehouseInventories: () => dbCalls.get(`/inventory/`),
    getSingleWarehouse: (id) => dbCalls.get(`/warehouses/${id}`),
    DeleteWarehouse: (id) => dbCalls.delete(`/ warehouses / ${id}`),
    getSingleInventories: (itemId) => dbCalls.get(`/inventory/${itemId}`),
}


export default food2foodRequests