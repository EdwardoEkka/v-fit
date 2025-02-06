import { database } from "../../firebase";
import { ref, get, push, set, DataSnapshot, remove  } from "firebase/database"; // Import get
import { Cart, Order, Product } from "@/app/types";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const productRef = ref(database, "products");

const getAllProducts = async () => {
  try {
    const snapshot = await get(productRef);
    const data = snapshot.val();
    const productList = data ? Object.values(data) : [];
    return productList as Product[];
  } catch (error) {
    return [];
  }
};

const getProductByCategories = async (category: string) => {
  try {
    const snapshot = await get(productRef);
    const data = snapshot.val();

    if (!data) {
      return [];
    }

    const productList = Object.values(data) as Product[];

    const filteredProducts = productList.filter(
      (product: Product) => product.category?.category === category
    );

    return filteredProducts as Product[];
  } catch (error) {
    return [];
  }
};

const getProductBySubCategories = async (
  category: string,
  subcategory: string
) => {
  try {
    const snapshot = await get(productRef);
    const data = snapshot.val();

    if (!data) {
      return [];
    }

    const productList = Object.values(data) as Product[];
    const filteredProducts = productList.filter(
      (product: Product) => product.category?.category === category
    );
    const subfilteredProducts = filteredProducts.filter(
      (product: Product) => product.category?.subCategory === subcategory
    );
    return subfilteredProducts as Product[];
  } catch (error) {
    return [];
  }
};

const getProductById = async (id: string) => {
  try {
    const snapshot = await get(productRef);
    const data = snapshot.val();

    if (!data) {
      return null;
    }

    const productList = Object.values(data) as Product[];
    const product = productList.find((product: Product) => product.id === id);
    return product || null;
  } catch (error) {
    return null;
  }
};

const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Add the username to the user's profile
    await updateProfile(user, { displayName: username });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const addToCart = async (cart: Cart) => {
  try {
    const cartRef = ref(database, "cart");
    const newCartRef = push(cartRef);
    const newProd = await set(newCartRef, cart);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const removeFromCart = async (cartId: string) => {
  try {
    const cartRef = ref(database, "cart");
    const snapshot = await get(cartRef);
    if (!snapshot.exists()) return false;

    let itemRemoved = false;

    snapshot.forEach((childSnapshot) => {
      const cart = childSnapshot.val();
      if (cart.id === cartId) {
        const itemRef = ref(database, `cart/${childSnapshot.key}`);
        remove(itemRef);
        itemRemoved = true;
      }
    });

    return itemRemoved;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const addToOrder = async (order: Order) => {
  try {
    const orderRef = ref(database, "orders");
    const newOrderRef = push(orderRef);
    await set(newOrderRef, 
      order,
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//return boolean
const checkIfProductInCart = async (
  userID: any,
  productID: any
): Promise<boolean> => {
  try {
    const ordersRef = ref(database, "cart");
    const snapshot = await get(ordersRef);
    if (!snapshot.exists()) return false;

    let productExists = false;

    snapshot.forEach((childSnapshot) => {
      const order = childSnapshot.val();
      if (order.userId === userID && order.productId === productID) {
        productExists = true;
      }
    });

    return productExists;
  } catch (error) {
    console.error("Error checking product in cart:", error);
    return false;
  }
};

const getUserCart = async (userId: any): Promise<Cart[]> => {
  try {
    console.log(userId);
    const ordersRef = ref(database, "cart");
    const snapshot: DataSnapshot = await get(ordersRef);

    if (!snapshot.exists()) return [];

    let userCart: Cart[] = [];

    snapshot.forEach((childSnapshot: DataSnapshot) => {
      const order: Cart = childSnapshot.val();
      if (order.userId === userId) {
        userCart.push(order);
      }
    });

    return userCart;
  } catch (error) {
    console.error("Error getting user cart:", error);
    return [];
  }
};

export {
  getAllProducts,
  getProductByCategories,
  getProductBySubCategories,
  getProductById,
  signIn,
  signUp,
  signOutUser,
  addToCart,
  addToOrder,
  checkIfProductInCart,
  getUserCart,
  removeFromCart,
};
