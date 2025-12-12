# Xenia Improved Reporting - Prototype Report

## Overview
This prototype demonstrates the comprehensive reporting structure for Engagement Games, tracking the complete player journey from qualification to prize redemption.

---

## Report Structure

### 1. Executive Summary Dashboard

**Date Range:** Dec 1, 2025 - Dec 12, 2025  
**Total Qualified Users:** 15,847  
**Total Games Launched:** 9,234 (58.3%)  
**Total Prizes Won:** 4,512 (48.9% of launches)  
**Total Prizes Accepted:** 3,891 (86.2% of wins)

#### Funnel Conversion Rates
```
Qualified Users             15,847  (100.0%)
  ↓
Tagged Users                15,623  ( 98.6%)  ❌ 224 failed
  ↓
Message Delivered            15,401  ( 98.6%)  ❌ 222 failed
  ↓
Message Opened               12,134  ( 78.8%)
  ↓
Game Launched (First Try)     9,234  ( 76.1%)
  ├─ Declined Initially       2,156  ( 17.8%)
  └─ No Action               744   (  6.1%)
  ↓
Re-triggered (from declines)  1,823  ( 84.5% of declines)
  ├─ Manual (Engagement Hub)   412  ( 22.6%)
  └─ Automatic Re-trigger    1,411  ( 77.4%)
  ↓
Game Launched (After Retry)   1,089  ( 59.7% of re-triggers)
  ↓
Total Game Completions        9,234  (100.0%)
  ├─ Prize Won                4,512  ( 48.9%)
  └─ Bad Luck                 4,722  ( 51.1%)
  ↓
Prize Accepted                3,891  ( 86.2% of wins)
Prize Declined                  621  ( 13.8% of wins)
```

---

## 2. Detailed Player Journey Report

### Sample Data Table

| Player ID | Qualification Date | Tag Assigned | Message Delivered | Message Opened | Initial Action | Re-trigger Type | Re-trigger Count | Game Launch Date | Game Result | Prize Type | Prize Action | Failure Point | Failure Reason |
|-----------|-------------------|--------------|-------------------|----------------|----------------|-----------------|------------------|------------------|-------------|------------|--------------|---------------|----------------|
| PLR-10001 | 2025-12-10 14:23 | ✅ | ✅ | ✅ | Launched | - | 0 | 2025-12-10 14:25 | Won | 10 Free Spins | Accepted | - | - |
| PLR-10002 | 2025-12-10 15:45 | ✅ | ✅ | ✅ | Declined | Auto (30min) | 1 | 2025-12-10 16:18 | Won | $5 Bonus | Accepted | - | - |
| PLR-10003 | 2025-12-10 16:12 | ✅ | ✅ | ✅ | Declined | Auto (next launch) | 1 | 2025-12-11 09:45 | Bad Luck | - | - | - | - |
| PLR-10004 | 2025-12-10 17:30 | ✅ | ✅ | ❌ | No Action | - | 0 | - | - | - | - | Message Open | Player offline for 24h |
| PLR-10005 | 2025-12-10 18:22 | ✅ | ❌ | ❌ | - | - | 0 | - | - | - | - | Message Delivery | IMS service timeout |
| PLR-10006 | 2025-12-10 19:05 | ✅ | ✅ | ✅ | Launched | - | 0 | 2025-12-10 19:07 | Won | 20 Free Spins | Declined | - | - |
| PLR-10007 | 2025-12-10 20:15 | ❌ | ❌ | ❌ | - | - | 0 | - | - | - | - | Tag Assignment | Player ineligible: duplicate tag |
| PLR-10008 | 2025-12-11 08:30 | ✅ | ✅ | ✅ | Declined | Manual (Eng. Hub) | 1 | 2025-12-11 14:22 | Won | $10 Bonus | Accepted | - | - |
| PLR-10009 | 2025-12-11 09:12 | ✅ | ✅ | ✅ | Launched | - | 0 | 2025-12-11 09:14 | - | - | - | Game Launch | EG service unavailable |
| PLR-10010 | 2025-12-11 10:45 | ✅ | ✅ | ✅ | Declined | Auto (30min) | 2 | 2025-12-11 11:51 | Bad Luck | - | - | - | - |

---

## 3. Failure Analysis Report

### Breakdown by Failure Point

