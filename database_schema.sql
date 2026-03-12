-- Xenia Improved Reporting - Database Schema
-- PostgreSQL Schema Design

-- =====================================================
-- Core Tables
-- =====================================================

-- Player Journey Events
CREATE TABLE player_journey_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    qualification_source VARCHAR(100),
    campaign_id VARCHAR(50),
    session_id VARCHAR(100),
    device_type VARCHAR(50),
    player_segment VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_event_timestamp (event_timestamp),
    INDEX idx_campaign_id (campaign_id),
    INDEX idx_event_type (event_type)
);

-- Tag Assignment Events
CREATE TABLE tag_assignment_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    tag_id VARCHAR(100) NOT NULL,
    assignment_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    assignment_status VARCHAR(50) NOT NULL, -- success, failed
    failure_reason VARCHAR(255),
    failure_category VARCHAR(100),
    service_response_time_ms INTEGER,
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_assignment_timestamp (assignment_timestamp),
    INDEX idx_assignment_status (assignment_status),
    INDEX idx_campaign_id (campaign_id)
);

-- Message Delivery Events
CREATE TABLE message_delivery_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    message_id VARCHAR(100) NOT NULL,
    delivery_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    delivery_status VARCHAR(50) NOT NULL, -- success, failed
    delivery_failure_reason VARCHAR(255),
    delivery_failure_category VARCHAR(100),
    message_template_id VARCHAR(100),
    ims_response_time_ms INTEGER,
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_delivery_timestamp (delivery_timestamp),
    INDEX idx_delivery_status (delivery_status),
    INDEX idx_campaign_id (campaign_id)
);

-- Message Open Events
CREATE TABLE message_open_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    message_id VARCHAR(100) NOT NULL,
    open_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    session_id VARCHAR(100),
    device_type VARCHAR(50),
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_message_id (message_id),
    INDEX idx_open_timestamp (open_timestamp),
    INDEX idx_campaign_id (campaign_id)
);

-- Engagement Game Offer Lifecycle (new "Maybe later" support)
-- Represents the availability window of an engagement game for a player.
CREATE TABLE engagement_game_offers (
    id BIGSERIAL PRIMARY KEY,
    offer_id VARCHAR(100) NOT NULL, -- stable id shared across systems (Xenia/IMS/EG)
    player_id VARCHAR(50) NOT NULL,
    campaign_id VARCHAR(50),
    offer_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    offer_expires_at TIMESTAMP WITH TIME ZONE,
    offer_state VARCHAR(50) NOT NULL, -- available, consumed, lost, expired
    offer_lost_reason VARCHAR(255), -- declined, expired, superseded, max_retriggers_reached, etc.
    offer_consumed_at TIMESTAMP WITH TIME ZONE,
    last_state_change_at TIMESTAMP WITH TIME ZONE,
    message_id VARCHAR(100), -- IMS message that advertised the offer (if applicable)
    source_service VARCHAR(100), -- player_journey, ims, xenia, eg_service
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    INDEX idx_offer_id (offer_id),
    INDEX idx_player_id (player_id),
    INDEX idx_campaign_id (campaign_id),
    INDEX idx_offer_created_at (offer_created_at),
    INDEX idx_offer_state (offer_state)
);

-- Player Action Events
CREATE TABLE player_action_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    action_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- launched, declined, deferred
    trigger_type VARCHAR(50), -- initial, auto_time, auto_next_launch, manual_hub
    retrigger_count INTEGER DEFAULT 0,
    session_id VARCHAR(100),
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_action_timestamp (action_timestamp),
    INDEX idx_action_type (action_type),
    INDEX idx_trigger_type (trigger_type),
    INDEX idx_campaign_id (campaign_id)
);

-- Retrigger Events
CREATE TABLE retrigger_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    retrigger_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    retrigger_type VARCHAR(50) NOT NULL, -- auto_time_30min, auto_time_60min, auto_next_launch, manual_hub
    retrigger_sequence INTEGER NOT NULL, -- 1, 2, 3, etc.
    retrigger_opened BOOLEAN DEFAULT FALSE,
    open_timestamp TIMESTAMP WITH TIME ZONE,
    original_qualification_timestamp TIMESTAMP WITH TIME ZONE,
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_retrigger_timestamp (retrigger_timestamp),
    INDEX idx_retrigger_type (retrigger_type),
    INDEX idx_campaign_id (campaign_id)
);

