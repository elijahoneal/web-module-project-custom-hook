import {useEffect} from 'react'
import useLocalStorage from './useLocalStorage'
import useMedia from './useMedia'
const useDarkMode = () =>{

    const usePrefersDarkMode = () => {
        return useMedia(['prefers-color-scheme: dark'], [true], false)
    }
    const [darkMode , setDarkMode] = useLocalStorage('dark mode')

    const prefersDarkMode = usePrefersDarkMode();
    const enabled = typeof darkMode !== 'undefined' ? darkMode : prefersDarkMode;
    useEffect(
        () => {
          const className = 'dark-mode';
          const element = window.document.body;
          if (enabled) {
            element.classList.add(className);
          } else {
            element.classList.remove(className);
          }
        },
        [enabled] // Only re-call effect when value changes
      );
    
      // Return enabled state and setter
    
    
    return [enabled , setDarkMode]
}

export default useDarkMode