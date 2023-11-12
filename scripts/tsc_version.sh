#!/bin/bash
npm i
printf "\nCompiles with TypeScript %s\n\n" "$(npx -p typescript tsc --version)"
