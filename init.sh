#!/bin/bash

# SanBayGo Development Harness - Initialization Script
# =================================================

# Configuration
INSTALL_CMD="npm install"
VERIFY_CMD="npm test"
START_CMD="npm start"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "SanBayGo Development Environment Setup"
echo "========================================"
echo ""

# Check current directory
echo "Current directory: $(pwd)"
echo ""

# Verify package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in current directory${NC}"
    echo "Please run this script from the project root"
    exit 1
fi

# Install dependencies
echo "========================================"
echo "Installing dependencies..."
echo "========================================"
$INSTALL_CMD
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Dependency installation failed${NC}"
    exit 1
fi
echo -e "${GREEN}Dependencies installed successfully${NC}"
echo ""

# Run verification
echo "========================================"
echo "Running verification..."
echo "========================================"
$VERIFY_CMD
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Verification failed${NC}"
    echo "Please fix issues before continuing"
    exit 1
fi
echo -e "${GREEN}Verification passed${NC}"
echo ""

# Summary
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Project: SanBayGo MVP"
echo "Location: $(pwd)"
echo ""
echo "Available commands:"
echo "  npm start       - Start development server"
echo "  npm test        - Run tests"
echo "  npx tsc --noEmit - TypeScript check"
echo ""

# Optional: Start dev server
if [ "${RUN_START_COMMAND:-0}" = "1" ]; then
    echo "Starting development server..."
    $START_CMD
fi