-- Game Launch Events
CREATE TABLE game_launch_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    launch_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    launch_status VARCHAR(50) NOT NULL, -- success, failed
    launch_failure_reason VARCHAR(255),
    launch_failure_category VARCHAR(100),
    game_service_response_time_ms INTEGER,
    is_retry BOOLEAN DEFAULT FALSE,
    retry_count INTEGER DEFAULT 0,
    session_id VARCHAR(100),
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_launch_timestamp (launch_timestamp),
    INDEX idx_launch_status (launch_status),
    INDEX idx_campaign_id (campaign_id)
);

-- Game Result Events
CREATE TABLE game_result_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    game_completion_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    game_result VARCHAR(50) NOT NULL, -- won, bad_luck
    prize_type VARCHAR(100), -- free_spins, bonus_cash, physical_prize, etc.
    prize_value DECIMAL(10, 2),
    prize_description VARCHAR(255),
    prize_id VARCHAR(100),
    session_id VARCHAR(100),
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_game_completion_timestamp (game_completion_timestamp),
    INDEX idx_game_result (game_result),
    INDEX idx_prize_type (prize_type),
    INDEX idx_campaign_id (campaign_id)
);

-- Prize Action Events
CREATE TABLE prize_action_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    action_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    prize_id VARCHAR(100) NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- accepted, declined
    decline_reason VARCHAR(255),
    decline_category VARCHAR(100),
    redemption_status VARCHAR(50), -- success, failed, pending
    redemption_failure_reason VARCHAR(255),
    redemption_failure_category VARCHAR(100),
    prize_type VARCHAR(100),
    prize_value DECIMAL(10, 2),
    session_id VARCHAR(100),
    campaign_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_action_timestamp (action_timestamp),
    INDEX idx_action_type (action_type),
    INDEX idx_redemption_status (redemption_status),
    INDEX idx_campaign_id (campaign_id)
);

-- System Error Events
CREATE TABLE system_error_events (
    id BIGSERIAL PRIMARY KEY,
    player_id VARCHAR(50),
    error_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    error_stage VARCHAR(100) NOT NULL, -- tag_assignment, message_delivery, game_launch, etc.
    error_code VARCHAR(50),
    error_message TEXT,
    error_category VARCHAR(100),
    service_name VARCHAR(100),
    stack_trace TEXT,
    campaign_id VARCHAR(50),
    session_id VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_player_id (player_id),
    INDEX idx_error_timestamp (error_timestamp),
    INDEX idx_error_stage (error_stage),
    INDEX idx_error_category (error_category),
    INDEX idx_campaign_id (campaign_id)
);

-- =====================================================
-- Reference Tables
-- =====================================================

-- Campaigns
CREATE TABLE campaigns (
    campaign_id VARCHAR(50) PRIMARY KEY,
    campaign_name VARCHAR(255) NOT NULL,
    campaign_description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) NOT NULL, -- active, paused, completed
    game_type VARCHAR(100),
    target_segment VARCHAR(100),
    retrigger_config JSONB, -- Configuration for retrigger rules
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_status (status),
    INDEX idx_start_date (start_date),
    INDEX idx_end_date (end_date)
);

-- Prize Pool Configuration
CREATE TABLE prize_pool_config (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(50) NOT NULL,
    prize_type VARCHAR(100) NOT NULL,
    prize_value DECIMAL(10, 2),
    prize_description VARCHAR(255),
    quantity_total INTEGER,
    quantity_remaining INTEGER,
    win_probability DECIMAL(5, 2), -- Percentage: 0.00 to 100.00
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id),
    INDEX idx_campaign_id (campaign_id),
    INDEX idx_prize_type (prize_type)
);

-- Player Segments
CREATE TABLE player_segments (
    player_id VARCHAR(50) PRIMARY KEY,
    segment_name VARCHAR(100) NOT NULL,
    vip_level INTEGER,
    lifetime_value DECIMAL(12, 2),
    registration_date TIMESTAMP WITH TIME ZONE,
    last_active_date TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_segment_name (segment_name),
    INDEX idx_vip_level (vip_level)
);

-- =====================================================
-- Materialized Views for Reporting
-- =====================================================

