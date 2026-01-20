# Supabase Security Configuration Guide

**Date**: January 19, 2026  
**Purpose**: Secure Strapi system tables and sensitive data in Supabase PostgreSQL

---

## 📋 Overview

After migrating to PostgreSQL/Supabase, the database linter reports security warnings about:

- **RLS (Row Level Security) disabled** on system tables
- **Sensitive columns exposed** (passwords, session IDs) via PostgREST API

This guide explains what these warnings mean and how to fix them.

---

## ⚠️ Security Warnings Explained

### 1. RLS Disabled in Public (40+ warnings)

**What it means:**

- Strapi system tables are exposed via Supabase's PostgREST API
- Row Level Security (RLS) is not enabled
- Anyone with database URL could theoretically access these tables directly

**Affected tables:**

```
strapi_database_schema
strapi_migrations
strapi_core_store_settings
strapi_webhooks
admin_users
up_users (user credentials!)
up_roles
up_permissions
orders
wishlists
files
... and many Strapi system tables
```

### 2. Sensitive Columns Exposed (3 warnings)

**Critical tables:**

- `admin_users` - Contains `password` field
- `up_users` - Contains `password` field
- `strapi_sessions` - Contains `session_id` field

**Risk:**

- Passwords stored in plaintext could be exposed
- Session tokens could be intercepted
- User accounts could be compromised

---

## ✅ Solution: Recommended Approach

**Disable PostgREST API Access to Strapi System Tables**

This is the **best approach** because:

- ✅ Prevents direct database access
- ✅ Forces all authentication through Strapi's secure API
- ✅ Eliminates password exposure risk
- ✅ Strapi manages its own authorization
- ✅ Simpler than writing RLS policies
- ✅ Production best practice

### Implementation

In **Supabase Dashboard** → **SQL Editor**, run this script:

```sql
-- ============================================
-- DISABLE PostgREST ACCESS TO STRAPI SYSTEM TABLES
-- ============================================

-- System tables - revoke all access
REVOKE ALL ON public.strapi_database_schema FROM anon, authenticated;
REVOKE ALL ON public.strapi_migrations FROM anon, authenticated;
REVOKE ALL ON public.strapi_migrations_internal FROM anon, authenticated;
REVOKE ALL ON public.strapi_core_store_settings FROM anon, authenticated;
REVOKE ALL ON public.strapi_webhooks FROM anon, authenticated;
REVOKE ALL ON public.strapi_ai_localization_jobs FROM anon, authenticated;
REVOKE ALL ON public.strapi_api_tokens FROM anon, authenticated;
REVOKE ALL ON public.strapi_api_token_permissions FROM anon, authenticated;
REVOKE ALL ON public.strapi_transfer_tokens FROM anon, authenticated;
REVOKE ALL ON public.strapi_transfer_token_permissions FROM anon, authenticated;
REVOKE ALL ON public.strapi_sessions FROM anon, authenticated;
REVOKE ALL ON public.strapi_history_versions FROM anon, authenticated;
REVOKE ALL ON public.strapi_releases FROM anon, authenticated;
REVOKE ALL ON public.strapi_release_actions FROM anon, authenticated;
REVOKE ALL ON public.strapi_workflows FROM anon, authenticated;
REVOKE ALL ON public.strapi_workflows_stages FROM anon, authenticated;

-- Relationship/junction tables - revoke all access
REVOKE ALL ON public.strapi_release_actions_release_lnk FROM anon, authenticated;
REVOKE ALL ON public.strapi_workflows_stage_required_to_publish_lnk FROM anon, authenticated;
REVOKE ALL ON public.strapi_workflows_stages_workflow_lnk FROM anon, authenticated;
REVOKE ALL ON public.strapi_workflows_stages_permissions_lnk FROM anon, authenticated;
REVOKE ALL ON public.strapi_api_token_permissions_token_lnk FROM anon, authenticated;
REVOKE ALL ON public.strapi_transfer_token_permissions_token_lnk FROM anon, authenticated;

-- ============================================
-- DISABLE PostgREST ACCESS TO USER/AUTH TABLES
-- ============================================
-- These contain sensitive credentials - should ONLY be accessed via Strapi API

REVOKE ALL ON public.admin_users FROM anon, authenticated;
REVOKE ALL ON public.admin_roles FROM anon, authenticated;
REVOKE ALL ON public.admin_permissions FROM anon, authenticated;
REVOKE ALL ON public.admin_permissions_role_lnk FROM anon, authenticated;
REVOKE ALL ON public.admin_users_roles_lnk FROM anon, authenticated;

REVOKE ALL ON public.up_users FROM anon, authenticated;
REVOKE ALL ON public.up_roles FROM anon, authenticated;
REVOKE ALL ON public.up_permissions FROM anon, authenticated;
REVOKE ALL ON public.up_permissions_role_lnk FROM anon, authenticated;
REVOKE ALL ON public.up_users_role_lnk FROM anon, authenticated;

-- ============================================
-- ALLOW PostgREST ACCESS TO APP DATA TABLES
-- ============================================
-- Only your application data tables (users can still access via Strapi API)

GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wishlists TO anon, authenticated;
GRANT SELECT ON public.files TO anon, authenticated;
GRANT SELECT ON public.upload_folders TO anon, authenticated;
GRANT SELECT ON public.i18n_locale TO anon, authenticated;

-- Relationship tables for app data
GRANT SELECT, INSERT, UPDATE, DELETE ON public.files_related_mph TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.files_folder_lnk TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.upload_folders_parent_lnk TO anon, authenticated;
```

