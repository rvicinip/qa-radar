import { z } from "zod";

export const confidenceLevelSchema = z.enum([
  "Verified",
  "Community Signal",
  "Vendor Claim",
  "News Signal",
  "Opinion / Commentary",
  "Deprecated / Archived",
]);

export const sourceTypeSchema = z.enum([
  "official",
  "community",
  "vendor",
  "news",
  "opinion",
  "standard",
  "documentation",
]);

export const contentStatusSchema = z.enum([
  "draft",
  "active",
  "watching",
  "archived",
  "rejected",
]);

export const impactLevelSchema = z.enum(["Low", "Medium", "High", "Critical"]);

export const trendStateSchema = z.enum([
  "Emerging",
  "Growing",
  "Mature",
  "Declining",
  "Hype-risk",
]);

export const boardStateSchema = z.enum([
  "New Signal",
  "Under Review",
  "Worth Studying",
  "Adopt / Experiment",
  "Monitor",
  "Rejected / Hype",
  "Archived",
]);

export const baseContentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string()),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
  reviewed_at: z.string().min(1),
  source_url: z.string().url(),
  source_type: sourceTypeSchema,
  confidence_level: confidenceLevelSchema,
  status: contentStatusSchema,
  reviewer_notes: z.string(),
});

export const trendSchema = baseContentSchema.extend({
  name: z.string().min(1),
  state: trendStateSchema,
  impact: impactLevelSchema,
  applicability: z.array(z.string()).min(1),
  risks: z.array(z.string()),
  recommended_practices: z.array(z.string()),
  source_ids: z.array(z.string()).min(1),
});

export const newsItemSchema = baseContentSchema
  .extend({
    source_name: z.string().min(1),
    published_at: z.string().min(1),
    impact_category: z.string().min(1),
    qa_impact: z.string().min(1),
    suggested_action: z.string().min(1),
    source_ids: z.array(z.string()).min(1),
  })
  .refine((item) => item.summary.split(/\s+/).filter(Boolean).length <= 80, {
    message: "News summary must be 80 words or fewer.",
  });

export const communitySchema = baseContentSchema.extend({
  name: z.string().min(1),
  type: z.string().min(1),
  platform: z.array(z.string()).min(1),
  primary_language: z.string().min(1),
  region: z.string().min(1),
  recommended_level: z.array(z.string()).min(1),
  main_utility: z.string().min(1),
  frequent_topics: z.array(z.string()),
  update_frequency: z.string().min(1),
  recent_activity_signal: z.string().min(1),
  editorial_note: z.string().min(1),
  source_ids: z.array(z.string()).min(1),
});

export const bestPracticeSchema = baseContentSchema.extend({
  name: z.string().min(1),
  category: z.string().min(1),
  problem_solved: z.string().min(1),
  when_to_use: z.array(z.string()).min(1),
  when_not_to_use: z.array(z.string()),
  recommended_steps: z.array(z.string()).min(1),
  expected_evidence: z.array(z.string()).min(1),
  useful_metrics: z.array(z.string()),
  common_risks: z.array(z.string()),
  practical_example: z.string().min(1),
  source_ids: z.array(z.string()).min(1),
});

export const toolItemSchema = baseContentSchema.extend({
  name: z.string().min(1),
  category: z.string().min(1),
  maturity: z.string().min(1),
  recommended_use: z.string().min(1),
  risks_limitations: z.array(z.string()),
  integrations: z.array(z.string()),
  alternatives: z.array(z.string()),
  official_site: z.string().url(),
  source_ids: z.array(z.string()).min(1),
});

export const eventItemSchema = baseContentSchema.extend({
  name: z.string().min(1),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  mode: z.enum(["Online", "In-person", "Hybrid"]),
  location: z.string().min(1),
  organizer: z.string().min(1),
  topics: z.array(z.string()).min(1),
  relevance_for_qa: z.string().min(1),
  source_ids: z.array(z.string()).min(1),
});

export const learningPathSchema = baseContentSchema.extend({
  objective: z.string().min(1),
  required_skills: z.array(z.string()).min(1),
  recommended_resources: z.array(z.string()).min(1),
  recommended_communities: z.array(z.string()),
  suggested_practices: z.array(z.string()),
  practical_project: z.string().min(1),
  progress_evidence: z.array(z.string()).min(1),
  source_ids: z.array(z.string()).min(1),
});

