import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const STORAGE_KEYS = {
  USERS: '@farmer_app_users',
  CURRENT_USER: '@farmer_app_current_user',
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
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Result object with success status and message
   */
  static async registerUser(userData) {
    try {
      const users = await this.getAllUsers();
      
      console.log('Current users count:', users.length);
      
      // Check if mobile number already exists
      const existingUser = users.find(
        user => user.mobileNumber === userData.mobileNumber
      );
      
      if (existingUser) {
        return {
          success: false,
          message: 'Mobile number already registered',
        };
      }

      // Check if email already exists
      const existingEmail = users.find(
        user => user.email.toLowerCase() === userData.email.toLowerCase()
      );
      
      if (existingEmail) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }

      // Create new user object with timestamp
      const newUser = {
        ...userData,
        id: Date.now().toString(), // Simple unique ID
        registeredAt: new Date().toISOString(),
        isActive: true,
      };

      // Add new user to the list
      users.push(newUser);
      
      console.log('Saving user:', { ...newUser, password: '***' });
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      console.log('User saved successfully. Total users:', users.length);
      
      return {
        success: true,
        message: 'Registration successful',
        user: newUser,
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.',
      };
    }
  }

  /**
   * Login user with mobile number, password, and role
   * @param {string} mobileNumber - User's mobile number
   * @param {string} password - User's password
   * @param {string} role - User's role (farmer/officer/admin)
   * @returns {Promise<Object>} Result object with success status and user data
   */
  static async loginUser(mobileNumber, password, role) {
    try {
      const users = await this.getAllUsers();
      
      console.log('Login attempt - Total users:', users.length);
      console.log('Looking for:', { mobileNumber, role });
      
      // Find user with matching mobile number, password, and role
      const user = users.find(
        u => u.mobileNumber === mobileNumber && 
             u.password === password && 
             u.role === role && 
             u.isActive
      );
      
      if (!user) {
        console.log('User not found or credentials invalid');
        return {
          success: false,
          message: 'Invalid credentials or role mismatch',
        };
      }

      console.log('User found:', { ...user, password: '***' });

      // Save current user session
      await AsyncStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(user)
      );
      
      return {
        success: true,
        message: 'Login successful',
        user: user,
      };
    } catch (error) {
      console.error('Error logging in:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.',
      };
    }
  }

  /**
   * Get current logged-in user
   * @returns {Promise<Object|null>} Current user object or null
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
   * @param {string} userId - User ID
   * @param {Object} updates - Fields to update
   */
  static async updateUser(userId, updates) {
    try {
      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      // Save to storage
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      // Update current user if it's the same user
      const currentUser = await this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.CURRENT_USER,
          JSON.stringify(users[userIndex])
        );
      }

      return {
        success: true,
        message: 'Profile updated successfully',
        user: users[userIndex],
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        success: false,
        message: 'Update failed',
      };
    }
  }

  /**
   * Get user by mobile number
   * @param {string} mobileNumber
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

  /**
   * Seed initial admin user (for first-time setup)
   */
  static async seedInitialUsers() {
    try {
      const users = await this.getAllUsers();
      
      console.log('Seeding users. Current count:', users.length);
      
      // Only seed if no users exist
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

        await AsyncStorage.setItem(
          STORAGE_KEYS.USERS,
          JSON.stringify(initialUsers)
        );

        console.log('Initial users seeded successfully:', initialUsers.length);

        return {
          success: true,
          message: 'Initial users created',
        };
      }

      console.log('Users already exist, skipping seed');
      
      return {
        success: true,
        message: 'Users already exist',
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      return {
        success: false,
        message: 'Failed to seed users',
      };
    }
  }

  /**
   * Clear all data (for development/testing)
   */
  static async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USERS,
        STORAGE_KEYS.CURRENT_USER,
      ]);
      console.log('All data cleared');
      return { success: true };
    } catch (error) {
      console.error('Error clearing data:', error);
      return { success: false };
    }
  }
}

export default StorageService;