export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: Price
    stock: Stock
    category: Category
}

interface Price{
    price: number;                
    discountedPrice: number;
    currency: string; 
}

interface Stock{
    stock: number;               
    stockStatus: "in stock" | "out of stock";
}

interface Category{
    category: string;  
    subCategory?: string;
    tags?: string[];   
}

export interface Blogs{
    title: string;
    images: string[];
    body: string;
}

export interface Cart{
    id: any;
    userId: any;
    productId: any;
}

export interface Order{
    id: string;
    product : {productId:string, name:string;quantity:number;price:number}[];
    userId: string;
    username: string;
    productId: string;
    totalPrice: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    payment: {
      method: "COD" | "Credit Card" | "Debit Card" | "UPI" | "Net Banking";
      transactionId?: string;
      status: "pending" | "failed" | "completed";
    };
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
      };  
}