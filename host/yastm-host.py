#!/usr/bin/env python3

import sys, json, struct
from subprocess import Popen

def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        return json.loads("error")
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return json.loads(message)

def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()

def startMPV():
    receivedMessage = getMessage()
    
    if receivedMessage == "error":
        sendMessage(encodeMessage("Invalid input"))
        sys.exit(0)
    
    url = receivedMessage.get('url')
    player = receivedMessage.get('player')

    player.extend(['--', url])
    Popen(player, stdin=None, stdout=None, stderr=None)
    
    sendMessage(encodeMessage("Ok"))

if __name__ == "__main__":
    startMPV();
