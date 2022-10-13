#!/bin/sh

ROOT_DIR=/node/.next

echo "Replacing environment constants"
find $ROOT_DIR -regex '.*\.\(html\|json\|js\)$' -exec /process-file.sh {} \;

exec "$@"
