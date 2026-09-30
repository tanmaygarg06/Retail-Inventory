export interface User { id: number; username: string; roles: string[]; }
export interface Product { id: number; name: string; categoryId: number; price: number; }
export interface Warehouse { id: number; name: string; location: string; }
export interface Inventory { id: number; productId: number; warehouseId: number; quantity: number; }
export interface Supplier { id: number; name: string; contactInfo: string; }
export interface Order { id: number; customerId: number; status: string; total: number; }