| Failure Point | Count | % of Total | Top Reasons |
|---------------|-------|------------|-------------|
| Tag Assignment | 224 | 1.4% | Duplicate tag (45%), Player ineligible (32%), Service timeout (23%) |
| Message Delivery | 222 | 1.4% | IMS service timeout (58%), Player offline (31%), Invalid message template (11%) |
| Message Open | 3,267 | 21.2% | Player offline for 24h+ (67%), Message expired (33%) |
| Game Launch | 178 | 1.9% | EG service unavailable (42%), Client connectivity (38%), Invalid game config (20%) |
| Prize Redemption | 89 | 2.0% | Prize service timeout (56%), Inventory unavailable (34%), Account limitation (10%) |

### Detailed Failure Reasons

#### Tag Assignment Failures (224 total)
- **Duplicate Tag (101):** Player already has an active engagement game tag
- **Player Ineligible (72):** Player excluded due to responsible gaming limits or account status
- **Service Timeout (51):** Xenia tag service unavailable or timeout

#### Message Delivery Failures (222 total)
- **IMS Service Timeout (129):** IMS failed to deliver message within timeout period
- **Player Offline (69):** Player not connected when message attempted
- **Invalid Message Template (24):** Message template ID not found or corrupted

#### Game Launch Failures (178 total)
- **EG Service Unavailable (75):** Engagement Game service down or unresponsive
- **Client Connectivity (68):** Player lost connection during launch
- **Invalid Game Config (35):** Game configuration error or missing prize pool

---

## 4. Re-trigger Performance Report

### Re-trigger Statistics by Type

| Re-trigger Type | Triggered | Opened | Launched | Launch Rate | Avg Time to Launch |
|-----------------|-----------|--------|----------|-------------|-------------------|
| Auto - Time-based (30min) | 892 | 634 | 412 | 46.2% | 38 minutes |
| Auto - Time-based (60min) | 278 | 189 | 98 | 35.3% | 72 minutes |
| Auto - Next Game Launch | 241 | 241 | 167 | 69.3% | 4.2 hours |
| Manual - Engagement Hub | 412 | 412 | 412 | 100.0% | N/A (player initiated) |

### Re-trigger Attempt Distribution

| Attempts | Players | Success Rate |
|----------|---------|--------------|
| 0 (First Try) | 9,234 | 100% |
| 1 | 1,456 | 61.2% |
| 2 | 289 | 38.4% |
| 3 | 78 | 19.2% |
| 4+ | 0 | 0% (max retries reached) |

---

## 5. Prize Performance Report

### Prize Distribution and Acceptance

| Prize Type | Offered | Won | Accepted | Declined | Acceptance Rate | Redemption Failures |
|------------|---------|-----|----------|----------|-----------------|---------------------|
| Free Spins (10) | 8,900 | 1,356 | 1,189 | 167 | 87.7% | 23 |
| Free Spins (20) | 8,900 | 1,245 | 1,067 | 178 | 85.7% | 19 |
| Free Spins (50) | 4,450 | 623 | 558 | 65 | 89.6% | 8 |
| Bonus Cash ($5) | 6,675 | 645 | 589 | 56 | 91.3% | 15 |
| Bonus Cash ($10) | 4,450 | 421 | 362 | 59 | 86.0% | 14 |
| Bonus Cash ($25) | 1,335 | 222 | 126 | 96 | 56.8% | 10 |
| **Total** | **34,710** | **4,512** | **3,891** | **621** | **86.2%** | **89** |

### Prize Decline Reasons (Survey Data)

| Reason | Count | % |
|--------|-------|---|
| Wagering requirements too high | 289 | 46.5% |
| Not interested in current game | 174 | 28.0% |
| Prefer to save for later (unsupported) | 98 | 15.8% |
| No reason given | 60 | 9.7% |

---

## 6. Campaign-Level Report

### By Engagement Game Campaign

| Campaign ID | Campaign Name | Date Range | Qualified | Launched | Launch Rate | Won | Win Rate | Accepted | Accept Rate |
|-------------|---------------|------------|-----------|----------|-------------|-----|----------|----------|-------------|
| EG-2025-001 | Christmas Wheel | Dec 1-15 | 5,234 | 3,123 | 59.7% | 1,534 | 49.1% | 1,312 | 85.5% |
| EG-2025-002 | Welcome Bonus Game | Dec 1-31 | 4,567 | 2,891 | 63.3% | 1,423 | 49.2% | 1,234 | 86.7% |
| EG-2025-003 | Weekend Special | Dec 8-10 | 3,123 | 1,876 | 60.1% | 901 | 48.0% | 789 | 87.6% |
| EG-2025-004 | High Roller Reward | Dec 1-12 | 2,923 | 1,344 | 46.0% | 654 | 48.7% | 556 | 85.0% |

