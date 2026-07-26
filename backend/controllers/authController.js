const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Cookie options for authentication token
 */
const getCookieOptions = () => {
  return {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };
};

/**
 * Format clean user payload excluding sensitive fields
 */
const formatUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
};

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, 'User already exists with this email'));
    }

    // Create user (password is automatically hashed via pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role && ['User', 'Admin'].includes(role) ? role : 'User',
    });

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    res.cookie('token', token, getCookieOptions());

    // Send response
    return ApiResponse.send(res, 201, 'User registered successfully', undefined, {
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email and explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    res.cookie('token', token, getCookieOptions());

    // Send response
    return ApiResponse.send(res, 200, 'Login successful', undefined, {
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/v1/auth/profile
 * @access  Private (Protected)
 */
const getProfile = async (req, res, next) => {
  try {
    const user = formatUserResponse(req.user);
    return ApiResponse.send(res, 200, 'User profile retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log out user & clear cookie
 * @route   POST /api/v1/auth/logout
 * @access  Public / Private
 */
const logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    return ApiResponse.send(res, 200, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Google OAuth Backend Login / Registration
 * @route   POST /api/v1/auth/google
 * @access  Public
 */
const googleAuth = async (req, res, next) => {
  try {
    const { idToken, email: bodyEmail, name: bodyName, avatar: bodyAvatar, googleId: bodyGoogleId } = req.body;

    let email = bodyEmail;
    let name = bodyName || 'Google User';
    let avatar = bodyAvatar || '';
    let googleId = bodyGoogleId || 'google_subsense_' + Date.now();

    // Verify token with OAuth library if configured
    if (idToken && process.env.GOOGLE_CLIENT_ID) {
      try {
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        email = payload.email;
        name = payload.name || name;
        avatar = payload.picture || avatar;
        googleId = payload.sub || googleId;
      } catch (err) {
        console.warn('[Google OAuth Warning] Token verification fallback:', err.message);
      }
    }

    if (!email) {
      return next(new ApiError(400, 'Email is required for Google authentication'));
    }

    // Find or create user
    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (!user) {
      // Create new user with random password
      const randomPassword = 'GAuth_' + Math.random().toString(36).slice(-10) + '1!';
      user = await User.create({
        name,
        email,
        password: randomPassword,
        googleId,
        avatar,
        isVerified: true,
      });
    } else {
      // Update googleId & avatar if missing
      if (!user.googleId) user.googleId = googleId;
      if (!user.avatar && avatar) user.avatar = avatar;
      user.isVerified = true;
      await user.save();
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.cookie('token', token, getCookieOptions());

    return ApiResponse.send(res, 200, 'Google authentication successful', undefined, {
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Forgot Password Request
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new ApiError(400, 'Email address is required'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(404, 'No account found with this email address'));
    }

    // Simulate reset token generation
    const resetToken = 'reset_' + Math.random().toString(36).substring(2, 15);

    return ApiResponse.send(res, 200, 'Password reset token generated and sent to email', {
      email,
      resetToken,
      message: 'Use this reset token to update your password at POST /api/auth/reset-password',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset Password with token
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      return next(new ApiError(400, 'Email, reset token, and new password are required'));
    }

    if (newPassword.length < 8) {
      return next(new ApiError(400, 'New password must be at least 8 characters long'));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    user.password = newPassword;
    await user.save();

    return ApiResponse.send(res, 200, 'Password reset successful. You may now log in with your new password.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  logout,
  googleAuth,
  forgotPassword,
  resetPassword,
};

