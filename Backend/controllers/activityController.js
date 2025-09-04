const admin = require('../config/firebase-admin');
const firestore = admin.firestore();

// Track user activity using Firestore
exports.trackActivity = async (req, res) => {
  try {
    const {
      activityType,
      activityDetails,
      sessionId
    } = req.body;

    // Get user info from authenticated token
    const userId = req.user.uid;
    const userEmail = req.user.email;

    // Get IP address and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.get('User-Agent');

    const activityData = {
      userId,
      userEmail,
      activityType,
      activityDetails: activityDetails || {},
      userAgent,
      ipAddress,
      sessionId: sessionId || `session_${Date.now()}_${userId}`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: new Date()
    };

    // Add to Firestore activities collection
    const docRef = await firestore.collection('user_activities').add(activityData);

    res.status(201).json({
      message: 'Activity tracked successfully',
      activityId: docRef.id
    });

  } catch (error) {
    console.error('Activity tracking error:', error);
    res.status(500).json({ message: 'Failed to track activity' });
  }
};

// Get user activities (admin only)
exports.getUserActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 50, activityType } = req.query;

    let query = firestore.collection('user_activities').where('userId', '==', userId);
    
    if (activityType) {
      query = query.where('activityType', '==', activityType);
    }

    query = query.orderBy('timestamp', 'desc').limit(parseInt(limit));

    // Handle pagination with startAfter for large datasets
    if (page > 1) {
      const previousQuery = firestore.collection('user_activities')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit((page - 1) * limit);
      
      const previousSnapshot = await previousQuery.get();
      if (!previousSnapshot.empty) {
        const lastDoc = previousSnapshot.docs[previousSnapshot.docs.length - 1];
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const activities = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp ? data.timestamp.toDate() : data.createdAt
      });
    });

    // Get total count (for pagination info)
    const countQuery = firestore.collection('user_activities').where('userId', '==', userId);
    const countSnapshot = await countQuery.get();
    const totalActivities = countSnapshot.size;

    res.json({
      activities,
      totalActivities,
      totalPages: Math.ceil(totalActivities / limit),
      currentPage: parseInt(page)
    });

  } catch (error) {
    console.error('Get user activities error:', error);
    res.status(500).json({ message: 'Failed to get user activities' });
  }
};

// Get all activities with filters (admin only)
exports.getAllActivities = async (req, res) => {
  try {
    const { page = 1, limit = 100, activityType, startDate, endDate } = req.query;

    let query = firestore.collection('user_activities');

    if (activityType) {
      query = query.where('activityType', '==', activityType);
    }

    if (startDate) {
      query = query.where('timestamp', '>=', new Date(startDate));
    }

    if (endDate) {
      query = query.where('timestamp', '<=', new Date(endDate));
    }

    query = query.orderBy('timestamp', 'desc').limit(parseInt(limit));

    const snapshot = await query.get();
    const activities = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp ? data.timestamp.toDate() : data.createdAt
      });
    });

    res.json({
      activities,
      totalActivities: snapshot.size,
      currentPage: parseInt(page)
    });

  } catch (error) {
    console.error('Get all activities error:', error);
    res.status(500).json({ message: 'Failed to get activities' });
  }
};

// Get activity analytics (admin only)
exports.getActivityAnalytics = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get activities from the last N days
    const activitiesQuery = firestore.collection('user_activities')
      .where('timestamp', '>=', startDate)
      .orderBy('timestamp', 'desc');

    const activitiesSnapshot = await activitiesQuery.get();
    const activities = [];

    activitiesSnapshot.forEach(doc => {
      const data = doc.data();
      activities.push({
        ...data,
        timestamp: data.timestamp ? data.timestamp.toDate() : data.createdAt
      });
    });

    // Process analytics data
    const activityByType = {};
    const dailyActivity = {};
    const userActivity = {};
    const packageActivity = {};

    activities.forEach(activity => {
      // Count by activity type
      activityByType[activity.activityType] = (activityByType[activity.activityType] || 0) + 1;

      // Count by day
      const day = activity.timestamp.toISOString().split('T')[0];
      dailyActivity[day] = (dailyActivity[day] || 0) + 1;

      // Count by user
      userActivity[activity.userId] = {
        userId: activity.userId,
        userEmail: activity.userEmail,
        count: (userActivity[activity.userId]?.count || 0) + 1
      };

      // Count package views
      if (activity.activityType === 'package_view' && activity.activityDetails?.packageId) {
        const packageId = activity.activityDetails.packageId;
        packageActivity[packageId] = {
          packageId,
          packageTitle: activity.activityDetails.packageTitle,
          count: (packageActivity[packageId]?.count || 0) + 1
        };
      }
    });

    // Convert to arrays and sort
    const activityByTypeArray = Object.entries(activityByType).map(([type, count]) => ({
      _id: type,
      count
    })).sort((a, b) => b.count - a.count);

    const dailyActivityArray = Object.entries(dailyActivity).map(([date, count]) => ({
      _id: date,
      count
    })).sort((a, b) => a._id.localeCompare(b._id));

    const activeUsersArray = Object.values(userActivity)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const popularPackagesArray = Object.values(packageActivity)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
      activityByType: activityByTypeArray,
      dailyActivity: dailyActivityArray,
      activeUsers: activeUsersArray,
      popularPackages: popularPackagesArray
    });

  } catch (error) {
    console.error('Get activity analytics error:', error);
    res.status(500).json({ message: 'Failed to get analytics' });
  }
};

// Get user activity summary for specific user (admin only)
exports.getUserActivitySummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const query = firestore.collection('user_activities')
      .where('userId', '==', userId)
      .where('timestamp', '>=', startDate)
      .orderBy('timestamp', 'desc');

    const snapshot = await query.get();
    const activities = [];
    const summary = {
      totalActivities: 0,
      activityTypes: {},
      sessionsCount: new Set(),
      lastActivity: null,
      mostViewedPackages: {}
    };

    snapshot.forEach(doc => {
      const data = doc.data();
      const activity = {
        ...data,
        timestamp: data.timestamp ? data.timestamp.toDate() : data.createdAt
      };
      
      activities.push(activity);
      
      // Build summary
      summary.totalActivities++;
      summary.activityTypes[activity.activityType] = (summary.activityTypes[activity.activityType] || 0) + 1;
      summary.sessionsCount.add(activity.sessionId);
      
      if (!summary.lastActivity || activity.timestamp > summary.lastActivity) {
        summary.lastActivity = activity.timestamp;
      }

      // Track package views
      if (activity.activityType === 'package_view' && activity.activityDetails?.packageId) {
        const packageId = activity.activityDetails.packageId;
        summary.mostViewedPackages[packageId] = {
          packageId,
          packageTitle: activity.activityDetails.packageTitle,
          count: (summary.mostViewedPackages[packageId]?.count || 0) + 1
        };
      }
    });

    summary.sessionsCount = summary.sessionsCount.size;
    summary.mostViewedPackages = Object.values(summary.mostViewedPackages)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      activities: activities.slice(0, 20), // Return only recent 20 activities
      summary
    });

  } catch (error) {
    console.error('Get user activity summary error:', error);
    res.status(500).json({ message: 'Failed to get user activity summary' });
  }
};