export const signalCardSchema = baseContentSchema.extend({
  type: z.enum(["Trend", "News", "Tool", "Practice", "Community", "Event"]),
  source_name: z.string().min(1),
  impact: impactLevelSchema,
  urgency: z.enum(["Low", "Medium", "High"]),
  evidence: z.string().min(1),
  recommended_action: z.string().min(1),
  suggested_owner: z.string().min(1),
  board_state: boardStateSchema,
  source_ids: z.array(z.string()).min(1),
});

export const sourceRecordSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  url: z.string().url(),
  source_type: sourceTypeSchema,
  authority_level: z.enum(["High", "Medium", "Low"]),
  used_for: z.array(z.string()).min(1),
  last_checked: z.string().min(1),
  notes: z.string(),
});

export const standardCategorySchema = z.enum([
  "governance",
  "testing",
  "security",
  "accessibility",
  "ai-codegen",
]);

export const standardSchema = baseContentSchema.extend({
  name: z.string().min(1),
  publisher: z.string().min(1),
  category: standardCategorySchema,
  qa_relevance: z.string().min(1),
  source_ids: z.array(z.string()).min(1),
});

export const changeLogEntrySchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  changed_by: z.string().min(1),
  change_type: z.enum(["created", "updated", "archived", "corrected"]),
  item_id: z.string().min(1),
  summary: z.string().min(1),
  reason: z.string().min(1),
  source_ids: z.array(z.string()).min(1),
  review_status: z.enum(["draft", "reviewed", "approved"]),
});

export const trendsFileSchema = z.array(trendSchema);
export const newsFileSchema = z.array(newsItemSchema);
export const communitiesFileSchema = z.array(communitySchema);
export const bestPracticesFileSchema = z.array(bestPracticeSchema);
export const toolsFileSchema = z.array(toolItemSchema);
export const eventsFileSchema = z.array(eventItemSchema);
export const learningPathsFileSchema = z.array(learningPathSchema);
export const signalsFileSchema = z.array(signalCardSchema);
export const sourcesFileSchema = z.array(sourceRecordSchema);
export const changelogFileSchema = z.array(changeLogEntrySchema);
export const standardsFileSchema = z.array(standardSchema);

export const editionMetaSchema = z.object({
  id: z.string().regex(/^\d{4}-\d{2}$/, "edition id must be YYYY-MM"),
  label: z.string().min(1),
  published: z.string().min(1),
});

export const editionsManifestSchema = z
  .object({
    current: z.string().regex(/^\d{4}-\d{2}$/),
    editions: z.array(editionMetaSchema).min(1),
  })
  .refine((m) => m.editions.some((e) => e.id === m.current), {
    message: "current must reference an existing edition id",
  });

export const ecosystemItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  rationale: z.string().min(1),
  verdict: z.enum(["adopt", "trial", "watch", "not-applicable"]),
  target: z.enum(["ai-ops", "iq-qa"]),
  source_ref: z.string().min(1),
  status: z.enum(["proposed", "promoted", "done", "dropped"]),
  backlog_id: z.string().optional(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
});

export const ecosystemFileSchema = z.array(ecosystemItemSchema);

export const DATA_FILES = {
  trends: { file: "trends.json", schema: trendsFileSchema },
  news: { file: "news.json", schema: newsFileSchema },
  communities: { file: "communities.json", schema: communitiesFileSchema },
  bestPractices: { file: "best-practices.json", schema: bestPracticesFileSchema },
  tools: { file: "tools.json", schema: toolsFileSchema },
  events: { file: "events.json", schema: eventsFileSchema },
  learningPaths: { file: "learning-paths.json", schema: learningPathsFileSchema },
  signals: { file: "signals.json", schema: signalsFileSchema },
  sources: { file: "sources.json", schema: sourcesFileSchema },
  changelog: { file: "changelog.json", schema: changelogFileSchema },
  standards: { file: "standards.json", schema: standardsFileSchema },
  ecosystem: { file: "ecosystem.json", schema: ecosystemFileSchema },
} as const;
