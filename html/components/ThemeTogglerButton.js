import React from 'react'
import {ThemeContext} from './ThemeContext';

export default function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    <ThemeContext.Consumer>
      {({toggleTheme}) => (
        <button
          onClick={toggleTheme}
          >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
