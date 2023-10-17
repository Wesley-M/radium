import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * It matches the current URL with the biggest pattern passed 
 * as param (exact = false), and reports the pattern index 
 * (starting at 0). If the pattern is not matched, it returns -1.
 *
 * @example
 *  ```
 *  let patterns = ['/a', '/b', '/a/b' '/c']
 *  let url: 'localhost:8080/a/b'
 *  // result === 2
 *  let result = useUrlListener(patterns)
 *  ```
 * 
 * @param patterns List of patterns to watch
 * @returns Index of the pattern matched
 * */
export function useUrlListener(patterns: string[], exact = false) {
  const [patternIndex, setPatternIndex] = useState(-1);

  let location = useLocation();

  // Every time the location changes, the corresponding pattern is selected.
  useEffect(() => {
    let i = 0;

    let match: string = '';

    // It selects the biggest pattern that matches the current location
    for (let pattern of patterns) {
      // If exact is true, it matches the exact path.
      if (exact && location.pathname === pattern) {
        match = pattern
        setPatternIndex(i)
      } 

      // If exact is false, it matches the path if it contains the pattern.
      if (!exact && location.pathname.includes(pattern)) {
        if (pattern.length > match.length) {
          match = pattern
          setPatternIndex(i)
        }
      }

      i += 1;
    }

    // If no pattern was matched, return -1.
    if (match == "") {
      setPatternIndex(-1);
    }
  }, [location.pathname, patterns]);

  return patternIndex;
}