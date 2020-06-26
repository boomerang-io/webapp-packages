Styles
A package for including a css reset, IBM Design Language Color Library scss functions, and scss variables for fonts and colors

## What it does
- single `.scss` file import to include
  - css reset [normalize.css](https://github.com/necolas/normalize.css/)
  - [IBM Design Language Color Library](https://github.com/IBM-Design/colors)
  - scss variables
- mapping of all of the IBM Design Color palette to scss variables

```scss
// IBM Design Language
$__ibm-color-palettes: (
  'blue': (
    1: #e1ebf7,
    10: #c8daf4,
  )
);

// @boomerang/boomerang-styles color palette to variable mapping
$blue-1: #e1ebf7;
$blue-10: #c8daf4;
```

## Install
`yarn add @boomerang/boomerang-styles`    
or  
`npm install @boomerang/boomerang-styles`

## Use


```scss
// styles.scss 
// base stylesheet for the application - includes resets
@import "~@boomerang/boomerang-styles";
 
// button.scss
@import "~@boomerang/boomerang-styles/lib/colors"; // import the color variables
 
 
.button {
  background: $blue-90; // use color variable
}


.button--disabled {
  background: color('blue', 90, $alpha: 0.5); // use IBM Design Language function
}
```

## Requirements
- local configured to use `@boomerang` scoped npm packages. See our [getting started guide](https://launch.boomerangplatform.net/docs/engineering/frontend-developer-onboarding) for more information
- any Sass compiler compatible with Sass 3.3 or greater.
