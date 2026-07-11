export type ConfidenceLevel =
  | "Verified"
  | "Community Signal"
  | "Vendor Claim"
  | "News Signal"
  | "Opinion / Commentary"
  | "Deprecated / Archived";

export type SourceType =
  | "official"
  | "community"
  | "vendor"
  | "news"
  | "opinion"
  | "standard"
  | "documentation";

export type ContentStatus =
  | "draft"
  | "active"
  | "watching"
  | "archived"
  | "rejected";

export type ImpactLevel = "Low" | "Medium" | "High" | "Critical";

export type TrendState =
  | "Emerging"
  | "Growing"
  | "Mature"
  | "Declining"
  | "Hype-risk";

export type BoardState =
  | "New Signal"
  | "Under Review"
  | "Worth Studying"
  | "Adopt / Experiment"
  | "Monitor"
  | "Rejected / Hype"
  | "Archived";

export interface BaseContentItem {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  reviewed_at: string;
  source_url: string;
  source_type: SourceType;
  confidence_level: ConfidenceLevel;
  status: ContentStatus;
  reviewer_notes: string;
}

export interface Trend extends BaseContentItem {
  name: string;
  state: TrendState;
  impact: ImpactLevel;
  applicability: string[];
  risks: string[];
  recommended_practices: string[];
  source_ids: string[];
}

export interface NewsItem extends BaseContentItem {
  source_name: string;
  published_at: string;
  impact_category: string;
  qa_impact: string;
  suggested_action: string;
  source_ids: string[];
}

export interface Community extends BaseContentItem {
  name: string;
  type: string;
  platform: string[];
  primary_language: string;
  region: string;
  recommended_level: string[];
  main_utility: string;
  frequent_topics: string[];
  update_frequency: string;
  recent_activity_signal: string;
  editorial_note: string;
  source_ids: string[];
}

export interface BestPractice extends BaseContentItem {
  name: string;
  category: string;
  problem_solved: string;
  when_to_use: string[];
  when_not_to_use: string[];
  recommended_steps: string[];
  expected_evidence: string[];
  useful_metrics: string[];
  common_risks: string[];
  practical_example: string;
  source_ids: string[];
}

export interface ToolItem extends BaseContentItem {
  name: string;
  category: string;
  maturity: string;
  recommended_use: string;
  risks_limitations: string[];
  integrations: string[];
  alternatives: string[];
  official_site: string;
  source_ids: string[];
}

export interface EventItem extends BaseContentItem {
  name: string;
  start_date: string;
  end_date?: string;
  mode: "Online" | "In-person" | "Hybrid";
  location: string;
  organizer: string;
  topics: string[];
  relevance_for_qa: string;
  source_ids: string[];
}

export interface LearningPath extends BaseContentItem {
  objective: string;
  required_skills: string[];
  recommended_resources: string[];
  recommended_communities: string[];
  suggested_practices: string[];
  practical_project: string;
  progress_evidence: string[];
  source_ids: string[];
}

export interface SignalCard extends BaseContentItem {
  type: "Trend" | "News" | "Tool" | "Practice" | "Community" | "Event";
  source_name: string;
  impact: ImpactLevel;
  urgency: "Low" | "Medium" | "High";
  evidence: string;
  recommended_action: string;
  suggested_owner: string;
  board_state: BoardState;
  source_ids: string[];
}

export interface SourceRecord {
  id: string;
  name: string;
  url: string;
  source_type: SourceType;
  authority_level: "High" | "Medium" | "Low";
  used_for: string[];
  last_checked: string;
  notes: string;
}

export type StandardCategory =
  | "governance"
  | "testing"
  | "security"
  | "accessibility"
  | "ai-codegen";

export interface Standard extends BaseContentItem {
  name: string;
  publisher: string;
  category: StandardCategory;
  qa_relevance: string;
  source_ids: string[];
}

export interface ChangeLogEntry {
  id: string;
  date: string;
  changed_by: string;
  change_type: "created" | "updated" | "archived" | "corrected";
  item_id: string;
  summary: string;
  reason: string;
  source_ids: string[];
  review_status: "draft" | "reviewed" | "approved";
}

export interface EditionMeta {
  id: string;
  label: string;
  published: string;
}

export interface EditionsManifest {
  current: string;
  editions: EditionMeta[];
}

export type EcosystemVerdict = "adopt" | "trial" | "watch" | "not-applicable";
export type EcosystemTarget = "ai-ops" | "iq-qa";
export type EcosystemStatus = "proposed" | "promoted" | "done" | "dropped";

export interface EcosystemItem {
  id: string;
  title: string;
  rationale: string;
  verdict: EcosystemVerdict;
  target: EcosystemTarget;
  source_ref: string;
  status: EcosystemStatus;
  backlog_id?: string;
  created_at: string;
  updated_at: string;
}
