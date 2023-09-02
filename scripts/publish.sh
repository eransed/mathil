#!/bin/bash
./stats.sh
./build.sh
./build_tests.sh
./run_tests.sh
cd ..
npm ls
npm publish
