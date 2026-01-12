// This module imports a large library to delay DOMContentLoaded
// It does NOT import the interactivity API
import _ from "https://esm.sh/lodash@4.17.21";

console.log(`delay-module loaded (lodash ${_.VERSION})`);
