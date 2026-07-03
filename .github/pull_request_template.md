# STOS V2.3.2 Pull Request Template

## PR Type
- [ ] **Architecture Change** — Modifies layers, modules, runtime services, or external tools
- [ ] **Technical Specification** — Updates ARCHITECTURE.md, defines new invariants, or changes critical paths
- [ ] **Deployment Documentation** — Updates installation, configuration, maintenance, or recovery procedures
- [ ] **End-User Documentation** — Updates operator-facing features, UI changes, or usage guides
- [ ] **Policy Layer** — Updates policies (content, RBAC, moderation, approval workflows)
- [ ] **Implementation** — Code changes that don't alter specifications or documentation
- [ ] **Bug Fix** — Fixes deviation from ARCHITECTURE.md invariants
- [ ] **Testing** — Adds or updates tests for existing functionality

---

## Documentation Hierarchy Checklist

### If this is a Technical Specification change:
- [ ] ARCHITECTURE.md is updated with the new specification
- [ ] Critical Invariants (INV-*) section is reviewed and updated if needed
- [ ] 13-Step Runtime Pipeline is verified if affected
- [ ] Storage Prefixes (Deno KV) are documented if new state is introduced
- [ ] Atomic Commit Model is validated if new outputs are added
- [ ] This is a **MAJOR version bump** if invariants are broken

### If this is a Deployment Documentation change:
- [ ] MIGRATION.md reflects any new deployment steps or breaking changes
- [ ] QUICKSTART.md is updated if installation/setup procedures change
- [ ] All changes comply with the Technical Specification (ARCHITECTURE.md)
- [ ] Environment variables (.env.example) are updated if new config is needed

### If this is an End-User Documentation change:
- [ ] README.md or operator guides are updated
- [ ] All changes align with the Technical Specification
- [ ] All changes align with Deployment Documentation
- [ ] Changes describe how operators interact with the system

### If this is a Policy Layer change:
- [ ] POLICY.md is updated with new or modified policies
- [ ] Policy configuration YAML files in `/policies` are included
- [ ] Policies validate or transform intents (Step 3 or Step 6 in runtime)
- [ ] Policies do NOT directly mutate STOS state
- [ ] Permission/RBAC, content, moderation, or approval workflow changes are documented

---

## Architecture Alignment

### Layers Affected
- [ ] **Layer 1 — Internal Modules** (Content, Button, Automation, Community, Customer Service, Delivery)
- [ ] **Layer 2 — Runtime Services** (Event Ingestion, Identity Resolution, Permission Validation, KV Atomic Commits)
- [ ] **Layer 3 — External Tools** (Telegram Platform, Deno Runtime/KV/Queue/Deploy, HTTPS Webhooks)

### Critical Invariants Verified
- [ ] INV-01: All mutations commit in one atomic transaction
- [ ] INV-02: Internal modules produce intent only; they never mutate state
- [ ] INV-03: Runtime Services (Layer 2) are the *only* layer permitted to execute mutations
- [ ] INV-05: Idempotency check occurs before execution
- [ ] INV-06: Lock acquired before FSM processing
- [ ] INV-08: Single-owner governance (singleton)
- [ ] INV-10: Webhook secret token is validated before pipeline entry
- [ ] INV-12: Pipeline steps execute in fixed sequential order
- [ ] INV-13: Telegram is an output surface only; it never drives the FSM directly

### Runtime Pipeline Steps Affected
- [ ] Step 1: Event ingestion
- [ ] Step 2: Identity resolution
- [ ] Step 3: Permission validation
- [ ] Step 4: Route resolution
- [ ] Step 5: Execution planning
- [ ] Step 6: FSM processing
- [ ] Step 7: KV atomic commit
- [ ] Step 8: Outbox management
- [ ] Step 9: Queue processing
- [ ] Step 10: Delivery coordination
- [ ] Step 11: Audit recording
- [ ] Step 12: Idempotency control
- [ ] Step 13: Lock management

### Storage Prefixes Modified
- [ ] `storage/system/*`
- [ ] `storage/owner/*`
- [ ] `storage/users/*`
- [ ] `storage/groups/*`
- [ ] `storage/channels/*`
- [ ] `storage/posts/{drafts,scheduled,published,archived}/*`
- [ ] `storage/audit/*`
- [ ] `storage/outbox/*`
- [ ] `storage/queue/*`
- [ ] `storage/locks/*`
- [ ] `storage/idempotency/*`

---

## Description

### What does this PR do?
*Provide a clear, concise description of the changes in this PR.*

### Why is this change needed?
*Explain the motivation or problem this solves.*

### How does this maintain STOS invariants?
*Describe how this PR respects all critical invariants and the three-layer architecture.*

---

## Documentation Chain Verification

> **Governance Rule:** Changes flow from Technical Spec → Deployment Docs → End-User Docs

- [ ] **Step 1:** Technical Specification has been updated (if architecture/rules changed)
- [ ] **Step 2:** Deployment Documentation reflects the impact (if deployment affected)
- [ ] **Step 3:** End-User Documentation is current (if operator-facing changes)
- [ ] All documentation levels are internally consistent
- [ ] No contradictions exist between documentation levels

---

## Testing & Validation

- [ ] All invariants are verified in tests
- [ ] Runtime pipeline sequencing is tested
- [ ] Atomic commit behavior is validated
- [ ] Idempotency is tested
- [ ] Lock management is tested
- [ ] Tests pass locally
- [ ] No regressions introduced

---

## Files Changed

### Documentation Files
- [ ] ARCHITECTURE.md
- [ ] POLICY.md
- [ ] MIGRATION.md
- [ ] QUICKSTART.md
- [ ] README.md
- [ ] .env.example

### Source Code Files
- [ ] src/

### Policy Configuration Files
- [ ] policies/

---

## Additional Notes

*Add any additional context, screenshots, or notes that help reviewers understand this PR.*

---

## Reviewer Checklist

- [ ] Documentation hierarchy is maintained
- [ ] All invariants are preserved
- [ ] Architecture layers are not violated
- [ ] Changes flow from Technical Spec → Deployment → End-User Docs
- [ ] No direct state mutations in Internal Modules
- [ ] Runtime Services handle all state mutations
- [ ] External Tools handle only side effects
- [ ] Code aligns with ARCHITECTURE.md specification