-- Complete Player Journey View
CREATE MATERIALIZED VIEW mv_complete_player_journey AS
SELECT 
    pje.player_id,
    pje.campaign_id,
    c.campaign_name,
    ps.segment_name AS player_segment,
    
    -- Qualification
    pje.event_timestamp AS qualification_timestamp,
    pje.qualification_source,

    -- Offer Lifecycle (availability window for "Maybe later")
    (SELECT ego.offer_id
     FROM engagement_game_offers ego
     WHERE ego.player_id = pje.player_id AND ego.campaign_id = pje.campaign_id
     ORDER BY ego.offer_created_at DESC
     LIMIT 1) AS offer_id,
    (SELECT ego.offer_state
     FROM engagement_game_offers ego
     WHERE ego.player_id = pje.player_id AND ego.campaign_id = pje.campaign_id
     ORDER BY ego.offer_created_at DESC
     LIMIT 1) AS offer_state,
    (SELECT ego.offer_created_at
     FROM engagement_game_offers ego
     WHERE ego.player_id = pje.player_id AND ego.campaign_id = pje.campaign_id
     ORDER BY ego.offer_created_at DESC
     LIMIT 1) AS offer_created_at,
    (SELECT ego.offer_expires_at
     FROM engagement_game_offers ego
     WHERE ego.player_id = pje.player_id AND ego.campaign_id = pje.campaign_id
     ORDER BY ego.offer_created_at DESC
     LIMIT 1) AS offer_expires_at,
    (SELECT ego.offer_lost_reason
     FROM engagement_game_offers ego
     WHERE ego.player_id = pje.player_id AND ego.campaign_id = pje.campaign_id
     ORDER BY ego.offer_created_at DESC
     LIMIT 1) AS offer_lost_reason,
    
    -- Tag Assignment
    tae.assignment_timestamp AS tag_assignment_timestamp,
    tae.assignment_status AS tag_assignment_status,
    tae.failure_reason AS tag_failure_reason,
    tae.failure_category AS tag_failure_category,
    
    -- Message Delivery
    mde.message_id,
    mde.delivery_timestamp AS message_delivery_timestamp,
    mde.delivery_status AS message_delivery_status,
    mde.delivery_failure_reason AS message_delivery_failure_reason,
    mde.delivery_failure_category AS message_delivery_failure_category,
    
    -- Message Open
    moe.open_timestamp AS message_open_timestamp,
    CASE WHEN moe.id IS NOT NULL THEN TRUE ELSE FALSE END AS message_opened,
    
    -- Initial Action
    pae.action_type AS initial_action,
    pae.action_timestamp AS initial_action_timestamp,
    
    -- Retriggers
    (SELECT COUNT(*) FROM retrigger_events re WHERE re.player_id = pje.player_id AND re.campaign_id = pje.campaign_id) AS retrigger_count,
    (SELECT json_agg(json_build_object(
        'type', retrigger_type,
        'timestamp', retrigger_timestamp,
        'sequence', retrigger_sequence,
        'opened', retrigger_opened
    ) ORDER BY retrigger_sequence) 
    FROM retrigger_events re 
    WHERE re.player_id = pje.player_id AND re.campaign_id = pje.campaign_id) AS retriggers,
    
    -- Game Launch (last attempt + aggregates)
    (SELECT COUNT(*) FROM game_launch_events gl
     WHERE gl.player_id = pje.player_id AND gl.campaign_id = pje.campaign_id) AS game_launch_attempt_count,
    (SELECT COUNT(*) FROM game_launch_events gl
     WHERE gl.player_id = pje.player_id AND gl.campaign_id = pje.campaign_id AND gl.launch_status = 'failed') AS game_launch_failure_count,
    (SELECT CASE
        WHEN EXISTS (
          SELECT 1 FROM game_launch_events glf
          WHERE glf.player_id = pje.player_id AND glf.campaign_id = pje.campaign_id AND glf.launch_status = 'failed'
        )
        AND EXISTS (
          SELECT 1 FROM game_launch_events gls
          WHERE gls.player_id = pje.player_id AND gls.campaign_id = pje.campaign_id AND gls.launch_status = 'success'
          AND gls.launch_timestamp > (
            SELECT MIN(glf2.launch_timestamp) FROM game_launch_events glf2
            WHERE glf2.player_id = pje.player_id AND glf2.campaign_id = pje.campaign_id AND glf2.launch_status = 'failed'
          )
        )
        THEN TRUE ELSE FALSE
      END) AS game_launch_recovered_after_failure,
    (SELECT gl.launch_timestamp FROM game_launch_events gl
     WHERE gl.player_id = pje.player_id AND gl.campaign_id = pje.campaign_id
     ORDER BY gl.launch_timestamp DESC
     LIMIT 1) AS game_launch_timestamp,
    (SELECT gl.launch_status FROM game_launch_events gl
     WHERE gl.player_id = pje.player_id AND gl.campaign_id = pje.campaign_id
     ORDER BY gl.launch_timestamp DESC
     LIMIT 1) AS game_launch_status,
    (SELECT gl.launch_failure_reason FROM game_launch_events gl
     WHERE gl.player_id = pje.player_id AND gl.campaign_id = pje.campaign_id
     ORDER BY gl.launch_timestamp DESC
     LIMIT 1) AS game_launch_failure_reason,
    (SELECT gl.launch_failure_category FROM game_launch_events gl
     WHERE gl.player_id = pje.player_id AND gl.campaign_id = pje.campaign_id
     ORDER BY gl.launch_timestamp DESC
     LIMIT 1) AS game_launch_failure_category,
    
    -- Game Result
    gre.game_result,
    gre.prize_type,
    gre.prize_value,
    gre.prize_description,
    
    -- Prize Action
    prae.action_type AS prize_action,
    prae.action_timestamp AS prize_action_timestamp,
    prae.decline_reason AS prize_decline_reason,
    prae.redemption_status AS prize_redemption_status,
    prae.redemption_failure_reason AS prize_redemption_failure_reason,
    
    -- Session Info
    pje.session_id,
    pje.device_type,
    
    -- Timestamps
    pje.created_at AS record_created_at
    
