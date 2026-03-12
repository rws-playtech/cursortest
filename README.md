# Xenia Improved Reporting - Prototype

## Overview

This repository contains a comprehensive prototype for the Xenia Engagement Games Improved Reporting system. The prototype addresses all requirements for tracking player engagement game journeys from qualification through prize redemption, including failure analysis and retrigger tracking.

## What's Included

### 1. **Report Prototype** (`REPORT_PROTOTYPE.md`)
A complete prototype showing:
- Executive summary dashboard with key metrics
- Detailed player journey tracking
- Failure analysis by stage and reason
- Re-trigger performance metrics
- Prize performance and acceptance rates
- Campaign-level comparisons
- Technical performance metrics
- Data export schemas (CSV and JSON)
- Access control specifications
- Mixpanel integration plan

### 2. **Database Schema** (`database_schema.sql`)
PostgreSQL database design including:
- Event tracking tables for each funnel stage
- Reference tables for campaigns and player segments
- Materialized views for efficient reporting
- Indexes for performance optimization
- Automatic refresh functions

### 3. **API Specification** (`api_specification.yaml`)
OpenAPI 3.0 specification with:
- RESTful endpoints for all report types
- Event ingestion endpoints
- Export functionality with job tracking
- Analytics and aggregation endpoints
- Authentication and authorization
- Request/response schemas

### 4. **UI Mockup** (`report_ui_mockup.html`)
Interactive HTML mockup demonstrating:
- Dashboard layout and design
- Funnel visualization
- Filterable data tables
- KPI cards with trends
- Failure breakdown cards
- Responsive design

## Key Features

### Complete Funnel Tracking
The system tracks every step of the engagement game journey:
1. **Player Qualification** - When and how the player qualified
2. **Tag Assignment** - Success/failure of tagging (from Xenia)
3. **Message Delivery** - Success/failure of message delivery (from IMS)
4. **Message Open** - Player engagement with the message
5. **Offer Lifecycle** - Offer availability state (available/consumed/lost/expired) to support "Maybe later"
6. **Initial Action** - Launch, decline, defer, or no action
7. **Re-triggers** - Automatic or manual re-engagement attempts (including follow-ups after launch failures)
8. **Game Launch** - Success/failure of game initialization (with recovery tracking)
9. **Game Result** - Win or bad luck outcome
10. **Prize Action** - Accept or decline prize
11. **Prize Redemption** - Success/failure of prize delivery

### Failure Analysis
Detailed tracking of failures at each stage:
- **Tag Assignment Failures**: Duplicate tags, ineligibility, service timeouts
- **Message Delivery Failures**: IMS timeouts, player offline, invalid templates
- **Game Launch Failures**: Service unavailable, connectivity issues, config errors
- **Prize Redemption Failures**: Service timeouts, inventory issues, account limitations

### Re-trigger Tracking
Comprehensive tracking of re-engagement:
- **Automatic Time-based**: Re-trigger after specified duration (e.g., 30min, 60min)
- **Automatic Event-based**: Re-trigger on next game launch
- **Manual**: Player-initiated from Engagement Hub
- Performance metrics: open rates, launch rates, time to action

### Prize Performance
Detailed prize analytics:
- Prize distribution by type and value
- Win rates and acceptance rates
- Decline reasons (survey data)
- Redemption success/failure tracking

### Data Sources Integration
The system integrates data from:
- **Player Journey** - Qualification events and triggers
- **Xenia** - Tag assignment and game configuration
- **IMS** - Engagement message delivery
- **Engagement Game Service** - Game launch and results
- **Prize Service** - Prize redemption

### Access Control
Role-based access with different views:
- **Internal Admin** - Full access to all reports and technical metrics
- **Internal CRM Team** - Business reports with limited technical data
- **External Licensee Admin** - Campaign performance and player data
- **External Licensee User** - Summary reports only

### Export Capabilities
Multiple export formats:
- **CSV** - For Excel and data analysis
- **JSON** - For system integration and API consumption
- Configurable field selection
- Large dataset handling with job queue

## Requirements Coverage

### ✅ Game Launch Success or Failure
- Tracked in `game_launch_events` table
- Detailed failure reasons and categorization
- Success metrics and performance tracking

