const NEXT_PUBLIC_LOCAL_STORAGE_NAME = 'userLoggedIn';

export function saveLocalData({ user }: { user: User }) {
    console.log('userclm', user);

    if (user) {
        try {
            console.log('Save success');
            const serializedUser = JSON.stringify(user);
            localStorage.setItem(NEXT_PUBLIC_LOCAL_STORAGE_NAME, serializedUser);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            console.log('Save Fail');
            return;
        }
    }
}

export function getLocalData() {
    const storedData = localStorage.getItem(NEXT_PUBLIC_LOCAL_STORAGE_NAME);
    if (storedData) {
        try {
            console.log('Get success');

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
