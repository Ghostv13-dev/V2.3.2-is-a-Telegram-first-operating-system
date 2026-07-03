# STOS Policy Layer — Specification

This document describes the Policy Layer that sits above the STOS architecture.
Policies are changeable without altering the architecture. Typical policy areas:
- Content policy
- Permission / RBAC policy
- Moderation policy
- Approval workflows
- Delivery & Automation policy

Policies must not directly mutate STOS state. Instead they validate or transform
intents; runtime services must honor policy decisions during Steps 3 and 6.

Policy configuration is stored in YAML under /policies and loaded at runtime.

Example: content.max_post_length, moderation.spam_keywords, permission.roles

