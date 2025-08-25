import express from 'express';
import PageVisit from '../models/PageVisit.js';

const router = express.Router();

// Track page visit
router.post('/track', async (req, res) => {
  try {
    const { 
      pageUrl, 
      pageName, 
      visitorId, 
      userAgent, 
      referrer, 
      sessionId 
    } = req.body;

    // Get IP address from request
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];

    // Check if this is a returning visitor
    const existingVisit = await PageVisit.findOne({ visitorId });
    const isReturning = !!existingVisit;

    const pageVisit = new PageVisit({
      pageUrl: pageUrl || '/chat/sachin',
      pageName: pageName || 'Sachin Chat',
      visitorId,
      userAgent,
      referrer,
      ipAddress,
      sessionId,
      isReturning
    });

    await pageVisit.save();

    res.status(201).json({ 
      success: true, 
      message: 'Visit tracked successfully',
      isReturning 
    });
  } catch (error) {
    console.error('Error tracking page visit:', error);
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// Get visit statistics
router.get('/stats', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case '24h':
        dateFilter = { timestamp: { $gte: new Date(now - 24 * 60 * 60 * 1000) } };
        break;
      case '7d':
        dateFilter = { timestamp: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case '30d':
        dateFilter = { timestamp: { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) } };
        break;
      case 'all':
        dateFilter = {};
        break;
      default:
        dateFilter = { timestamp: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
    }

    // Total visits
    const totalVisits = await PageVisit.countDocuments({ ...dateFilter, pageUrl: '/chat/sachin' });
    
    // Unique visitors
    const uniqueVisitors = await PageVisit.distinct('visitorId', { ...dateFilter, pageUrl: '/chat/sachin' });
    
    // New vs returning visitors
    const newVisitors = await PageVisit.countDocuments({ ...dateFilter, pageUrl: '/chat/sachin', isReturning: false });
    const returningVisitors = await PageVisit.countDocuments({ ...dateFilter, pageUrl: '/chat/sachin', isReturning: true });
    
    // Daily visits for the last 7 days
    const dailyVisits = await PageVisit.aggregate([
      { $match: { ...dateFilter, pageUrl: '/chat/sachin' } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top referrers
    const topReferrers = await PageVisit.aggregate([
      { $match: { ...dateFilter, pageUrl: '/chat/sachin', referrer: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: "$referrer",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      period,
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
      newVisitors,
      returningVisitors,
      dailyVisits,
      topReferrers
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get recent visits
router.get('/recent', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const recentVisits = await PageVisit.find({ pageUrl: '/chat/sachin' })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.json(recentVisits);
  } catch (error) {
    console.error('Error fetching recent visits:', error);
    res.status(500).json({ error: 'Failed to fetch recent visits' });
  }
});

export default router;