FROM player_journey_events pje
LEFT JOIN campaigns c ON pje.campaign_id = c.campaign_id
LEFT JOIN player_segments ps ON pje.player_id = ps.player_id
LEFT JOIN tag_assignment_events tae ON pje.player_id = tae.player_id AND pje.campaign_id = tae.campaign_id
LEFT JOIN message_delivery_events mde ON pje.player_id = mde.player_id AND pje.campaign_id = mde.campaign_id
LEFT JOIN message_open_events moe ON pje.player_id = moe.player_id AND mde.message_id = moe.message_id
LEFT JOIN player_action_events pae ON pje.player_id = pae.player_id AND pje.campaign_id = pae.campaign_id AND pae.trigger_type = 'initial'
LEFT JOIN game_result_events gre ON pje.player_id = gre.player_id AND pje.campaign_id = gre.campaign_id
LEFT JOIN prize_action_events prae ON pje.player_id = prae.player_id AND pje.campaign_id = prae.campaign_id AND gre.prize_id = prae.prize_id;

CREATE INDEX idx_mv_cpj_player_id ON mv_complete_player_journey(player_id);
CREATE INDEX idx_mv_cpj_campaign_id ON mv_complete_player_journey(campaign_id);
CREATE INDEX idx_mv_cpj_qualification_timestamp ON mv_complete_player_journey(qualification_timestamp);

-- Funnel Aggregation View
CREATE MATERIALIZED VIEW mv_funnel_aggregation AS
SELECT
    campaign_id,
    DATE_TRUNC('day', qualification_timestamp) AS report_date,
    player_segment,
    
    COUNT(DISTINCT player_id) AS total_qualified,
    COUNT(DISTINCT CASE WHEN tag_assignment_status = 'success' THEN player_id END) AS total_tagged,
    COUNT(DISTINCT CASE WHEN message_delivery_status = 'success' THEN player_id END) AS total_message_delivered,
    COUNT(DISTINCT CASE WHEN message_opened = TRUE THEN player_id END) AS total_message_opened,
    
    -- Initial Decision (supports "Maybe later")
    COUNT(DISTINCT CASE WHEN initial_action = 'launched' THEN player_id END) AS total_launched_immediately,
    COUNT(DISTINCT CASE WHEN initial_action = 'deferred' THEN player_id END) AS total_deferred,
    COUNT(DISTINCT CASE WHEN initial_action = 'declined' THEN player_id END) AS total_initial_declined,
    
    -- Offer Lifecycle
    COUNT(DISTINCT CASE WHEN offer_state = 'available' THEN player_id END) AS total_offer_available,
    COUNT(DISTINCT CASE WHEN offer_state = 'consumed' THEN player_id END) AS total_offer_consumed,
    COUNT(DISTINCT CASE WHEN offer_state = 'lost' THEN player_id END) AS total_offer_lost,
    COUNT(DISTINCT CASE WHEN offer_state = 'expired' THEN player_id END) AS total_offer_expired,

    COUNT(DISTINCT CASE WHEN game_launch_status = 'success' THEN player_id END) AS total_launched,
    COUNT(DISTINCT CASE WHEN game_result = 'won' THEN player_id END) AS total_won,
    COUNT(DISTINCT CASE WHEN prize_action = 'accepted' THEN player_id END) AS total_accepted,
    COUNT(DISTINCT CASE WHEN prize_action = 'declined' THEN player_id END) AS total_declined,
    
    -- Failure Counts
    COUNT(DISTINCT CASE WHEN tag_assignment_status = 'failed' THEN player_id END) AS tag_failures,
    COUNT(DISTINCT CASE WHEN message_delivery_status = 'failed' THEN player_id END) AS message_delivery_failures,
    COUNT(DISTINCT CASE WHEN game_launch_failure_count > 0 THEN player_id END) AS game_launch_failures,
    
    -- Retrigger Stats
    SUM(retrigger_count) AS total_retriggers,
    AVG(retrigger_count) AS avg_retriggers_per_player

