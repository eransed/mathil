#!/bin/bash
rough_lines=$(cat ../src/*.ts | wc -l)
printf "Rough project line count: %s\n" "${rough_lines}"
