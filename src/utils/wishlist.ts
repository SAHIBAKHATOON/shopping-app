export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const WISHLIST_STORAGE_KEY = 'wishlist';

export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

export const addToWishlist = (item: WishlistItem): void => {
  const wishlist = getWishlist();
  if (!wishlist.some((i) => i.id === item.id)) {
    wishlist.push(item);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (id: string): void => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter((item) => item.id !== id);
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
};

export const isInWishlist = (id: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === id);
}; 