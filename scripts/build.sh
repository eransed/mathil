#!/bin/bash
./tsc_version.sh
rm -rfv ../dist
cd ../src
npx -p typescript tsc