---

## 7. Technical Performance Report

### System Health Metrics

| Service | Uptime | Avg Response Time | Errors | Timeout Rate |
|---------|--------|-------------------|--------|--------------|
| Xenia Tag Service | 99.8% | 45ms | 51 | 0.3% |
| Player Journey | 99.9% | 32ms | 12 | 0.1% |
| IMS Message Service | 98.7% | 124ms | 153 | 1.3% |
| Engagement Game Service | 99.2% | 267ms | 75 | 0.8% |
| Prize Redemption Service | 99.4% | 89ms | 89 | 0.6% |

### Peak Load Analysis

| Time Window | Qualified Users | System Load | Avg Latency | Error Rate |
|-------------|----------------|-------------|-------------|------------|
| 00:00-06:00 | 1,234 | Low | 78ms | 0.2% |
| 06:00-12:00 | 3,456 | Medium | 124ms | 0.5% |
| 12:00-18:00 | 5,678 | High | 198ms | 1.2% |
| 18:00-24:00 | 5,479 | High | 203ms | 1.4% |

---

## 8. User Segment Analysis

### By Player Segment

| Segment | Qualified | Launched | Launch Rate | Won | Win Rate | Accepted | Accept Rate | Avg Re-triggers |
|---------|-----------|----------|-------------|-----|----------|----------|-------------|----------------|
| VIP | 2,341 | 1,876 | 80.1% | 934 | 49.8% | 845 | 90.5% | 0.3 |
| High Roller | 1,567 | 1,134 | 72.4% | 556 | 49.0% | 478 | 86.0% | 0.5 |
| Regular | 8,234 | 4,567 | 55.5% | 2,234 | 48.9% | 1,923 | 86.1% | 0.8 |
| New Player | 3,705 | 1,657 | 44.7% | 788 | 47.5% | 645 | 81.9% | 1.2 |

---

## 9. Export Data Schema

### CSV Export Format

```csv
player_id,qualification_timestamp,qualification_source,tag_assigned,tag_assignment_timestamp,tag_assignment_status,tag_failure_reason,message_delivered,message_delivery_timestamp,message_delivery_status,message_failure_reason,message_opened,message_open_timestamp,initial_action,initial_action_timestamp,retrigger_1_type,retrigger_1_timestamp,retrigger_1_opened,retrigger_2_type,retrigger_2_timestamp,retrigger_2_opened,retrigger_3_type,retrigger_3_timestamp,retrigger_3_opened,total_retriggers,final_launch_timestamp,game_launch_status,game_launch_failure_reason,game_result,prize_type,prize_value,prize_action,prize_action_timestamp,prize_decline_reason,redemption_status,redemption_failure_reason,campaign_id,campaign_name,player_segment,device_type,session_id
PLR-10001,2025-12-10T14:23:45Z,player_journey,true,2025-12-10T14:23:46Z,success,,true,2025-12-10T14:23:47Z,success,,true,2025-12-10T14:24:12Z,launched,2025-12-10T14:25:03Z,,,,,,,,,,0,2025-12-10T14:25:03Z,success,,won,free_spins,10,accepted,2025-12-10T14:25:34Z,,success,,EG-2025-001,Christmas Wheel,regular,mobile,sess_abc123
PLR-10002,2025-12-10T15:45:22Z,player_journey,true,2025-12-10T15:45:23Z,success,,true,2025-12-10T15:45:24Z,success,,true,2025-12-10T15:46:01Z,declined,2025-12-10T15:46:15Z,auto_time_30min,2025-12-10T16:16:15Z,true,,,,,,,1,2025-12-10T16:18:42Z,success,,won,bonus_cash,5,accepted,2025-12-10T16:19:08Z,,success,,EG-2025-002,Welcome Bonus Game,new_player,desktop,sess_def456
```

### JSON Export Format

