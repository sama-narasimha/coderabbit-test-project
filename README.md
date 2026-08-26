# CodeRabbit Test Project

A tiny sample app for evaluating AI PR code review tools. It's just cart math
and a React component fetching a user profile — nothing framework-heavy.

## 1. Push to your personal GitHub

```bash
cd coderabbit-test-project
git init
git add .
git commit -m "Initial commit: baseline working version"
git branch -M main
# Create an empty repo on your personal GitHub first (no README/license), then:
git remote add origin https://github.com/<your-username>/coderabbit-test-project.git
git push -u origin main
```

## 2. Connect CodeRabbit

1. Go to https://app.coderabbit.ai and sign in with your **personal** GitHub account.
2. Authorize the CodeRabbit GitHub App and select only this repo (don't grant
   it access to your whole account/org).
3. You should land on a dashboard showing the repo as connected. No further
   config is needed for a first test — default review settings are fine.

## 3. Create a branch with intentional bugs, then open a PR

This is the actual test: does CodeRabbit catch these on review?

```bash
git checkout -b test/intentional-bugs
```

Now make these edits:

### Bug 1 — off-by-one / out-of-bounds risk in `src/cartUtils.js`

Change the loop bound in `getItemById`:

```diff
- for (let i = 0; i < items.length; i++) {
+ for (let i = 0; i <= items.length; i++) {
```

### Bug 2 — missing null check in `src/cartUtils.js`

Change `applyDiscount` to skip the "no rate found" guard:

```diff
- const rate = discounts[discountCode];
- if (!rate) {
-   return total;
- }
- return total - total * rate;
+ const rate = discounts[discountCode];
+ return total - total * rate;
```

(This produces `NaN` for any unrecognized discount code instead of returning
the original total.)

### Bug 3 — direct state mutation in `src/UserProfile.jsx`

Inside the `fetchUser` success branch, change:

```diff
- if (isMounted) {
-   setUser(data);
-   setLoading(false);
- }
+ if (isMounted) {
+   user.name = data.name; // mutating instead of using setUser
+   setLoading(false);
+ }
```

### Bug 4 — unhandled edge case in `src/UserProfile.jsx`

Remove the `response.ok` check entirely:

```diff
- const response = await fetch(`/api/users/${userId}`);
- if (!response.ok) {
-   throw new Error(`Failed to load user: ${response.status}`);
- }
- const data = await response.json();
+ const response = await fetch(`/api/users/${userId}`);
+ const data = await response.json();
```

Then commit, push, and open the PR:

```bash
git add .
git commit -m "test: introduce bugs for AI review evaluation"
git push -u origin test/intentional-bugs
```

Open a pull request on GitHub from `test/intentional-bugs` into `main`.
CodeRabbit should review it automatically within a few minutes.

## 4. What to look for

- Did it catch all 4? (Bugs 1 and 3 are the more subtle ones — good signal if caught.)
- Are its comments accurate, or do any misdiagnose the issue?
- How much noise (style nits, non-issues) came with the real findings?
- How long did the review take to post?

## Notes

- This repo is intentionally trivial so the review isn't distracted by real
  business logic — the bugs are the whole point.
- If you later also test Sentry Seer, you can reuse this exact branch/PR
  pattern on a second copy of the repo (Sentry's Seer only supports
  GitHub.com/GitLab.com cloud repos, which a personal GitHub account satisfies).
