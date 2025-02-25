import React, { useMemo } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { useFilter } from '../context/FilterContext';

const StudyAreaFilter = () => {
  const { state, dispatch, filteredPrograms } = useFilter();

  // Function to normalize study area text for grouping
  const getNormalizedKey = (text: string): string => {
    // Convert to lowercase and trim for consistency
    const lowercaseText = text.toLowerCase().trim();
    
    // Words that indicate similar content - expanded list
    const commonWords = ['general', 'other', 'studies', 'science', 'engineering', 
                        'technology', 'arts', 'administration', 'management', 
                        'business', 'education', 'research', 'development'];
    
    // Get words array
    const words = lowercaseText.split(/\s+/);
    
    // Extract first 5 words as primary comparison key (increased from 3 to 5)
    const firstFiveWords = words.slice(0, 5).join(' ');
    
    // Check if any common word is present
    const commonWordsFound = commonWords.filter(word => 
      lowercaseText.includes(word)
    );
    
    // Create a normalized key that combines first 5 words and common words
    return `${firstFiveWords}-${commonWordsFound.sort().join('-')}`;
  };

  // Group study areas by similarity
  const studyAreaGroups = useMemo(() => {
    // Step 1: Count all unique study areas
    const areaCountMap = new Map<string, number>();
    filteredPrograms.forEach(program => {
      const area = program.studyArea.trim();
      areaCountMap.set(area, (areaCountMap.get(area) || 0) + 1);
    });

    // Step 2: Group similar areas using a more advanced approach
    const groupMap = new Map<string, {
      variants: Set<string>;
      counts: Map<string, number>;
      totalCount: number;
    }>();

    // Group study areas by normalized key
    Array.from(areaCountMap.entries()).forEach(([area, count]) => {
      const normalizedKey = getNormalizedKey(area);
      
      if (!groupMap.has(normalizedKey)) {
        groupMap.set(normalizedKey, {
          variants: new Set<string>(),
          counts: new Map<string, number>(),
          totalCount: 0
        });
      }
      
      const group = groupMap.get(normalizedKey)!;
      group.variants.add(area);
      group.counts.set(area, count);
      group.totalCount += count;
    });

    // Step 3: Merge groups that have similar first 2-3 words but different normalized keys
    // Additional pass to further reduce duplicates
    const mergedGroups = new Map<string, {
      variants: Set<string>;
      counts: Map<string, number>;
      totalCount: number;
      keys: Set<string>; // Track original keys that were merged
    }>();
    
    // First pass - create simplified keys based on first 2 words
    Array.from(groupMap.entries()).forEach(([key, group]) => {
      const words = key.split(/\s+/);
      const simplifiedKey = words.slice(0, 2).join(' '); // Use first 2 words as a simplified key
      
      if (!mergedGroups.has(simplifiedKey)) {
        mergedGroups.set(simplifiedKey, {
          variants: new Set<string>(),
          counts: new Map<string, number>(),
          totalCount: 0,
          keys: new Set<string>()
        });
      }
      
      const mergedGroup = mergedGroups.get(simplifiedKey)!;
      mergedGroup.keys.add(key);
      
      // Add all variants from the original group
      group.variants.forEach(variant => {
        mergedGroup.variants.add(variant);
        mergedGroup.counts.set(variant, group.counts.get(variant) || 0);
      });
      
      mergedGroup.totalCount += group.totalCount;
    });

    // Step 4: Convert merged groups to array format for rendering
    return Array.from(mergedGroups.entries()).map(([key, group]) => {
      // Convert variants from Set to Array for sorting
      const variantsArray = Array.from(group.variants);

      // Sort variants with enhanced criteria:
      // 1. Higher count first
      // 2. Presence of "general" or other common words
      // 3. Length of name (prefer more descriptive but concise names)
      // 4. Alphabetical for consistency
      const sortedVariants = variantsArray.sort((a, b) => {
        const countA = group.counts.get(a) || 0;
        const countB = group.counts.get(b) || 0;
        
        // Primary sort by count (descending)
        if (countB !== countA) return countB - countA;
        
        // Prefer names with "general" or other common key terms
        const aHasGeneral = /\b(general|standard|main|primary|common)\b/i.test(a);
        const bHasGeneral = /\b(general|standard|main|primary|common)\b/i.test(b);
        
        if (aHasGeneral && !bHasGeneral) return -1;
        if (!aHasGeneral && bHasGeneral) return 1;
        
        // Prefer names with fewer words but not too short
        const aWords = a.split(/\s+/).length;
        const bWords = b.split(/\s+/).length;
        
        if (aWords !== bWords) {
          // Prefer 3-5 words in length as optimal
          const aOptimal = Math.abs(aWords - 4);
          const bOptimal = Math.abs(bWords - 4);
          if (aOptimal !== bOptimal) return aOptimal - bOptimal;
        }
        
        // Final sort alphabetically for consistent results
        return a.localeCompare(b);
      });

      // Select the representative name (first after sorting)
      // Using the full name without truncation as required
      const displayName = sortedVariants[0];

      return {
        key,
        displayName,
        count: group.totalCount,
        variants: sortedVariants
      };
    }).sort((a, b) => {
      // Sort groups by count (descending) and then alphabetically
      if (b.count !== a.count) return b.count - a.count;
      return a.displayName.localeCompare(b.displayName);
    });
  }, [filteredPrograms]);

  // Map of original study areas to their group's display name
  const variantToDisplayMap = useMemo(() => {
    const map = new Map<string, string>();
    studyAreaGroups.forEach(group => {
      group.variants.forEach(variant => {
        map.set(variant, group.displayName);
      });
    });
    return map;
  }, [studyAreaGroups]);

  // Map of display names to all variants in the group
  const displayToVariantsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    studyAreaGroups.forEach(group => {
      map.set(group.displayName, Array.from(group.variants));
    });
    return map;
  }, [studyAreaGroups]);

  // When a user selects a study area, we need to handle both:
  // 1. The case where they select the display name (we add all variants)
  // 2. The case where we're initializing from a previously saved filter
  const handleChange = (event: any) => {
    try {
      const selectedValues: string[] = typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
      
      // Expand selection to include all variants in each selected group
      const expandedSelection = new Set<string>();
      selectedValues.forEach(value => {
        // If this is a display name, add all its variants
        if (displayToVariantsMap.has(value)) {
          displayToVariantsMap.get(value)!.forEach(variant => {
            expandedSelection.add(variant);
          });
        } else {
          // Otherwise, add just this variant
          expandedSelection.add(value);
        }
      });
      
      dispatch({
        type: 'SET_STUDY_AREA',
        payload: Array.from(expandedSelection)
      });
    } catch (error) {
      console.error("Error in handleChange:", error);
    }
  };

  // Get display names for selected values
  const selectedDisplayNames = useMemo(() => {
    const selected = new Set<string>();
    state.studyArea.forEach(value => {
      // If we know the display name for this variant, use it
      if (variantToDisplayMap.has(value)) {
        selected.add(variantToDisplayMap.get(value)!);
      } else {
        // Otherwise use the value itself
        selected.add(value);
      }
    });
    return Array.from(selected);
  }, [state.studyArea, variantToDisplayMap]);

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Area of Study</InputLabel>
      <Select
        multiple
        value={selectedDisplayNames}
        onChange={handleChange}
        input={<OutlinedInput label="Area of Study" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => {
              // Find the corresponding group to get the accurate count
              const group = studyAreaGroups.find(g => g.displayName === value);
              return (
                <Chip
                  key={value}
                  label={`${value} (${group?.count || 0})`}
                />
              );
            })}
          </Box>
        )}
      >
        {studyAreaGroups.map((group) => (
          <MenuItem
            key={group.key}
            value={group.displayName}
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{group.displayName}</span>
            <span style={{ color: '#666', marginLeft: '8px' }}>({group.count})</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StudyAreaFilter;