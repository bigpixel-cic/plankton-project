// packages/db/schema.ts
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: uuid("id").defaultRandom().primaryKey(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => members.id),
  parentId: uuid("parent_id").references((): any => posts.id, {
    onDelete: "cascade",
  }),
  body: text("body").notNull(),
  status: text("status").notNull().default("published"),
  removedReason: text("removed_reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const hashtags = pgTable("hashtags", {
  id: uuid("id").defaultRandom().primaryKey(),
  tag: text("tag").notNull().unique(),
});

export const postHashtags = pgTable(
  "post_hashtags",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    hashtagId: uuid("hashtag_id")
      .notNull()
      .references(() => hashtags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.hashtagId] }),
  }),
);

export const mentions = pgTable("mentions", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  mentionedMemberId: uuid("mentioned_member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const attachments = pgTable("attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  originalFilename: text("original_filename").notNull(),
  status: text("status").notNull().default("published"),
  removedReason: text("removed_reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(members, { fields: [posts.authorId], references: [members.id] }),
  parent: one(posts, { fields: [posts.parentId], references: [posts.id] }),
  attachments: many(attachments),
  postHashtags: many(postHashtags),
  mentions: many(mentions),
}));