### ✅ Failure Reasons
- Comprehensive failure analysis at every stage
- Categorized by failure type and service
- Top failure reasons highlighted in reports

### ✅ Multi-source Data Integration
- IMS integration for message delivery
- Player Journey integration for qualification
- Xenia integration for tag assignment
- Engagement Game service for results

### ✅ Consolidated Report Access
- Internal users (Casino CRM team) - business reports
- External users (licensee users) - campaign reports
- Role-based access control
- Backoffice UI for easy access

### ✅ Re-triggering Events
- Manual vs automatic tracking
- Re-trigger type classification
- Performance metrics by re-trigger type
- Attempt sequence tracking

### ✅ Prize Details
- Prize type, value, and description
- Acceptance/decline tracking
- Decline reason collection
- Redemption status and failures

### ✅ EG Failure Status & Follow-up
- Game launch failure tracking
- Re-trigger after failure
- Follow-up action effectiveness

### ✅ Complete Funnel Visibility
All steps tracked from qualification to redemption:
1. User qualifies ✓
2. User awarded tag ✓
3. User served engagement message ✓
4. Player launches or declines ✓
5. "Maybe later" option tracking ✓
6. Manual trigger from Engagement Hub ✓
7. Automatic re-trigger ✓
8. Game result (win/bad luck) ✓
9. Prize acceptance/decline ✓
10. Return to activity ✓

### ✅ Mixpanel Integration
- Event schema defined for behavioral tracking
- Cross-reference between systems
- Behavioral analysis in Mixpanel
- Aggregate reporting in Xenia

### ✅ Backoffice Access
- Dashboard UI prototype provided
- Export functionality
- Filter and search capabilities
- Real-time and historical data

## Technical Architecture

### Data Pipeline
```
Player Journey → Event Bus → Data Pipeline → Report Engine
Xenia Service → Event Bus → Data Pipeline → Report Engine
IMS Service → Event Bus → Data Pipeline → Report Engine
EG Service → Event Bus → Data Pipeline → Report Engine
```

### Refresh Schedule
- **Real-time**: Executive dashboard (30 seconds)
- **Hourly**: Aggregated metrics and trends
- **Daily**: Complete dataset and campaign reports
- **On-demand**: Exports (2-5 minutes)

### Performance Optimization
- Materialized views for complex queries
- Indexed columns for fast filtering
- Partitioning for large datasets
- Query result caching

## How to Use This Prototype

### For Product Managers
1. Review `REPORT_PROTOTYPE.md` to understand report structure and metrics
2. Open `report_ui_mockup.html` in a browser to see the visual design
3. Provide feedback on metrics, layout, and user experience

### For Engineers
1. Review `database_schema.sql` for data model and implementation
2. Review `api_specification.yaml` for endpoint design
3. Use as foundation for implementation

### For Stakeholders
1. Review the funnel visualization in the prototype
2. Understand failure tracking and analysis capabilities
3. Review access control and permissions model

## Next Steps for Implementation

1. **Database Setup**
   - Deploy schema to PostgreSQL
   - Set up materialized view refresh jobs
   - Configure data retention policies

2. **API Development**
   - Implement REST endpoints per specification
   - Set up authentication and authorization
   - Build event ingestion pipeline

3. **ETL Pipeline**
   - Real-time event processing
   - Batch aggregation jobs
   - Data quality validation

4. **UI Development**
   - Build React/Vue.js dashboard based on mockup
   - Implement filtering and export functionality
   - Create responsive mobile views

5. **Integration**
   - Connect to Player Journey event bus
   - Integrate IMS message tracking
   - Connect Xenia tag service
   - Integrate EG service events

6. **Testing**
   - Data accuracy validation
   - Performance testing with large datasets
   - User acceptance testing
   - Security and permission testing

7. **Documentation**
   - User guides for internal and external users
   - API documentation for developers
   - Data dictionary and field definitions
   - Troubleshooting guides

## Questions or Feedback?

This is a prototype designed to validate requirements and design before implementation. Please review and provide feedback on:
- Report structure and metrics
- User interface design
- Data model completeness
- API design
- Missing requirements

---

**Version**: 1.0.0  
**Date**: December 12, 2025  
**Status**: Prototype - Ready for Review
