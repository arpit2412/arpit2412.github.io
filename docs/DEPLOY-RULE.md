# Deploy rule — non-negotiable

**Run it locally. Arpit looks at it. Only then does anything go live.**

1. `npm run dev` in this worktree, report the URL, and say what to look at.
2. Wait for Arpit to say he is happy. Do not infer approval from silence,
   from a passing build, or from an auditor PASS.
3. Only then merge / push / deploy.

Pushing to `master` in `arpit2412.github.io` triggers a GitHub Pages deploy on
push. There is no staging step. A push IS a deploy.

Status: nothing has ever been deployed from this work. `origin/master` and the
live site are untouched.
