#!/bin/bash
PUBLIC_PATH='/cour-de-recre/' BUILD_FOLDER_PATH='build/cour-de-recre' npm run build
scp build/cour-de-recre/* glimpsef@ssh.cluster011.hosting.ovh.net:www/cour-de-recre/