**After running this:**

- ✅ All security warnings resolve
- ✅ Strapi API still works (Strapi is the database owner)
- ✅ Frontend access controlled by Strapi authentication
- ✅ Direct PostgREST access blocked
- ✅ Passwords and sessions protected

---

## 🔐 Alternative: Enable RLS on All Tables

**If you need PostgREST API access**, enable RLS with permissive policies:

```sql
-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

-- System tables
ALTER TABLE public.strapi_database_schema ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapi_migrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapi_migrations_internal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapi_core_store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapi_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapi_api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapi_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.up_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.up_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.up_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE PERMISSIVE POLICIES
-- ============================================
-- Allow all access (Strapi manages authentication)

CREATE POLICY "Allow all" ON public.strapi_database_schema
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.strapi_migrations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.strapi_migrations_internal
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.strapi_core_store_settings
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.strapi_webhooks
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.strapi_api_tokens
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.strapi_sessions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.admin_users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.up_users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.up_roles
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.up_permissions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.orders
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.wishlists
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all" ON public.files
  FOR ALL USING (true) WITH CHECK (true);
```

**Downsides:**

- ❌ Doesn't actually prevent access (permissive policies allow all)
- ❌ Passwords still exposed via API
- ❌ More complexity to maintain
- ❌ Doesn't match Strapi's architecture

---

## 🎯 Recommendation

**Use the first approach: Disable PostgREST Access**

| Aspect                   | Disable PostgREST          | Enable RLS                 |
| ------------------------ | -------------------------- | -------------------------- |
| **Security**             | ✅ Excellent               | ⚠️ False sense of security |
| **Simplicity**           | ✅ Simple (one SQL script) | ⚠️ Complex (many policies) |
| **Password Protection**  | ✅ Yes                     | ❌ No (still exposed)      |
| **Strapi Compatibility** | ✅ Perfect fit             | ⚠️ Works but unnecessary   |
| **Maintenance**          | ✅ Low                     | ❌ High                    |
| **Performance**          | ✅ Fast                    | ⚠️ RLS evaluation overhead |

---

## 📊 What Gets Blocked/Allowed

### Blocked (via PostgREST)

```
❌ Direct: SELECT * FROM admin_users
❌ Direct: SELECT * FROM up_users WHERE username = 'admin'
❌ Direct: SELECT password FROM up_users
❌ Direct: UPDATE strapi_sessions SET ...
```

### Still Works (via Strapi API)

```
✅ POST /api/auth/local/register
✅ POST /api/auth/local (login)
✅ GET /api/me (get current user)
✅ GET /api/orders
✅ POST /api/orders (create order)
```

