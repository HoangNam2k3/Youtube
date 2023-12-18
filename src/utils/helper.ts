const NEXT_PUBLIC_LOCAL_STORAGE_NAME = 'userLoggedIn';

export function saveLocalData({ user }: { user: User }) {
    if (user) {
        try {
            const serializedUser = JSON.stringify(user);
            localStorage.setItem(NEXT_PUBLIC_LOCAL_STORAGE_NAME, serializedUser);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return;
        }
    }
}

export function getLocalData() {
    const storedData = localStorage.getItem(NEXT_PUBLIC_LOCAL_STORAGE_NAME);
    if (storedData) {
        try {
            return JSON.parse(storedData) as User;
        } catch (err) {
            console.log('Error parsing stored user data.', err);
            return null;
        }
    }
    return null;
}

export function removeLocalData() {
    localStorage.removeItem(NEXT_PUBLIC_LOCAL_STORAGE_NAME);
}
