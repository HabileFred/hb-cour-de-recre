#!/bin/bash
cp app/index_backend.html app/index.html
PUBLIC_PATH='/bill-o-tron/' BUILD_FOLDER_PATH='build/bill-o-tron_backend' npm run build
cp uib/* build/bill-o-tron_backend/

rm -f ../bill-o-tron_backend/uibuilder/bill-o-tron/dist/*
cp build/bill-o-tron_backend/* ../bill-o-tron_backend/uibuilder/bill-o-tron/dist/