#!/bin/bash
./stats
./build
./build_tests.sh
./run_tests.sh
cd ..
npm ls
npm publish
