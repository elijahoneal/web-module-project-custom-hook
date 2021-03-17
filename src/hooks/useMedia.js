import { useState , useEffect } from "react";


const useMedia = (queries, values, defaultValue) => {
    const mediaQueryLists = queries.map(q => window.matchMedia(q));

    const getValue = () => {
        const index = mediaQueryLists.findIndex(mql => mql.matches);
        return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    }

    const [value , setValue] = useState(getValue)
    useEffect(
        () => {
          // Event listener callback
          // Note: By defining getValue outside of useEffect we ensure that it has ...
          // ... current values of hook args (as this hook callback is created once on mount).
          const handler = () => setValue(getValue);
          // Set a listener for each media query with above handler as callback.
          mediaQueryLists.forEach(mql => mql.addListener(handler));
          // Remove listeners on cleanup
          return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
        },
        [] // Empty array ensures effect is only run on mount and unmount
      );
    
      return value;

}

export default useMedia