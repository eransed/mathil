#!/bin/bash
rm -rfv ../dist
cd ../src
npm i
npx tsc
