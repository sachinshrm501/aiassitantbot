import mongoose from 'mongoose';

const pageVisitSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
    default: '/chat/sachin'
  },
  pageName: {
    type: String,
    required: true,
    default: 'Sachin Chat'
  },
  visitorId: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: false
  },
  referrer: {
    type: String,
    required: false
  },
  ipAddress: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: false
  },
  isReturning: {
    type: Boolean,
    default: false
  }
});

// Index for efficient queries
pageVisitSchema.index({ pageUrl: 1, timestamp: -1 });
pageVisitSchema.index({ visitorId: 1 });
pageVisitSchema.index({ timestamp: -1 });

const PageVisit = mongoose.model('PageVisit', pageVisitSchema);

export default PageVisit;
