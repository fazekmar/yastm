#!/bin/sh

if [ ! $(command -v python3) ]
then
    echo "Python3 not found, but it's needed to run the host application!"
    exit 1
fi

if [ $(uname -s) = "Darwin" ];
then
    INSTALL_DIR="${HOME}/Library/Application Support/Mozilla/NativeMessagingHosts"
else
    INSTALL_DIR="${HOME}/.mozilla/native-messaging-hosts"
fi

HOST_DESC=$(cat <<EOF
{
  "name": "yastm",
  "description": "YASTM host application",
  "path": "${INSTALL_DIR}/yastm.py",
  "type": "stdio",
  "allowed_extensions": ["yastm@fazekmar"]
}
EOF
)

# Create native messaging dir if does not exist
if [ ! -d "${INSTALL_DIR}" ]; then
    mkdir -p "${INSTALL_DIR}"
fi

# Create App manifest
echo ${HOST_DESC} > "${INSTALL_DIR}/yastm.json"

# Download App side
curl -sSL https://raw.githubusercontent.com/fazekmar/yastm/master/host/yastm-host.py > "${INSTALL_DIR}/yastm.py"
chmod +x "${INSTALL_DIR}/yastm.py"
