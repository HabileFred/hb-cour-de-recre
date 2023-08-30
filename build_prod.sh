#!/bin/bash
cp app/index_online.html app/index.html
PUBLIC_PATH='/cour-de-recre/bill-o-tron/' BUILD_FOLDER_PATH='build/bill-o-tron' npm run build
scp build/bill-o-tron/* glimpsef@ssh.cluster011.hosting.ovh.net:www/cour-de-recre/bill-o-tron/