FROM mv_complete_player_journey
GROUP BY campaign_id, DATE_TRUNC('day', qualification_timestamp), player_segment;

CREATE INDEX idx_mv_fa_campaign_id ON mv_funnel_aggregation(campaign_id);
CREATE INDEX idx_mv_fa_report_date ON mv_funnel_aggregation(report_date);

-- Failure Analysis View
CREATE MATERIALIZED VIEW mv_failure_analysis AS
SELECT
    campaign_id,
    DATE_TRUNC('day', qualification_timestamp) AS report_date,
    'Tag Assignment' AS failure_stage,
    tag_failure_category AS failure_category,
    tag_failure_reason AS failure_reason,
    COUNT(*) AS failure_count
FROM mv_complete_player_journey
WHERE tag_assignment_status = 'failed'
GROUP BY campaign_id, DATE_TRUNC('day', qualification_timestamp), tag_failure_category, tag_failure_reason

UNION ALL

SELECT
    campaign_id,
    DATE_TRUNC('day', qualification_timestamp) AS report_date,
    'Message Delivery' AS failure_stage,
    message_delivery_failure_category AS failure_category,
    message_delivery_failure_reason AS failure_reason,
    COUNT(*) AS failure_count
FROM mv_complete_player_journey
WHERE message_delivery_status = 'failed'
GROUP BY campaign_id, DATE_TRUNC('day', qualification_timestamp), message_delivery_failure_category, message_delivery_failure_reason

UNION ALL

SELECT
    campaign_id,
    DATE_TRUNC('day', qualification_timestamp) AS report_date,
    'Game Launch' AS failure_stage,
    game_launch_failure_category AS failure_category,
    game_launch_failure_reason AS failure_reason,
    COUNT(*) AS failure_count
FROM mv_complete_player_journey
WHERE game_launch_failure_count > 0
GROUP BY campaign_id, DATE_TRUNC('day', qualification_timestamp), game_launch_failure_category, game_launch_failure_reason

UNION ALL

SELECT
    campaign_id,
    DATE_TRUNC('day', qualification_timestamp) AS report_date,
    'Prize Redemption' AS failure_stage,
    prize_redemption_failure_reason AS failure_category,
    prize_redemption_failure_reason AS failure_reason,
    COUNT(*) AS failure_count
FROM mv_complete_player_journey
WHERE prize_redemption_status = 'failed'
GROUP BY campaign_id, DATE_TRUNC('day', qualification_timestamp), prize_redemption_failure_reason

-- Offer Lifecycle "failures" (lost/expired availability)
UNION ALL

SELECT
    campaign_id,
    DATE_TRUNC('day', qualification_timestamp) AS report_date,
    'Offer Lifecycle' AS failure_stage,
    offer_state AS failure_category,
    offer_lost_reason AS failure_reason,
    COUNT(*) AS failure_count
FROM mv_complete_player_journey
WHERE offer_state IN ('lost', 'expired')
GROUP BY campaign_id, DATE_TRUNC('day', qualification_timestamp), offer_state, offer_lost_reason;

CREATE INDEX idx_mv_fa_campaign_id ON mv_failure_analysis(campaign_id);
CREATE INDEX idx_mv_fa_report_date ON mv_failure_analysis(report_date);
CREATE INDEX idx_mv_fa_failure_stage ON mv_failure_analysis(failure_stage);

-- =====================================================
-- Refresh Schedule Functions
-- =====================================================

-- Function to refresh all materialized views
CREATE OR REPLACE FUNCTION refresh_reporting_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_complete_player_journey;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_funnel_aggregation;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_failure_analysis;
END;
$$ LANGUAGE plpgsql;

-- Schedule: Run hourly via cron job or pg_cron extension
-- SELECT cron.schedule('refresh-reporting-views', '0 * * * *', 'SELECT refresh_reporting_views();');