```json
{
  "report_metadata": {
    "generated_at": "2025-12-12T10:30:00Z",
    "generated_by": "admin@casino.com",
    "date_range": {
      "start": "2025-12-01T00:00:00Z",
      "end": "2025-12-12T23:59:59Z"
    },
    "total_records": 15847,
    "filters_applied": []
  },
  "summary": {
    "total_qualified": 15847,
    "total_tagged": 15623,
    "total_message_delivered": 15401,
    "total_message_opened": 12134,
    "total_launched": 9234,
    "total_won": 4512,
    "total_accepted": 3891,
    "conversion_rate": 58.3,
    "win_rate": 48.9,
    "acceptance_rate": 86.2
  },
  "records": [
    {
      "player": {
        "id": "PLR-10001",
        "segment": "regular",
        "device_type": "mobile"
      },
      "journey": {
        "qualification": {
          "timestamp": "2025-12-10T14:23:45Z",
          "source": "player_journey"
        },
        "tag_assignment": {
          "assigned": true,
          "timestamp": "2025-12-10T14:23:46Z",
          "status": "success",
          "failure_reason": null
        },
        "message": {
          "delivered": true,
          "delivery_timestamp": "2025-12-10T14:23:47Z",
          "delivery_status": "success",
          "delivery_failure_reason": null,
          "opened": true,
          "open_timestamp": "2025-12-10T14:24:12Z"
        },
        "initial_action": {
          "action": "launched",
          "timestamp": "2025-12-10T14:25:03Z"
        },
        "retriggers": [],
        "game_launch": {
          "timestamp": "2025-12-10T14:25:03Z",
          "status": "success",
          "failure_reason": null
        },
        "game_result": {
          "result": "won",
          "prize": {
            "type": "free_spins",
            "value": 10,
            "description": "10 Free Spins"
          }
        },
        "prize_action": {
          "action": "accepted",
          "timestamp": "2025-12-10T14:25:34Z",
          "decline_reason": null,
          "redemption_status": "success",
          "redemption_failure_reason": null
        }
      },
      "campaign": {
        "id": "EG-2025-001",
        "name": "Christmas Wheel"
      },
      "session_id": "sess_abc123"
    }
  ]
}
```

---

## 10. Access Control & Permissions

### Report Access Levels

| User Type | Access Level | Available Reports | Export | Date Range | Filters |
|-----------|-------------|-------------------|--------|------------|---------|
| **Internal - Admin** | Full | All reports | CSV, JSON, PDF | Unlimited | All filters |
| **Internal - CRM Team** | View Only | 1-8 (excl. Technical) | CSV only | Last 90 days | Campaign, Segment |
| **External - Licensee Admin** | View Only | 1, 2, 4, 5, 6, 8 | CSV only | Last 30 days | Campaign only |
| **External - Licensee User** | View Only | 1, 6 (summary) | No export | Last 7 days | Campaign only |

---

## 11. Report Refresh & Data Sources

### Data Pipeline

```
┌─────────────────┐
│ Player Journey  │────┐
│   (Event Bus)   │    │
└─────────────────┘    │
                       │
┌─────────────────┐    │    ┌─────────────────┐    ┌─────────────────┐
│  Xenia Service  │────┼───>│  Data Pipeline  │───>│  Report Engine  │
│  (Tag Service)  │    │    │  (Real-time +   │    │   (Analytics)   │
└─────────────────┘    │    │   Batch ETL)    │    └─────────────────┘
                       │    └─────────────────┘             │
┌─────────────────┐    │                                    │
│  IMS Service    │────┘                                    │
│  (Messages)     │                                         │
└─────────────────┘                                         │
                                                            │
┌─────────────────┐                                         │
│ Engagement Game │─────────────────────────────────────────┘
│    Service      │
└─────────────────┘
```

### Refresh Schedule

- **Real-time Metrics:** Updated every 30 seconds (Executive Summary, current day data)
- **Hourly Rollup:** Aggregated every hour (Historical trends, funnel analysis)
- **Daily Rollup:** Complete dataset processed at 02:00 UTC (All reports, campaign performance)
- **On-Demand Export:** Generated on request (may take 2-5 minutes for large datasets)

### Data Retention

- **Detailed Records:** 90 days (full player journey data)
- **Aggregated Reports:** 2 years (summary statistics only)
- **Compliance Archive:** 7 years (encrypted, audit access only)

---

## 12. Integration with Mixpanel

### Event Tracking Schema

**Events tracked in Mixpanel for behavioral analysis:**

1. `eg_player_qualified` - Player Journey qualification event
2. `eg_tag_assigned` - Xenia tag assignment
3. `eg_message_delivered` - IMS message delivery
4. `eg_message_opened` - Player opens engagement message
5. `eg_launch_clicked` - Player clicks launch button
6. `eg_launch_declined` - Player declines initial launch
7. `eg_launch_deferred` - Player clicks "Maybe later"
8. `eg_retrigger_sent` - System sends re-trigger
9. `eg_retrigger_opened` - Player opens re-trigger message
10. `eg_manual_trigger` - Player manually triggers from Engagement Hub
11. `eg_game_started` - Game successfully loads
12. `eg_game_completed` - Game round completes
13. `eg_prize_won` - Player wins prize
14. `eg_prize_accepted` - Player accepts prize
15. `eg_prize_declined` - Player declines prize
16. `eg_error_occurred` - Any error in the funnel

