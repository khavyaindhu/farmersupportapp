import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const STORAGE_KEYS = {
  USERS: '@farmer_app_users',
  CURRENT_USER: '@farmer_app_current_user',
  SELECTED_SCHEME: '@farmer_app_selected_scheme', // ← NEW
};

/**
 * Storage Service for managing user data locally
 */
class StorageService {

  /**
   * Get all registered users
   */
  static async getAllUsers() {
    try {
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  /**
   * Save a new user to local storage
   */
  static async registerUser(userData) {
    try {
      const users = await this.getAllUsers();
      const existingUser = users.find(user => user.mobileNumber === userData.mobileNumber);
      if (existingUser) return { success: false, message: 'Mobile number already registered' };

      const existingEmail = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (existingEmail) return { success: false, message: 'Email already registered' };

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        registeredAt: new Date().toISOString(),
        isActive: true,
      };

      users.push(newUser);
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return { success: true, message: 'Registration successful', user: newUser };
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

  /**
   * Login user with mobile number, password, and role
   */
  static async loginUser(mobileNumber, password, role) {
    try {
      const users = await this.getAllUsers();
      const user = users.find(
        u => u.mobileNumber === mobileNumber &&
          u.password === password &&
          u.role === role &&
          u.isActive
      );

      if (!user) return { success: false, message: 'Invalid credentials or role mismatch' };

      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return { success: true, message: 'Login successful', user };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  /**
   * Get current logged-in user
   */
  static async getCurrentUser() {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout current user
   */
  static async logout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      return { success: false };
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(userId, updates) {
    try {
      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) return { success: false, message: 'User not found' };

      users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      const currentUser = await this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[userIndex]));
      }

      return { success: true, message: 'Profile updated successfully', user: users[userIndex] };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, message: 'Update failed' };
    }
  }

  /**
   * Get user by mobile number
   */
  static async getUserByMobile(mobileNumber) {
    try {
      const users = await this.getAllUsers();
      return users.find(u => u.mobileNumber === mobileNumber) || null;
    } catch (error) {
      console.error('Error getting user by mobile:', error);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // SCHEME METHODS (NEW)
  // ─────────────────────────────────────────────────────────────

  /**
   * Save the selected government scheme for a user.
   * Key is per-user so multiple farmers don't overwrite each other.
   * @param {string} userId
   * @param {Object} scheme - { id, name, icon, benefit, description }
   */
  static async saveSelectedScheme(userId, scheme) {
    try {
      const key = `${STORAGE_KEYS.SELECTED_SCHEME}_${userId}`;
      const data = { ...scheme, appliedAt: new Date().toISOString() };
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error('Error saving scheme:', error);
      return { success: false };
    }
  }

  /**
   * Get the currently selected scheme for a user.
   * @param {string} userId
   * @returns {Object|null}
   */
  static async getSelectedScheme(userId) {
    try {
      const key = `${STORAGE_KEYS.SELECTED_SCHEME}_${userId}`;
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error('Error getting scheme:', error);
      return null;
    }
  }

  /**
   * Remove the selected scheme for a user.
   * @param {string} userId
   */
  static async removeSelectedScheme(userId) {
    try {
      const key = `${STORAGE_KEYS.SELECTED_SCHEME}_${userId}`;
      await AsyncStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error('Error removing scheme:', error);
      return { success: false };
    }
  }

  // ─────────────────────────────────────────────────────────────

  /**
   * Seed initial admin user (for first-time setup)
   */
  static async seedInitialUsers() {
    try {
      const users = await this.getAllUsers();
      if (users.length === 0) {
        const initialUsers = [
          {
            id: 'admin001',
            fullName: 'System Admin',
            mobileNumber: '9876543212',
            email: 'admin@farmersupport.com',
            password: 'pass123',
            aadharNumber: '123456789012',
            address: 'Admin Office',
            pincode: '560001',
            state: 'Karnataka',
            district: 'Bangalore',
            role: 'admin',
            registeredAt: new Date().toISOString(),
            isActive: true,
          },
          {
            id: 'officer001',
            fullName: 'Agriculture Officer',
            mobileNumber: '9876543211',
            email: 'officer@farmersupport.com',
            password: 'pass123',
            aadharNumber: '123456789011',
            address: 'Agriculture Dept',
            pincode: '560002',
            state: 'Karnataka',
            district: 'Bangalore',
            role: 'officer',
            registeredAt: new Date().toISOString(),
            isActive: true,
          },
          {
            id: 'farmer001',
            fullName: 'Demo Farmer',
            mobileNumber: '9876543210',
            email: 'farmer@farmersupport.com',
            password: 'pass123',
            aadharNumber: '123456789010',
            address: 'Village Farm',
            pincode: '560003',
            state: 'Karnataka',
            district: 'Bangalore',
            role: 'farmer',
            registeredAt: new Date().toISOString(),
            isActive: true,
          },
        ];
        await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
        return { success: true, message: 'Initial users created' };
      }
      return { success: true, message: 'Users already exist' };
    } catch (error) {
      console.error('Error seeding users:', error);
      return { success: false, message: 'Failed to seed users' };
    }
  }

  /**
   * Clear all data (for development/testing)
   */
  static async clearAllData() {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USERS, STORAGE_KEYS.CURRENT_USER]);
      return { success: true };
    } catch (error) {
      console.error('Error clearing data:', error);
      return { success: false };
    }
  }
}

export default StorageService;