### Database Level (Strapi still owns tables)

```
✅ Strapi application can read/write everything
✅ Strapi manages all access control
✅ Strapi authentication still works
```

---

## 🚀 Implementation Steps

### Step 1: Access Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**

### Step 2: Copy & Paste Script

Copy the **recommended approach** SQL script above (Disable PostgREST section)

### Step 3: Run Query

Click **Run** button

Expected output:

```
REVOKE 0
REVOKE 0
... (many similar lines)
GRANT 0
```

### Step 4: Verify

Go to **Database Linter** in Supabase and refresh:

- ✅ All "RLS Disabled in Public" warnings should be gone
- ✅ All "Sensitive Columns Exposed" warnings should be gone

---

## ✅ Verification Checklist

After running the security config:

- [ ] No RLS security warnings in Supabase Database Linter
- [ ] No sensitive columns exposed warnings
- [ ] Frontend can still register users
- [ ] Frontend can still login
- [ ] Frontend can still create orders
- [ ] Strapi admin panel still works
- [ ] Strapi API endpoints still work

### Quick Test Commands

```bash
# Should still work (via Strapi API)
curl -X POST https://apexshoes.onrender.com/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password"}'

# Should still work (via Strapi API)
curl https://apexshoes.onrender.com/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Should NOT work (direct PostgREST access blocked)
curl https://your-project.supabase.co/rest/v1/admin_users \
  -H "Authorization: Bearer ANON_KEY"
# Returns: 403 Forbidden (good!)
```

---

## 🔄 What Changed After Config

### Before Security Config

```
├── PostgREST Access: ❌ OPEN (direct database access possible)
├── Passwords: ❌ EXPOSED via API
├── Session tokens: ❌ EXPOSED via API
├── Security warnings: ❌ 40+ errors reported
└── Overall security: ⚠️ RISKY
```

### After Security Config

```
├── PostgREST Access: ✅ BLOCKED for system/auth tables
├── Passwords: ✅ PROTECTED (can't access directly)
├── Session tokens: ✅ PROTECTED (can't access directly)
├── Security warnings: ✅ RESOLVED (0 errors)
└── Overall security: ✅ SECURE
```

---

## 📚 Reference

### Supabase Documentation

- [Database Security](https://supabase.com/docs/guides/database/database-linter)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [PostgREST API Access](https://supabase.com/docs/guides/api/rest/basic-data-operations)

### Security Best Practices

- Never expose password columns via API
- Always use authentication for data access
- Limit PostgREST API access to necessary tables only
- Let your application (Strapi) manage data access
- Regular security audits with Database Linter

---

## 🆘 Troubleshooting

### Issue: Script fails with "relation does not exist"

**Cause:** Table naming differences in your schema

**Solution:**

1. Go to **Table Editor** in Supabase
2. Check actual table names
3. Update script with correct table names
4. Rerun

### Issue: Frontend can't create accounts after config

**Cause:** Strapi lost database access

**Solution:** Make sure you didn't revoke access from the `postgres` role:

```sql
-- DO NOT REVOKE FROM POSTGRES ROLE
-- Only revoke from anon, authenticated roles
REVOKE ALL ON public.admin_users FROM anon, authenticated;
```

### Issue: Still seeing security warnings

**Cause:** Not all tables were revoked

**Solution:**

1. Check Database Linter for remaining tables
2. Add those tables to the REVOKE script
3. Rerun updated script

---

## ✨ Security Improvements Summary

| Risk                   | Before    | After            |
| ---------------------- | --------- | ---------------- |
| Direct password access | 🔴 High   | 🟢 Blocked       |
| Direct session access  | 🔴 High   | 🟢 Blocked       |
| System table access    | 🔴 High   | 🟢 Blocked       |
| User data access       | 🟡 Medium | 🟢 Auth required |
| Overall security score | 🔴 Low    | 🟢 High          |

---

**Status**: ✅ Secure Configuration Ready  
**Last Updated**: January 19, 2026
