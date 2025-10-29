#!/bin/bash

# Navigate to project root
cd "$(dirname "$0")"

echo "🚀 Starting Gladia Lead Generation Web App..."
echo ""
echo "Backend will run on: http://localhost:3001"
echo "Frontend will run on: http://localhost:5173"
echo ""

# Start backend server
node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
cd frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started!"
echo "📍 Open http://localhost:5173 in your browser"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
