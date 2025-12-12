# Publishing Checklist

Before publishing to npm, follow these steps:

## Pre-publish Verification

- [x] Package builds without errors (`pnpm run build`)
- [ ] All TypeScript types are correct
- [ ] Test in a real project (see Test Locally section)
- [ ] Update version in package.json
- [ ] Update CHANGELOG if needed
- [ ] Commit all changes

## Test Locally

```bash
# In this package directory
pnpm link

# In your test project
pnpm link fluid-typography

# Test imports
import fluidTypography from 'fluid-typography'
import { withFluidTypography } from 'fluid-typography/merge'
import { fluidTypographyPreset } from 'fluid-typography/preset'
```

## Update Repository URL

Update the `repository.url` in package.json with your actual GitHub repo:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/fluid-typography"
  }
}
```

## Publishing

```bash
# Make sure you're logged in to npm
npm login

# Dry run (see what would be published)
npm publish --dry-run

# Publish to npm
npm publish --access public

# Tag the release in git
git tag v1.0.0
git push origin v1.0.0
```

## Post-publish

- [ ] Verify package on npmjs.com
- [ ] Test installation from npm: `npm install fluid-typography`
- [ ] Update README if needed
- [ ] Announce on social media / relevant communities

## Version Management

Follow semantic versioning:

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes

```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## Testing with Both Tailwind Versions

### Test with Tailwind v3

```bash
pnpm add -D tailwindcss@^3.4.0
pnpm run build
# Test in project
```

### Test with Tailwind v4

```bash
pnpm add -D tailwindcss@^4.0.0
pnpm run build
# Test in project
```
