# Fix TypeScript Error in useCharacterData.ts

## Task List
- [ ] Analyze the TypeScript error in useCharacterData.ts
- [ ] Examine the updateCharacterStat API function signature
- [ ] Identify the root cause of the type mismatch
- [ ] Fix the type issue in the updateStat function
- [ ] Verify the fix works correctly

## Error Details
- **File**: src/hooks/useCharacterData.ts
- **Line**: 71
- **Issue**: Type 'keyof Stats' is not assignable to type 'string'
- **Additional**: Type 'number' is not assignable to type 'string'