**Cross-reference:** Mixpanel events feed into this reporting system. Reports provide aggregated views while Mixpanel provides detailed behavioral analysis.

---

## Report Wireframe (Backoffice UI)

```
╔══════════════════════════════════════════════════════════════════════╗
║  XENIA ENGAGEMENT GAMES - REPORTING DASHBOARD                        ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  [Date Range: Dec 1-12, 2025 ▼]  [Campaign: All ▼]  [Export ⬇]     ║
║                                                                      ║
║  ┌────────────────────────────────────────────────────────────────┐ ║
║  │  FUNNEL OVERVIEW                                               │ ║
║  │                                                                │ ║
║  │  15,847 ────────> 15,623 ────────> 15,401 ────────> 12,134   │ ║
║  │ Qualified  98.6%  Tagged   98.6%  Delivered  78.8%  Opened    │ ║
║  │                                                                │ ║
║  │  12,134 ─────────> 9,234 ─────────> 4,512 ─────────> 3,891   │ ║
║  │  Opened   76.1%  Launched   48.9%    Won     86.2%  Accepted  │ ║
║  └────────────────────────────────────────────────────────────────┘ ║
║                                                                      ║
║  ┌─────────────────────┐  ┌─────────────────────┐                   ║
║  │ TOTAL LAUNCHES      │  │ WIN RATE            │                   ║
║  │    9,234            │  │    48.9%            │                   ║
║  │ ▲ 12.3% vs last wk  │  │ ▼ 2.1% vs last wk   │                   ║
║  └─────────────────────┘  └─────────────────────┘                   ║
║                                                                      ║
║  ┌────────────────────────────────────────────────────────────────┐ ║
║  │ [Executive Summary] [Detailed Journey] [Failures] [Retriggers] │ ║
║  │ [Prize Performance] [Campaigns] [Segments] [Technical]         │ ║
║  └────────────────────────────────────────────────────────────────┘ ║
║                                                                      ║
║  DETAILED PLAYER JOURNEY                                             ║
║  ┌────────────────────────────────────────────────────────────────┐ ║
║  │ Search: [____________]  Filters: [Status ▼] [Segment ▼]       │ ║
║  └────────────────────────────────────────────────────────────────┘ ║
║                                                                      ║
║  Player ID │ Date       │ Status    │ Result │ Prize  │ Action    ║
║  ─────────────────────────────────────────────────────────────────  ║
║  PLR-10001 │ Dec 10 14:23 │ Complete ✓│ Won   │ 10 FS  │ Accepted  ║
║  PLR-10002 │ Dec 10 15:45 │ Complete ✓│ Won   │ $5     │ Accepted  ║
║  PLR-10003 │ Dec 10 16:12 │ Complete ✓│ Loss  │ -      │ -         ║
║  PLR-10004 │ Dec 10 17:30 │ Failed ✗  │ -     │ -      │ -         ║
║  PLR-10005 │ Dec 10 18:22 │ Failed ✗  │ -     │ -      │ -         ║
║                                                                      ║
║  [< Previous]  Page 1 of 1,585  [Next >]                            ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Key Features Summary

✅ **Complete Funnel Tracking** - Every step from qualification to prize acceptance  
✅ **Failure Analysis** - Detailed reasons for each failure point  
✅ **Re-trigger Tracking** - Manual vs automatic, with performance metrics  
✅ **Prize Performance** - Win rates, acceptance rates, decline reasons  
✅ **Multi-source Data** - Integration with Player Journey, IMS, and Xenia  
✅ **Access Control** - Different views for internal and external users  
✅ **Export Capability** - CSV and JSON formats for further analysis  
✅ **Real-time Updates** - Live dashboard with configurable refresh rates  
✅ **Campaign Performance** - Compare multiple campaigns side-by-side  
✅ **Mixpanel Integration** - Behavioral tracking complements aggregate reporting  

---

## Next Steps for Implementation

1. **Database Schema Design** - Create data model for storing all tracking events
2. **API Development** - Build endpoints for data ingestion from Player Journey, IMS, Xenia
3. **ETL Pipeline** - Implement real-time and batch processing
4. **Report Engine** - Develop aggregation logic and query optimization
5. **UI Development** - Build backoffice interface with filtering and export
6. **Access Control** - Implement role-based permissions system
7. **Testing** - Validate data accuracy across all funnel stages
8. **Documentation** - Create user guides for internal and external users
