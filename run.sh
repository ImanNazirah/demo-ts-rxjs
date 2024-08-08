#!/bin/bash

LOG_FILE="build-and-run.log"
rm -f $LOG_FILE

# Compile TypeScript files and redirect output and errors to log file
echo "Compiling TypeScript files..." | tee -a $LOG_FILE
npx tsc >> $LOG_FILE 2>&1

if [ ! -d "dist" ]; then
  echo "Error: dist directory does not exist." | tee -a $LOG_FILE
  exit 1
fi

if [ ! -f "dist/index.js" ]; then
  echo "Error: dist/index.js file does not exist." | tee -a $LOG_FILE
  exit 1
fi

echo "Running the compiled JavaScript file..." | tee -a $LOG_FILE

node dist/index.js >> $LOG_FILE 2>&1

echo "Done. Check $LOG_FILE for details."
