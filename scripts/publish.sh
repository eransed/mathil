#!/bin/bash
./stats.sh
./build.sh
./run_tests.sh
cd ..
npm ls
npm publish
